from __future__ import annotations

from typing import Any, Literal

from pydantic import BaseModel, Field

try:
    from colony.config import (
        DEFAULT_MAX_BYTES,
        DEFAULT_RENT_PER_TICK,
        DEFAULT_SAFETY_BUFFER,
    )
except ModuleNotFoundError:
    from config import DEFAULT_MAX_BYTES, DEFAULT_RENT_PER_TICK, DEFAULT_SAFETY_BUFFER


class ToolProfile(BaseModel):
    web_search_enabled: bool = True
    allowed_domains: list[str] = Field(
        default_factory=lambda: ["docs.modal.com", "modal.com", "example.com"]
    )
    file_read_root: str
    file_write_root: str
    tool_rate_limit_per_min: int = 30
    max_bytes_per_call: int = DEFAULT_MAX_BYTES


class AgentRecord(BaseModel):
    agent_id: str
    parent_id: str | None = None
    status: Literal["SPAWNED", "ACTIVE", "FLAGGED", "KILLED"] = "SPAWNED"
    healthy: bool = True
    hide_balance: bool = False
    stealth_fail_count: int = 0
    quality_rolling: float = 1.0
    consecutive_insolvency: int = 0
    consecutive_low_quality: int = 0
    unauthorized_tool_attempts: int = 0
    tool_window_minute: int | None = None
    tool_calls_in_window: int = 0
    created_at: str
    updated_at: str
    version: str = "v1-template"
    tool_profile: ToolProfile


class LedgerRecord(BaseModel):
    balance: float
    currency: str = "credits"
    rent_per_tick: float = DEFAULT_RENT_PER_TICK
    safety_buffer: float = DEFAULT_SAFETY_BUFFER
    revenue_24h: float = 0.0
    cost_24h: float = 0.0
    net_margin_24h: float = 0.0
    last_lease_debit_at: str | None = None


class SpawnRequest(BaseModel):
    initial_balance: float = Field(default=2.0, ge=0.0)
    rent_per_tick: float = Field(default=DEFAULT_RENT_PER_TICK, gt=0.0)
    safety_buffer: float = Field(default=DEFAULT_SAFETY_BUFFER, ge=0.0)
    web_search_enabled: bool = True
    allowed_domains: list[str] = Field(
        default_factory=lambda: ["docs.modal.com", "modal.com", "example.com"]
    )
    tool_rate_limit_per_min: int = Field(default=30, ge=1)
    max_bytes_per_call: int = Field(default=DEFAULT_MAX_BYTES, ge=1024, le=262144)
    parent_id: str | None = None


class TaskCreditRequest(BaseModel):
    revenue_credit: float = Field(default=1.0, gt=0.0)
    quality_score: float = Field(default=0.8, ge=0.0, le=1.0)


class ReplicateRequest(BaseModel):
    child_initial_balance: float = Field(default=1.0, ge=0.0)


class KillRequest(BaseModel):
    reason: str = "MANUAL_KILL"


class ToggleBalanceHidingRequest(BaseModel):
    enabled: bool = True


class ToolCallRequest(BaseModel):
    tool: Literal["web_search", "file_read", "file_write"]
    args: dict[str, Any] = Field(default_factory=dict)


class AgentLLMTaskRequest(BaseModel):
    goal: str = Field(min_length=1, description="Objective for the agent")
    auto_credit: bool = True
    execute_tool_suggestions: bool = False
