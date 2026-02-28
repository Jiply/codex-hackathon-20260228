# Step 4 - Screen Plan (Hackathon Wow Cut)

## Purpose Anchor

The product story is economic survival as spectacle: agents **earn -> survive -> replicate** or **fail -> die**.  
These screens are scoped for a 3-5 minute demo, with visual drama prioritized over enterprise polish.

## Screen List You Need

1. **Genesis / Run Setup**
2. **Agent Capitalism (Main Live Dashboard)**
3. **Agent X-Ray (Detail + Lineage)**
4. **Control Deck (Operator Actions)**
5. **Event Theater (Timeline Feed)**
6. **Final Verdict (End-of-Demo Scoreboard)**

## UI Descriptions

### 1) Genesis / Run Setup

**Job in demo:** Start deterministic run, set seed conditions, and signal the story immediately.  
**UI look:** Dark cinematic backdrop with one glowing colony core in center, oversized numeric inputs for `starting balance`, `quality`, `burn rate`, and `random seed`.  
**High-dopamine moments:** Big `Start Colony` button with ignition animation; once pressed, the core "splits" into the first seed agent and transitions to live dashboard.

### 2) Agent Capitalism (Main Live Dashboard)

**Job in demo:** This is the hero screen for 80% of the pitch. Show economic life/death in real time.  
**UI look:** Full-width command center with:

- top KPI strip (`alive`, `terminated`, `total profit`, `next lease tick countdown`)
- center canvas of animated agent cards/nodes
- each agent card shows `balance`, `quality`, `burn rate`, `status`, `generation`
- color system: neon green (profit), amber (at risk), red (death), electric cyan (replication)
  **High-dopamine moments:** Countdown pulse each lease tick; balance numbers roll like slot-machine counters; new child agent appears with a shockwave ring.

### 3) Agent X-Ray (Detail + Lineage)

**Job in demo:** Make one selected agent feel "alive" and explain why it replicated or died.  
**UI look:** Side panel or dedicated screen with:

- large status badge (`alive` / `terminated`)
- sparkline for balance trend
- quality/error gauges
- parent-child lineage mini-tree
- mutation badge (what changed from parent)
  **High-dopamine moments:** On replication, lineage tree animates a new branch growth; on degradation, quality gauge visibly drains in real time.

### 4) Control Deck (Operator Actions)

**Job in demo:** Give the presenter deterministic control over key plot beats.  
**UI look:** Tactical panel with prominent action tiles:

- `Trigger paid-task burst`
- `Force degrade agent`
- `Pause simulation`
- `Resume simulation`
  **High-dopamine moments:** Actions produce immediate visual feedback in Arena and Timeline; dangerous actions (degrade) are styled in warning red with brief "are you sure?" tap state to avoid accidental clicks.

### 5) Event Theater (Timeline Feed)

**Job in demo:** Translate system internals into plain-English narrative judges can follow instantly.  
**UI look:** Vertical event feed with timestamp chips and type tags (`task_paid`, `lease_debited`, `replicated`, `degraded`, `terminated`).  
**High-dopamine moments:** New events slide in with short highlight glow; critical events (replicate/terminate) pin briefly at top with larger typography and balance delta.

### 6) Final Verdict (End-of-Demo Scoreboard)

**Job in demo:** Land the story with a clean outcome and measurable proof.  
**UI look:** Bold summary layout with:

- giant total colony profit
- survivors vs terminated split
- total replication count
- best-performing lineage
- short "what happened" recap (3-5 lines)
  **High-dopamine moments:** Counter-up animation on final metrics; winner lineage card gets spotlight treatment; optional confetti for profitable colony or red collapse overlay for net failure.

## Hackathon Build Guidance

- **Must-have screens for MVP:** 2, 4, 5, 6
- **Should-have if time allows:** 1, 3
- **Fast fallback:** Keep one routed page and implement screens as full-screen panels/tabs to reduce routing/state complexity.
