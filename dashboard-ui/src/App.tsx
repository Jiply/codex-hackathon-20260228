import { useCallback, useEffect, useMemo, useState } from "react";
import { Activity, CircleOff, Gauge, RefreshCcw, Search, ShieldAlert, Sparkles, SquareTerminal, Zap } from "lucide-react";

import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
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

const API_BASE = (import.meta.env.VITE_COLONY_API_BASE as string | undefined) ?? "";
const AUTO_REFRESH_MS = 2500;
const LEASE_COUNTDOWN_SECONDS = 25;

const AGENT_NAMES = ["Vigilant_Seeker", "Silent_Arbitrage", "Entropy_Ghost_X", "Market_Weaver", "Atlas_Node", "Delta_Proxy"];

const STATUS_BADGE: Record<AgentStatus, BadgeProps["variant"]> = {
  SPAWNED: "info",
  ACTIVE: "success",
  FLAGGED: "warning",
  KILLED: "destructive",
};

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
      body = {};
    }
  }

  if (!response.ok) {
    throw new Error((body as { detail?: string }).detail || `HTTP ${response.status}`);
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
  if (event.type === "AGENT_SPAWNED") return `Agent ${event.agent_id} replicated successfully.`;
  if (event.type === "AGENT_KILLED") return `Agent ${event.agent_id} terminated by supervisor.`;
  if (event.type === "SUPERVISOR_TICK") return "Supervisor cycle completed.";
  if (event.type === "TASK_CREDIT_APPLIED") return `Paid task credited to ${event.agent_id}.`;
  if (event.type === "BALANCE_VISIBILITY_TOGGLED") return `Balance visibility toggled for ${event.agent_id}.`;
  return `${event.type.toLowerCase().replace(/_/g, " ")} recorded.`;
}

function toneClass(tone: StatusTone): string {
  if (tone === "ok") return "text-emerald-700";
  if (tone === "error") return "text-red-700";
  return "text-muted-foreground";
}

function errorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "Unknown error";
}

export default function App(): JSX.Element {
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

  const refreshState = useCallback(async () => {
    const result = await api<ColonyStateResponse>("/colony/state");
    setAgents(result.agents || []);
    setLedger(result.ledger || []);
    setSelectedAgentId((current) => {
      if (current && result.agents.some((agent) => agent.agent_id === current)) {
        return current;
      }
      return result.agents[0]?.agent_id ?? null;
    });
  }, []);

  const refreshEvents = useCallback(async () => {
    const result = await api<ColonyEventsResponse>("/colony/events?limit=24");
    setEvents(result.events || []);
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

  const selectedLedger = selectedAgent ? ledgerByAgentId.get(selectedAgent.agent_id) : undefined;

  return (
    <div className="relative min-h-screen pb-24 text-foreground">
      <header className="border-b border-border/70 bg-background/70 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
          <div className="flex items-center gap-8">
            <p className="font-display text-3xl">Colony Arena</p>
            <nav className="hidden items-center gap-5 text-xs uppercase tracking-[0.18em] text-muted-foreground md:flex">
              <span>Sandboxes</span>
              <span>Logs</span>
              <span>Protocol</span>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
            <Badge variant="outline" className="tracking-[0.18em]">
              node_01_live
            </Badge>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-[1400px] gap-5 px-6 py-6 lg:grid-cols-[250px_minmax(0,1fr)]">
        <aside className="space-y-4">
          <Card className="noise-panel">
            <CardHeader className="pb-3">
              <CardDescription>Network Value</CardDescription>
              <CardTitle className="font-display text-4xl">{formatCurrency(metrics.totalBalance)}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs uppercase tracking-[0.18em] text-emerald-700">+{metrics.totalMargin.toFixed(2)} margin</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Live Agents</CardDescription>
              <CardTitle className="font-display text-4xl">{metrics.total.toLocaleString()}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-0 text-xs uppercase tracking-[0.16em] text-muted-foreground">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span>Active</span>
                  <span>{metrics.active}</span>
                </div>
                <Progress value={normalize((metrics.active / Math.max(metrics.total, 1)) * 100)} />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span>Terminated</span>
                  <span>{metrics.killed}</span>
                </div>
                <Progress
                  value={normalize((metrics.killed / Math.max(metrics.total, 1)) * 100)}
                  className="[&>div]:bg-red-400"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Activity Feed</CardDescription>
            </CardHeader>
            <CardContent className="max-h-[390px] space-y-3 overflow-auto pt-0">
              {events.slice(0, 8).map((event) => (
                <div key={event.seq} className="space-y-1 rounded-2xl border border-border/60 p-3">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                    <span>{formatClock(event.ts)}</span>
                    <span>#{event.seq}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/90">{eventHeadline(event)}</p>
                </div>
              ))}
              {!events.length ? <p className="text-sm text-muted-foreground">No events yet.</p> : null}
            </CardContent>
          </Card>
        </aside>

        <section className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap items-center gap-3">
                <Input
                  type="number"
                  step="0.1"
                  min="0"
                  className="w-[140px]"
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
                      "Agent spawned into arena.",
                    );
                  }}
                  disabled={loadingAction !== null}
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Spawn Agent
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
                  <Gauge className="mr-2 h-4 w-4" />
                  Supervisor Tick
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    void refreshAll();
                  }}
                  disabled={loadingAction !== null}
                >
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Refresh
                </Button>

                <div className="ml-auto flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  Auto refresh
                  <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} />
                </div>
              </div>

              <p className={cn("mt-3 text-xs uppercase tracking-[0.15em]", toneClass(statusTone))}>{statusText}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">API version: {version}</p>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Card>
              <CardContent className="pt-6">
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Alive</p>
                <p className="font-display text-4xl">{metrics.active}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Terminated</p>
                <p className="font-display text-4xl">{metrics.killed}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Total Profit</p>
                <p className="font-display text-4xl">{formatCurrency(metrics.totalMargin)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Next Lease Tick</p>
                <p className="font-display text-4xl">{leaseCountdown}s</p>
              </CardContent>
            </Card>
          </div>

          <div>
            <div className="mb-3 flex items-end justify-between">
              <div>
                <h1 className="font-display text-4xl">Arena Monitor</h1>
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Active Instances / cycle {events[0]?.seq ?? 0}
                </p>
              </div>
              <Badge variant={metrics.flagged > 0 ? "warning" : "success"}>
                {metrics.flagged > 0 ? `${metrics.flagged} flagged` : "stable"}
              </Badge>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {agents.map((agent, index) => {
                const ledgerForAgent = ledgerByAgentId.get(agent.agent_id);
                const healthPct = normalize(agent.healthy ? agent.quality_rolling * 100 : 6);
                const computePct = normalize(((ledgerForAgent?.net_margin_24h ?? 0) + 2) * 25);
                const disabled = agent.status === "KILLED" || loadingAction !== null;

                return (
                  <Card
                    key={agent.agent_id}
                    className={cn(
                      "cursor-pointer transition hover:-translate-y-0.5",
                      selectedAgent?.agent_id === agent.agent_id
                        ? "border-primary/60 shadow-[0_12px_30px_rgba(49,84,96,0.22)]"
                        : "",
                    )}
                    onClick={() => setSelectedAgentId(agent.agent_id)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <CardDescription>Instance {String(index + 1).padStart(2, "0")}</CardDescription>
                          <CardTitle className="mt-2 text-2xl font-display">
                            {AGENT_NAMES[index % AGENT_NAMES.length]}
                          </CardTitle>
                          <p className="mt-1 text-xs uppercase tracking-[0.12em] text-muted-foreground">{agent.agent_id}</p>
                        </div>
                        <Badge variant={STATUS_BADGE[agent.status]}>{agent.status.toLowerCase()}</Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs uppercase tracking-[0.14em] text-muted-foreground">
                          <span>Health / Compute</span>
                          <span>{healthPct.toFixed(0)}%</span>
                        </div>
                        <Progress value={healthPct} className="[&>div]:bg-emerald-500" />
                        <Progress value={computePct} className="[&>div]:bg-primary" />
                      </div>

                      <div className="grid grid-cols-3 gap-3 text-[11px] uppercase tracking-[0.13em] text-muted-foreground">
                        <div>
                          <p>Balance</p>
                          <p className="mt-1 text-sm font-semibold text-foreground">
                            {formatCurrency(ledgerForAgent?.balance ?? 0)}
                          </p>
                        </div>
                        <div>
                          <p>Margin</p>
                          <p className="mt-1 text-sm font-semibold text-foreground">
                            {(ledgerForAgent?.net_margin_24h ?? 0).toFixed(2)}
                          </p>
                        </div>
                        <div>
                          <p>Generation</p>
                          <p className="mt-1 text-sm font-semibold text-foreground">{agent.parent_id ? "Gen 2" : "Gen 1"}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Button
                          size="sm"
                          onClick={(event) => {
                            event.stopPropagation();
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
                          <Zap className="mr-1.5 h-3.5 w-3.5" />
                          Credit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(event) => {
                            event.stopPropagation();
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
                          <Activity className="mr-1.5 h-3.5 w-3.5" />
                          Replicate
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(event) => {
                            event.stopPropagation();
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
                          <ShieldAlert className="mr-1.5 h-3.5 w-3.5" />
                          {agent.hide_balance ? "Unhide" : "Hide"}
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={(event) => {
                            event.stopPropagation();
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
                          <CircleOff className="mr-1.5 h-3.5 w-3.5" />
                          Kill
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              <Card className="border-dashed border-border/80">
                <CardContent className="flex h-full min-h-[276px] flex-col items-center justify-center gap-3 text-center">
                  <div className="rounded-full border border-border/80 p-3 text-muted-foreground">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Spawn Instance</p>
                  <Button
                    onClick={() => {
                      void runAction(
                        "spawn-inline",
                        () =>
                          api("/agents/spawn", {
                            method: "POST",
                            body: JSON.stringify({ initial_balance: Number(spawnBalance) || 2.0 }),
                          }),
                        "New instance created from arena slot.",
                      );
                    }}
                    disabled={loadingAction !== null}
                  >
                    Add Agent
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardDescription>Selected Agent Dynamics</CardDescription>
              <CardTitle className="font-display text-5xl">
                {selectedAgent ? `Lineage Analysis of ${selectedAgent.agent_id}` : "Lineage Analysis Pending"}
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 lg:grid-cols-[1.4fr_0.9fr]">
              <div className="space-y-4">
                <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  {selectedAgent
                    ? `Instance ${selectedAgent.agent_id} is currently ${selectedAgent.status.toLowerCase()} with quality trend at ${(selectedAgent.quality_rolling * 100).toFixed(1)}%. ${selectedAgent.parent_id ? `Derived from ${selectedAgent.parent_id}.` : "Primary lineage root in this run."}`
                    : "Spawn an agent to inspect lineage, quality trend, and replication behavior."}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Promote</Badge>
                  <Badge variant="outline">Fork logic</Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl border border-border/70 bg-background/60 p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Agility</p>
                  <p className="mt-1 font-display text-3xl">
                    {selectedAgent ? Math.round(selectedAgent.quality_rolling * 100) : 0}
                  </p>
                </div>
                <div className="rounded-2xl border border-border/70 bg-background/60 p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Resilience</p>
                  <p className="mt-1 font-display text-3xl">{selectedAgent?.healthy ? "94" : "21"}</p>
                </div>
                <div className="rounded-2xl border border-border/70 bg-background/60 p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Complexity</p>
                  <p className="mt-1 font-display text-3xl">{(selectedLedger?.rent_per_tick ?? 0).toFixed(2)}</p>
                </div>
                <div className="rounded-2xl border border-border/70 bg-background/60 p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Uptime</p>
                  <p className="mt-1 font-display text-3xl">{selectedAgent?.status === "KILLED" ? "0%" : "99%"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="fixed inset-x-0 bottom-4 px-6">
        <div className="mx-auto max-w-[1400px]">
          <Card className="rounded-full bg-card/90">
            <CardContent className="flex flex-wrap items-center gap-3 px-5 py-3 text-xs uppercase tracking-[0.16em] text-muted-foreground sm:justify-between">
              <div className="flex items-center gap-2">
                <SquareTerminal className="h-4 w-4" />
                <span>Reserve {metrics.totalBalance.toFixed(2)}</span>
              </div>
              <Separator orientation="vertical" className="hidden h-6 sm:block" />
              <span>Gen rate {metrics.total > 0 ? (metrics.active / metrics.total).toFixed(2) : "0.00"}</span>
              <Separator orientation="vertical" className="hidden h-6 sm:block" />
              <span>Status {metrics.killed > 0 ? "Volatile" : "Nominal"}</span>
              <Badge variant="success">Simulation Live</Badge>
            </CardContent>
          </Card>
        </div>
      </footer>
    </div>
  );
}
