"""JSONL-backed local stores, replacing Modal Dict."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

try:
    from colony.config import STORE_DIR
except ModuleNotFoundError:
    from config import STORE_DIR


class JsonlStore:
    """Dict-like store backed by a JSONL file.

    Each line: ``{"k": "<key>", "v": <value>}``

    Full file rewrite on every mutation — fine for small stores
    (agents, ledger, meta).
    """

    def __init__(self, path: Path | str) -> None:
        self._path = Path(path)
        self._data: dict[str, Any] = {}
        self._path.parent.mkdir(parents=True, exist_ok=True)
        self._load()

    def _load(self) -> None:
        if not self._path.exists():
            return
        with open(self._path, encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if not line:
                    continue
                try:
                    record = json.loads(line)
                    self._data[record["k"]] = record["v"]
                except (json.JSONDecodeError, KeyError):
                    continue

    def _flush(self) -> None:
        tmp = self._path.with_suffix(".tmp")
        with open(tmp, "w", encoding="utf-8") as f:
            for key, value in self._data.items():
                f.write(json.dumps({"k": key, "v": value}, default=str) + "\n")
        tmp.rename(self._path)

    def __setitem__(self, key: str, value: Any) -> None:
        self._data[key] = value
        self._flush()

    def get(self, key: str, default: Any = None) -> Any:
        return self._data.get(key, default)

    def __getitem__(self, key: str) -> Any:
        return self._data[key]

    def __contains__(self, key: str) -> bool:
        return key in self._data

    def items(self):
        return self._data.items()


class EventLog:
    """Append-only JSONL event log.

    Each line is a raw event dict — no wrapper, maximally readable::

        {"seq": 1, "type": "AGENT_SPAWNED", "agent_id": "agt_abc", ...}
        {"seq": 2, "type": "LEASE_CHARGED", "agent_id": "agt_abc", ...}

    Grep-friendly: ``grep KILLED data/events.jsonl | jq .``

    Key is derived from ``seq`` as ``event:{seq:09d}`` for API compat
    with existing code that filters on ``key.startswith("event:")``.
    """

    def __init__(self, path: Path | str) -> None:
        self._path = Path(path)
        self._data: dict[str, dict[str, Any]] = {}
        self._path.parent.mkdir(parents=True, exist_ok=True)
        self._load()

    def _load(self) -> None:
        if not self._path.exists():
            return
        with open(self._path, encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if not line:
                    continue
                try:
                    event = json.loads(line)
                    key = f"event:{event['seq']:09d}"
                    self._data[key] = event
                except (json.JSONDecodeError, KeyError, TypeError):
                    continue

    def __setitem__(self, key: str, value: dict[str, Any]) -> None:
        self._data[key] = value
        with open(self._path, "a", encoding="utf-8") as f:
            f.write(json.dumps(value, default=str) + "\n")

    def get(self, key: str, default: Any = None) -> Any:
        return self._data.get(key, default)

    def __getitem__(self, key: str) -> dict[str, Any]:
        return self._data[key]

    def __contains__(self, key: str) -> bool:
        return key in self._data

    def items(self):
        return self._data.items()


_store_root = Path(STORE_DIR)
agents_store = JsonlStore(_store_root / "agents.jsonl")
ledger_store = JsonlStore(_store_root / "ledger.jsonl")
events_store = EventLog(_store_root / "events.jsonl")
meta_store = JsonlStore(_store_root / "meta.jsonl")
balance_visibility_store = JsonlStore(_store_root / "balance_visibility.jsonl")
