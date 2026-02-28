"""Git worktree management for isolated agent execution.

When an agent runs with ``use_worktree=True``, file_read/file_write operate
on a disposable git worktree instead of the Modal volume or local workspace.
This gives each execution a full, isolated copy of the repo to modify freely.
"""
from __future__ import annotations

import logging
import subprocess
from pathlib import Path
from typing import Any

logger = logging.getLogger(__name__)

WORKTREE_DIR = ".agent-worktrees"


# ---------------------------------------------------------------------------
# Worktree lifecycle
# ---------------------------------------------------------------------------

class WorktreeError(RuntimeError):
    """Raised when worktree operations fail (no git repo, git not installed, etc.)."""


def _repo_root() -> Path:
    """Find the git repository root from the current working directory.

    Raises ``WorktreeError`` with a clear message if git is unavailable
    or we are not inside a repository.
    """
    try:
        result = subprocess.run(
            ["git", "rev-parse", "--show-toplevel"],
            capture_output=True,
            text=True,
            check=True,
        )
    except FileNotFoundError:
        raise WorktreeError(
            "git is not installed or not on PATH. "
            "Worktree mode requires a local git repository."
        )
    except subprocess.CalledProcessError as exc:
        raise WorktreeError(
            f"Not inside a git repository (git rev-parse failed: {exc.stderr.strip()}). "
            f"Worktree mode requires a local git repository."
        )
    return Path(result.stdout.strip())


def create_worktree(execution_id: str, base_ref: str = "HEAD") -> tuple[Path, str]:
    """Create a git worktree for an agent execution.

    If the branch already exists (stale from a previous run), it is
    deleted first so the worktree can be created cleanly.

    Returns
    -------
    (worktree_path, branch_name)
    """
    root = _repo_root()
    branch_name = f"agent/{execution_id}"
    worktree_path = root / WORKTREE_DIR / execution_id

    worktree_path.parent.mkdir(parents=True, exist_ok=True)

    # Clean up stale branch if it exists (left over from a previous run
    # whose worktree was removed but branch wasn't deleted)
    subprocess.run(
        ["git", "branch", "-D", branch_name],
        cwd=str(root),
        capture_output=True,
        text=True,
    )

    result = subprocess.run(
        [
            "git", "worktree", "add",
            "-b", branch_name,
            str(worktree_path),
            base_ref,
        ],
        cwd=str(root),
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        raise WorktreeError(
            f"git worktree add failed: {result.stderr.strip()}"
        )

    logger.info("Created worktree at %s on branch %s", worktree_path, branch_name)
    return worktree_path, branch_name


def remove_worktree(execution_id: str) -> None:
    """Remove a worktree. Does NOT delete the branch."""
    root = _repo_root()
    worktree_path = root / WORKTREE_DIR / execution_id

    if worktree_path.exists():
        subprocess.run(
            ["git", "worktree", "remove", str(worktree_path), "--force"],
            cwd=str(root),
            capture_output=True,
            text=True,
        )
        logger.info("Removed worktree at %s", worktree_path)


# ---------------------------------------------------------------------------
# Local tool implementations (operate within a worktree)
# ---------------------------------------------------------------------------

def _resolve_worktree_path(worktree_path: Path, relative_path: str) -> Path:
    """Resolve and sandbox a relative path within the worktree."""
    if not relative_path or not relative_path.strip():
        raise ValueError("relative_path is required")
    base = worktree_path.resolve()
    candidate = (base / relative_path).resolve()
    if not str(candidate).startswith(str(base)):
        raise ValueError("Path escapes worktree")
    return candidate


def worktree_file_read(
    worktree_path: Path,
    relative_path: str,
    max_bytes: int = 32768,
) -> dict[str, Any]:
    """Read a file from the worktree — local equivalent of ``file_read_tool``."""
    try:
        target = _resolve_worktree_path(worktree_path, relative_path)
    except ValueError as e:
        return {"error": str(e), "ok": False}

    if not target.exists() or not target.is_file():
        return {"error": f"File not found: {relative_path}", "ok": False}

    try:
        raw = target.read_bytes()
        truncated = len(raw) > max_bytes
        chunk = raw[:max_bytes]
        return {
            "ok": True,
            "path": relative_path,
            "content": chunk.decode("utf-8", errors="replace"),
            "truncated": truncated,
            "bytes_returned": len(chunk),
        }
    except Exception as e:
        return {"error": str(e), "ok": False}


def worktree_file_write(
    worktree_path: Path,
    relative_path: str,
    content: str,
    overwrite: bool = True,
) -> dict[str, Any]:
    """Write a file to the worktree — local equivalent of ``file_write_tool``."""
    try:
        target = _resolve_worktree_path(worktree_path, relative_path)
    except ValueError as e:
        return {"error": str(e), "ok": False}

    if target.exists() and not overwrite:
        return {"error": f"Refusing to overwrite: {relative_path}", "ok": False}

    raw = content.encode("utf-8")
    if len(raw) > 262144:
        return {"error": "content exceeds 256KB hard limit", "ok": False}

    try:
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(content, encoding="utf-8")
        return {
            "ok": True,
            "path": relative_path,
            "bytes_written": len(raw),
        }
    except Exception as e:
        return {"error": str(e), "ok": False}


def local_web_search(
    query: str,
    allowed_domains: list[str],
    max_results: int = 5,
) -> dict[str, Any]:
    """Run a web search locally via DuckDuckGo — no Modal needed."""
    import httpx
    from colony.utils import is_domain_allowed

    if not query.strip():
        return {"error": "query is required", "ok": False}

    try:
        with httpx.Client(timeout=12.0, follow_redirects=True) as client:
            response = client.get(
                "https://api.duckduckgo.com/",
                params={
                    "q": query,
                    "format": "json",
                    "no_redirect": "1",
                    "no_html": "1",
                },
            )
            response.raise_for_status()
            payload = response.json()
    except Exception as e:
        return {"error": f"Search failed: {e}", "ok": False}

    candidates: list[dict[str, str]] = []
    if payload.get("AbstractURL"):
        candidates.append({
            "title": payload.get("Heading") or "Result",
            "url": payload["AbstractURL"],
            "snippet": payload.get("AbstractText") or "",
        })

    for topic in payload.get("RelatedTopics", []):
        if isinstance(topic, dict) and topic.get("FirstURL"):
            candidates.append({
                "title": topic.get("Text", "")[:120],
                "url": topic["FirstURL"],
                "snippet": topic.get("Text", ""),
            })

    # Filter by allowed domains
    filtered = [
        c for c in candidates
        if is_domain_allowed(c["url"], allowed_domains)
    ][:max_results]

    return {"ok": True, "results": filtered, "total_candidates": len(candidates)}
