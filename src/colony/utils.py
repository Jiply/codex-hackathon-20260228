from __future__ import annotations

import hashlib
import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from urllib.parse import urlparse


def utc_now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def short_hash(payload: Any) -> str:
    raw = json.dumps(payload, sort_keys=True, default=str).encode("utf-8")
    return hashlib.sha256(raw).hexdigest()[:16]


def is_domain_allowed(url: str, allowed_domains: list[str]) -> bool:
    if "*" in allowed_domains:
        return True
    host = urlparse(url).netloc.lower()
    if not host:
        return False
    for domain in allowed_domains:
        candidate = domain.strip().lower()
        if not candidate:
            continue
        if host == candidate or host.endswith(f".{candidate}"):
            return True
    return False


def resolve_workspace_path(data_root: str, agent_id: str, relative_path: str) -> Path:
    if not relative_path or relative_path.strip() == "":
        raise ValueError("relative_path is required")
    base = (Path(data_root) / agent_id / "workspace").resolve()
    candidate = (base / relative_path).resolve()
    if not str(candidate).startswith(str(base)):
        raise ValueError("Path escapes agent workspace")
    return candidate
