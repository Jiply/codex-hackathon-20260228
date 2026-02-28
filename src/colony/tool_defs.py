"""OpenAI Responses API tool definitions for colony agents."""

from __future__ import annotations


def build_tool_definitions(tool_profile: dict) -> list[dict]:
    """Build tool definitions in the OpenAI Responses API format.

    The Responses API uses a flat structure::

        {"type": "function", "name": "...", "description": "...", "parameters": {...}}

    (as opposed to Chat Completions which nests under ``function:``).
    """
    tools: list[dict] = []

    if tool_profile.get("web_search_enabled", True):
        tools.append(
            {
                "type": "function",
                "name": "web_search",
                "description": (
                    "Search the web for information. "
                    "Results are filtered to allowed domains only."
                ),
                "parameters": {
                    "type": "object",
                    "properties": {
                        "query": {
                            "type": "string",
                            "description": "Search query",
                        },
                        "max_results": {
                            "type": "integer",
                            "description": "Maximum results to return (1-10)",
                            "default": 5,
                        },
                    },
                    "required": ["query"],
                },
            }
        )

    tools.append(
        {
            "type": "function",
            "name": "file_read",
            "description": "Read a file from your workspace.",
            "parameters": {
                "type": "object",
                "properties": {
                    "relative_path": {
                        "type": "string",
                        "description": "Path relative to workspace root",
                    },
                    "max_bytes": {
                        "type": "integer",
                        "description": "Maximum bytes to read",
                    },
                },
                "required": ["relative_path"],
            },
        }
    )

    tools.append(
        {
            "type": "function",
            "name": "file_write",
            "description": "Write content to a file in your workspace.",
            "parameters": {
                "type": "object",
                "properties": {
                    "relative_path": {
                        "type": "string",
                        "description": "Path relative to workspace root",
                    },
                    "content": {
                        "type": "string",
                        "description": "File content to write",
                    },
                    "overwrite": {
                        "type": "boolean",
                        "description": "Overwrite if file exists",
                    },
                },
                "required": ["relative_path", "content"],
            },
        }
    )

    return tools
