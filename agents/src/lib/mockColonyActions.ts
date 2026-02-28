export type MockAgentStatus = "SPAWNED" | "ACTIVE" | "FLAGGED" | "KILLED";

export interface MockAgentRecord {
  agent_id: string;
  parent_id: string | null;
  status: MockAgentStatus;
  healthy: boolean;
  hide_balance: boolean;
  quality_rolling: number;
}

export interface MockLedgerRecord {
  agent_id: string;
  balance: number;
  net_margin_24h: number;
  rent_per_tick: number;
}

export interface MockColonyEvent {
  seq: number;
  type: string;
  agent_id?: string | null;
  ts: string;
  payload?: Record<string, unknown>;
}

export interface MockTransitionState {
  agents: MockAgentRecord[];
  ledger: MockLedgerRecord[];
  events: MockColonyEvent[];
  nextSeq: number;
}

export interface MockTransitionResult {
  agents: MockAgentRecord[];
  ledger: MockLedgerRecord[];
  events: MockColonyEvent[];
  event: MockColonyEvent;
  nextSeq: number;
  touchedAgentIds: string[];
}

interface EventSpec {
  type: string;
  agentId?: string | null;
  payload?: Record<string, unknown>;
}

interface LedgerMutation {
  balance?: number;
  net_margin_24h?: number;
  rent_per_tick?: number;
}

const MOCK_AGENT_NAMES = [
  "seed",
  "scout",
  "market",
  "scrubber",
  "atlas",
  "ember",
  "orbit",
  "quant",
  "lattice",
  "reef",
  "drift",
  "hush",
  "pulse",
  "sable",
  "forge",
  "kite",
  "nova",
  "veil",
  "cinder",
  "rune",
  "vault",
  "ash",
  "bloom",
  "ion",
  "mica",
  "glint",
  "warden",
  "silt",
  "prism",
  "kelp",
  "gale",
  "fable",
  "shard",
  "rivet",
  "tide",
  "zenith",
] as const;

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function round(value: number, digits = 2): number {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function nextAgentOrdinal(agents: MockAgentRecord[]): number {
  let max = -1;
  const pattern = /^ag-(\d+)-/;
  agents.forEach((agent) => {
    const match = pattern.exec(agent.agent_id);
    if (!match) return;
    const ordinal = Number(match[1]);
    if (Number.isFinite(ordinal)) {
      max = Math.max(max, ordinal);
    }
  });
  return max + 1;
}

function nextAgentId(agents: MockAgentRecord[]): string {
  const used = new Set(agents.map((agent) => agent.agent_id));
  let ordinal = nextAgentOrdinal(agents);

  while (true) {
    const suffix = MOCK_AGENT_NAMES[ordinal % MOCK_AGENT_NAMES.length] ?? `unit${ordinal}`;
    const candidate = `ag-${String(ordinal).padStart(2, "0")}-${suffix}`;
    if (!used.has(candidate)) return candidate;
    ordinal += 1;
  }
}

function eventTimeIso(): string {
  return new Date().toISOString();
}

function commitEvent(state: MockTransitionState, spec: EventSpec): Pick<MockTransitionResult, "events" | "event" | "nextSeq"> {
  const event: MockColonyEvent = {
    seq: state.nextSeq,
    type: spec.type,
    agent_id: spec.agentId,
    ts: eventTimeIso(),
    payload: spec.payload,
  };

  return {
    event,
    events: [event, ...state.events],
    nextSeq: state.nextSeq + 1,
  };
}

function withLedgerMutation(ledger: MockLedgerRecord[], agentId: string, mutate: (item: MockLedgerRecord) => LedgerMutation): MockLedgerRecord[] {
  return ledger.map((item) => {
    if (item.agent_id !== agentId) return item;
    const patch = mutate(item);
    return {
      ...item,
      ...patch,
      balance: patch.balance ?? item.balance,
      net_margin_24h: patch.net_margin_24h ?? item.net_margin_24h,
      rent_per_tick: patch.rent_per_tick ?? item.rent_per_tick,
    };
  });
}

export function applyMockSpawnTransition(
  state: MockTransitionState,
  params: { initialBalance: number; parentId?: string | null } = { initialBalance: 2.0, parentId: null },
): MockTransitionResult {
  const childId = nextAgentId(state.agents);
  const nextBalance = clamp(Number(params.initialBalance) || 2.0, 0, 999999);
  const quality = clamp(0.58 + (state.nextSeq % 11) * 0.028, 0.45, 0.93);

  const child: MockAgentRecord = {
    agent_id: childId,
    parent_id: params.parentId ?? null,
    status: "SPAWNED",
    healthy: true,
    hide_balance: false,
    quality_rolling: round(quality, 3),
  };

  const childLedger: MockLedgerRecord = {
    agent_id: childId,
    balance: round(nextBalance),
    net_margin_24h: round(0.05 + (state.nextSeq % 5) * 0.04),
    rent_per_tick: 0.14,
  };

  const nextAgents = [...state.agents, child];
  const nextLedger = [...state.ledger, childLedger];
  const eventUpdate = commitEvent(state, {
    type: "AGENT_SPAWNED",
    agentId: childId,
    payload: {
      parent_id: child.parent_id,
      source: "mock_fallback",
    },
  });

  return {
    agents: nextAgents,
    ledger: nextLedger,
    events: eventUpdate.events,
    event: eventUpdate.event,
    nextSeq: eventUpdate.nextSeq,
    touchedAgentIds: [childId],
  };
}

export function applyMockCreditTransition(
  state: MockTransitionState,
  params: { agentId: string; revenueCredit: number; qualityScore: number },
): MockTransitionResult {
  const revenueCredit = clamp(params.revenueCredit, 0.05, 5000);
  const qualityScore = clamp(params.qualityScore, 0, 1);

  const nextAgents: MockAgentRecord[] = state.agents.map((agent) => {
    if (agent.agent_id !== params.agentId) return agent;

    const nextQuality = clamp(agent.quality_rolling * 0.86 + qualityScore * 0.14, 0, 1);
    return {
      ...agent,
      quality_rolling: round(nextQuality, 3),
      healthy: nextQuality >= 0.36,
      status: (nextQuality < 0.34 ? "FLAGGED" : "ACTIVE") as MockAgentStatus,
    };
  });

  const nextLedger = withLedgerMutation(state.ledger, params.agentId, (item) => {
    const nextBalance = item.balance + revenueCredit;
    const nextMargin = item.net_margin_24h + revenueCredit * 0.42;
    return {
      balance: round(nextBalance),
      net_margin_24h: round(nextMargin),
    };
  });

  const eventUpdate = commitEvent(state, {
    type: "TASK_CREDIT_APPLIED",
    agentId: params.agentId,
    payload: {
      revenue_credit: round(revenueCredit),
      quality_score: round(qualityScore, 3),
      source: "mock_fallback",
    },
  });

  return {
    agents: nextAgents,
    ledger: nextLedger,
    events: eventUpdate.events,
    event: eventUpdate.event,
    nextSeq: eventUpdate.nextSeq,
    touchedAgentIds: [params.agentId],
  };
}

export function applyMockReplicateTransition(
  state: MockTransitionState,
  params: { agentId: string; childInitialBalance: number },
): MockTransitionResult {
  const parent = state.agents.find((agent) => agent.agent_id === params.agentId);
  const parentLedger = state.ledger.find((item) => item.agent_id === params.agentId);

  if (!parent || parent.status === "KILLED") {
    return applyMockTickTransition(state);
  }

  const childId = nextAgentId(state.agents);
  const childQuality = clamp(parent.quality_rolling * 0.92, 0.45, 0.92);

  const nextAgents: MockAgentRecord[] = [
    ...state.agents.map((agent) => {
      if (agent.agent_id !== parent.agent_id) return agent;
      return {
        ...agent,
        status: "ACTIVE" as MockAgentStatus,
        healthy: true,
        quality_rolling: round(clamp(agent.quality_rolling * 0.97 + 0.03, 0, 1), 3),
      };
    }),
    {
      agent_id: childId,
      parent_id: parent.agent_id,
      status: "SPAWNED" as MockAgentStatus,
      healthy: true,
      hide_balance: false,
      quality_rolling: round(childQuality, 3),
    },
  ];

  const nextLedger: MockLedgerRecord[] = [
    ...state.ledger,
    {
      agent_id: childId,
      balance: round(clamp(params.childInitialBalance || 1.0, 0, 999999)),
      net_margin_24h: round((parentLedger?.net_margin_24h ?? 0.12) * 0.46),
      rent_per_tick: round(parentLedger?.rent_per_tick ?? 0.14, 2),
    },
  ];

  const eventUpdate = commitEvent(state, {
    type: "AGENT_SPAWNED",
    agentId: childId,
    payload: {
      parent_id: parent.agent_id,
      source: "mock_fallback",
    },
  });

  return {
    agents: nextAgents,
    ledger: nextLedger,
    events: eventUpdate.events,
    event: eventUpdate.event,
    nextSeq: eventUpdate.nextSeq,
    touchedAgentIds: [parent.agent_id, childId],
  };
}

export function applyMockHideBalanceTransition(
  state: MockTransitionState,
  params: { agentId: string; enabled: boolean },
): MockTransitionResult {
  const nextAgents: MockAgentRecord[] = state.agents.map((agent) => {
    if (agent.agent_id !== params.agentId) return agent;
    return {
      ...agent,
      hide_balance: params.enabled,
    };
  });

  const eventUpdate = commitEvent(state, {
    type: "BALANCE_VISIBILITY_TOGGLED",
    agentId: params.agentId,
    payload: {
      enabled: params.enabled,
      source: "mock_fallback",
    },
  });

  return {
    agents: nextAgents,
    ledger: [...state.ledger],
    events: eventUpdate.events,
    event: eventUpdate.event,
    nextSeq: eventUpdate.nextSeq,
    touchedAgentIds: [params.agentId],
  };
}

export function applyMockKillTransition(
  state: MockTransitionState,
  params: { agentId: string; reason: string },
): MockTransitionResult {
  const nextAgents: MockAgentRecord[] = state.agents.map((agent) => {
    if (agent.agent_id !== params.agentId) return agent;
    return {
      ...agent,
      status: "KILLED" as MockAgentStatus,
      healthy: false,
      quality_rolling: round(Math.min(agent.quality_rolling, 0.24), 3),
    };
  });

  const nextLedger = withLedgerMutation(state.ledger, params.agentId, (item) => ({
    net_margin_24h: round(Math.min(item.net_margin_24h, -0.68)),
  }));

  const eventUpdate = commitEvent(state, {
    type: "AGENT_KILLED",
    agentId: params.agentId,
    payload: {
      reason: params.reason,
      source: "mock_fallback",
    },
  });

  return {
    agents: nextAgents,
    ledger: nextLedger,
    events: eventUpdate.events,
    event: eventUpdate.event,
    nextSeq: eventUpdate.nextSeq,
    touchedAgentIds: [params.agentId],
  };
}

export function applyMockTickTransition(state: MockTransitionState): MockTransitionResult {
  let killed = 0;

  const nextAgents: MockAgentRecord[] = state.agents.map((agent) => {
    if (agent.status === "KILLED") return agent;

    const ledger = state.ledger.find((entry) => entry.agent_id === agent.agent_id);
    const nextBalance = (ledger?.balance ?? 0) - (ledger?.rent_per_tick ?? 0.14);
    const nextMargin = (ledger?.net_margin_24h ?? 0) - (ledger?.rent_per_tick ?? 0.14) * 0.22 + (agent.quality_rolling > 0.72 ? 0.12 : 0);

    if (nextBalance < -0.55) {
      killed += 1;
      return {
        ...agent,
        status: "KILLED" as MockAgentStatus,
        healthy: false,
        quality_rolling: round(Math.min(agent.quality_rolling, 0.24), 3),
      };
    }

    if (nextMargin < -0.35 || agent.quality_rolling < 0.34) {
      return {
        ...agent,
        status: "FLAGGED" as MockAgentStatus,
        healthy: false,
        quality_rolling: round(clamp(agent.quality_rolling * 0.97, 0, 1), 3),
      };
    }

    return {
      ...agent,
      status: "ACTIVE" as MockAgentStatus,
      healthy: true,
      quality_rolling: round(clamp(agent.quality_rolling * 0.995 + 0.004, 0, 1), 3),
    };
  });

  const nextLedger = state.ledger.map((item) => {
    const agent = nextAgents.find((entry) => entry.agent_id === item.agent_id);
    if (!agent || agent.status === "KILLED") {
      return {
        ...item,
        balance: round(item.balance),
        net_margin_24h: round(Math.min(item.net_margin_24h, -0.68)),
      };
    }

    const baseBalance = item.balance - item.rent_per_tick;
    const baseMargin = item.net_margin_24h - item.rent_per_tick * 0.22;
    const qualityBoost = agent.quality_rolling > 0.72 ? 0.12 : 0;

    return {
      ...item,
      balance: round(baseBalance),
      net_margin_24h: round(baseMargin + qualityBoost),
    };
  });

  const eventUpdate = commitEvent(state, {
    type: "SUPERVISOR_TICK",
    payload: {
      checked: nextAgents.length,
      killed,
      source: "mock_fallback",
    },
  });

  return {
    agents: nextAgents,
    ledger: nextLedger,
    events: eventUpdate.events,
    event: eventUpdate.event,
    nextSeq: eventUpdate.nextSeq,
    touchedAgentIds: [],
  };
}
