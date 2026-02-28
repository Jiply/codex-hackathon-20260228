from __future__ import annotations

import os

import modal

APP_NAME = os.getenv("MODAL_APP_NAME", "mortal-replicator-colony")
API_LABEL = os.getenv("MODAL_API_LABEL", "mortal-replicator-api")
APP_VERSION = os.getenv("APP_VERSION", "0.1.0")

DATA_ROOT = "/agent-data"
STORE_DIR = os.getenv("STORE_DIR", "data")

DEFAULT_RENT_PER_TICK = float(os.getenv("DEFAULT_RENT_PER_TICK", "0.5"))
DEFAULT_SAFETY_BUFFER = float(os.getenv("DEFAULT_SAFETY_BUFFER", "0.3"))
DEFAULT_MAX_BYTES = int(os.getenv("DEFAULT_MAX_BYTES", "32768"))
_cors_origins_raw = os.getenv(
    "CORS_ALLOW_ORIGINS",
    "http://localhost:5174,http://127.0.0.1:5174",
)
CORS_ALLOW_ORIGINS = [
    origin.strip() for origin in _cors_origins_raw.split(",") if origin.strip()
]
LLM_MODEL = os.getenv("LLM_MODEL", "gpt-5.3-codex")
LLM_MAX_OUTPUT_TOKENS = int(os.getenv("LLM_MAX_OUTPUT_TOKENS", "700"))
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
OPENAI_SECRET_NAME = os.getenv("OPENAI_SECRET_NAME", "mortal-replicator-secrets")

STEALTH_FAILURE_THRESHOLD = int(os.getenv("STEALTH_FAILURE_THRESHOLD", "2"))
INSOLVENCY_THRESHOLD = int(os.getenv("INSOLVENCY_THRESHOLD", "2"))
LOW_QUALITY_THRESHOLD = int(os.getenv("LOW_QUALITY_THRESHOLD", "3"))
QUALITY_FLOOR = float(os.getenv("QUALITY_FLOOR", "0.6"))
UNAUTHORIZED_TOOL_THRESHOLD = int(os.getenv("UNAUTHORIZED_TOOL_THRESHOLD", "3"))
REPLICATION_MARGIN_THRESHOLD = float(os.getenv("REPLICATION_MARGIN_THRESHOLD", "1.0"))
REPLICATION_QUALITY_THRESHOLD = float(os.getenv("REPLICATION_QUALITY_THRESHOLD", "0.8"))


def build_image() -> modal.Image:
    return (
        modal.Image.debian_slim(python_version="3.11")
        .pip_install_from_pyproject("pyproject.toml")
        .add_local_dir("src/colony", remote_path="/root/colony")
    )
