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
      max-height: 260px;
      overflow: auto;
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 8px;
      background: rgba(0,0,0,.2);
      font-family: ui-monospace, Menlo, monospace;
      font-size: 12px;
      white-space: pre-wrap;
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
        <button onclick="spawnAgent()">Spawn Agent</button>
        <button class="alt" onclick="tick()">Supervisor Tick</button>
        <button class="alt" onclick="refreshAll()">Refresh</button>
        <label class="muted">Auto refresh <input type="checkbox" id="autoRefresh" checked /></label>
      </div>
      <div id="status" class="muted" style="margin-top:8px;"></div>
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
    async function api(path, options = {}) {
      const resp = await fetch(path, { ...options, headers: { "Content-Type": "application/json" } });
      const text = await resp.text();
      let body = {};
      try { body = text ? JSON.parse(text) : {}; } catch (_) {}
      if (!resp.ok) throw new Error(body.detail || ("HTTP " + resp.status));
      return body;
    }

    function setStatus(text, ok=true) {
      const el = document.getElementById("status");
      el.textContent = text;
      el.style.color = ok ? "var(--ok)" : "var(--bad)";
    }

    async function spawnAgent() {
      try {
        const initial_balance = Number(document.getElementById("spawnBalance").value || "2.0");
        await api("/agents/spawn", { method: "POST", body: JSON.stringify({ initial_balance }) });
        setStatus("Spawned agent");
        await refreshAll();
      } catch (e) { setStatus(e.message, false); }
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
      const ledger = {};
      for (const row of (state.ledger || [])) ledger[row.agent_id] = row;

      let active = 0, flagged = 0, killed = 0;
      const rows = [];
      for (const a of agents) {
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
      const lines = (out.events || []).map(e => {
        const aid = e.agent_id ? `[${e.agent_id}]` : "";
        return `${e.seq} ${e.ts} ${aid} ${e.type} ${JSON.stringify(e.payload || {})}`;
      });
      document.getElementById("events").textContent = lines.join("\\n") || "No events yet";
    }

    async function refreshAll() {
      try {
        await Promise.all([refreshState(), refreshEvents()]);
      } catch (e) { setStatus(e.message, false); }
    }

    refreshAll();
    setInterval(() => {
      if (document.getElementById("autoRefresh").checked) refreshAll();
    }, 2500);
  </script>
</body>
</html>
"""

