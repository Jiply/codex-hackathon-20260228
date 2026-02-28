import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { installMockFetch, uninstallMockFetch } from "@/mocks/fetchInterceptor";

async function request(path: string, init?: RequestInit): Promise<{ status: number; body: any }> {
  const response = await fetch(`http://127.0.0.1:8000${path}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...init,
  });
  const text = await response.text();
  const body = text ? JSON.parse(text) : {};
  return { status: response.status, body };
}

describe("mock endpoint contracts", () => {
  beforeEach(() => {
    installMockFetch({ scenario: "seeded" });
  });

  afterEach(() => {
    uninstallMockFetch();
  });

  it("GET /version", async () => {
    const result = await request("/version");
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject({ service: "mock-colony-api" });
    expect(typeof result.body.version).toBe("string");
  });

  it("GET /colony/state", async () => {
    const result = await request("/colony/state");
    expect(result.status).toBe(200);
    expect(Array.isArray(result.body.agents)).toBe(true);
    expect(Array.isArray(result.body.ledger)).toBe(true);
    expect(result.body.agents.length).toBeGreaterThan(0);
  });

  it("GET /colony/events respects limit", async () => {
    const result = await request("/colony/events?limit=3");
    expect(result.status).toBe(200);
    expect(result.body.events).toHaveLength(3);
    expect(result.body.events[0].seq).toBeGreaterThanOrEqual(result.body.events[1].seq);
  });

  it("GET /colony/logs paginates and validates cursor", async () => {
    const page1 = await request("/colony/logs?limit=8");
    expect(page1.status).toBe(200);
    expect(page1.body.logs).toHaveLength(8);
    expect(typeof page1.body.next_cursor).toBe("string");

    const page2 = await request(`/colony/logs?limit=8&cursor=${encodeURIComponent(page1.body.next_cursor)}`);
    expect(page2.status).toBe(200);
    expect(page2.body.logs).toHaveLength(8);
    expect(page2.body.logs[0].id).not.toBe(page1.body.logs[0].id);

    const invalid = await request("/colony/logs?limit=8&cursor=bad-cursor");
    expect(invalid.status).toBe(400);
    expect(invalid.body.detail).toContain("Invalid cursor");
  });

  it("POST /agents/spawn creates records", async () => {
    const spawn = await request("/agents/spawn", {
      method: "POST",
      body: JSON.stringify({ initial_balance: 4.2 }),
    });
    expect(spawn.status).toBe(200);
    expect(spawn.body.agent.agent_id).toContain("agt_mock_");

    const state = await request("/colony/state");
    expect(state.body.agents.some((agent: any) => agent.agent_id === spawn.body.agent.agent_id)).toBe(true);
  });

  it("POST /supervisor/tick returns summary", async () => {
    const tick = await request("/supervisor/tick", {
      method: "POST",
      body: "{}",
    });
    expect(tick.status).toBe(200);
    expect(typeof tick.body.checked).toBe("number");
    expect(typeof tick.body.killed).toBe("number");
    expect(typeof tick.body.charged).toBe("number");
  });

  it("POST /agents/:id/task handles killed conflicts", async () => {
    const state = await request("/colony/state");
    const active = state.body.agents.find((agent: any) => agent.status !== "KILLED");
    expect(active).toBeTruthy();

    const kill = await request(`/agents/${active.agent_id}/kill`, {
      method: "POST",
      body: JSON.stringify({ reason: "MANUAL_DASHBOARD_KILL" }),
    });
    expect(kill.status).toBe(200);

    const task = await request(`/agents/${active.agent_id}/task`, {
      method: "POST",
      body: JSON.stringify({ revenue_credit: 1, quality_score: 0.85 }),
    });
    expect(task.status).toBe(409);
    expect(task.body.detail).toContain("killed");
  });

  it("POST /agents/:id/replicate enforces thresholds and success", async () => {
    const state = await request("/colony/state");
    const failing = state.body.agents.find((agent: any) => agent.status === "FLAGGED") ?? state.body.agents[0];
    const failReplicate = await request(`/agents/${failing.agent_id}/replicate`, {
      method: "POST",
      body: JSON.stringify({ child_initial_balance: 1.0 }),
    });
    expect([200, 409]).toContain(failReplicate.status);

    const successCandidate = state.body.agents.find((agent: any) => {
      const row = state.body.ledger.find((entry: any) => entry.agent_id === agent.agent_id);
      return agent.status !== "KILLED" && Number(agent.quality_rolling) >= 0.62 && Number(row?.net_margin_24h ?? 0) >= 0.2;
    });

    expect(successCandidate).toBeTruthy();
    const success = await request(`/agents/${successCandidate.agent_id}/replicate`, {
      method: "POST",
      body: JSON.stringify({ child_initial_balance: 1.0 }),
    });
    expect(success.status).toBe(200);
    expect(success.body.child_agent.parent_id).toBe(successCandidate.agent_id);
  });

  it("POST /agents/:id/simulate/hide-balance toggles value", async () => {
    const state = await request("/colony/state");
    const target = state.body.agents.find((agent: any) => agent.status !== "KILLED");

    const hide = await request(`/agents/${target.agent_id}/simulate/hide-balance`, {
      method: "POST",
      body: JSON.stringify({ enabled: true }),
    });
    expect(hide.status).toBe(200);
    expect(hide.body.hide_balance).toBe(true);
  });

  it("POST /agents/:id/kill is idempotent", async () => {
    const state = await request("/colony/state");
    const target = state.body.agents[0];

    const first = await request(`/agents/${target.agent_id}/kill`, {
      method: "POST",
      body: JSON.stringify({ reason: "MANUAL_DASHBOARD_KILL" }),
    });
    const second = await request(`/agents/${target.agent_id}/kill`, {
      method: "POST",
      body: JSON.stringify({ reason: "MANUAL_DASHBOARD_KILL" }),
    });

    expect(first.status).toBe(200);
    expect(second.status).toBe(200);
    expect(second.body.agent.status).toBe("KILLED");
  });

  it("supports fault injection: forced status and malformed JSON", async () => {
    uninstallMockFetch();
    installMockFetch({
      scenario: "seeded",
      faults: {
        "GET /version": { status: 503, detail: "forced outage" },
        "GET /colony/logs": { malformedJson: true },
      },
    });

    const forced = await request("/version");
    expect(forced.status).toBe(503);
    expect(forced.body.detail).toBe("forced outage");

    const raw = await fetch("http://127.0.0.1:8000/colony/logs?limit=8");
    expect(raw.status).toBe(200);
    await expect(raw.json()).rejects.toBeTruthy();
  });
});
