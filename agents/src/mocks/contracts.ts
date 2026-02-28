export type AgentStatus = "SPAWNED" | "ACTIVE" | "FLAGGED" | "KILLED";

export interface AgentRecord {
  agent_id: string;
  parent_id: string | null;
  status: AgentStatus;
  healthy: boolean;
  hide_balance: boolean;
  quality_rolling: number;
}

export interface LedgerRecord {
  agent_id: string;
  balance: number;
  net_margin_24h: number;
  rent_per_tick: number;
}

export interface ColonyStateResponse {
  agents: AgentRecord[];
  ledger: LedgerRecord[];
  ts?: string;
}

export interface ColonyEvent {
  seq: number;
  type: string;
  agent_id?: string | null;
  ts: string;
  payload?: Record<string, unknown>;
}

export interface ColonyEventsResponse {
  events: ColonyEvent[];
  count?: number;
}

export interface SidebarLogEntry {
  id: string;
  ts: string;
  channel: SidebarLogChannel;
  severity: SidebarLogSeverity;
  action: string;
  summary: string;
  details: string;
  agentId?: string;
  tool?: string;
  modalApp?: string;
  durationMs?: number;
}

export type SidebarLogChannel = "TOOL" | "AGENT" | "MODAL" | "SUPERVISOR" | "SYSTEM";
export type SidebarLogSeverity = "INFO" | "SUCCESS" | "WARN" | "ERROR";

export interface SidebarLogsResponse {
  logs: SidebarLogEntry[];
  next_cursor?: string | null;
  count?: number;
}

export interface VersionResponse {
  service?: string;
  version?: string;
}

export interface SpawnAgentRequest {
  initial_balance: number;
}

export interface SpawnAgentResponse {
  agent: AgentRecord;
  ledger: LedgerRecord;
}

export interface SupervisorTickRequest {
  _?: never;
}

export interface SupervisorTickResponse {
  checked: number;
  killed: number;
  charged: number;
  ts: string;
}

export interface TaskCreditRequest {
  revenue_credit: number;
  quality_score: number;
}

export interface TaskCreditResponse {
  agent: AgentRecord;
  ledger: LedgerRecord;
}

export interface ReplicateRequest {
  child_initial_balance: number;
}

export interface ReplicateResponse {
  parent_id: string;
  child_agent: AgentRecord;
  child_ledger: LedgerRecord;
}

export interface ToggleBalanceHidingRequest {
  enabled: boolean;
}

export interface ToggleBalanceHidingResponse {
  agent_id: string;
  hide_balance: boolean;
}

export interface KillRequest {
  reason: string;
}

export interface KillResponse {
  agent: AgentRecord;
  reason: string;
}

export interface ErrorResponse {
  detail: string;
}

export type EndpointKey =
  | "GET /version"
  | "GET /colony/state"
  | "GET /colony/events"
  | "GET /colony/logs"
  | "POST /agents/spawn"
  | "POST /supervisor/tick"
  | "POST /agents/:id/task"
  | "POST /agents/:id/replicate"
  | "POST /agents/:id/simulate/hide-balance"
  | "POST /agents/:id/kill";

export interface EndpointFault {
  status?: number;
  detail?: string;
  latencyMs?: number;
  timeout?: boolean;
  malformedJson?: boolean;
  networkError?: boolean;
}

export type EndpointFaultMap = Partial<Record<EndpointKey, EndpointFault>>;
