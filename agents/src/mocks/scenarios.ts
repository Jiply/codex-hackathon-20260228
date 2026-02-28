import type { AgentRecord, ColonyEvent, EndpointFaultMap, LedgerRecord } from "@/mocks/contracts";
import { SNAPSHOT_AGENTS, SNAPSHOT_EVENTS, SNAPSHOT_LEDGER, SNAPSHOT_LOG_ANCHOR_MS } from "@/mocks/fixtures";

export type MockScenarioName = "seeded" | "empty" | "high-risk" | "backend-down" | "slow-network";

export interface MockScenarioConfig {
  name: MockScenarioName;
  seedAgents: AgentRecord[];
  seedLedger: LedgerRecord[];
  seedEvents: ColonyEvent[];
  logAnchorMs: number;
  baseLatencyMs: number;
  defaultFaults: EndpointFaultMap;
}

function cloneAgents(agents: AgentRecord[]): AgentRecord[] {
  return agents.map((item) => ({ ...item }));
}

function cloneLedger(ledger: LedgerRecord[]): LedgerRecord[] {
  return ledger.map((item) => ({ ...item }));
}

function cloneEvents(events: ColonyEvent[]): ColonyEvent[] {
  return events.map((item) => ({ ...item, payload: item.payload ? { ...item.payload } : undefined }));
}

function makeHighRisk(): { agents: AgentRecord[]; ledger: LedgerRecord[]; events: ColonyEvent[] } {
  const agents: AgentRecord[] = cloneAgents(SNAPSHOT_AGENTS).map((agent, index): AgentRecord => {
    if (index % 5 === 0) return { ...agent, status: "FLAGGED", healthy: false, quality_rolling: Math.max(0.2, agent.quality_rolling - 0.35) };
    if (index % 7 === 0) return { ...agent, status: "KILLED", healthy: false, quality_rolling: Math.max(0.1, agent.quality_rolling - 0.45) };
    return agent;
  });

  const ledger = cloneLedger(SNAPSHOT_LEDGER).map((row, index) => {
    if (index % 4 === 0) {
      return {
        ...row,
        net_margin_24h: Number((row.net_margin_24h - 0.9).toFixed(2)),
        balance: Number((row.balance - 0.7).toFixed(2)),
      };
    }
    return row;
  });

  const events = cloneEvents(SNAPSHOT_EVENTS).map((event, index) => {
    if (index < 6) {
      return {
        ...event,
        type: index % 2 === 0 ? "LEASE_AT_RISK" : "LOW_QUALITY",
      };
    }
    return event;
  });

  return { agents, ledger, events };
}

const highRisk = makeHighRisk();

const SCENARIOS: Record<MockScenarioName, MockScenarioConfig> = {
  seeded: {
    name: "seeded",
    seedAgents: cloneAgents(SNAPSHOT_AGENTS),
    seedLedger: cloneLedger(SNAPSHOT_LEDGER),
    seedEvents: cloneEvents(SNAPSHOT_EVENTS),
    logAnchorMs: SNAPSHOT_LOG_ANCHOR_MS,
    baseLatencyMs: 35,
    defaultFaults: {},
  },
  empty: {
    name: "empty",
    seedAgents: [],
    seedLedger: [],
    seedEvents: [],
    logAnchorMs: SNAPSHOT_LOG_ANCHOR_MS,
    baseLatencyMs: 30,
    defaultFaults: {},
  },
  "high-risk": {
    name: "high-risk",
    seedAgents: highRisk.agents,
    seedLedger: highRisk.ledger,
    seedEvents: highRisk.events,
    logAnchorMs: SNAPSHOT_LOG_ANCHOR_MS,
    baseLatencyMs: 45,
    defaultFaults: {},
  },
  "backend-down": {
    name: "backend-down",
    seedAgents: cloneAgents(SNAPSHOT_AGENTS),
    seedLedger: cloneLedger(SNAPSHOT_LEDGER),
    seedEvents: cloneEvents(SNAPSHOT_EVENTS),
    logAnchorMs: SNAPSHOT_LOG_ANCHOR_MS,
    baseLatencyMs: 25,
    defaultFaults: {
      "GET /version": { networkError: true },
      "GET /colony/state": { networkError: true },
      "GET /colony/events": { networkError: true },
      "GET /colony/logs": { networkError: true },
      "POST /agents/spawn": { networkError: true },
      "POST /supervisor/tick": { networkError: true },
      "POST /agents/:id/task": { networkError: true },
      "POST /agents/:id/replicate": { networkError: true },
      "POST /agents/:id/simulate/hide-balance": { networkError: true },
      "POST /agents/:id/kill": { networkError: true },
    },
  },
  "slow-network": {
    name: "slow-network",
    seedAgents: cloneAgents(SNAPSHOT_AGENTS),
    seedLedger: cloneLedger(SNAPSHOT_LEDGER),
    seedEvents: cloneEvents(SNAPSHOT_EVENTS),
    logAnchorMs: SNAPSHOT_LOG_ANCHOR_MS,
    baseLatencyMs: 900,
    defaultFaults: {},
  },
};

export function parseScenario(input: string | undefined | null): MockScenarioName {
  if (!input) return "seeded";
  const normalized = input.trim().toLowerCase() as MockScenarioName;
  if (normalized in SCENARIOS) return normalized;
  return "seeded";
}

export function getScenarioConfig(name: MockScenarioName): MockScenarioConfig {
  const scenario = SCENARIOS[name];
  return {
    ...scenario,
    seedAgents: cloneAgents(scenario.seedAgents),
    seedLedger: cloneLedger(scenario.seedLedger),
    seedEvents: cloneEvents(scenario.seedEvents),
    defaultFaults: { ...scenario.defaultFaults },
  };
}

export function parseFaultMap(raw: string | undefined): EndpointFaultMap {
  if (!raw || raw.trim().length === 0) return {};
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return {};
    return parsed as EndpointFaultMap;
  } catch {
    return {};
  }
}
