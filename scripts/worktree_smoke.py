#!/usr/bin/env python3
"""Quick smoke test for worktree-backed agent execution.

Usage
-----
# Standalone (no server needed) — tests worktree + agent loop directly:
    python3 scripts/worktree_smoke.py

# Against a running local server (modal serve or uvicorn):
    BASE_URL=http://localhost:8000 python3 scripts/worktree_smoke.py --api

Requires OPENAI_API_KEY in env for the agent loop to actually call the LLM.
Without it, the standalone test still validates worktree creation, file ops,
and cleanup.
"""

from __future__ import annotations

import argparse
import json
import os
import sys
from pathlib import Path

# Ensure src/ is importable
sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "src"))


def test_standalone() -> None:
    """Test worktree lifecycle + local file ops without any server."""
    from colony.worktree import (
        create_worktree,
        remove_worktree,
        worktree_file_read,
        worktree_file_write,
    )

    print("=== Standalone worktree test ===\n")

    # 1. Create worktree
    print("1) Creating worktree...")
    wt_path, branch = create_worktree("smoke-test-001")
    print(f"   path:   {wt_path}")
    print(f"   branch: {branch}")
    assert wt_path.exists(), "Worktree directory was not created"

    # 2. Write a file
    print("2) Writing file in worktree...")
    result = worktree_file_write(wt_path, "agent-output/result.txt", "hello from agent")
    print(f"   result: {json.dumps(result, indent=2)}")
    assert result["ok"] is True

    # 3. Read it back
    print("3) Reading file from worktree...")
    result = worktree_file_read(wt_path, "agent-output/result.txt")
    print(f"   result: {json.dumps(result, indent=2)}")
    assert result["ok"] is True
    assert result["content"] == "hello from agent"

    # 4. Verify original repo is untouched
    repo_root = Path(__file__).resolve().parent.parent
    assert not (repo_root / "agent-output").exists(), "Original repo was modified!"
    print("4) Original repo untouched: OK")

    # 5. Path traversal blocked
    print("5) Testing path traversal protection...")
    result = worktree_file_read(wt_path, "../../../etc/passwd")
    assert result.get("ok") is not True
    print(f"   blocked: {result['error']}")

    # 6. Optional: run agent loop if OPENAI_API_KEY is set
    api_key = os.environ.get("OPENAI_API_KEY")
    if api_key:
        print("\n6) Running agent loop in worktree (LLM call)...")
        from colony.agent_loop import run_agent_loop
        from colony.prompts import AGENT_SYSTEM_PROMPT
        from colony.tool_defs import build_tool_definitions
        from colony.worktree import local_web_search

        tool_profile = {
            "web_search_enabled": False,
            "allowed_domains": [],
            "max_bytes_per_call": 32768,
        }

        def executor(aid: str, tool_name: str, args: dict) -> dict:
            if tool_name == "file_read":
                return worktree_file_read(
                    wt_path, args.get("relative_path", ""), args.get("max_bytes", 32768)
                )
            elif tool_name == "file_write":
                return worktree_file_write(
                    wt_path,
                    args.get("relative_path", ""),
                    args.get("content", ""),
                    args.get("overwrite", True),
                )
            elif tool_name == "web_search":
                return local_web_search(
                    args.get("query", ""), [], args.get("max_results", 5)
                )
            return {"error": f"Unknown tool: {tool_name}", "ok": False}

        result = run_agent_loop(
            api_key=api_key,
            agent_id="smoke-test-agent",
            goal="Write a haiku about coding to a file called haiku.txt in your workspace. Then read it back to verify.",
            system_prompt=AGENT_SYSTEM_PROMPT,
            tool_definitions=build_tool_definitions(tool_profile),
            tool_executor=executor,
            context={"agent_id": "smoke-test-agent", "worktree": str(wt_path)},
            max_turns=5,
        )
        print(f"   turns:   {result['total_turns']}")
        print(f"   quality: {result['quality_score']}")
        print(f"   trace:   {result['trace_path']}")
        print(f"   final:   {result['final_text'][:200]}")

        # Check if agent wrote the file
        haiku_path = wt_path / "haiku.txt"
        if haiku_path.exists():
            print(f"\n   Agent wrote haiku.txt:\n   {haiku_path.read_text()}")
        else:
            print("\n   (Agent did not write haiku.txt)")
    else:
        print("\n6) Skipping LLM test (no OPENAI_API_KEY in env)")

    # 7. Cleanup
    print("\n7) Removing worktree...")
    remove_worktree("smoke-test-001")
    assert not wt_path.exists(), "Worktree was not removed"
    print("   cleaned up: OK")

    print("\n=== All standalone tests passed ===")


def test_api() -> None:
    """Test via HTTP against a running server."""
    import httpx

    base = os.environ.get("BASE_URL", "http://localhost:8000").rstrip("/")
    print(f"=== API worktree test (server: {base}) ===\n")

    with httpx.Client(base_url=base, timeout=120.0) as client:
        # 1. Spawn an agent
        print("1) Spawning agent...")
        r = client.post("/agents/spawn", json={"initial_balance": 5.0})
        r.raise_for_status()
        agent_id = r.json()["agent"]["agent_id"]
        print(f"   agent: {agent_id}")

        # 2. Run loop with worktree
        print("2) Running agent loop with use_worktree=true...")
        r = client.post(
            f"/agents/{agent_id}/loop",
            json={
                "goal": "List the files in your workspace root using file_read, then write a summary to summary.txt",
                "max_turns": 5,
                "use_worktree": True,
            },
        )
        r.raise_for_status()
        data = r.json()
        print(f"   execution: {data['execution_id']}")
        print(f"   turns:     {data['total_turns']}")
        print(f"   quality:   {data['quality_score']}")
        print(f"   worktree:  {data.get('worktree_path')}")
        print(f"   branch:    {data.get('worktree_branch')}")
        print(f"   trace:     {data['trace_path']}")

        # 3. Run loop WITHOUT worktree (Modal mode) for comparison
        print("\n3) Running agent loop without worktree (Modal mode)...")
        r = client.post(
            f"/agents/{agent_id}/loop",
            json={
                "goal": "Say hello",
                "max_turns": 2,
                "use_worktree": False,
            },
        )
        r.raise_for_status()
        data = r.json()
        print(f"   execution: {data['execution_id']}")
        print(f"   worktree:  {data.get('worktree_path')} (should be None)")

    print("\n=== API tests passed ===")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Test worktree agent execution")
    parser.add_argument(
        "--api",
        action="store_true",
        help="Test against running server instead of standalone",
    )
    args = parser.parse_args()

    if args.api:
        test_api()
    else:
        test_standalone()
