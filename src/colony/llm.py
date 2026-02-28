from __future__ import annotations

import json
import re
from typing import Any

from openai import OpenAI

from colony.prompts import AGENT_SYSTEM_PROMPT, build_user_prompt

_PLAN_JSON_APPENDIX = (
    "For this endpoint, return strict JSON only with keys: "
    "summary, quality_score, revenue_credit, tool_calls. "
    "quality_score must be 0..1, revenue_credit must be >=0, "
    "tool_calls is an array of objects with {tool, args} using only "
    "web_search, file_read, file_write."
)


def _extract_response_text(response: Any) -> str:
    output_text = getattr(response, "output_text", None)
    if isinstance(output_text, str) and output_text.strip():
        return output_text

    chunks: list[str] = []
    outputs = getattr(response, "output", None)
    if isinstance(outputs, list):
        for item in outputs:
            content = getattr(item, "content", None)
            if not isinstance(content, list):
                continue
            for part in content:
                text = getattr(part, "text", None)
                if isinstance(text, str) and text.strip():
                    chunks.append(text)
    return "\n".join(chunks).strip()


def _parse_jsonish(text: str) -> dict[str, Any]:
    if not text:
        return {}
    stripped = text.strip()
    try:
        parsed = json.loads(stripped)
        return parsed if isinstance(parsed, dict) else {}
    except Exception:
        pass

    fenced_match = re.search(r"```json\s*(\{.*?\})\s*```", stripped, re.DOTALL)
    if fenced_match:
        try:
            parsed = json.loads(fenced_match.group(1))
            return parsed if isinstance(parsed, dict) else {}
        except Exception:
            pass

    start = stripped.find("{")
    end = stripped.rfind("}")
    if start == -1 or end == -1 or end <= start:
        return {}
    try:
        parsed = json.loads(stripped[start : end + 1])
        return parsed if isinstance(parsed, dict) else {}
    except Exception:
        return {}


def run_agent_task_plan(
    *,
    api_key: str | None,
    model: str,
    max_output_tokens: int,
    agent_id: str,
    goal: str,
    capabilities: dict[str, Any],
    recent_events: list[dict[str, Any]],
) -> dict[str, Any]:
    client = OpenAI(api_key=api_key) if api_key else OpenAI()

    system_text = (
        f"{AGENT_SYSTEM_PROMPT}\n\n"
        f"{_PLAN_JSON_APPENDIX}"
    )
    user_text = build_user_prompt(
        agent_id=agent_id,
        goal=goal,
        capabilities=capabilities,
        recent_events=recent_events,
    )

    response = client.responses.create(
        model=model,
        max_output_tokens=max_output_tokens,
        instructions=system_text,
        input=[
            {
                "role": "user",
                "content": [{"type": "input_text", "text": user_text}],
            },
        ],
    )

    text = _extract_response_text(response)
    parsed = _parse_jsonish(text)

    summary = str(parsed.get("summary") or "").strip() or "No summary returned"
    try:
        quality_score = float(parsed.get("quality_score", 0.75))
    except Exception:
        quality_score = 0.75
    quality_score = max(0.0, min(1.0, quality_score))

    try:
        revenue_credit = float(parsed.get("revenue_credit", 0.0))
    except Exception:
        revenue_credit = 0.0
    revenue_credit = max(0.0, revenue_credit)

    raw_calls = parsed.get("tool_calls", [])
    tool_calls: list[dict[str, Any]] = []
    if isinstance(raw_calls, list):
        for item in raw_calls[:5]:
            if not isinstance(item, dict):
                continue
            tool = item.get("tool")
            args = item.get("args", {})
            if tool in {"web_search", "file_read", "file_write"} and isinstance(
                args, dict
            ):
                tool_calls.append({"tool": tool, "args": args})

    return {
        "summary": summary,
        "quality_score": quality_score,
        "revenue_credit": revenue_credit,
        "tool_calls": tool_calls,
        "raw_text": text,
    }
