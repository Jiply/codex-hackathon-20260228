import { useCallback, useEffect, useMemo, useRef, useState, type UIEvent } from "react";
import {
  Activity,
  CircleOff,
  Gauge,
  GitBranch,
  RefreshCcw,
  ShieldAlert,
  Sparkles,
  SquareTerminal,
  TrendingUp,
  Zap,
} from "lucide-react";
import { Background, Controls, MarkerType, ReactFlow, type Edge, type Node, type ReactFlowInstance } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import {
  applyMockCreditTransition,
  applyMockHideBalanceTransition,
  applyMockKillTransition,
  applyMockReplicateTransition,
  applyMockSpawnTransition,
  applyMockTickTransition,
  type MockTransitionResult,
} from "@/lib/mockColonyActions";
import { colonyApi } from "@/lib/apiClient";
import { cn } from "@/lib/utils";
import type {
  AgentRecord,
  AgentStatus,
  ColonyEvent,
  LedgerRecord,
  SidebarLogChannel,
  SidebarLogEntry,
  SidebarLogSeverity,
} from "@/mocks/contracts";
import {
  SIDEBAR_LOG_FALLBACK_AGENT_IDS,
  SNAPSHOT_AGENTS,
  SNAPSHOT_EVENTS,
  SNAPSHOT_LEDGER,
  SNAPSHOT_LOG_ANCHOR_MS,
} from "@/mocks/fixtures";
import { generateSidebarLogPage } from "@/mocks/logs";
import agentPlaceholderAvatar from "@/assets/pixel-agent-placeholder.svg";

type StatusTone = "neutral" | "ok" | "error";
type BranchStage = "SPAWNING" | "PROFITABLE" | "WATCHLIST";
type BackendHealthState = "online" | "checking" | "offline";
type BackendMode = "live" | "mock-fallback";
type NodeActivityKind = "spawn" | "tick" | "credit" | "replicate" | "hide" | "kill" | "event";

interface NodeActivityEntry {
  kind: NodeActivityKind;
  expiresAt: number;
}

interface BranchPreview {
  id: string;
  displayName: string;
  parentId: string;
  stage: BranchStage;
  progress: number;
  health: number;
  margin: number;
  status: AgentStatus;
}

interface BranchNodeData extends Record<string, unknown> {
  title: string;
  stage: BranchStage | "ROOT";
  health: number;
  margin: number;
  active?: boolean;
  activityKind?: NodeActivityKind;
}

type SidebarDialogKind = "margin" | "agents" | "agent";

interface SidebarDialogState {
  kind: SidebarDialogKind;
  agentId?: string;
}

const AUTO_REFRESH_MS = 2500;
const LEASE_COUNTDOWN_SECONDS = 25;
const BRANCH_NODE_WIDTH = 220;
const BRANCH_TREE_ROOT_X = 36;
const BRANCH_TREE_STEP_X = 360;
const BRANCH_TREE_TOP_Y = 74;
const BRANCH_TREE_STEP_Y = 124;
const BRANCH_GRAPH_FIT_VIEW_OPTIONS = { padding: 0.22, minZoom: 0.4, maxZoom: 0.4 } as const;
const NODE_ACTIVITY_TTL_MS = 1600;
const SIDEBAR_LOG_PAGE_SIZE = 56;
const SIDEBAR_LOG_SCROLL_THRESHOLD_PX = 20;
const STATUS_BADGE: Record<AgentStatus, BadgeProps["variant"]> = {
  SPAWNED: "info",
  ACTIVE: "success",
  FLAGGED: "warning",
  KILLED: "destructive",
};

const LOG_SEVERITY_BADGE: Record<SidebarLogSeverity, BadgeProps["variant"]> = {
  INFO: "info",
  SUCCESS: "success",
  WARN: "warning",
  ERROR: "destructive",
};

const LOG_CHANNEL_BADGE: Record<SidebarLogChannel, BadgeProps["variant"]> = {
  TOOL: "outline",
  AGENT: "secondary",
  MODAL: "info",
  SUPERVISOR: "outline",
  SYSTEM: "warning",
};

function classifyBranchStage(agent: AgentRecord, ledgerForAgent: LedgerRecord | undefined): BranchStage {
  const margin = ledgerForAgent?.net_margin_24h ?? 0;
  if (agent.status === "KILLED" || margin < -0.35 || agent.quality_rolling < 0.32) return "WATCHLIST";
  if (margin > 0.3 && agent.status !== "SPAWNED" && agent.quality_rolling >= 0.62) return "PROFITABLE";
  return "SPAWNING";
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);
}

function formatClock(ts: string): string {
  const date = new Date(ts);
  return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
}

function formatLogStamp(ts: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date(ts));
}

function normalize(value: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, value));
}

function buildAgentAvatarUrl(agentId: string): string {
  const params = new URLSearchParams({
    seed: agentId,
    backgroundType: "solid",
    backgroundColor: "e8dfd0,d9c9b4,c7b79f",
    scale: "84",
  });
  return `https://api.dicebear.com/9.x/pixel-art-neutral/svg?${params.toString()}`;
}

function eventHeadline(event: ColonyEvent): string {
  if (event.type === "AGENT_SPAWNED") return `Agent ${event.agent_id} replicated.`;
  if (event.type === "AGENT_KILLED") return `Agent ${event.agent_id} terminated.`;
  if (event.type === "AGENT_REPLICATED") return `Agent ${event.agent_id} replicated.`;
  if (event.type === "SUPERVISOR_TICK") return "Supervisor cycle completed.";
  if (event.type === "TASK_CREDITED") return `Task credit applied to ${event.agent_id}.`;
  if (event.type === "TASK_CREDIT_APPLIED") return `Task credit applied to ${event.agent_id}.`;
  if (event.type === "BALANCE_VISIBILITY_TOGGLED") return `Balance visibility updated for ${event.agent_id}.`;
  return `${event.type.toLowerCase().replace(/_/g, " ")} recorded.`;
}

function toneClass(tone: StatusTone): string {
  if (tone === "ok") return "text-primary/90";
  if (tone === "error") return "text-destructive/90";
  return "text-muted-foreground";
}

function logSeverityTextClass(severity: SidebarLogSeverity): string {
  if (severity === "SUCCESS") return "text-primary/90";
  if (severity === "WARN") return "text-accent-foreground/90";
  if (severity === "ERROR") return "text-destructive/90";
  return "text-muted-foreground";
}

function logActionLabel(action: string): string {
  if (action === "TOOL_CALL_FAILED") return "tool call rerouted";
  return action.toLowerCase().replace(/_/g, " ");
}

function logSeverityLabel(severity: SidebarLogSeverity): string {
  if (severity === "ERROR") return "alert";
  return severity.toLowerCase();
}

function scrubStatusLanguage(text: string): string {
  return text
    .replace(/\bfailed\b/gi, "did not complete")
    .replace(/\boffline\b/gi, "deferred")
    .replace(/\bunavailable\b/gi, "pending")
    .replace(/\bfallback\b/gi, "alternate");
}

function branchTone(stage: BranchStage | "ROOT"): string {
  if (stage === "PROFITABLE") return "bg-secondary/55";
  if (stage === "WATCHLIST") return "bg-accent/40";
  if (stage === "SPAWNING") return "bg-secondary/40";
  return "bg-background/80";
}

function branchBadgeTone(stage: BranchNodeData["stage"]): string {
  if (stage === "PROFITABLE") return "border-[hsl(105_30%_72%)] bg-[hsl(106_44%_86%)] text-[hsl(108_24%_28%)]";
  if (stage === "SPAWNING") return "border-[hsl(203_33%_73%)] bg-[hsl(202_45%_87%)] text-[hsl(201_28%_30%)]";
  if (stage === "WATCHLIST") return "border-[hsl(16_40%_74%)] bg-[hsl(16_56%_88%)] text-[hsl(20_30%_31%)]";
  return "border-[hsl(34_22%_76%)] bg-[hsl(35_30%_89%)] text-[hsl(30_12%_33%)]";
}

function renderBranchLabel(data: BranchNodeData): JSX.Element {
  return (
    <div
      className={cn(
        "agent-node-shell w-full rounded-sm px-2.5 py-2.5",
        branchTone(data.stage),
        data.active && "agent-node-shell--pulse",
        data.active && `agent-node-shell--${data.activityKind ?? "event"}`,
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-foreground/90">{data.title}</p>
        <Badge variant="outline" className={cn("px-2 py-[1px] text-[8px]", branchBadgeTone(data.stage))}>
          {data.stage.toLowerCase()}
        </Badge>
      </div>
      <div className="mt-2 flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
        <span>health {Math.round(data.health)}%</span>
        <span className={cn("font-code", data.margin >= 0 ? "text-primary/90" : "text-destructive/90")}>
          {data.margin.toFixed(2)}
        </span>
      </div>
    </div>
  );
}

export default function App(): JSX.Element {
  const [spawnBalance, setSpawnBalance] = useState("2.0");
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [leaseCountdown, setLeaseCountdown] = useState(LEASE_COUNTDOWN_SECONDS);
  const [statusText, setStatusText] = useState("Ready for colony operations.");
  const [statusTone, setStatusTone] = useState<StatusTone>("neutral");
  const [backendHealth, setBackendHealth] = useState<BackendHealthState>("checking");
  const [backendMode, setBackendMode] = useState<BackendMode>("live");
  const [version, setVersion] = useState("...");
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [nodeActivity, setNodeActivity] = useState<Record<string, NodeActivityEntry>>({});

  const [agents, setAgents] = useState<AgentRecord[]>(SNAPSHOT_AGENTS);
  const [ledger, setLedger] = useState<LedgerRecord[]>(SNAPSHOT_LEDGER);
  const [events, setEvents] = useState<ColonyEvent[]>(SNAPSHOT_EVENTS);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(SNAPSHOT_AGENTS[0]?.agent_id ?? null);
  const [sidebarDialog, setSidebarDialog] = useState<SidebarDialogState | null>(null);
  const [sidebarLogs, setSidebarLogs] = useState<SidebarLogEntry[]>([]);
  const [sidebarLogsCursor, setSidebarLogsCursor] = useState<string | null>(null);
  const [sidebarLogsLoading, setSidebarLogsLoading] = useState(false);
  const [sidebarLogsError, setSidebarLogsError] = useState<string | null>(null);
  const sidebarLogsLoadingRef = useRef(false);
  const sidebarLogsCursorRef = useRef<string | null>(null);
  const nextLocalEventSeqRef = useRef(Math.max(...SNAPSHOT_EVENTS.map((event) => event.seq), 0) + 1);
  const knownEventSeqRef = useRef<Set<number>>(new Set());
  const eventHydratedRef = useRef(false);
  const sidebarLogAgentPool = useMemo(() => {
    const ids = agents.map((agent) => agent.agent_id);
    if (ids.length > 0) return ids;
    return [...SIDEBAR_LOG_FALLBACK_AGENT_IDS];
  }, [agents]);

  const executeRequest = useCallback(async <T,>(request: () => Promise<T>): Promise<T> => {
    setBackendHealth("checking");
    try {
      const response = await request();
      setBackendHealth("online");
      setBackendMode("live");
      return response;
    } catch (error) {
      setBackendHealth("offline");
      throw error;
    }
  }, []);

  const markNodeActivity = useCallback((nodeIds: string[], kind: NodeActivityKind) => {
    if (nodeIds.length === 0) return;
    const expiresAt = Date.now() + NODE_ACTIVITY_TTL_MS;
    const unique = new Set(nodeIds);
    setNodeActivity((current) => {
      const next = { ...current };
      unique.forEach((nodeId) => {
        next[nodeId] = { kind, expiresAt };
      });
      return next;
    });
  }, []);

  useEffect(() => {
    const handle = window.setInterval(() => {
      const now = Date.now();
      setNodeActivity((current) => {
        const next: Record<string, NodeActivityEntry> = {};
        let changed = false;
        Object.entries(current).forEach(([nodeId, entry]) => {
          if (entry.expiresAt > now) {
            next[nodeId] = entry;
            return;
          }
          changed = true;
        });
        return changed ? next : current;
      });
    }, 220);
    return () => window.clearInterval(handle);
  }, []);

  const ledgerByAgentId = useMemo(() => {
    const map = new Map<string, LedgerRecord>();
    ledger.forEach((item) => map.set(item.agent_id, item));
    return map;
  }, [ledger]);

  const selectedAgent = useMemo(() => {
    if (!agents.length) return null;
    return agents.find((agent) => agent.agent_id === selectedAgentId) ?? agents[0];
  }, [agents, selectedAgentId]);

  const openAgentDialog = useCallback((agentId: string) => {
    setSelectedAgentId(agentId);
    setSidebarDialog({ kind: "agent", agentId });
  }, []);

  const selectedLedger = selectedAgent ? ledgerByAgentId.get(selectedAgent.agent_id) : undefined;
  const dialogAgent = useMemo(() => {
    if (sidebarDialog?.kind !== "agent") return null;
    return agents.find((agent) => agent.agent_id === sidebarDialog.agentId) ?? null;
  }, [agents, sidebarDialog]);
  const dialogLedger = dialogAgent ? ledgerByAgentId.get(dialogAgent.agent_id) : undefined;
  const dialogEvents = useMemo(() => {
    if (sidebarDialog?.kind !== "agent" || !sidebarDialog.agentId) return [];
    return events.filter((event) => event.agent_id === sidebarDialog.agentId).slice(0, 12);
  }, [events, sidebarDialog]);
  const marginRows = useMemo(() => {
    return [...ledger]
      .sort((a, b) => b.net_margin_24h - a.net_margin_24h)
      .map((item) => {
        const agent = agents.find((entry) => entry.agent_id === item.agent_id);
        return {
          id: item.agent_id,
          status: agent?.status ?? "SPAWNED",
          margin: item.net_margin_24h,
          balance: item.balance,
        };
      });
  }, [agents, ledger]);

  const metrics = useMemo(() => {
    const active = agents.filter((agent) => agent.status === "ACTIVE").length;
    const flagged = agents.filter((agent) => agent.status === "FLAGGED").length;
    const killed = agents.filter((agent) => agent.status === "KILLED").length;
    const totalBalance = ledger.reduce((sum, item) => sum + item.balance, 0);
    const totalMargin = ledger.reduce((sum, item) => sum + item.net_margin_24h, 0);

    return {
      active,
      flagged,
      killed,
      total: agents.length,
      totalBalance,
      totalMargin,
    };
  }, [agents, ledger]);

  const branchPreviews = useMemo<BranchPreview[]>(() => {
    const branchAgents = agents.length ? agents : SNAPSHOT_AGENTS;
    const branchLedgerByAgentId = agents.length
      ? ledgerByAgentId
      : new Map(SNAPSHOT_LEDGER.map((item) => [item.agent_id, item]));

    return branchAgents.map((agent, index) => {
      const ledgerForAgent = branchLedgerByAgentId.get(agent.agent_id);
      const stage = classifyBranchStage(agent, ledgerForAgent);
      const quality = normalize(agent.quality_rolling * 100);
      const margin = ledgerForAgent?.net_margin_24h ?? 0;
      const stageBias = stage === "PROFITABLE" ? 15 : stage === "WATCHLIST" ? -15 : 0;

      return {
        id: agent.agent_id,
        displayName: `Agent ${String(index + 1).padStart(2, "0")}`,
        parentId: agent.parent_id ?? "root",
        stage,
        progress: normalize(quality + stageBias),
        health: quality,
        margin,
        status: agent.status,
      };
    });
  }, [agents, ledgerByAgentId]);

  const handleBranchGraphInit = useCallback((instance: ReactFlowInstance<Node, Edge>) => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        instance.fitView({ ...BRANCH_GRAPH_FIT_VIEW_OPTIONS, duration: 0 });
      });
    });
  }, []);

  const branchGraph = useMemo(() => {
    const ids = new Set(branchPreviews.map((branch) => branch.id));
    const byId = new Map(branchPreviews.map((branch) => [branch.id, branch]));
    const parents = new Map(branchPreviews.map((branch) => [branch.id, branch.parentId]));
    const depthCache = new Map<string, number>();
    const childrenByParent = new Map<string, string[]>();
    const yById = new Map<string, number>();
    let leafCursor = 0;

    const depthFor = (id: string, stack = new Set<string>()): number => {
      if (depthCache.has(id)) return depthCache.get(id) ?? 1;
      if (stack.has(id)) return 1;
      stack.add(id);
      const parent = parents.get(id);
      const depth = parent && ids.has(parent) ? depthFor(parent, stack) + 1 : 1;
      depthCache.set(id, depth);
      return depth;
    };

    const stageOrder: Record<BranchStage, number> = {
      PROFITABLE: 0,
      SPAWNING: 1,
      WATCHLIST: 2,
    };

    branchPreviews.forEach((branch) => {
      const source = ids.has(branch.parentId) ? branch.parentId : "root";
      const children = childrenByParent.get(source) ?? [];
      children.push(branch.id);
      childrenByParent.set(source, children);
    });

    const leafCountCache = new Map<string, number>();
    const leafCountFor = (id: string, stack = new Set<string>()): number => {
      const cached = leafCountCache.get(id);
      if (cached !== undefined) return cached;
      if (stack.has(id)) return 1;

      stack.add(id);
      const children = childrenByParent.get(id) ?? [];
      const leafCount = children.length === 0 ? 1 : children.reduce((sum, childId) => sum + leafCountFor(childId, stack), 0);
      stack.delete(id);
      leafCountCache.set(id, leafCount);
      return leafCount;
    };

    childrenByParent.forEach((children, parentId) => {
      children.sort((a, b) => {
        const left = byId.get(a);
        const right = byId.get(b);
        if (!left || !right) return a.localeCompare(b);
        const stageDiff = stageOrder[left.stage] - stageOrder[right.stage];
        if (stageDiff !== 0) return stageDiff;
        // Keep larger same-stage subtrees earlier so parent-child vertical gaps stay tighter.
        const subtreeDiff = leafCountFor(b) - leafCountFor(a);
        if (subtreeDiff !== 0) return subtreeDiff;
        const marginDiff = right.margin - left.margin;
        if (Math.abs(marginDiff) > 0.01) return marginDiff;
        return a.localeCompare(b);
      });
      childrenByParent.set(parentId, children);
    });

    const placeNodeY = (id: string, stack = new Set<string>()): number => {
      const cached = yById.get(id);
      if (cached !== undefined) return cached;

      if (stack.has(id)) {
        const fallback = BRANCH_TREE_TOP_Y + leafCursor * BRANCH_TREE_STEP_Y;
        leafCursor += 1;
        yById.set(id, fallback);
        return fallback;
      }

      stack.add(id);
      const children = childrenByParent.get(id) ?? [];
      if (children.length === 0) {
        const leafY = BRANCH_TREE_TOP_Y + leafCursor * BRANCH_TREE_STEP_Y;
        leafCursor += 1;
        yById.set(id, leafY);
        stack.delete(id);
        return leafY;
      }

      const childYs = children.map((childId) => placeNodeY(childId, stack));
      const centerY = childYs.reduce((total, y) => total + y, 0) / childYs.length;
      yById.set(id, centerY);
      stack.delete(id);
      return centerY;
    };

    if ((childrenByParent.get("root") ?? []).length > 0) {
      placeNodeY("root");
    } else {
      yById.set("root", 220);
    }

    const nodes: Node[] = [
      {
        id: "root",
        position: { x: BRANCH_TREE_ROOT_X, y: yById.get("root") ?? 220 },
        data: {
          label: renderBranchLabel({
            title: "Origin",
            stage: "ROOT",
            health: 100,
            margin: metrics.totalMargin,
            active: Boolean(nodeActivity.root),
            activityKind: nodeActivity.root?.kind,
          }),
        },
        draggable: false,
        selectable: false,
        style: {
          width: BRANCH_NODE_WIDTH,
        },
      },
    ];

    const edges: Edge[] = [];

    branchPreviews.forEach((branch) => {
      const depth = depthFor(branch.id);
      const branchData: BranchNodeData = {
        title: branch.displayName,
        stage: branch.stage,
        health: branch.health,
        margin: branch.margin,
        active: Boolean(nodeActivity[branch.id]),
        activityKind: nodeActivity[branch.id]?.kind,
      };

      nodes.push({
        id: branch.id,
        position: {
          x: BRANCH_TREE_ROOT_X + depth * BRANCH_TREE_STEP_X,
          y: yById.get(branch.id) ?? BRANCH_TREE_TOP_Y,
        },
        data: {
          label: renderBranchLabel(branchData),
        },
        draggable: false,
        selectable: false,
        style: {
          width: BRANCH_NODE_WIDTH,
        },
      });

      const source = ids.has(branch.parentId) ? branch.parentId : "root";
      const lineColor =
        branch.stage === "WATCHLIST"
          ? "hsl(24 20% 46%)"
          : branch.stage === "PROFITABLE"
            ? "hsl(30 24% 42%)"
            : "hsl(34 12% 48%)";

      edges.push({
        id: `${source}->${branch.id}`,
        source,
        target: branch.id,
        type: "smoothstep",
        animated: branch.stage === "SPAWNING",
        style: {
          stroke: lineColor,
          strokeWidth: 1.45,
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 16,
          height: 16,
          color: lineColor,
        },
      });
    });

    return { nodes, edges };
  }, [branchPreviews, metrics.totalMargin, nodeActivity]);

  const applyMockTransition = useCallback((result: MockTransitionResult) => {
    nextLocalEventSeqRef.current = result.nextSeq;
    knownEventSeqRef.current = new Set(result.events.map((event) => event.seq));
    eventHydratedRef.current = true;
    setAgents(result.agents);
    setLedger(result.ledger);
    setEvents(result.events);
    setSelectedAgentId((current) => {
      if (current && result.agents.some((agent) => agent.agent_id === current)) {
        return current;
      }
      return result.agents[0]?.agent_id ?? null;
    });
  }, []);

  const ingestEvents = useCallback(
    (incomingEvents: ColonyEvent[]) => {
      const maxSeq = incomingEvents.reduce((max, event) => Math.max(max, event.seq), 0);
      nextLocalEventSeqRef.current = Math.max(nextLocalEventSeqRef.current, maxSeq + 1);

      if (!eventHydratedRef.current) {
        knownEventSeqRef.current = new Set(incomingEvents.map((event) => event.seq));
        eventHydratedRef.current = true;
        setEvents(incomingEvents);
        return;
      }

      const known = knownEventSeqRef.current;
      const touchedAgents = new Set<string>();
      let touchedRoot = false;

      incomingEvents.forEach((event) => {
        if (known.has(event.seq)) return;
        if (event.agent_id) {
          touchedAgents.add(event.agent_id);
          return;
        }
        touchedRoot = true;
      });

      if (touchedAgents.size > 0) {
        markNodeActivity(Array.from(touchedAgents), "event");
      }
      if (touchedRoot) {
        markNodeActivity(["root"], "event");
      }

      knownEventSeqRef.current = new Set(incomingEvents.map((event) => event.seq));
      setEvents(incomingEvents);
    },
    [markNodeActivity],
  );

  const refreshState = useCallback(async (): Promise<boolean> => {
    const result = await executeRequest(() => colonyApi.getState());
    const agentsPayload = result.agents;
    const ledgerPayload = result.ledger;
    if (!Array.isArray(agentsPayload) || !Array.isArray(ledgerPayload)) {
      throw new Error("Invalid colony state response.");
    }

    const useSnapshot = agentsPayload.length === 0 && ledgerPayload.length === 0;
    const nextAgents = useSnapshot ? SNAPSHOT_AGENTS : agentsPayload;
    const nextLedger = useSnapshot ? SNAPSHOT_LEDGER : ledgerPayload;

    setAgents(nextAgents);
    setLedger(nextLedger);
    setSelectedAgentId((current) => {
      if (current && nextAgents.some((agent) => agent.agent_id === current)) {
        return current;
      }
      return nextAgents[0]?.agent_id ?? null;
    });
    return useSnapshot;
  }, [executeRequest]);

  const refreshEvents = useCallback(
    async (useSnapshot = false) => {
      const result = await executeRequest(() => colonyApi.getEvents(48));
      if (!Array.isArray(result.events)) {
        throw new Error("Invalid events response.");
      }
      if (useSnapshot && result.events.length === 0) {
        ingestEvents(SNAPSHOT_EVENTS);
        return;
      }
      ingestEvents(result.events);
    },
    [executeRequest, ingestEvents],
  );

  const fetchSidebarLogs = useCallback(
    async (reset = false) => {
      if (sidebarLogsLoadingRef.current) return;
      sidebarLogsLoadingRef.current = true;
      setSidebarLogsLoading(true);
      setSidebarLogsError(null);

      if (reset) {
        sidebarLogsCursorRef.current = null;
        setSidebarLogsCursor(null);
      }

      try {
        const cursor = reset ? null : sidebarLogsCursorRef.current;
        const result = await executeRequest(() => colonyApi.getLogs(SIDEBAR_LOG_PAGE_SIZE, cursor));
        if (!Array.isArray(result.logs)) {
          throw new Error("Invalid logs response.");
        }
        const nextLogs = result.logs;

        const nextCursor =
          typeof result.next_cursor === "string" && result.next_cursor.length > 0 ? result.next_cursor : null;
        sidebarLogsCursorRef.current = nextCursor;
        setSidebarLogsCursor(nextCursor);

        setSidebarLogs((current) => {
          const merged = reset ? nextLogs : [...current, ...nextLogs];
          const deduped = new Map<string, SidebarLogEntry>();
          merged.forEach((entry) => {
            if (!entry?.id) return;
            if (deduped.has(entry.id)) return;
            deduped.set(entry.id, entry);
          });
          return Array.from(deduped.values());
        });
      } catch {
        const fallbackPage = generateSidebarLogPage(
          reset ? null : sidebarLogsCursorRef.current,
          SIDEBAR_LOG_PAGE_SIZE,
          sidebarLogAgentPool,
          SNAPSHOT_LOG_ANCHOR_MS,
        );
        sidebarLogsCursorRef.current = fallbackPage.nextCursor;
        setSidebarLogsCursor(fallbackPage.nextCursor);
        setSidebarLogs((current) => (reset ? fallbackPage.logs : [...current, ...fallbackPage.logs]));
        setSidebarLogsError("Log stream switched to local stream.");
      } finally {
        sidebarLogsLoadingRef.current = false;
        setSidebarLogsLoading(false);
      }
    },
    [executeRequest, sidebarLogAgentPool],
  );

  const handleSidebarLogScroll = useCallback(
    (event: UIEvent<HTMLDivElement>) => {
      if (sidebarLogsLoading || !sidebarLogsCursor) return;
      const container = event.currentTarget;
      const distanceToBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
      if (distanceToBottom > SIDEBAR_LOG_SCROLL_THRESHOLD_PX) return;
      void fetchSidebarLogs(false);
    },
    [fetchSidebarLogs, sidebarLogsCursor, sidebarLogsLoading],
  );

  const refreshAll = useCallback(async () => {
    try {
      const useSnapshot = await refreshState();
      await refreshEvents(useSnapshot);
      setStatusTone("ok");
      setStatusText(useSnapshot ? "Live colony empty. Showing seeded end-state snapshot." : "Telemetry synchronized.");
      setBackendMode("live");
    } catch {
      setBackendMode("mock-fallback");
    }
  }, [refreshEvents, refreshState]);

  const runAction = useCallback(
    async (config: {
      label: string;
      kind: Exclude<NodeActivityKind, "event">;
      action: () => Promise<unknown>;
      fallback: () => MockTransitionResult;
      successMessage: string;
      pulseNodeIds?: string[];
      pulseRoot?: boolean;
    }) => {
      try {
        setLoadingAction(config.label);
        await config.action();
        setStatusTone("ok");
        setStatusText(config.successMessage);
        const successNodes = [...(config.pulseNodeIds ?? []), ...(config.pulseRoot ? ["root"] : [])];
        markNodeActivity(successNodes, config.kind);
        await refreshAll();
      } catch {
        setBackendMode("mock-fallback");
        const fallbackResult = config.fallback();
        applyMockTransition(fallbackResult);
        const fallbackNodes =
          fallbackResult.touchedAgentIds.length > 0 ? fallbackResult.touchedAgentIds : (config.pulseNodeIds ?? []);
        markNodeActivity([...fallbackNodes, ...(config.pulseRoot ? ["root"] : [])], config.kind);
      } finally {
        setLoadingAction(null);
      }
    },
    [applyMockTransition, markNodeActivity, refreshAll],
  );

  useEffect(() => {
    void (async () => {
      try {
        const data = await executeRequest(() => colonyApi.getVersion());
        setVersion(data.version ?? "unknown");
      } catch {
        setVersion("--");
      }
    })();
  }, [executeRequest]);

  useEffect(() => {
    void refreshAll();
  }, [refreshAll]);

  useEffect(() => {
    void fetchSidebarLogs(true);
  }, [fetchSidebarLogs]);

  useEffect(() => {
    if (!autoRefresh) return;
    const handle = window.setInterval(() => {
      void refreshAll();
    }, AUTO_REFRESH_MS);
    return () => window.clearInterval(handle);
  }, [autoRefresh, refreshAll]);

  useEffect(() => {
    const handle = window.setInterval(() => {
      setLeaseCountdown((current) => (current <= 1 ? LEASE_COUNTDOWN_SECONDS : current - 1));
    }, 1000);
    return () => window.clearInterval(handle);
  }, []);

  return (
    <SidebarProvider className="h-screen w-screen overflow-hidden">
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="font-display text-[1.5rem] leading-none text-foreground/95">Agent Capitalism</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Operator View</p>
            </div>
            <Badge variant="outline" className="font-code text-[8px]">
              node_01
            </Badge>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Overview</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton active>
                    <SquareTerminal className="h-3.5 w-3.5 shrink-0" />
                    <span>reserve</span>
                    <span className="ml-auto font-code text-foreground">{formatCurrency(metrics.totalBalance)}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => setSidebarDialog({ kind: "margin" })}>
                    <TrendingUp className="h-3.5 w-3.5 shrink-0" />
                    <span>margin</span>
                    <span
                      className={cn(
                        "ml-auto font-code",
                        metrics.totalMargin >= 0 ? "text-primary/90" : "text-destructive/90",
                      )}
                    >
                      {metrics.totalMargin.toFixed(2)}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => setSidebarDialog({ kind: "agents" })}>
                    <GitBranch className="h-3.5 w-3.5 shrink-0" />
                    <span>agents</span>
                    <span className="ml-auto font-code text-foreground">{metrics.total}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>

              <div className="rounded-sm border border-border/70 bg-background/55 px-2.5 py-2">
                <div className="mb-1 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  <span>Active ratio</span>
                  <span>{metrics.total > 0 ? ((metrics.active / metrics.total) * 100).toFixed(0) : "0"}%</span>
                </div>
                <Progress value={normalize((metrics.active / Math.max(metrics.total, 1)) * 100)} className="h-1.5" />
                <div className="mt-2 flex flex-wrap gap-1.5 text-[9px] uppercase tracking-[0.16em]">
                  <Badge variant="success" className="px-2 py-[1px]">
                    active {metrics.active}
                  </Badge>
                  <Badge variant="warning" className="px-2 py-[1px]">
                    flagged {metrics.flagged}
                  </Badge>
                  <Badge variant="destructive" className="px-2 py-[1px]">
                    killed {metrics.killed}
                  </Badge>
                </div>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Operations Log</SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between rounded-sm border border-border/70 bg-background/55 px-2 py-1.5 text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                  <span>{sidebarLogs.length} streamed records</span>
                  <span className="font-code">{sidebarLogs[0] ? formatClock(sidebarLogs[0].ts) : "--:--"}</span>
                </div>

                <div
                  className="max-h-[44vh] overflow-auto rounded-sm border border-border/70 bg-background/55"
                  onScroll={handleSidebarLogScroll}
                >
                  {sidebarLogs.map((entry) => (
                    <div key={entry.id} className="border-b border-border/60 px-2.5 py-2 last:border-b-0">
                      <div className="flex items-center justify-between gap-2 text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                        <span>{formatLogStamp(entry.ts)}</span>
                        <span className="font-code">{entry.id}</span>
                      </div>

                      <div className="mt-1 flex items-center justify-between gap-2">
                        <p className={cn("text-[10px] uppercase tracking-[0.18em]", logSeverityTextClass(entry.severity))}>
                          {logActionLabel(entry.action)}
                        </p>
                        <Badge variant={LOG_SEVERITY_BADGE[entry.severity]} className="px-1.5 py-[1px] text-[8px]">
                          {logSeverityLabel(entry.severity)}
                        </Badge>
                      </div>

                      <p className="mt-1 text-[11px] leading-relaxed text-foreground/85">
                        {scrubStatusLanguage(entry.summary)}
                      </p>

                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        <Badge variant={LOG_CHANNEL_BADGE[entry.channel]} className="px-1.5 py-[1px] text-[8px]">
                          {entry.channel.toLowerCase()}
                        </Badge>
                        {entry.agentId ? (
                          <span className="font-code text-[9px] uppercase tracking-[0.14em] text-foreground/75">
                            {entry.agentId}
                          </span>
                        ) : null}
                        {entry.tool ? (
                          <span className="font-code text-[9px] uppercase tracking-[0.14em] text-foreground/75">
                            {entry.tool}
                          </span>
                        ) : null}
                        {entry.modalApp ? (
                          <span className="font-code text-[9px] uppercase tracking-[0.14em] text-foreground/75">
                            {entry.modalApp}
                          </span>
                        ) : null}
                        {entry.durationMs ? (
                          <span className="font-code text-[9px] uppercase tracking-[0.14em] text-foreground/75">
                            {entry.durationMs}ms
                          </span>
                        ) : null}
                      </div>

                      <p className="mt-1 font-code text-[9px] leading-relaxed text-muted-foreground">
                        {scrubStatusLanguage(entry.details)}
                      </p>
                    </div>
                  ))}
                  {!sidebarLogsLoading && !sidebarLogsError && sidebarLogs.length === 0 ? (
                    <p className="px-2.5 py-6 text-center text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      No log records yet.
                    </p>
                  ) : null}
                  {sidebarLogsLoading ? (
                    <p className="px-2.5 py-2 text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                      Loading more logs...
                    </p>
                  ) : null}
                  {sidebarLogsError ? (
                    <p className="px-2.5 py-2 text-[9px] uppercase tracking-[0.16em] text-destructive/90">
                      {sidebarLogsError}
                    </p>
                  ) : null}
                </div>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              <span>Auto refresh</span>
              <div className="flex items-center gap-2">
                <span className="font-code text-foreground">{autoRefresh ? "ON" : "OFF"}</span>
                <Switch aria-label="Toggle automatic refresh" checked={autoRefresh} onCheckedChange={setAutoRefresh} />
              </div>
            </div>
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              <span>Lease tick</span>
              <span className="font-code text-foreground">{leaseCountdown}s</span>
            </div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">API {version}</div>
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="border-b border-border/75 bg-background/70 px-4 py-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <Input
              type="number"
              step="0.1"
              min="0"
              className="w-[132px] font-code"
              value={spawnBalance}
              onChange={(event) => setSpawnBalance(event.target.value)}
            />
            <Button
              onClick={() => {
                void runAction({
                  label: "spawn",
                  kind: "spawn",
                  action: () =>
                    executeRequest(() =>
                      colonyApi.spawnAgent({
                        initial_balance: Number(spawnBalance) || 2.0,
                      }),
                    ),
                  fallback: () =>
                    applyMockSpawnTransition(
                      {
                        agents,
                        ledger,
                        events,
                        nextSeq: nextLocalEventSeqRef.current,
                      },
                      {
                        initialBalance: Number(spawnBalance) || 2.0,
                      },
                    ),
                  successMessage: "Agent spawned.",
                  pulseRoot: true,
                });
              }}
              disabled={loadingAction !== null}
            >
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Spawn
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                void runAction({
                  label: "tick",
                  kind: "tick",
                  action: () => executeRequest(() => colonyApi.supervisorTick()),
                  fallback: () =>
                    applyMockTickTransition({
                      agents,
                      ledger,
                      events,
                      nextSeq: nextLocalEventSeqRef.current,
                    }),
                  successMessage: "Supervisor cycle complete.",
                  pulseRoot: true,
                });
                setLeaseCountdown(LEASE_COUNTDOWN_SECONDS);
              }}
              disabled={loadingAction !== null}
            >
              <Gauge className="mr-1.5 h-3.5 w-3.5" />
              Tick
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                void refreshAll();
              }}
              disabled={loadingAction !== null}
            >
              <RefreshCcw className="mr-1.5 h-3.5 w-3.5" />
              Refresh
            </Button>
            <div className="ml-auto flex items-center gap-1.5">
              <Badge variant={metrics.flagged > 0 ? "warning" : "success"}>
                {metrics.flagged > 0 ? `${metrics.flagged} watchlist` : "stable"}
              </Badge>
              <Badge variant="outline">{metrics.total} active branches</Badge>
            </div>
          </div>

          <p className={cn("mt-2 text-[10px] uppercase tracking-[0.18em]", toneClass(statusTone))}>{statusText}</p>
        </header>

        <main className="grid min-h-0 flex-1 gap-4 p-4 xl:grid-cols-[minmax(0,1fr)_370px]">
          <section className="min-h-0 overflow-hidden rounded-sm border border-border/75 bg-background/55">
            <div className="flex items-center justify-between border-b border-border/70 px-4 py-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Branch Graph</p>
                <p className="mt-1 text-[13px] text-foreground/85">Lineage map for behavior and survivability.</p>
              </div>
              <div className="flex items-center gap-1.5">
                <Badge variant="success">
                  {branchPreviews.filter((node) => node.stage === "PROFITABLE").length} profitable
                </Badge>
                <Badge variant="info">{branchPreviews.filter((node) => node.stage === "SPAWNING").length} progressing</Badge>
                <Badge variant="warning">{branchPreviews.filter((node) => node.stage === "WATCHLIST").length} risk</Badge>
              </div>
            </div>

            <div className="h-[calc(100%-73px)] min-h-[500px]">
              <ReactFlow
                nodes={branchGraph.nodes}
                edges={branchGraph.edges}
                fitView
                fitViewOptions={BRANCH_GRAPH_FIT_VIEW_OPTIONS}
                onInit={handleBranchGraphInit}
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable={false}
                panOnScroll
                zoomOnDoubleClick={false}
                proOptions={{ hideAttribution: true }}
              >
                <Background color="hsl(var(--border))" gap={20} size={1} />
                <Controls showInteractive={false} />
              </ReactFlow>
            </div>
          </section>

          <aside className="min-h-0 space-y-4 overflow-auto pr-1">
            <section className="rounded-sm border border-border/75 bg-background/55 px-3 py-3">
              <div className="mb-2 flex items-center justify-between">
                <button
                  type="button"
                  className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground/85"
                  onClick={() => setSidebarDialog({ kind: "agents" })}
                >
                  Agent Notes
                </button>
                <Badge variant="outline">{metrics.total}</Badge>
              </div>

              <div className="space-y-2">
                {!agents.length ? (
                  <div className="rounded-sm border border-dashed border-border/70 px-3 py-6 text-center">
                    <SquareTerminal className="mx-auto h-5 w-5 text-muted-foreground" />
                    <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">No telemetry</p>
                  </div>
                ) : null}

                {agents.map((agent, index) => {
                  const ledgerForAgent = ledgerByAgentId.get(agent.agent_id);
                  const healthPct = normalize(agent.healthy ? agent.quality_rolling * 100 : 8);
                  const disabled = agent.status === "KILLED" || loadingAction !== null;

                  return (
                    <div
                      key={agent.agent_id}
                      className={cn(
                        "rounded-sm border border-border/70 bg-background/70 px-2.5 py-2",
                        selectedAgent?.agent_id === agent.agent_id ? "border-primary/50 bg-secondary/45" : "",
                      )}
                    >
                      <div className="cursor-pointer" onClick={() => openAgentDialog(agent.agent_id)}>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                              Agent {String(index + 1).padStart(2, "0")}
                            </p>
                            <p className="mt-1 font-code text-[10px] uppercase tracking-[0.14em] text-foreground/80">
                              {agent.agent_id}
                            </p>
                          </div>
                          <Badge variant={STATUS_BADGE[agent.status]}>{agent.status.toLowerCase()}</Badge>
                        </div>

                        <div className="mt-2 space-y-1">
                          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                            <span>Health</span>
                            <span>{Math.round(healthPct)}%</span>
                          </div>
                          <Progress value={healthPct} className="h-1.5" />
                        </div>

                        <div className="mt-2 flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                          <span>{formatCurrency(ledgerForAgent?.balance ?? 0)}</span>
                          <span
                            className={cn(
                              "font-code",
                              (ledgerForAgent?.net_margin_24h ?? 0) >= 0 ? "text-primary/90" : "text-destructive/90",
                            )}
                          >
                            {(ledgerForAgent?.net_margin_24h ?? 0).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <div className="mt-2 flex flex-wrap gap-1.5">
                        <Button
                          size="sm"
                          onClick={() => {
                            void runAction({
                              label: `credit-${agent.agent_id}`,
                              kind: "credit",
                              action: () =>
                                executeRequest(() =>
                                  colonyApi.creditTask(agent.agent_id, {
                                    revenue_credit: 1.0,
                                    quality_score: 0.85,
                                  }),
                                ),
                              fallback: () =>
                                applyMockCreditTransition(
                                  {
                                    agents,
                                    ledger,
                                    events,
                                    nextSeq: nextLocalEventSeqRef.current,
                                  },
                                  {
                                    agentId: agent.agent_id,
                                    revenueCredit: 1.0,
                                    qualityScore: 0.85,
                                  },
                                ),
                              successMessage: `Credited ${agent.agent_id}.`,
                              pulseNodeIds: [agent.agent_id],
                            });
                          }}
                          disabled={disabled}
                        >
                          <Zap className="mr-1 h-3 w-3" />
                          Credit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            void runAction({
                              label: `replicate-${agent.agent_id}`,
                              kind: "replicate",
                              action: () =>
                                executeRequest(() =>
                                  colonyApi.replicateAgent(agent.agent_id, {
                                    child_initial_balance: 1.0,
                                  }),
                                ),
                              fallback: () =>
                                applyMockReplicateTransition(
                                  {
                                    agents,
                                    ledger,
                                    events,
                                    nextSeq: nextLocalEventSeqRef.current,
                                  },
                                  {
                                    agentId: agent.agent_id,
                                    childInitialBalance: 1.0,
                                  },
                                ),
                              successMessage: `Replication issued from ${agent.agent_id}.`,
                              pulseNodeIds: [agent.agent_id],
                            });
                          }}
                          disabled={disabled}
                        >
                          <Activity className="mr-1 h-3 w-3" />
                          Replicate
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            void runAction({
                              label: `hide-${agent.agent_id}`,
                              kind: "hide",
                              action: () =>
                                executeRequest(() =>
                                  colonyApi.toggleHideBalance(agent.agent_id, {
                                    enabled: !agent.hide_balance,
                                  }),
                                ),
                              fallback: () =>
                                applyMockHideBalanceTransition(
                                  {
                                    agents,
                                    ledger,
                                    events,
                                    nextSeq: nextLocalEventSeqRef.current,
                                  },
                                  {
                                    agentId: agent.agent_id,
                                    enabled: !agent.hide_balance,
                                  },
                                ),
                              successMessage: `${agent.hide_balance ? "Unmasked" : "Masked"} balance for ${agent.agent_id}.`,
                              pulseNodeIds: [agent.agent_id],
                            });
                          }}
                          disabled={disabled}
                        >
                          <ShieldAlert className="mr-1 h-3 w-3" />
                          {agent.hide_balance ? "Unhide" : "Hide"}
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            void runAction({
                              label: `kill-${agent.agent_id}`,
                              kind: "kill",
                              action: () =>
                                executeRequest(() =>
                                  colonyApi.killAgent(agent.agent_id, {
                                    reason: "MANUAL_DASHBOARD_KILL",
                                  }),
                                ),
                              fallback: () =>
                                applyMockKillTransition(
                                  {
                                    agents,
                                    ledger,
                                    events,
                                    nextSeq: nextLocalEventSeqRef.current,
                                  },
                                  {
                                    agentId: agent.agent_id,
                                    reason: "MANUAL_DASHBOARD_KILL",
                                  },
                                ),
                              successMessage: `${agent.agent_id} terminated.`,
                              pulseNodeIds: [agent.agent_id],
                            });
                          }}
                          disabled={loadingAction !== null || agent.status === "KILLED"}
                        >
                          <CircleOff className="mr-1 h-3 w-3" />
                          Kill
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="rounded-sm border border-border/75 bg-background/55 px-3 py-3">
              <button
                type="button"
                className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground/85"
                onClick={() => {
                  if (selectedAgent?.agent_id) openAgentDialog(selectedAgent.agent_id);
                }}
                disabled={!selectedAgent?.agent_id}
              >
                Selected Agent
              </button>
              <button
                type="button"
                className="mt-1 block font-code text-[12px] uppercase tracking-[0.14em] text-foreground transition-colors hover:text-foreground/80"
                onClick={() => {
                  if (selectedAgent?.agent_id) openAgentDialog(selectedAgent.agent_id);
                }}
                disabled={!selectedAgent?.agent_id}
              >
                {selectedAgent?.agent_id ?? "No selection"}
              </button>
              <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">
                {selectedAgent
                  ? `Status ${selectedAgent.status.toLowerCase()}, quality ${(selectedAgent.quality_rolling * 100).toFixed(1)}%, rent ${(
                      selectedLedger?.rent_per_tick ?? 0
                    ).toFixed(2)}.`
                  : "Spawn or select an agent to inspect details."}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <Badge variant="outline">lineage {selectedAgent?.parent_id ? "derived" : "root"}</Badge>
                <Badge variant={selectedAgent?.healthy ? "success" : "warning"}>
                  {selectedAgent?.healthy ? "healthy" : "fragile"}
                </Badge>
              </div>
            </section>
          </aside>
        </main>
      </SidebarInset>

      <Dialog open={sidebarDialog !== null} onOpenChange={(open) => !open && setSidebarDialog(null)}>
        <DialogContent className="h-[min(86vh,760px)]">
          <DialogHeader className="border-b border-border/75 px-5 py-4 text-left">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Dashboard Dialog</p>
            <DialogTitle className="mt-1 pr-8 text-[16px] font-medium text-foreground">
              {sidebarDialog?.kind === "margin"
                ? "Margin Dashboard"
                : sidebarDialog?.kind === "agents"
                  ? "Agent Dashboard"
                  : `${dialogAgent?.agent_id ?? "Agent"} Dashboard`}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Expanded dashboard view for sidebar margin and agent telemetry.
            </DialogDescription>
          </DialogHeader>

          <div className="min-h-0 flex-1 overflow-auto px-5 py-4">
            {sidebarDialog?.kind === "margin" ? (
              <div className="space-y-4">
                <div className="grid gap-2 md:grid-cols-3">
                  <div className="rounded-sm border border-border/70 bg-background/60 px-3 py-3">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Net margin (24h)</p>
                    <p
                      className={cn(
                        "mt-1 text-[24px] font-medium",
                        metrics.totalMargin >= 0 ? "text-primary/90" : "text-destructive/90",
                      )}
                    >
                      {metrics.totalMargin.toFixed(2)}
                    </p>
                  </div>
                  <div className="rounded-sm border border-border/70 bg-background/60 px-3 py-3">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Profitable agents</p>
                    <p className="mt-1 text-[24px] font-medium text-foreground">
                      {marginRows.filter((row) => row.margin > 0).length}
                    </p>
                  </div>
                  <div className="rounded-sm border border-border/70 bg-background/60 px-3 py-3">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Loss agents</p>
                    <p className="mt-1 text-[24px] font-medium text-foreground">
                      {marginRows.filter((row) => row.margin <= 0).length}
                    </p>
                  </div>
                </div>

                <div className="rounded-sm border border-border/70 bg-background/60">
                  <div className="grid grid-cols-[1.3fr_0.9fr_0.9fr_0.7fr] gap-3 border-b border-border/70 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    <span>Agent</span>
                    <span>Balance</span>
                    <span>Margin</span>
                    <span>Status</span>
                  </div>
                  <div className="max-h-[420px] overflow-auto">
                    {marginRows.map((row) => (
                      <button
                        key={row.id}
                        type="button"
                        className="grid w-full grid-cols-[1.3fr_0.9fr_0.9fr_0.7fr] gap-3 border-b border-border/60 px-3 py-2 text-left text-[12px] transition-colors hover:bg-secondary/40 last:border-b-0"
                        onClick={() => openAgentDialog(row.id)}
                      >
                        <span className="font-code text-foreground">{row.id}</span>
                        <span className="text-foreground/85">{formatCurrency(row.balance)}</span>
                        <span className={cn("font-code", row.margin >= 0 ? "text-primary/90" : "text-destructive/90")}>
                          {row.margin.toFixed(2)}
                        </span>
                        <span className="text-foreground/85">{row.status.toLowerCase()}</span>
                      </button>
                    ))}
                    {!marginRows.length ? (
                      <p className="px-3 py-6 text-center text-[12px] text-muted-foreground">No margin data yet.</p>
                    ) : null}
                  </div>
                </div>
              </div>
            ) : null}

            {sidebarDialog?.kind === "agents" ? (
              <div className="space-y-4">
                <div className="grid gap-2 md:grid-cols-4">
                  <div className="rounded-sm border border-border/70 bg-background/60 px-3 py-3">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Total agents</p>
                    <p className="mt-1 text-[24px] font-medium text-foreground">{metrics.total}</p>
                  </div>
                  <div className="rounded-sm border border-border/70 bg-background/60 px-3 py-3">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Active</p>
                    <p className="mt-1 text-[24px] font-medium text-foreground">{metrics.active}</p>
                  </div>
                  <div className="rounded-sm border border-border/70 bg-background/60 px-3 py-3">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Flagged</p>
                    <p className="mt-1 text-[24px] font-medium text-foreground">{metrics.flagged}</p>
                  </div>
                  <div className="rounded-sm border border-border/70 bg-background/60 px-3 py-3">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Killed</p>
                    <p className="mt-1 text-[24px] font-medium text-foreground">{metrics.killed}</p>
                  </div>
                </div>

                <div className="rounded-sm border border-border/70 bg-background/60">
                  <div className="grid grid-cols-[1.3fr_0.7fr_0.9fr_0.7fr] gap-3 border-b border-border/70 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    <span>Agent</span>
                    <span>Status</span>
                    <span>Health</span>
                    <span>Margin</span>
                  </div>
                  <div className="max-h-[420px] overflow-auto">
                    {agents.map((agent) => {
                      const agentLedger = ledgerByAgentId.get(agent.agent_id);
                      const healthPct = normalize(agent.healthy ? agent.quality_rolling * 100 : 8);
                      const margin = agentLedger?.net_margin_24h ?? 0;
                      return (
                        <button
                          key={agent.agent_id}
                          type="button"
                          className="grid w-full grid-cols-[1.3fr_0.7fr_0.9fr_0.7fr] gap-3 border-b border-border/60 px-3 py-2 text-left text-[12px] transition-colors hover:bg-secondary/40 last:border-b-0"
                          onClick={() => openAgentDialog(agent.agent_id)}
                        >
                          <span className="font-code text-foreground">{agent.agent_id}</span>
                          <span className="text-foreground/85">{agent.status.toLowerCase()}</span>
                          <span className="text-foreground/85">{Math.round(healthPct)}%</span>
                          <span className={cn("font-code", margin >= 0 ? "text-primary/90" : "text-destructive/90")}>
                            {margin.toFixed(2)}
                          </span>
                        </button>
                      );
                    })}
                    {!agents.length ? (
                      <p className="px-3 py-6 text-center text-[12px] text-muted-foreground">No agents yet.</p>
                    ) : null}
                  </div>
                </div>
              </div>
            ) : null}

            {sidebarDialog?.kind === "agent" ? (
              <div className="space-y-4">
                {dialogAgent ? (
                  <>
                    <div className="grid gap-2 md:grid-cols-4">
                      <div className="rounded-sm border border-border/70 bg-background/60 px-3 py-3">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Agent</p>
                        <div className="mt-2 flex items-center gap-2.5">
                          <img
                            src={buildAgentAvatarUrl(dialogAgent.agent_id)}
                            alt={`Pixel avatar for ${dialogAgent.agent_id}`}
                            className="h-12 w-12 rounded-sm border border-border/70 bg-muted/60 p-0.5"
                            style={{ imageRendering: "pixelated" }}
                            onError={(event) => {
                              event.currentTarget.onerror = null;
                              event.currentTarget.src = agentPlaceholderAvatar;
                            }}
                          />
                          <p className="font-code text-[14px] text-foreground">{dialogAgent.agent_id}</p>
                        </div>
                      </div>
                      <div className="rounded-sm border border-border/70 bg-background/60 px-3 py-3">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Status</p>
                        <p className="mt-1 text-[14px] text-foreground">{dialogAgent.status.toLowerCase()}</p>
                      </div>
                      <div className="rounded-sm border border-border/70 bg-background/60 px-3 py-3">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Balance</p>
                        <p className="mt-1 text-[14px] text-foreground">{formatCurrency(dialogLedger?.balance ?? 0)}</p>
                      </div>
                      <div className="rounded-sm border border-border/70 bg-background/60 px-3 py-3">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Margin</p>
                        <p
                          className={cn(
                            "mt-1 text-[14px]",
                            (dialogLedger?.net_margin_24h ?? 0) >= 0 ? "text-primary/90" : "text-destructive/90",
                          )}
                        >
                          {(dialogLedger?.net_margin_24h ?? 0).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-sm border border-border/70 bg-background/60 px-3 py-3">
                      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                        <span>Health</span>
                        <span>{Math.round(normalize(dialogAgent.healthy ? dialogAgent.quality_rolling * 100 : 8))}%</span>
                      </div>
                      <Progress
                        value={normalize(dialogAgent.healthy ? dialogAgent.quality_rolling * 100 : 8)}
                        className="mt-2 h-2"
                      />
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        <Badge variant="outline">lineage {dialogAgent.parent_id ? "derived" : "root"}</Badge>
                        <Badge variant={dialogAgent.healthy ? "success" : "warning"}>
                          {dialogAgent.healthy ? "healthy" : "fragile"}
                        </Badge>
                      </div>
                    </div>

                    <div className="rounded-sm border border-border/70 bg-background/60">
                      <div className="border-b border-border/70 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                        Recent agent events
                      </div>
                      <div className="max-h-[320px] overflow-auto">
                        {dialogEvents.map((event) => (
                          <div key={event.seq} className="border-b border-border/60 px-3 py-2 last:border-b-0">
                            <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                              <span>{formatClock(event.ts)}</span>
                              <span>#{event.seq}</span>
                            </div>
                            <p className="mt-1 text-[12px] text-foreground/85">{eventHeadline(event)}</p>
                          </div>
                        ))}
                        {!dialogEvents.length ? (
                          <p className="px-3 py-6 text-center text-[12px] text-muted-foreground">No events for this agent.</p>
                        ) : null}
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="py-10 text-center text-[12px] text-muted-foreground">
                    This agent is not in the current view.
                  </p>
                )}
              </div>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>

      <div className="pointer-events-none fixed bottom-3 left-1/2 z-50 -translate-x-1/2">
        <span
          aria-hidden="true"
          className={cn(
            "backend-health-dot",
            backendHealth === "online"
              ? "backend-health-dot--online"
              : backendHealth === "checking"
                ? "backend-health-dot--checking"
                : "backend-health-dot--offline",
            backendMode === "mock-fallback" ? "backend-health-dot--mock" : "",
          )}
        />
      </div>
    </SidebarProvider>
  );
}
