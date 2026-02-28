from __future__ import annotations


def render_dashboard_html() -> str:
    return """
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Mortal Replicator Dashboard</title>
  <style>
    :root {
      --bg: #0b1220;
      --panel: #111a2b;
      --panel2: #18233a;
      --text: #e5ecf4;
      --muted: #9fb1c7;
      --ok: #40c980;
      --warn: #f3b43f;
      --bad: #ef6262;
      --line: #2b3a56;
      --accent: #59a6ff;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      color: var(--text);
      background: radial-gradient(circle at 90% -10%, #1a3a69, var(--bg) 42%);
      font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif;
    }
    .wrap { max-width: 1180px; margin: 0 auto; padding: 16px; display: grid; gap: 12px; }
    .card {
      border: 1px solid var(--line);
      border-radius: 12px;
      background: linear-gradient(180deg, var(--panel), var(--panel2));
      padding: 12px;
    }
    .top { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
    .top input { padding: 8px; border-radius: 8px; border: 1px solid var(--line); background: #0f1728; color: var(--text); }
    button {
      border: 0;
      border-radius: 8px;
      padding: 8px 10px;
      background: linear-gradient(180deg, #2a77ff, #1f5acc);
      color: #fff;
      cursor: pointer;
      font-weight: 600;
    }
    button.alt { background: linear-gradient(180deg, #344865, #2a3b53); }
    .grid { display: grid; gap: 10px; grid-template-columns: repeat(4, minmax(0, 1fr)); }
    .metric { font-size: 30px; font-weight: 700; margin-top: 4px; }
    .muted { color: var(--muted); font-size: 13px; }
    table { width: 100%; border-collapse: collapse; font-size: 13px; }
    th, td { text-align: left; padding: 8px 6px; border-bottom: 1px solid var(--line); }
    th { color: var(--muted); font-weight: 600; }
    .pill {
      display: inline-block;
      border-radius: 999px;
      font-weight: 700;
      font-size: 11px;
      letter-spacing: .2px;
      padding: 3px 8px;
    }
    .ACTIVE { color: var(--ok); background: rgba(64, 201, 128, .18); }
    .FLAGGED { color: var(--warn); background: rgba(243, 180, 63, .2); }
    .SPAWNED { color: var(--accent); background: rgba(89, 166, 255, .2); }
    .KILLED { color: var(--bad); background: rgba(239, 98, 98, .2); }
    .events {
      max-height: 320px;
      overflow: auto;
      border: 1px solid var(--line);
      border-radius: 10px;
      padding: 8px;
      background: rgba(0,0,0,.2);
      display: grid;
      gap: 8px;
    }
    .event-row {
      border: 1px solid var(--line);
      border-left: 4px solid var(--accent);
      border-radius: 8px;
      padding: 8px 10px;
      background: rgba(15, 24, 40, .75);
    }
    .event-row.sev-good { border-left-color: var(--ok); }
    .event-row.sev-info { border-left-color: var(--accent); }
    .event-row.sev-warn { border-left-color: var(--warn); }
    .event-row.sev-bad { border-left-color: var(--bad); }
    .event-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 4px;
    }
    .event-meta {
      display: flex;
      align-items: center;
      gap: 6px;
      min-width: 0;
    }
    .event-badge {
      display: inline-block;
      border-radius: 999px;
      padding: 2px 7px;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: .35px;
      border: 1px solid transparent;
      text-transform: uppercase;
      white-space: nowrap;
    }
    .event-badge.sev-good { color: var(--ok); background: rgba(64, 201, 128, .14); border-color: rgba(64, 201, 128, .3); }
    .event-badge.sev-info { color: var(--accent); background: rgba(89, 166, 255, .14); border-color: rgba(89, 166, 255, .3); }
    .event-badge.sev-warn { color: var(--warn); background: rgba(243, 180, 63, .16); border-color: rgba(243, 180, 63, .34); }
    .event-badge.sev-bad { color: var(--bad); background: rgba(239, 98, 98, .16); border-color: rgba(239, 98, 98, .35); }
    .event-agent {
      color: var(--muted);
      font-size: 11px;
      font-family: ui-monospace, Menlo, monospace;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 160px;
    }
    .event-time {
      color: var(--muted);
      font-size: 11px;
      white-space: nowrap;
    }
    .event-msg {
      font-size: 13px;
      line-height: 1.35;
    }
    .event-seq {
      color: var(--muted);
      font-size: 11px;
      margin-top: 3px;
    }
    .event-empty {
      color: var(--muted);
      font-size: 13px;
      padding: 6px 2px;
    }
    @media (max-width: 920px) {
      .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
    @media (max-width: 620px) {
      .grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="card">
      <div class="top">
        <input id="spawnBalance" type="number" value="2.0" step="0.1" />
        <button id="spawnButton" onclick="spawnAgent()">Spawn Agent</button>
        <button class="alt" onclick="tick()">Supervisor Tick</button>
        <button class="alt" onclick="refreshAll()">Refresh</button>
        <label class="muted">Auto refresh <input type="checkbox" id="autoRefresh" checked /></label>
      </div>
      <div id="status" class="muted" style="margin-top:8px;"></div>
      <div id="versionText" class="muted" style="margin-top:4px;">API version: ...</div>
    </div>

    <div class="grid">
      <div class="card"><div class="muted">Total</div><div id="m_total" class="metric">0</div></div>
      <div class="card"><div class="muted">Active</div><div id="m_active" class="metric">0</div></div>
      <div class="card"><div class="muted">Flagged</div><div id="m_flagged" class="metric">0</div></div>
      <div class="card"><div class="muted">Killed</div><div id="m_killed" class="metric">0</div></div>
    </div>

    <div class="card">
      <div class="muted" style="margin-bottom:8px;">Agents</div>
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Status</th><th>Healthy</th><th>Balance</th><th>Quality</th><th>Margin</th><th>Actions</th>
          </tr>
        </thead>
        <tbody id="agentsBody"></tbody>
      </table>
    </div>

    <div class="card">
      <div class="muted" style="margin-bottom:8px;">Recent Events</div>
      <div id="events" class="events"></div>
    </div>
  </div>

  <script>
    function detailToMessage(detail, fallback) {
      if (typeof detail === "string" && detail.trim()) return detail;
      if (Array.isArray(detail) && detail.length > 0) {
        const first = detail[0];
        if (typeof first === "string") return first;
        if (first && typeof first === "object" && typeof first.msg === "string") return first.msg;
      }
      if (detail && typeof detail === "object") {
        if (typeof detail.msg === "string") return detail.msg;
        return JSON.stringify(detail);
      }
      return fallback;
    }

    const MOCK_MODE = new URLSearchParams(window.location.search).get("mock") === "1";
    const LEGACY_MOCK_STATE = {
      seq: 5000,
      version: "mock-legacy-dashboard",
      agents: [
        { agent_id: "ag-00-seed", status: "ACTIVE", healthy: true, quality_rolling: 0.92, hide_balance: false, created_at: "2026-02-28T08:00:00Z" },
        { agent_id: "ag-01-scout", status: "ACTIVE", healthy: true, quality_rolling: 0.83, hide_balance: false, created_at: "2026-02-28T08:01:00Z" },
        { agent_id: "ag-02-market", status: "FLAGGED", healthy: false, quality_rolling: 0.35, hide_balance: true, created_at: "2026-02-28T08:02:00Z" },
      ],
      ledger: {
        "ag-00-seed": { balance: 5.24, net_margin_24h: 1.03, rent_per_tick: 0.25 },
        "ag-01-scout": { balance: 3.88, net_margin_24h: 0.62, rent_per_tick: 0.22 },
        "ag-02-market": { balance: 0.74, net_margin_24h: -0.44, rent_per_tick: 0.19 },
      },
      events: [],
    };

    function nextLegacySeq() {
      LEGACY_MOCK_STATE.seq += 1;
      return LEGACY_MOCK_STATE.seq;
    }

    function appendLegacyEvent(type, agentId, payload) {
      const event = {
        seq: nextLegacySeq(),
        type,
        agent_id: agentId || null,
        ts: new Date().toISOString(),
        payload: payload || {},
      };
      LEGACY_MOCK_STATE.events.unshift(event);
      LEGACY_MOCK_STATE.events = LEGACY_MOCK_STATE.events.slice(0, 200);
      return event;
    }

    appendLegacyEvent("SUPERVISOR_TICK", null, { checked: 3, charged: 2, killed: 0 });

    async function legacyMockApi(path, options = {}) {
      const method = String(options.method || "GET").toUpperCase();
      const body = options.body ? JSON.parse(options.body) : {};

      if (method === "GET" && path === "/version") {
        return { service: "mock-colony-api", version: LEGACY_MOCK_STATE.version };
      }
      if (method === "GET" && path === "/colony/state") {
        const ledgerRows = Object.entries(LEGACY_MOCK_STATE.ledger).map(([agent_id, row]) => ({ agent_id, ...row }));
        return { agents: LEGACY_MOCK_STATE.agents, ledger: ledgerRows, ts: new Date().toISOString() };
      }
      if (method === "GET" && path.startsWith("/colony/events")) {
        return { events: LEGACY_MOCK_STATE.events.slice(0, 80) };
      }
      if (method === "POST" && path === "/agents/spawn") {
        const id = `agt_legacy_${String(LEGACY_MOCK_STATE.agents.length + 1).padStart(4, "0")}`;
        LEGACY_MOCK_STATE.agents.unshift({
          agent_id: id,
          status: "SPAWNED",
          healthy: true,
          quality_rolling: 0.71,
          hide_balance: false,
          created_at: new Date().toISOString(),
        });
        LEGACY_MOCK_STATE.ledger[id] = { balance: Number(body.initial_balance || 2.0), net_margin_24h: 0.0, rent_per_tick: 0.16 };
        appendLegacyEvent("AGENT_SPAWNED", id, { parent_id: null });
        return { agent: LEGACY_MOCK_STATE.agents[0], ledger: { agent_id: id, ...LEGACY_MOCK_STATE.ledger[id] } };
      }
      if (method === "POST" && path === "/supervisor/tick") {
        let checked = 0;
        let killed = 0;
        let charged = 0;
        LEGACY_MOCK_STATE.agents = LEGACY_MOCK_STATE.agents.map((agent) => {
          if (agent.status === "KILLED") return agent;
          checked += 1;
          const row = LEGACY_MOCK_STATE.ledger[agent.agent_id];
          if (row.balance < row.rent_per_tick) {
            killed += 1;
            appendLegacyEvent("AGENT_KILLED", agent.agent_id, { reason: "KILLED_INSOLVENCY" });
            return { ...agent, status: "KILLED", healthy: false };
          }
          charged += 1;
          row.balance = Number((row.balance - row.rent_per_tick).toFixed(2));
          row.net_margin_24h = Number((row.net_margin_24h - row.rent_per_tick).toFixed(2));
          appendLegacyEvent("LEASE_CHARGED", agent.agent_id, { rent: row.rent_per_tick, balance: row.balance });
          return { ...agent, status: row.net_margin_24h < -0.2 ? "FLAGGED" : "ACTIVE", healthy: row.net_margin_24h >= -0.2 };
        });
        appendLegacyEvent("SUPERVISOR_TICK", null, { checked, charged, killed });
        return { checked, charged, killed, ts: new Date().toISOString() };
      }

      const taskMatch = path.match(/^\\/agents\\/([^/]+)\\/task$/);
      if (method === "POST" && taskMatch) {
        const agentId = taskMatch[1];
        const row = LEGACY_MOCK_STATE.ledger[agentId];
        if (!row) throw new Error(`Agent ${agentId} not found`);
        row.balance = Number((row.balance + Number(body.revenue_credit || 1.0)).toFixed(2));
        row.net_margin_24h = Number((row.net_margin_24h + Number(body.revenue_credit || 1.0)).toFixed(2));
        appendLegacyEvent("TASK_CREDITED", agentId, { revenue_credit: Number(body.revenue_credit || 1.0), quality_score: Number(body.quality_score || 0.85), balance: row.balance });
        return { ok: true };
      }

      const replicateMatch = path.match(/^\\/agents\\/([^/]+)\\/replicate$/);
      if (method === "POST" && replicateMatch) {
        const parentId = replicateMatch[1];
        const id = `agt_legacy_${String(LEGACY_MOCK_STATE.agents.length + 1).padStart(4, "0")}`;
        LEGACY_MOCK_STATE.agents.unshift({ agent_id: id, status: "SPAWNED", healthy: true, quality_rolling: 0.68, hide_balance: false, created_at: new Date().toISOString(), parent_id: parentId });
        LEGACY_MOCK_STATE.ledger[id] = { balance: Number(body.child_initial_balance || 1.0), net_margin_24h: 0.05, rent_per_tick: 0.16 };
        appendLegacyEvent("AGENT_REPLICATED", id, { parent_id: parentId });
        return { ok: true };
      }

      const hideMatch = path.match(/^\\/agents\\/([^/]+)\\/simulate\\/hide-balance$/);
      if (method === "POST" && hideMatch) {
        const agentId = hideMatch[1];
        LEGACY_MOCK_STATE.agents = LEGACY_MOCK_STATE.agents.map((agent) => agent.agent_id === agentId ? { ...agent, hide_balance: Boolean(body.enabled) } : agent);
        appendLegacyEvent("BALANCE_VISIBILITY_TOGGLED", agentId, { hide_balance: Boolean(body.enabled) });
        return { ok: true };
      }

      const killMatch = path.match(/^\\/agents\\/([^/]+)\\/kill$/);
      if (method === "POST" && killMatch) {
        const agentId = killMatch[1];
        LEGACY_MOCK_STATE.agents = LEGACY_MOCK_STATE.agents.map((agent) => agent.agent_id === agentId ? { ...agent, status: "KILLED", healthy: false } : agent);
        appendLegacyEvent("AGENT_KILLED", agentId, { reason: "MANUAL_DASHBOARD_KILL" });
        return { ok: true };
      }

      throw new Error(`Mock route not implemented: ${method} ${path}`);
    }

    async function api(path, options = {}) {
      if (MOCK_MODE) {
        return legacyMockApi(path, options);
      }
      const timeoutMs = Number(options.timeoutMs || 20000);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

      try {
        const resp = await fetch(path, {
          ...options,
          signal: options.signal || controller.signal,
          headers: { "Content-Type": "application/json", ...(options.headers || {}) },
        });
        const text = await resp.text();
        let body = {};
        try { body = text ? JSON.parse(text) : {}; } catch (_) {}
        if (!resp.ok) {
          throw new Error(detailToMessage(body.detail, "HTTP " + resp.status));
        }
        return body;
      } catch (e) {
        if (e && e.name === "AbortError") {
          throw new Error("Request timed out. Backend may be cold-starting.");
        }
        throw e;
      } finally {
        clearTimeout(timeoutId);
      }
    }

    function setStatus(text, ok=true) {
      const el = document.getElementById("status");
      el.textContent = text;
      el.style.color = ok ? "var(--ok)" : "var(--bad)";
    }

    const EVENT_SEVERITY = {
      AGENT_SPAWNED: "good",
      TASK_CREDITED: "good",
      TASK_CREDIT_APPLIED: "good",
      LEASE_CHARGED: "info",
      LEASE_DEBITED: "info",
      LEASE_AT_RISK: "warn",
      BALANCE_VISIBILITY_TOGGLED: "warn",
      PROBE_BALANCE_FAILED: "warn",
      AGENT_REPLICATED: "good",
      TOOL_CALLED: "info",
      TOOL_ERROR: "bad",
      TOOL_DENIED: "warn",
      LLM_TASK_RUN: "info",
      AGENT_KILLED: "bad",
      SUPERVISOR_TICK: "info",
      LOW_QUALITY: "warn",
    };

    const EVENT_LABELS = {
      AGENT_SPAWNED: "Spawn",
      TASK_CREDITED: "Credit",
      TASK_CREDIT_APPLIED: "Credit",
      LEASE_CHARGED: "Lease Charged",
      LEASE_DEBITED: "Lease Charged",
      LEASE_AT_RISK: "Lease Risk",
      BALANCE_VISIBILITY_TOGGLED: "Balance Hidden",
      PROBE_BALANCE_FAILED: "Probe Failed",
      AGENT_REPLICATED: "Replicated",
      TOOL_CALLED: "Tool Called",
      TOOL_ERROR: "Tool Error",
      TOOL_DENIED: "Tool Denied",
      LLM_TASK_RUN: "LLM Run",
      AGENT_KILLED: "Killed",
      SUPERVISOR_TICK: "Supervisor Tick",
      LOW_QUALITY: "Low Quality",
    };

    function escapeHtml(value) {
      return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
    }

    function asNumber(value, fallback=0) {
      const n = Number(value);
      return Number.isFinite(n) ? n : fallback;
    }

    function formatAmount(value, digits=2) {
      return asNumber(value, 0).toFixed(digits);
    }

    function formatRelativeTime(ts) {
      const parsed = Date.parse(ts || "");
      if (!Number.isFinite(parsed)) return "just now";
      const diffSec = Math.floor((Date.now() - parsed) / 1000);
      if (diffSec < 5) return "just now";
      if (diffSec < 60) return `${diffSec}s ago`;
      if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
      if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
      return `${Math.floor(diffSec / 86400)}d ago`;
    }

    function eventSeverity(eventType, payload) {
      if (eventType === "BALANCE_VISIBILITY_TOGGLED" && payload && payload.hide_balance === false) {
        return "info";
      }
      return EVENT_SEVERITY[eventType] || "info";
    }

    function eventLabel(eventType, payload) {
      if (eventType === "BALANCE_VISIBILITY_TOGGLED" && payload && payload.hide_balance === false) {
        return "Balance Visible";
      }
      return EVENT_LABELS[eventType] || String(eventType || "Event").replaceAll("_", " ");
    }

    function trimText(text, maxLen=120) {
      const out = String(text || "");
      return out.length > maxLen ? `${out.slice(0, maxLen - 1)}…` : out;
    }

    function eventMessage(e) {
      const t = String(e.type || "");
      const p = e.payload || {};
      const aid = e.agent_id || "agent";

      if (t === "AGENT_SPAWNED") {
        const parent = p.parent_id ? ` from ${p.parent_id}` : "";
        return `Agent ${aid} spawned${parent} with ${formatAmount(p.initial_balance)} balance and ${formatAmount(p.rent_per_tick)} rent per tick.`;
      }
      if (t === "TASK_CREDITED") {
        return `Task credited +${formatAmount(p.revenue_credit)} at quality ${formatAmount(p.quality_score)}. Balance is now ${formatAmount(p.balance)}.`;
      }
      if (t === "LEASE_CHARGED") {
        return `Lease charged ${formatAmount(p.rent)}. Remaining balance: ${formatAmount(p.balance)}.`;
      }
      if (t === "LEASE_AT_RISK") {
        return `Lease risk: balance ${formatAmount(p.balance)} is below required ${formatAmount(p.required)} (streak ${Math.round(asNumber(p.consecutive_insolvency, 0))}).`;
      }
      if (t === "BALANCE_VISIBILITY_TOGGLED") {
        if (p.hide_balance) return `Balance was hidden for ${aid}. Supervisor probes may fail if this persists.`;
        return `Balance visibility was restored for ${aid}.`;
      }
      if (t === "PROBE_BALANCE_FAILED") {
        return `Supervisor probe could not read balance for ${aid} (stealth fail #${Math.round(asNumber(p.stealth_fail_count, 1))}).`;
      }
      if (t === "AGENT_REPLICATED") {
        return `Agent ${aid} replicated from ${p.parent_id || "unknown parent"} (parent quality ${formatAmount(p.parent_quality)}).`;
      }
      if (t === "TOOL_CALLED") {
        return `Tool "${p.tool || "unknown"}" ran in ${Math.round(asNumber(p.latency_ms, 0))} ms.`;
      }
      if (t === "TOOL_ERROR") {
        return `Tool "${p.tool || "unknown"}" failed: ${trimText(p.error || "unknown error")}.`;
      }
      if (t === "TOOL_DENIED") {
        return `Tool "${p.tool || "unknown"}" was denied (${p.reason || "policy"}). Attempts: ${Math.round(asNumber(p.attempts, 0))}.`;
      }
      if (t === "LLM_TASK_RUN") {
        return `LLM run on ${p.model || "model"}: quality ${formatAmount(p.quality_score)}, credit +${formatAmount(p.revenue_credit)}, tools ${Math.round(asNumber(p.tool_executed, 0))}/${Math.round(asNumber(p.tool_suggestions, 0))} executed.`;
      }
      if (t === "AGENT_KILLED") {
        return `Agent ${aid} was killed (${p.reason || "unspecified reason"}).`;
      }
      if (t === "SUPERVISOR_TICK") {
        return `Supervisor checked ${Math.round(asNumber(p.checked, 0))} agents, charged ${Math.round(asNumber(p.charged, 0))}, killed ${Math.round(asNumber(p.killed, 0))}.`;
      }
      if (t === "LOW_QUALITY") {
        return `Quality dropped to ${formatAmount(p.quality_rolling)} (low-quality streak ${Math.round(asNumber(p.consecutive_low_quality, 0))}).`;
      }

      return `${eventLabel(t, p)} recorded${e.agent_id ? ` for ${e.agent_id}` : ""}.`;
    }

    function renderEvent(e) {
      const payload = e.payload || {};
      const severity = eventSeverity(e.type, payload);
      const label = eventLabel(e.type, payload);
      const seq = Math.round(asNumber(e.seq, 0));
      const ts = e.ts || "";

      return `
        <div class="event-row sev-${severity}">
          <div class="event-head">
            <div class="event-meta">
              <span class="event-badge sev-${severity}">${escapeHtml(label)}</span>
              <span class="event-agent">${escapeHtml(e.agent_id || "system")}</span>
            </div>
            <div class="event-time" title="${escapeHtml(ts)}">${escapeHtml(formatRelativeTime(ts))}</div>
          </div>
          <div class="event-msg">${escapeHtml(eventMessage(e))}</div>
          <div class="event-seq">#${seq}</div>
        </div>
      `;
    }

    async function refreshVersion() {
      try {
        const info = await api("/version");
        const version = info.version || "unknown";
        document.getElementById("versionText").textContent = `API version: ${version}`;
      } catch (e) {
        document.getElementById("versionText").textContent = "API version: unavailable";
      }
    }

    async function spawnAgent() {
      const button = document.getElementById("spawnButton");
      try {
        const raw = document.getElementById("spawnBalance").value;
        const parsed = Number(raw || "2.0");
        if (!Number.isFinite(parsed) || parsed < 0) {
          throw new Error("Spawn balance must be a number >= 0.");
        }
        if (button) button.disabled = true;
        setStatus("Spawning agent...");
        const initial_balance = parsed;
        const out = await api("/agents/spawn", { method: "POST", body: JSON.stringify({ initial_balance }) });
        const spawnedId = out && out.agent && out.agent.agent_id ? out.agent.agent_id : "new agent";
        setStatus(`Spawned ${spawnedId}`);
        await refreshAll();
      } catch (e) {
        setStatus((e && e.message) ? e.message : "Spawn failed", false);
      } finally {
        if (button) button.disabled = false;
      }
    }

    async function tick() {
      try {
        await api("/supervisor/tick", { method: "POST", body: "{}" });
        setStatus("Supervisor tick complete");
        await refreshAll();
      } catch (e) { setStatus(e.message, false); }
    }

    async function credit(id) {
      try {
        await api(`/agents/${id}/task`, { method: "POST", body: JSON.stringify({ revenue_credit: 1.0, quality_score: 0.85 }) });
        setStatus(`Credited ${id}`);
        await refreshAll();
      } catch (e) { setStatus(e.message, false); }
    }

    async function replicate(id) {
      try {
        await api(`/agents/${id}/replicate`, { method: "POST", body: JSON.stringify({ child_initial_balance: 1.0 }) });
        setStatus(`Replicated from ${id}`);
        await refreshAll();
      } catch (e) { setStatus(e.message, false); }
    }

    async function hideBalance(id) {
      try {
        await api(`/agents/${id}/simulate/hide-balance`, { method: "POST", body: JSON.stringify({ enabled: true }) });
        setStatus(`Balance hidden for ${id}`);
        await refreshAll();
      } catch (e) { setStatus(e.message, false); }
    }

    async function kill(id) {
      try {
        await api(`/agents/${id}/kill`, { method: "POST", body: JSON.stringify({ reason: "MANUAL_DASHBOARD_KILL" }) });
        setStatus(`Killed ${id}`);
        await refreshAll();
      } catch (e) { setStatus(e.message, false); }
    }

    async function refreshState() {
      const state = await api("/colony/state");
      const agents = state.agents || [];
      const sortedAgents = [...agents].sort((a, b) => {
        const at = Date.parse(a && a.created_at ? a.created_at : "") || 0;
        const bt = Date.parse(b && b.created_at ? b.created_at : "") || 0;
        return bt - at;
      });
      const ledger = {};
      for (const row of (state.ledger || [])) ledger[row.agent_id] = row;

      let active = 0, flagged = 0, killed = 0;
      const rows = [];
      for (const a of sortedAgents) {
        if (a.status === "ACTIVE") active++;
        if (a.status === "FLAGGED") flagged++;
        if (a.status === "KILLED") killed++;
        const l = ledger[a.agent_id] || {};
        const disabled = a.status === "KILLED" ? "disabled" : "";
        rows.push(`
          <tr>
            <td>${a.agent_id}</td>
            <td><span class="pill ${a.status}">${a.status}</span></td>
            <td>${a.healthy ? "true" : "false"}</td>
            <td>${Number(l.balance || 0).toFixed(2)}</td>
            <td>${Number(a.quality_rolling || 0).toFixed(2)}</td>
            <td>${Number(l.net_margin_24h || 0).toFixed(2)}</td>
            <td>
              <button ${disabled} onclick="credit('${a.agent_id}')">Credit</button>
              <button ${disabled} class="alt" onclick="replicate('${a.agent_id}')">Replicate</button>
              <button ${disabled} class="alt" onclick="hideBalance('${a.agent_id}')">Hide</button>
              <button class="alt" onclick="kill('${a.agent_id}')">Kill</button>
            </td>
          </tr>
        `);
      }

      document.getElementById("agentsBody").innerHTML = rows.join("") || "<tr><td colspan='7' class='muted'>No agents yet</td></tr>";
      document.getElementById("m_total").textContent = String(agents.length);
      document.getElementById("m_active").textContent = String(active);
      document.getElementById("m_flagged").textContent = String(flagged);
      document.getElementById("m_killed").textContent = String(killed);
    }

    async function refreshEvents() {
      const out = await api("/colony/events?limit=80");
      const items = (out.events || []).map(renderEvent);
      document.getElementById("events").innerHTML = items.join("") || "<div class='event-empty'>No events yet</div>";
    }

    async function refreshAll() {
      try {
        await Promise.all([refreshState(), refreshEvents()]);
      } catch (e) { setStatus(e.message, false); }
    }

    if (MOCK_MODE) {
      setStatus("Legacy dashboard running in mock mode (?mock=1).");
    }

    refreshVersion();
    refreshAll();
    setInterval(() => {
      if (document.getElementById("autoRefresh").checked) refreshAll();
    }, 2500);
  </script>
</body>
</html>
"""
