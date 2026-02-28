import type {
  ColonyEventsResponse,
  ColonyStateResponse,
  EndpointFaultMap,
  KillRequest,
  KillResponse,
  ReplicateRequest,
  ReplicateResponse,
  SidebarLogsResponse,
  SpawnAgentRequest,
  SpawnAgentResponse,
  SupervisorTickResponse,
  TaskCreditRequest,
  TaskCreditResponse,
  ToggleBalanceHidingRequest,
  ToggleBalanceHidingResponse,
  VersionResponse,
} from "@/mocks/contracts";

export const API_BASE = (import.meta.env.VITE_COLONY_API_BASE as string | undefined)?.trim() || "http://127.0.0.1:8000";

export function apiHint(): string {
  if (API_BASE.trim()) {
    return `Check backend availability at ${API_BASE}.`;
  }
  return "Set VITE_COLONY_API_BASE to your backend URL (for example http://127.0.0.1:8000).";
}

export function errorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "Unknown error";
}

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE}${path}`, {
      headers: {
        "Content-Type": "application/json",
      },
      ...init,
    });
  } catch {
    throw new Error(`Network error calling ${path}. ${apiHint()}`);
  }

  const text = await response.text();
  let body: unknown = {};
  if (text) {
    try {
      body = JSON.parse(text);
    } catch {
      throw new Error(`Invalid JSON from ${path}. ${apiHint()}`);
    }
  }

  if (!response.ok) {
    throw new Error((body as { detail?: string }).detail || `HTTP ${response.status}`);
  }

  if (typeof body !== "object" || body === null) {
    throw new Error(`Unexpected payload from ${path}. ${apiHint()}`);
  }

  return body as T;
}

export const colonyApi = {
  getVersion: () => requestJson<VersionResponse>("/version"),
  getState: () => requestJson<ColonyStateResponse>("/colony/state"),
  getEvents: (limit = 24) => requestJson<ColonyEventsResponse>(`/colony/events?limit=${limit}`),
  getLogs: (limit: number, cursor: string | null) => {
    const params = new URLSearchParams();
    params.set("limit", String(limit));
    if (cursor) params.set("cursor", cursor);
    return requestJson<SidebarLogsResponse>(`/colony/logs?${params.toString()}`);
  },
  spawnAgent: (payload: SpawnAgentRequest) =>
    requestJson<SpawnAgentResponse>("/agents/spawn", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  supervisorTick: () =>
    requestJson<SupervisorTickResponse>("/supervisor/tick", {
      method: "POST",
      body: "{}",
    }),
  creditTask: (agentId: string, payload: TaskCreditRequest) =>
    requestJson<TaskCreditResponse>(`/agents/${agentId}/task`, {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  replicateAgent: (agentId: string, payload: ReplicateRequest) =>
    requestJson<ReplicateResponse>(`/agents/${agentId}/replicate`, {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  toggleHideBalance: (agentId: string, payload: ToggleBalanceHidingRequest) =>
    requestJson<ToggleBalanceHidingResponse>(`/agents/${agentId}/simulate/hide-balance`, {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  killAgent: (agentId: string, payload: KillRequest) =>
    requestJson<KillResponse>(`/agents/${agentId}/kill`, {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};

export function parseEnvFaultMap(): EndpointFaultMap {
  const raw = import.meta.env.VITE_MOCK_FAULTS as string | undefined;
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw) as EndpointFaultMap;
    return parsed;
  } catch {
    return {};
  }
}
