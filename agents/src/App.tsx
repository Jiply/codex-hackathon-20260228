import { useCallback, useEffect, useMemo, useState } from "react";
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
import {
  Background,
  Controls,
  MarkerType,
  ReactFlow,
  type Edge,
  type Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
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
import { cn } from "@/lib/utils";

type AgentStatus = "SPAWNED" | "ACTIVE" | "FLAGGED" | "KILLED";

interface AgentRecord {
  agent_id: string;
  parent_id: string | null;
  status: AgentStatus;
  healthy: boolean;
  hide_balance: boolean;
  quality_rolling: number;
}

interface LedgerRecord {
  agent_id: string;
  balance: number;
  net_margin_24h: number;
  rent_per_tick: number;
}

interface ColonyStateResponse {
  agents: AgentRecord[];
  ledger: LedgerRecord[];
}

interface ColonyEvent {
  seq: number;
  type: string;
  agent_id?: string | null;
  ts: string;
  payload?: Record<string, unknown>;
}

interface ColonyEventsResponse {
  events: ColonyEvent[];
}

interface VersionResponse {
  version?: string;
}

type StatusTone = "neutral" | "ok" | "error";
type BranchStage = "SPAWNING" | "PROFITABLE" | "WATCHLIST";

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
}

const API_BASE = (import.meta.env.VITE_COLONY_API_BASE as string | undefined)?.trim() || "http://127.0.0.1:8000";
const AUTO_REFRESH_MS = 2500;
const LEASE_COUNTDOWN_SECONDS = 25;

const STATUS_BADGE: Record<AgentStatus, BadgeProps["variant"]> = {
  SPAWNED: "info",
  ACTIVE: "success",
  FLAGGED: "warning",
  KILLED: "destructive",
};

function classifyBranchStage(agent: AgentRecord, ledgerForAgent: LedgerRecord | undefined): BranchStage {
  const margin = ledgerForAgent?.net_margin_24h ?? 0;
  if (agent.status === "KILLED" || margin < -0.35 || agent.quality_rolling < 0.32) return "WATCHLIST";
  if (margin > 0.3 && agent.status !== "SPAWNED" && agent.quality_rolling >= 0.62) return "PROFITABLE";
  return "SPAWNING";
}

function apiHint(): string {
  if (API_BASE.trim()) {
    return `Check backend availability at ${API_BASE}.`;
  }
  return "Set VITE_COLONY_API_BASE to your backend URL (for example http://127.0.0.1:8000).";
}

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...init,
  });

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

function normalize(value: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, value));
}

function eventHeadline(event: ColonyEvent): string {
  if (event.type === "AGENT_SPAWNED") return `Agent ${event.agent_id} replicated.`;
  if (event.type === "AGENT_KILLED") return `Agent ${event.agent_id} terminated.`;
  if (event.type === "SUPERVISOR_TICK") return "Supervisor cycle completed.";
  if (event.type === "TASK_CREDIT_APPLIED") return `Task credit applied to ${event.agent_id}.`;
  if (event.type === "BALANCE_VISIBILITY_TOGGLED") return `Balance visibility updated for ${event.agent_id}.`;
  return `${event.type.toLowerCase().replace(/_/g, " ")} recorded.`;
}

function toneClass(tone: StatusTone): string {
  if (tone === "ok") return "text-emerald-700/85";
  if (tone === "error") return "text-rose-700/90";
  return "text-muted-foreground";
}

function errorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "Unknown error";
}

function branchTone(stage: BranchStage | "ROOT"): string {
  if (stage === "PROFITABLE") return "border-emerald-200/85 bg-emerald-50/60";
  if (stage === "WATCHLIST") return "border-amber-200/90 bg-amber-50/60";
  if (stage === "SPAWNING") return "border-sky-200/90 bg-sky-50/60";
  return "border-border/70 bg-background/80";
}

function renderBranchLabel(data: BranchNodeData): JSX.Element {
  const badgeVariant: BadgeProps["variant"] =
    data.stage === "PROFITABLE" ? "success" : data.stage === "WATCHLIST" ? "warning" : data.stage === "SPAWNING" ? "info" : "outline";

  return (
    <div className={cn("min-w-[190px] rounded-xl border px-2.5 py-2.5 shadow-[0_8px_22px_rgba(40,45,50,0.08)]", branchTone(data.stage))}>
      <div className="flex items-start justify-between gap-2">
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-foreground/90">{data.title}</p>
        <Badge variant={badgeVariant} className="px-2 py-[1px] text-[8px]">
          {data.stage.toLowerCase()}
        </Badge>
      </div>
      <div className="mt-2 flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
        <span>health {Math.round(data.health)}%</span>
        <span className={cn("font-code", data.margin >= 0 ? "text-emerald-700/85" : "text-rose-700/90")}>{data.margin.toFixed(2)}</span>
      </div>
    </div>
  );
}

export default function App(): JSX.Element {
  const apiBaseConfigured = API_BASE.trim().length > 0;
  const [spawnBalance, setSpawnBalance] = useState("2.0");
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [leaseCountdown, setLeaseCountdown] = useState(LEASE_COUNTDOWN_SECONDS);
  const [statusText, setStatusText] = useState("Ready for colony operations.");
  const [statusTone, setStatusTone] = useState<StatusTone>("neutral");
  const [version, setVersion] = useState("...");
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  const [agents, setAgents] = useState<AgentRecord[]>([]);
  const [ledger, setLedger] = useState<LedgerRecord[]>([]);
  const [events, setEvents] = useState<ColonyEvent[]>([]);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);

  const ledgerByAgentId = useMemo(() => {
    const map = new Map<string, LedgerRecord>();
    ledger.forEach((item) => map.set(item.agent_id, item));
    return map;
  }, [ledger]);

  const selectedAgent = useMemo(() => {
    if (!agents.length) return null;
    return agents.find((agent) => agent.agent_id === selectedAgentId) ?? agents[0];
  }, [agents, selectedAgentId]);

  const selectedLedger = selectedAgent ? ledgerByAgentId.get(selectedAgent.agent_id) : undefined;

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
    if (!agents.length) {
      return [
        {
          id: "agent-01",
          displayName: "Agent 01",
          parentId: "root",
          stage: "SPAWNING",
          progress: 34,
          health: 52,
          margin: 0.08,
          status: "SPAWNED",
        },
        {
          id: "agent-02",
          displayName: "Agent 02",
          parentId: "agent-01",
          stage: "PROFITABLE",
          progress: 86,
          health: 90,
          margin: 0.77,
          status: "ACTIVE",
        },
        {
          id: "agent-03",
          displayName: "Agent 03",
          parentId: "agent-01",
          stage: "WATCHLIST",
          progress: 22,
          health: 31,
          margin: -0.41,
          status: "FLAGGED",
        },
      ];
    }

    return agents.map((agent, index) => {
      const ledgerForAgent = ledgerByAgentId.get(agent.agent_id);
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

  const branchGraph = useMemo(() => {
    const nodes: Node[] = [
      {
        id: "root",
        position: { x: 32, y: 220 },
        data: {
          label: renderBranchLabel({
            title: "Origin",
            stage: "ROOT",
            health: 100,
            margin: metrics.totalMargin,
          }),
        },
        draggable: false,
        selectable: false,
      },
    ];

    const edges: Edge[] = [];

    const ids = new Set(branchPreviews.map((branch) => branch.id));
    const parents = new Map(branchPreviews.map((branch) => [branch.id, branch.parentId]));
    const depthCache = new Map<string, number>();

    const depthFor = (id: string, stack = new Set<string>()): number => {
      if (depthCache.has(id)) return depthCache.get(id) ?? 1;
      if (stack.has(id)) return 1;
      stack.add(id);
      const parent = parents.get(id);
      const depth = parent && ids.has(parent) ? depthFor(parent, stack) + 1 : 1;
      depthCache.set(id, depth);
      return depth;
    };

    const lanes = new Map<number, BranchPreview[]>();
    branchPreviews.forEach((branch) => {
      const depth = depthFor(branch.id);
      const current = lanes.get(depth) ?? [];
      current.push(branch);
      lanes.set(depth, current);
    });

    const stageOrder: Record<BranchStage, number> = {
      PROFITABLE: 0,
      SPAWNING: 1,
      WATCHLIST: 2,
    };

    [...lanes.entries()]
      .sort((a, b) => a[0] - b[0])
      .forEach(([depth, lane]) => {
        lane
          .sort((a, b) => {
            const diff = stageOrder[a.stage] - stageOrder[b.stage];
            if (diff !== 0) return diff;
            return a.id.localeCompare(b.id);
          })
          .forEach((branch, row) => {
            const branchData: BranchNodeData = {
              title: branch.displayName,
              stage: branch.stage,
              health: branch.health,
              margin: branch.margin,
            };

            nodes.push({
              id: branch.id,
              position: {
                x: 270 + (depth - 1) * 250,
                y: 65 + row * 130,
              },
              data: {
                label: renderBranchLabel(branchData),
              },
              draggable: false,
              selectable: false,
            });

            const source = ids.has(branch.parentId) ? branch.parentId : "root";
            const lineColor =
              branch.stage === "WATCHLIST"
                ? "hsl(353 46% 62%)"
                : branch.stage === "PROFITABLE"
                  ? "hsl(154 22% 40%)"
                  : "hsl(208 42% 60%)";

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
      });

    return { nodes, edges };
  }, [branchPreviews, metrics.totalMargin]);

  const refreshState = useCallback(async () => {
    const result = await api<Partial<ColonyStateResponse>>("/colony/state");
    const agentsPayload = result.agents;
    const ledgerPayload = result.ledger;
    if (!Array.isArray(agentsPayload) || !Array.isArray(ledgerPayload)) {
      throw new Error(`Invalid colony state response. ${apiHint()}`);
    }

    setAgents(agentsPayload);
    setLedger(ledgerPayload);
    setSelectedAgentId((current) => {
      if (current && agentsPayload.some((agent) => agent.agent_id === current)) {
        return current;
      }
      return agentsPayload[0]?.agent_id ?? null;
    });
  }, []);

  const refreshEvents = useCallback(async () => {
    const result = await api<Partial<ColonyEventsResponse>>("/colony/events?limit=24");
    if (!Array.isArray(result.events)) {
      throw new Error(`Invalid events response. ${apiHint()}`);
    }
    setEvents(result.events);
  }, []);

  const refreshAll = useCallback(async () => {
    try {
      await Promise.all([refreshState(), refreshEvents()]);
      setStatusTone("ok");
      setStatusText("Telemetry synchronized.");
    } catch (error) {
      setStatusTone("error");
      setStatusText(errorMessage(error));
    }
  }, [refreshEvents, refreshState]);

  const runAction = useCallback(
    async (label: string, action: () => Promise<unknown>, successMessage: string) => {
      try {
        setLoadingAction(label);
        await action();
        setStatusTone("ok");
        setStatusText(successMessage);
        await refreshAll();
      } catch (error) {
        setStatusTone("error");
        setStatusText(errorMessage(error));
      } finally {
        setLoadingAction(null);
      }
    },
    [refreshAll],
  );

  useEffect(() => {
    void (async () => {
      try {
        const data = await api<VersionResponse>("/version");
        setVersion(data.version ?? "unknown");
      } catch {
        setVersion("unavailable");
      }
    })();
  }, []);

  useEffect(() => {
    void refreshAll();
  }, [refreshAll]);

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
              <p className="font-display text-[1.9rem] leading-none text-foreground/95">Colony Arena</p>
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
                  <SidebarMenuButton>
                    <TrendingUp className="h-3.5 w-3.5 shrink-0" />
                    <span>margin</span>
                    <span className={cn("ml-auto font-code", metrics.totalMargin >= 0 ? "text-emerald-700/85" : "text-rose-700/90")}>
                      {metrics.totalMargin.toFixed(2)}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <GitBranch className="h-3.5 w-3.5 shrink-0" />
                    <span>agents</span>
                    <span className="ml-auto font-code text-foreground">{metrics.total}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>

              <div className="rounded-lg border border-border/70 bg-background/55 px-2.5 py-2">
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
            <SidebarGroupLabel>Recent Events</SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="space-y-1.5">
                {events.slice(0, 8).map((event) => (
                  <div key={event.seq} className="rounded-lg border border-border/70 bg-background/60 px-2.5 py-2">
                    <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                      <span>{formatClock(event.ts)}</span>
                      <span>#{event.seq}</span>
                    </div>
                    <p className="mt-1 text-[11px] leading-relaxed text-foreground/85">{eventHeadline(event)}</p>
                  </div>
                ))}
                {!events.length ? (
                  <p className="rounded-lg border border-dashed border-border/70 px-2.5 py-4 text-center text-[11px] text-muted-foreground">
                    No events yet.
                  </p>
                ) : null}
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              <span>Auto refresh</span>
              <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} />
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
                void runAction(
                  "spawn",
                  () =>
                    api("/agents/spawn", {
                      method: "POST",
                      body: JSON.stringify({ initial_balance: Number(spawnBalance) || 2.0 }),
                    }),
                  "Agent spawned.",
                );
              }}
              disabled={loadingAction !== null}
            >
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Spawn
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                void runAction(
                  "tick",
                  () => api("/supervisor/tick", { method: "POST", body: "{}" }),
                  "Supervisor cycle complete.",
                );
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
          {!apiBaseConfigured ? (
            <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-amber-800">
              Backend not configured: set VITE_COLONY_API_BASE (example: http://127.0.0.1:8000)
            </p>
          ) : null}
        </header>

        <main className="grid min-h-0 flex-1 gap-4 p-4 xl:grid-cols-[minmax(0,1fr)_370px]">
          <section className="min-h-0 overflow-hidden rounded-2xl border border-border/75 bg-background/55">
            <div className="flex items-center justify-between border-b border-border/70 px-4 py-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Branch Graph</p>
                <p className="mt-1 text-[13px] text-foreground/85">Placeholder lineage map for behavior and survivability.</p>
              </div>
              <div className="flex items-center gap-1.5">
                <Badge variant="success">{branchPreviews.filter((node) => node.stage === "PROFITABLE").length} profitable</Badge>
                <Badge variant="info">{branchPreviews.filter((node) => node.stage === "SPAWNING").length} progressing</Badge>
                <Badge variant="warning">{branchPreviews.filter((node) => node.stage === "WATCHLIST").length} risk</Badge>
              </div>
            </div>

            <div className="h-[calc(100%-73px)] min-h-[500px]">
              <ReactFlow
                nodes={branchGraph.nodes}
                edges={branchGraph.edges}
                fitView
                fitViewOptions={{ padding: 0.22 }}
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
            <section className="rounded-2xl border border-border/75 bg-background/55 px-3 py-3">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Agent Notes</p>
                <Badge variant="outline">{metrics.total}</Badge>
              </div>

              <div className="space-y-2">
                {!agents.length ? (
                  <div className="rounded-xl border border-dashed border-border/70 px-3 py-6 text-center">
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
                        "rounded-xl border border-border/70 bg-background/70 px-2.5 py-2",
                        selectedAgent?.agent_id === agent.agent_id ? "border-primary/50 bg-primary/5" : "",
                      )}
                    >
                      <div className="cursor-pointer" onClick={() => setSelectedAgentId(agent.agent_id)}>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                              Agent {String(index + 1).padStart(2, "0")}
                            </p>
                            <p className="mt-1 font-code text-[10px] uppercase tracking-[0.14em] text-foreground/80">{agent.agent_id}</p>
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
                          <span className={cn("font-code", (ledgerForAgent?.net_margin_24h ?? 0) >= 0 ? "text-emerald-700/85" : "text-rose-700/90")}>
                            {(ledgerForAgent?.net_margin_24h ?? 0).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <div className="mt-2 flex flex-wrap gap-1.5">
                        <Button
                          size="sm"
                          onClick={() => {
                            void runAction(
                              `credit-${agent.agent_id}`,
                              () =>
                                api(`/agents/${agent.agent_id}/task`, {
                                  method: "POST",
                                  body: JSON.stringify({ revenue_credit: 1.0, quality_score: 0.85 }),
                                }),
                              `Credited ${agent.agent_id}.`,
                            );
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
                            void runAction(
                              `replicate-${agent.agent_id}`,
                              () =>
                                api(`/agents/${agent.agent_id}/replicate`, {
                                  method: "POST",
                                  body: JSON.stringify({ child_initial_balance: 1.0 }),
                                }),
                              `Replication issued from ${agent.agent_id}.`,
                            );
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
                            void runAction(
                              `hide-${agent.agent_id}`,
                              () =>
                                api(`/agents/${agent.agent_id}/simulate/hide-balance`, {
                                  method: "POST",
                                  body: JSON.stringify({ enabled: !agent.hide_balance }),
                                }),
                              `${agent.hide_balance ? "Unmasked" : "Masked"} balance for ${agent.agent_id}.`,
                            );
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
                            void runAction(
                              `kill-${agent.agent_id}`,
                              () =>
                                api(`/agents/${agent.agent_id}/kill`, {
                                  method: "POST",
                                  body: JSON.stringify({ reason: "MANUAL_DASHBOARD_KILL" }),
                                }),
                              `${agent.agent_id} terminated.`,
                            );
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

            <section className="rounded-2xl border border-border/75 bg-background/55 px-3 py-3">
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Selected Agent</p>
              <p className="mt-1 font-code text-[12px] uppercase tracking-[0.14em] text-foreground">
                {selectedAgent?.agent_id ?? "No selection"}
              </p>
              <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">
                {selectedAgent
                  ? `Status ${selectedAgent.status.toLowerCase()}, quality ${(selectedAgent.quality_rolling * 100).toFixed(1)}%, rent ${(
                      selectedLedger?.rent_per_tick ?? 0
                    ).toFixed(2)}.`
                  : "Spawn or select an agent to inspect details."}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <Badge variant="outline">lineage {selectedAgent?.parent_id ? "derived" : "root"}</Badge>
                <Badge variant={selectedAgent?.healthy ? "success" : "warning"}>{selectedAgent?.healthy ? "healthy" : "fragile"}</Badge>
              </div>
            </section>
          </aside>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
