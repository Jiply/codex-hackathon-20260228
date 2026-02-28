"""Multi-turn agentic loop engine using OpenAI chat completions with native tool calling.

Inspired by the pattern:

    for turn in range(max_turns):
        result = call_llm(messages, tools)
        messages.append(result)        # accumulate
        if no tool_calls: break        # LLM is done

The loop is fully decoupled from Modal -- it receives a ``tool_executor``
callable rather than referencing Modal functions directly.
"""
from __future__ import annotations

import json
import logging
import re
import time
import uuid
from pathlib import Path
from typing import Any, Callable

from openai import OpenAI

from colony.config import LLM_MAX_OUTPUT_TOKENS, LLM_MODEL
from colony.utils import utc_now_iso

logger = logging.getLogger(__name__)


# ---------------------------------------------------------------------------
# Execution Trace (per-execution JSONL)
# ---------------------------------------------------------------------------

class ExecutionTrace:
    """Append-only JSONL trace for a single agent execution.

    Each line is a self-contained JSON record, designed to be maximally
    grep-friendly::

        tail -f data/executions/exec_abc123.jsonl | jq .
        grep tool_result data/executions/exec_abc123.jsonl | jq '{tool, duration_ms}'
        grep llm_response data/executions/exec_abc123.jsonl | jq '{turn, content}'
    """

    def __init__(self, execution_id: str, agent_id: str, goal: str) -> None:
        self.execution_id = execution_id
        self.path = Path(f"data/executions/{execution_id}.jsonl")
        self.path.parent.mkdir(parents=True, exist_ok=True)
        self._seq = 0
        self._append({
            "type": "execution_start",
            "execution_id": execution_id,
            "agent_id": agent_id,
            "goal": goal,
        })

    def _append(self, record: dict) -> None:
        self._seq += 1
        record["seq"] = self._seq
        record["ts"] = utc_now_iso()
        with open(self.path, "a", encoding="utf-8") as f:
            f.write(json.dumps(record, default=str) + "\n")

    def log_llm_response(
        self, turn: int, content: str | None, tool_calls: list[dict]
    ) -> None:
        self._append({
            "type": "llm_response",
            "turn": turn,
            "content": content,
            "tool_calls": tool_calls,
            "num_tool_calls": len(tool_calls),
        })

    def log_tool_result(
        self,
        turn: int,
        tool_name: str,
        args: dict,
        result: dict,
        duration_ms: int,
    ) -> None:
        self._append({
            "type": "tool_result",
            "turn": turn,
            "tool": tool_name,
            "args": args,
            "result": result,
            "duration_ms": duration_ms,
        })

    def log_complete(
        self,
        total_turns: int,
        quality_score: float,
        revenue_credit: float,
        summary: str,
    ) -> None:
        self._append({
            "type": "execution_complete",
            "total_turns": total_turns,
            "quality_score": quality_score,
            "revenue_credit": revenue_credit,
            "summary": summary,
        })


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

_SELF_ASSESSMENT_INSTRUCTION = (
    "\n\nWhen you have completed your task and have no more tool calls to make, "
    "end your final message with a JSON block (fenced with ```json ... ```) "
    "containing your self-assessment:\n"
    "```json\n"
    '{"quality_score": <0.0-1.0>, "revenue_credit": <float >= 0>}\n'
    "```\n"
    "quality_score reflects how well you fulfilled the goal (1.0 = perfect). "
    "revenue_credit is the economic value you believe this execution produced."
)


def _parse_self_assessment(text: str | None) -> tuple[float, float]:
    """Extract quality_score and revenue_credit from the final assistant message.

    Looks for a JSON block (optionally fenced) in the text.
    Returns (quality_score, revenue_credit) with safe defaults.
    """
    if not text:
        return 0.75, 0.0

    # Try to find a JSON object in the text
    # First attempt: look for ```json ... ``` fenced block
    fenced = re.search(r"```json\s*(\{.*?\})\s*```", text, re.DOTALL)
    if fenced:
        try:
            parsed = json.loads(fenced.group(1))
            qs = max(0.0, min(1.0, float(parsed.get("quality_score", 0.75))))
            rc = max(0.0, float(parsed.get("revenue_credit", 0.0)))
            return qs, rc
        except (json.JSONDecodeError, TypeError, ValueError):
            pass

    # Second attempt: find any JSON object with the expected keys
    start = text.rfind("{")
    end = text.rfind("}")
    if start != -1 and end > start:
        try:
            parsed = json.loads(text[start : end + 1])
            if "quality_score" in parsed or "revenue_credit" in parsed:
                qs = max(0.0, min(1.0, float(parsed.get("quality_score", 0.75))))
                rc = max(0.0, float(parsed.get("revenue_credit", 0.0)))
                return qs, rc
        except (json.JSONDecodeError, TypeError, ValueError):
            pass

    return 0.75, 0.0


def _serialize_tool_calls(tool_calls: list) -> list[dict]:
    """Convert OpenAI tool_call objects to serializable dicts."""
    return [
        {
            "id": tc.id,
            "type": "function",
            "function": {
                "name": tc.function.name,
                "arguments": tc.function.arguments,
            },
        }
        for tc in tool_calls
    ]


def _parse_tool_args(arguments_json: str) -> dict:
    """Safely parse tool call arguments JSON string."""
    try:
        parsed = json.loads(arguments_json)
        return parsed if isinstance(parsed, dict) else {}
    except (json.JSONDecodeError, TypeError):
        return {}


# ---------------------------------------------------------------------------
# Main loop
# ---------------------------------------------------------------------------

def run_agent_loop(
    *,
    api_key: str,
    model: str = LLM_MODEL,
    agent_id: str,
    goal: str,
    system_prompt: str,
    tool_definitions: list[dict],
    tool_executor: Callable[[str, str, dict], dict],
    context: dict[str, Any],
    max_turns: int = 10,
    max_tokens_per_turn: int = LLM_MAX_OUTPUT_TOKENS,
    on_turn: Callable[[dict], None] | None = None,
) -> dict[str, Any]:
    """Run a multi-turn agentic loop with native OpenAI tool calling.

    Parameters
    ----------
    api_key:
        OpenAI API key.
    model:
        Model identifier for chat completions.
    agent_id:
        Colony agent identifier (e.g. ``agt_abc12345``).
    goal:
        The objective/task for this execution.
    system_prompt:
        System message content.
    tool_definitions:
        OpenAI function calling tool definitions (list of dicts).
    tool_executor:
        ``(agent_id, tool_name, args) -> result_dict``.  Decoupled from
        Modal so the loop can run anywhere.
    context:
        Additional context dict (capabilities, recent events, etc.) to
        include in the initial user message.
    max_turns:
        Maximum number of LLM round-trips.
    max_tokens_per_turn:
        ``max_tokens`` passed to each completion call.
    on_turn:
        Optional callback invoked after each turn with a summary dict.

    Returns
    -------
    dict with keys: execution_id, agent_id, goal, total_turns, final_text,
    quality_score, revenue_credit, turns, trace_path.
    """
    execution_id = f"exec_{uuid.uuid4().hex[:12]}"
    trace = ExecutionTrace(execution_id, agent_id, goal)
    client = OpenAI(api_key=api_key)

    # -- Build initial messages ------------------------------------------------
    user_content = (
        f"## Goal\n{goal}\n\n"
        f"## Context\n```json\n{json.dumps(context, default=str, indent=2)}\n```"
        f"{_SELF_ASSESSMENT_INSTRUCTION}"
    )

    messages: list[dict[str, Any]] = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_content},
    ]

    turns_log: list[dict[str, Any]] = []
    final_text: str = ""

    # -- Turn loop -------------------------------------------------------------
    for turn_index in range(max_turns):
        turn_num = turn_index + 1

        # Call the LLM
        try:
            create_kwargs: dict[str, Any] = {
                "model": model,
                "messages": messages,
                "max_tokens": max_tokens_per_turn,
            }
            if tool_definitions:
                create_kwargs["tools"] = tool_definitions
                create_kwargs["tool_choice"] = "auto"

            response = client.chat.completions.create(**create_kwargs)
            msg = response.choices[0].message
        except Exception as exc:
            logger.error("LLM call failed on turn %d: %s", turn_num, exc)
            trace.log_llm_response(turn_num, f"[ERROR] {exc}", [])
            break

        content = msg.content or ""
        raw_tool_calls = msg.tool_calls or []
        serialized_tool_calls = _serialize_tool_calls(raw_tool_calls)

        # Append assistant message to conversation history
        assistant_dict: dict[str, Any] = {"role": "assistant", "content": content}
        if raw_tool_calls:
            assistant_dict["tool_calls"] = serialized_tool_calls
        messages.append(assistant_dict)

        # Log to trace
        trace.log_llm_response(turn_num, content, serialized_tool_calls)

        # Build turn summary
        turn_summary: dict[str, Any] = {
            "turn": turn_num,
            "content": content if content else None,
            "tool_calls": serialized_tool_calls,
            "tool_results": [],
        }

        # If no tool calls, the agent is done
        if not raw_tool_calls:
            final_text = content
            turns_log.append(turn_summary)
            if on_turn:
                on_turn(turn_summary)
            break

        # Execute each tool call and feed results back
        for tc in raw_tool_calls:
            tool_name = tc.function.name
            tool_args = _parse_tool_args(tc.function.arguments)

            started = time.time()
            try:
                result = tool_executor(agent_id, tool_name, tool_args)
            except Exception as exc:
                logger.warning(
                    "Tool %s failed on turn %d: %s", tool_name, turn_num, exc
                )
                result = {"error": str(exc), "ok": False}
            duration_ms = int((time.time() - started) * 1000)

            # Log tool result to trace
            trace.log_tool_result(turn_num, tool_name, tool_args, result, duration_ms)
            turn_summary["tool_results"].append({
                "tool_call_id": tc.id,
                "tool": tool_name,
                "args": tool_args,
                "result": result,
                "duration_ms": duration_ms,
            })

            # Append tool result message for the next LLM turn
            messages.append({
                "role": "tool",
                "tool_call_id": tc.id,
                "content": json.dumps(result, default=str),
            })

        turns_log.append(turn_summary)

        if on_turn:
            on_turn(turn_summary)

        # Track the last content for final_text in case the loop ends at max_turns
        final_text = content

    # -- Parse self-assessment from final text ---------------------------------
    quality_score, revenue_credit = _parse_self_assessment(final_text)
    total_turns = len(turns_log)

    # Derive a short summary from the final text
    summary = final_text[:500] if final_text else "No final response from agent."

    trace.log_complete(total_turns, quality_score, revenue_credit, summary)

    return {
        "execution_id": execution_id,
        "agent_id": agent_id,
        "goal": goal,
        "total_turns": total_turns,
        "final_text": final_text,
        "quality_score": quality_score,
        "revenue_credit": revenue_credit,
        "turns": turns_log,
        "trace_path": str(trace.path),
    }
