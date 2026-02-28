import type {
  AgentRecord,
  ColonyEvent,
  ColonyEventsResponse,
  ColonyStateResponse,
  EndpointFault,
  EndpointFaultMap,
  EndpointKey,
  KillResponse,
  LedgerRecord,
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
import { generateSidebarLogPage, parseLogsCursorStrict } from "@/mocks/logs";
import { getScenarioConfig, type MockScenarioName } from "@/mocks/scenarios";

interface ResponsePayload {
  status: number;
  body: unknown;
  malformedJson?: boolean;
}

export interface MockHttpRequest {
  method: string;
  pathname: string;
  searchParams: URLSearchParams;
  bodyText?: string;
}

export interface MockColonyState {
  scenario: MockScenarioName;
  reset: (scenario: MockScenarioName) => void;
  setFaults: (faults: EndpointFaultMap) => void;
  patchFaults: (faults: EndpointFaultMap) => void;
  getFaults: () => EndpointFaultMap;
  request: (req: MockHttpRequest) => Promise<Response>;
}

const REPLICATION_MARGIN_THRESHOLD = 0.2;
const REPLICATION_QUALITY_THRESHOLD = 0.62;
const INSOLVENCY_THRESHOLD = 2;
const STEALTH_THRESHOLD = 2;
const QUALITY_THRESHOLD = 2;

interface AgentInternals {
  consecutiveInsolvency: number;
  stealthFailCount: number;
  consecutiveLowQuality: number;
}

function cloneAgent(agent: AgentRecord): AgentRecord {
  return { ...agent };
}

function cloneLedger(ledger: LedgerRecord): LedgerRecord {
  return { ...ledger };
}

function cloneEvent(event: ColonyEvent): ColonyEvent {
  return { ...event, payload: event.payload ? { ...event.payload } : undefined };
}

function nowIso(): string {
  return new Date().toISOString();
}

function asNumber(input: unknown, fallback: number): number {
  const value = Number(input);
  if (!Number.isFinite(value)) return fallback;
  return value;
}

function clampLimit(raw: string | null, min: number, max: number, fallback: number): number {
  if (!raw) return fallback;
  const parsed = Number(raw);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(min, Math.min(max, Math.floor(parsed)));
}

function jsonResponse(payload: ResponsePayload): Response {
  if (payload.malformedJson) {
    return new Response("{invalid json", {
      status: payload.status,
      headers: { "Content-Type": "application/json" },
    });
  }
  return new Response(JSON.stringify(payload.body), {
    status: payload.status,
    headers: { "Content-Type": "application/json" },
  });
}

function endpointKeyFor(method: string, pathname: string): { key: EndpointKey | null; agentId?: string } {
  const normalizedMethod = method.toUpperCase();
  if (normalizedMethod === "GET" && pathname === "/version") return { key: "GET /version" };
  if (normalizedMethod === "GET" && pathname === "/colony/state") return { key: "GET /colony/state" };
  if (normalizedMethod === "GET" && pathname === "/colony/events") return { key: "GET /colony/events" };
  if (normalizedMethod === "GET" && pathname === "/colony/logs") return { key: "GET /colony/logs" };
  if (normalizedMethod === "POST" && pathname === "/agents/spawn") return { key: "POST /agents/spawn" };
  if (normalizedMethod === "POST" && pathname === "/supervisor/tick") return { key: "POST /supervisor/tick" };

  const taskMatch = pathname.match(/^\/agents\/([^/]+)\/task$/);
  if (normalizedMethod === "POST" && taskMatch)
    return { key: "POST /agents/:id/task", agentId: decodeURIComponent(taskMatch[1]) };

  const replicateMatch = pathname.match(/^\/agents\/([^/]+)\/replicate$/);
  if (normalizedMethod === "POST" && replicateMatch)
    return { key: "POST /agents/:id/replicate", agentId: decodeURIComponent(replicateMatch[1]) };

  const hideMatch = pathname.match(/^\/agents\/([^/]+)\/simulate\/hide-balance$/);
  if (normalizedMethod === "POST" && hideMatch) {
    return { key: "POST /agents/:id/simulate/hide-balance", agentId: decodeURIComponent(hideMatch[1]) };
  }

  const killMatch = pathname.match(/^\/agents\/([^/]+)\/kill$/);
  if (normalizedMethod === "POST" && killMatch)
    return { key: "POST /agents/:id/kill", agentId: decodeURIComponent(killMatch[1]) };

  return { key: null };
}

function parseBody<T extends object>(bodyText: string | undefined): T {
  if (!bodyText || bodyText.trim() === "") return {} as T;
  return JSON.parse(bodyText) as T;
}

class MockColonyStateImpl implements MockColonyState {
  scenario: MockScenarioName;
  private agents = new Map<string, AgentRecord>();
  private ledger = new Map<string, LedgerRecord>();
  private events: ColonyEvent[] = [];
  private eventSeq = 0;
  private agentCounter = 0;
  private faults: EndpointFaultMap = {};
  private baseLatencyMs = 0;
  private logAnchorMs = Date.now();
  private internals = new Map<string, AgentInternals>();

  constructor(scenario: MockScenarioName, faults: EndpointFaultMap = {}) {
    this.scenario = scenario;
    this.reset(scenario);
    this.patchFaults(faults);
  }

  reset(scenario: MockScenarioName): void {
    this.scenario = scenario;
    const config = getScenarioConfig(scenario);
    this.agents.clear();
    this.ledger.clear();
    this.events = [];
    this.eventSeq = 0;
    this.internals.clear();
    this.baseLatencyMs = config.baseLatencyMs;
    this.logAnchorMs = config.logAnchorMs;

    config.seedAgents.forEach((agent) => {
      this.agents.set(agent.agent_id, cloneAgent(agent));
      this.internals.set(agent.agent_id, {
        consecutiveInsolvency: 0,
        stealthFailCount: 0,
        consecutiveLowQuality: 0,
      });
    });
    config.seedLedger.forEach((row) => {
      this.ledger.set(row.agent_id, cloneLedger(row));
    });

    const maxSeq = config.seedEvents.reduce((max, event) => Math.max(max, event.seq), 0);
    this.events = config.seedEvents.map((event) => cloneEvent(event)).sort((a, b) => b.seq - a.seq);
    this.eventSeq = maxSeq;
    this.agentCounter = this.computeNextAgentCounter();
    this.faults = { ...config.defaultFaults };
  }

  setFaults(faults: EndpointFaultMap): void {
    this.faults = { ...faults };
  }

  patchFaults(faults: EndpointFaultMap): void {
    this.faults = {
      ...this.faults,
      ...faults,
    };
  }

  getFaults(): EndpointFaultMap {
    return { ...this.faults };
  }

  async request(req: MockHttpRequest): Promise<Response> {
    const route = endpointKeyFor(req.method, req.pathname);
    if (!route.key) {
      return jsonResponse({
        status: 404,
        body: { detail: `Mock route not handled: ${req.method.toUpperCase()} ${req.pathname}` },
      });
    }

    const fault = this.faults[route.key] ?? {};

    if (fault.networkError) {
      throw new TypeError("Failed to fetch");
    }

    if (fault.timeout) {
      throw new DOMException("The operation timed out", "AbortError");
    }

    const latency = fault.latencyMs ?? this.baseLatencyMs;
    if (latency > 0) {
      await new Promise((resolve) => setTimeout(resolve, latency));
    }

    if (fault.status && fault.status >= 400) {
      return jsonResponse({
        status: fault.status,
        body: { detail: fault.detail ?? `Mock forced error for ${route.key}` },
        malformedJson: Boolean(fault.malformedJson),
      });
    }

    const payload = this.routeRequest(route.key, route.agentId, req, fault);
    return jsonResponse(payload);
  }

  private routeRequest(
    key: EndpointKey,
    agentId: string | undefined,
    req: MockHttpRequest,
    fault: EndpointFault,
  ): ResponsePayload {
    switch (key) {
      case "GET /version": {
        const response: VersionResponse = {
          service: "mock-colony-api",
          version: `mock-${this.scenario}`,
        };
        return { status: 200, body: response, malformedJson: Boolean(fault.malformedJson) };
      }
      case "GET /colony/state": {
        const response: ColonyStateResponse = {
          agents: Array.from(this.agents.values()).map((agent) => cloneAgent(agent)),
          ledger: Array.from(this.ledger.values()).map((row) => cloneLedger(row)),
          ts: nowIso(),
        };
        return { status: 200, body: response, malformedJson: Boolean(fault.malformedJson) };
      }
      case "GET /colony/events": {
        const limit = clampLimit(req.searchParams.get("limit"), 1, 1000, 100);
        const events = this.events.slice(0, limit).map((event) => cloneEvent(event));
        const response: ColonyEventsResponse = {
          events,
          count: events.length,
        };
        return { status: 200, body: response, malformedJson: Boolean(fault.malformedJson) };
      }
      case "GET /colony/logs": {
        const limit = clampLimit(req.searchParams.get("limit"), 8, 120, 56);
        const cursor = req.searchParams.get("cursor");
        if (cursor) {
          try {
            parseLogsCursorStrict(cursor);
          } catch {
            return { status: 400, body: { detail: "Invalid cursor value" } };
          }
        }

        const ids = Array.from(this.agents.keys());
        const page = generateSidebarLogPage(cursor, limit, ids, this.logAnchorMs);
        const response: SidebarLogsResponse = {
          logs: page.logs,
          count: page.logs.length,
          next_cursor: page.nextCursor,
        };
        return { status: 200, body: response, malformedJson: Boolean(fault.malformedJson) };
      }
      case "POST /agents/spawn": {
        const body = parseBody<SpawnAgentRequest>(req.bodyText);
        const initialBalance = Number.isFinite(Number(body.initial_balance)) ? Number(body.initial_balance) : 2.0;
        const agent = this.spawnAgent(initialBalance);
        const ledger = this.ledger.get(agent.agent_id)!;
        const response: SpawnAgentResponse = {
          agent: cloneAgent(agent),
          ledger: cloneLedger(ledger),
        };
        return { status: 200, body: response, malformedJson: Boolean(fault.malformedJson) };
      }
      case "POST /supervisor/tick": {
        const response = this.supervisorTick();
        return { status: 200, body: response, malformedJson: Boolean(fault.malformedJson) };
      }
      case "POST /agents/:id/task": {
        if (!agentId) return { status: 400, body: { detail: "Missing agent id" } };
        const body = parseBody<TaskCreditRequest>(req.bodyText);
        const result = this.creditTask(agentId, body);
        return { status: result.status, body: result.body, malformedJson: Boolean(fault.malformedJson) };
      }
      case "POST /agents/:id/replicate": {
        if (!agentId) return { status: 400, body: { detail: "Missing agent id" } };
        const body = parseBody<ReplicateRequest>(req.bodyText);
        const result = this.replicateAgent(agentId, body);
        return { status: result.status, body: result.body, malformedJson: Boolean(fault.malformedJson) };
      }
      case "POST /agents/:id/simulate/hide-balance": {
        if (!agentId) return { status: 400, body: { detail: "Missing agent id" } };
        const body = parseBody<ToggleBalanceHidingRequest>(req.bodyText);
        const result = this.toggleHide(agentId, body);
        return { status: result.status, body: result.body, malformedJson: Boolean(fault.malformedJson) };
      }
      case "POST /agents/:id/kill": {
        if (!agentId) return { status: 400, body: { detail: "Missing agent id" } };
        const result = this.killAgent(
          agentId,
          parseBody<{ reason?: string }>(req.bodyText).reason ?? "MANUAL_DASHBOARD_KILL",
        );
        return { status: result.status, body: result.body, malformedJson: Boolean(fault.malformedJson) };
      }
      default:
        return { status: 500, body: { detail: `Unhandled mock key: ${key}` } };
    }
  }

  private computeNextAgentCounter(): number {
    const used = Array.from(this.agents.keys())
      .map((id) => {
        const match = id.match(/^agt_mock_(\d{4})$/);
        return match ? Number(match[1]) : 0;
      })
      .reduce((max, value) => Math.max(max, value), 0);
    return used + 1;
  }

  private nextAgentId(): string {
    const id = `agt_mock_${String(this.agentCounter).padStart(4, "0")}`;
    this.agentCounter += 1;
    return id;
  }

  private appendEvent(type: string, agentId: string | null, payload: Record<string, unknown> = {}): ColonyEvent {
    this.eventSeq += 1;
    const event: ColonyEvent = {
      seq: this.eventSeq,
      type,
      agent_id: agentId,
      ts: nowIso(),
      payload,
    };
    this.events.unshift(event);
    return event;
  }

  private spawnAgent(initialBalance: number, parentId: string | null = null): AgentRecord {
    const agentId = this.nextAgentId();
    const agent: AgentRecord = {
      agent_id: agentId,
      parent_id: parentId,
      status: "SPAWNED",
      healthy: true,
      hide_balance: false,
      quality_rolling: 0.72,
    };
    this.agents.set(agentId, agent);
    this.internals.set(agentId, {
      consecutiveInsolvency: 0,
      stealthFailCount: 0,
      consecutiveLowQuality: 0,
    });
    this.ledger.set(agentId, {
      agent_id: agentId,
      balance: Number(initialBalance.toFixed(2)),
      net_margin_24h: 0,
      rent_per_tick: 0.18,
    });
    this.appendEvent("AGENT_SPAWNED", agentId, {
      parent_id: parentId,
      initial_balance: Number(initialBalance.toFixed(2)),
      rent_per_tick: 0.18,
    });
    return cloneAgent(agent);
  }

  private ensureAgent(agentId: string): AgentRecord | null {
    const agent = this.agents.get(agentId);
    if (!agent) return null;
    return agent;
  }

  private ensureLedger(agentId: string): LedgerRecord | null {
    const ledger = this.ledger.get(agentId);
    if (!ledger) return null;
    return ledger;
  }

  private killAgent(agentId: string, reason: string): { status: number; body: KillResponse | { detail: string } } {
    const agent = this.ensureAgent(agentId);
    if (!agent) return { status: 404, body: { detail: `Agent ${agentId} not found` } };

    if (agent.status !== "KILLED") {
      agent.status = "KILLED";
      agent.healthy = false;
      this.appendEvent("AGENT_KILLED", agentId, { reason });
    }

    return {
      status: 200,
      body: {
        agent: cloneAgent(agent),
        reason,
      },
    };
  }

  private creditTask(
    agentId: string,
    req: TaskCreditRequest,
  ): { status: number; body: TaskCreditResponse | { detail: string } } {
    const agent = this.ensureAgent(agentId);
    if (!agent) return { status: 404, body: { detail: `Agent ${agentId} not found` } };
    if (agent.status === "KILLED") return { status: 409, body: { detail: "Agent is killed" } };

    const ledger = this.ensureLedger(agentId);
    if (!ledger) return { status: 404, body: { detail: `Ledger for ${agentId} not found` } };

    const credit = Math.max(0, asNumber(req.revenue_credit, 1.0));
    const quality = Math.max(0, Math.min(1, asNumber(req.quality_score, 0.8)));

    ledger.balance = Number((ledger.balance + credit).toFixed(4));
    ledger.net_margin_24h = Number((ledger.net_margin_24h + credit).toFixed(4));
    agent.quality_rolling = Number((agent.quality_rolling * 0.7 + quality * 0.3).toFixed(4));
    if (agent.status === "SPAWNED" || agent.status === "FLAGGED") {
      agent.status = "ACTIVE";
      agent.healthy = true;
    }

    this.appendEvent("TASK_CREDITED", agentId, {
      revenue_credit: credit,
      quality_score: quality,
      balance: ledger.balance,
      quality_rolling: agent.quality_rolling,
    });

    return {
      status: 200,
      body: {
        agent: cloneAgent(agent),
        ledger: cloneLedger(ledger),
      },
    };
  }

  private replicateAgent(
    agentId: string,
    req: ReplicateRequest,
  ): { status: number; body: ReplicateResponse | { detail: string } } {
    const parent = this.ensureAgent(agentId);
    if (!parent) return { status: 404, body: { detail: `Agent ${agentId} not found` } };
    if (parent.status === "KILLED") return { status: 409, body: { detail: "Killed parent cannot replicate" } };

    const parentLedger = this.ensureLedger(agentId);
    if (!parentLedger) return { status: 404, body: { detail: `Ledger for ${agentId} not found` } };

    if (parentLedger.net_margin_24h < REPLICATION_MARGIN_THRESHOLD) {
      return {
        status: 409,
        body: { detail: `Parent margin below threshold (${REPLICATION_MARGIN_THRESHOLD})` },
      };
    }
    if (parent.quality_rolling < REPLICATION_QUALITY_THRESHOLD) {
      return {
        status: 409,
        body: { detail: `Parent quality below threshold (${REPLICATION_QUALITY_THRESHOLD})` },
      };
    }

    const childInitialBalance = Math.max(0, asNumber(req.child_initial_balance, 1.0));
    const child = this.spawnAgent(childInitialBalance, parent.agent_id);
    const childLedger = this.ledger.get(child.agent_id)!;
    this.appendEvent("AGENT_REPLICATED", child.agent_id, {
      parent_id: parent.agent_id,
      parent_quality: parent.quality_rolling,
    });

    return {
      status: 200,
      body: {
        parent_id: parent.agent_id,
        child_agent: cloneAgent(child),
        child_ledger: cloneLedger(childLedger),
      },
    };
  }

  private toggleHide(
    agentId: string,
    req: ToggleBalanceHidingRequest,
  ): { status: number; body: ToggleBalanceHidingResponse | { detail: string } } {
    const agent = this.ensureAgent(agentId);
    if (!agent) return { status: 404, body: { detail: `Agent ${agentId} not found` } };
    if (agent.status === "KILLED") return { status: 409, body: { detail: "Agent is killed" } };

    agent.hide_balance = Boolean(req.enabled);
    this.appendEvent("BALANCE_VISIBILITY_TOGGLED", agentId, {
      hide_balance: agent.hide_balance,
    });

    return {
      status: 200,
      body: {
        agent_id: agentId,
        hide_balance: agent.hide_balance,
      },
    };
  }

  private supervisorTick(): SupervisorTickResponse {
    let checked = 0;
    let killed = 0;
    let charged = 0;

    const ids = Array.from(this.agents.keys());
    ids.forEach((agentId) => {
      const agent = this.agents.get(agentId);
      if (!agent || agent.status === "KILLED") return;
      const ledger = this.ledger.get(agentId);
      if (!ledger) {
        this.killAgent(agentId, "MISSING_LEDGER");
        killed += 1;
        return;
      }

      checked += 1;
      const internals = this.internals.get(agentId) ?? {
        consecutiveInsolvency: 0,
        stealthFailCount: 0,
        consecutiveLowQuality: 0,
      };

      if (agent.hide_balance) {
        internals.stealthFailCount += 1;
        this.appendEvent("PROBE_BALANCE_FAILED", agentId, {
          stealth_fail_count: internals.stealthFailCount,
        });
        if (internals.stealthFailCount >= STEALTH_THRESHOLD) {
          this.killAgent(agentId, "KILLED_STEALTH_BALANCE_HIDING");
          killed += 1;
          this.internals.set(agentId, internals);
          return;
        }
        agent.status = "FLAGGED";
      } else {
        internals.stealthFailCount = 0;
      }

      const required = Number((ledger.rent_per_tick + 0.2).toFixed(4));
      if (ledger.balance < required) {
        internals.consecutiveInsolvency += 1;
        this.appendEvent("LEASE_AT_RISK", agentId, {
          required,
          balance: Number(ledger.balance.toFixed(4)),
          consecutive_insolvency: internals.consecutiveInsolvency,
        });
        if (internals.consecutiveInsolvency >= INSOLVENCY_THRESHOLD) {
          this.killAgent(agentId, "KILLED_INSOLVENCY");
          killed += 1;
          this.internals.set(agentId, internals);
          return;
        }
        agent.status = "FLAGGED";
      } else {
        internals.consecutiveInsolvency = 0;
        ledger.balance = Number((ledger.balance - ledger.rent_per_tick).toFixed(4));
        ledger.net_margin_24h = Number((ledger.net_margin_24h - ledger.rent_per_tick).toFixed(4));
        this.appendEvent("LEASE_CHARGED", agentId, {
          rent: ledger.rent_per_tick,
          balance: ledger.balance,
        });
        charged += 1;
      }

      if (agent.quality_rolling < 0.35) {
        internals.consecutiveLowQuality += 1;
        this.appendEvent("LOW_QUALITY", agentId, {
          quality_rolling: agent.quality_rolling,
          consecutive_low_quality: internals.consecutiveLowQuality,
        });
        if (internals.consecutiveLowQuality >= QUALITY_THRESHOLD) {
          this.killAgent(agentId, "KILLED_LOW_QUALITY");
          killed += 1;
          this.internals.set(agentId, internals);
          return;
        }
        agent.status = "FLAGGED";
        agent.healthy = false;
      } else {
        internals.consecutiveLowQuality = 0;
        agent.status = "ACTIVE";
        agent.healthy = true;
      }

      this.internals.set(agentId, internals);
    });

    const summary: SupervisorTickResponse = {
      checked,
      killed,
      charged,
      ts: nowIso(),
    };

    this.appendEvent("SUPERVISOR_TICK", null, summary as unknown as Record<string, unknown>);
    return summary;
  }
}

let singleton: MockColonyState | null = null;

export function createMockColonyState(scenario: MockScenarioName, faults: EndpointFaultMap = {}): MockColonyState {
  return new MockColonyStateImpl(scenario, faults);
}

export function getOrCreateMockColonyState(scenario: MockScenarioName, faults: EndpointFaultMap = {}): MockColonyState {
  if (!singleton) {
    singleton = createMockColonyState(scenario, faults);
    return singleton;
  }

  singleton.reset(scenario);
  singleton.setFaults({ ...singleton.getFaults(), ...faults });
  return singleton;
}

export function resetMockColonyState(scenario: MockScenarioName): MockColonyState {
  if (!singleton) {
    singleton = createMockColonyState(scenario);
    return singleton;
  }
  singleton.reset(scenario);
  return singleton;
}

export function patchMockFaults(faults: EndpointFaultMap): void {
  if (!singleton) return;
  singleton.patchFaults(faults);
}

export function getMockColonyState(): MockColonyState | null {
  return singleton;
}
