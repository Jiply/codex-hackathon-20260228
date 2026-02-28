# ALMA for Coding Agents — Development Log

## Project Overview

Adapting the ALMA framework (Automated meta-Learning of Memory designs for Agentic systems) from UBC/Vector Institute to evolve memory architectures for coding/software engineering agents instead of game environments.

**Repo**: `~/alma` (forked from `github.com/zksha/alma`)
**Goal**: Prove that LLM-evolved memory beats hand-designed baselines (CLAUDE.md, Memory Bank, RAG) for coding agents.

**Original ALMA**: Meta-learns memory architectures via an evolutionary loop. A Meta Agent analyzes memory structures, suggests improvements, and generates new Python code. An Execution Agent uses the memory to solve tasks. Scored by task success rate. Tested on ALFWorld, TextWorld, BabaIsAI, MiniHack — achieved +12.8% absolute improvement over best hand-designed baselines with GPT-5-mini.

---

## Session 1: Implementation (Feb 25-26, 2026)

### Phase 1-4: Building the Coding Environment

Implemented a complete coding environment wrapper compatible with ALMA's step-by-step agent loop.

**New files created:**
- `envs_archive/coding_envs.py` — Core `Coding_Env(Basic_Env)` with SWE-bench-compatible task loading, workspace setup (local dir copy, git clone, inline files, test patch application), action execution (read_file, edit_file, create_file, run_command, search, list_dir, submit), and test-based reward calculation
- `envs_archive/prompts/coding_prompt.py` — Prompt templates for the execution agent
- `envs_archive/configs/coding_config.yaml` — Config (max_trails=30, command_timeout=60, test_timeout=120)
- `memo_archive/baseline/memo_structure_claude_md.py` — CLAUDE.md baseline: single `ConventionsLayer` that curates a conventions doc via LLM after each task
- `memo_archive/baseline/memo_structure_memory_bank.py` — Memory Bank baseline: 5 `MemoryBankLayer` instances (project_brief, system_patterns, tech_context, active_context, progress)
- `memo_archive/baseline/memo_structure_rag_codebase.py` — RAG baseline: `TrajectoryRAGLayer` + `CodePatternLayer` using Chroma vector DB
- `evals/utils/codex_client.py` — Codex app-server JSON-RPC 2.0 adapter (for future use with gpt-5.3-codex models)
- `data/coding/tasks.jsonl` — Initial 3 sample bug-fix tasks
- `data/coding/sample_repos/` — 3 small repos with planted bugs (calc_bug, string_util, data_processor)
- `run_coding.sh` — Convenience runner script

**Existing files modified:**
- `agent_workflow.py` — Added `'coding': 'Coding_Env'` to ENVS dict
- `meta_agent.py` — Added `'coding': "CodingRecorder"` to RECORDER dict
- `meta_agent_prompt.py` — Added comprehensive coding-specific task descriptions and memory pattern cheat sheets for the meta agent
- `eval_in_container.py` — Added local execution path (no Docker needed for coding), registered coding baselines

### Phase 5: Pipeline Debugging

Multiple bugs encountered and fixed during end-to-end testing:

1. **Curly quotes in meta_agent_prompt.py**: Edit introduced Unicode curly quotes (U+201C/U+201D), causing `SyntaxError`. Fixed by replacing with ASCII quotes.
2. **asyncio.Lock() in Python 3.9**: Baselines created `asyncio.Lock()` in `__init__`, but Python 3.9 requires a running event loop. Fixed with lazy lock pattern: `_get_lock()` method.
3. **`python` not found on macOS**: System uses `python3`. Fixed commands and scripts.
4. **pytest not installed**: Ran `pip3 install pytest`.
5. **LOG_DIR hardcoded to Docker path**: `launch.py` had `LOG_DIR = Path("/opt/evals/logs")`. Fixed to use `os.environ.get("LOG_DIR", ...)` with local fallback.
6. **API key not loading**: `hire_agent.py` called `load_dotenv()` without args, missing the `.env` in project root. Fixed to respect `DOTENV_PATH` env var.
7. **train_size not propagated**: `run_main.py` didn't pass `train_size` to `meta_agent.run_single_memo()`, defaulting to 30. With 3 tasks and `--status test`, `ids[30:]` was empty → 0 tasks evaluated. Fixed by threading `train_size` through.

### Pipeline Validation

First successful end-to-end run with 3 sample tasks:
- **no_mem baseline**: AVG Reward 1.0 (all 3 trivial tasks solved by gpt-4o-mini)
- Confirmed: API calls work, task loading works, reward calculation works

---

## Session 2: Research Validation & H1 Experiment (Feb 28, 2026)

### Research Deep Dive

Before running experiments, conducted thorough research using agent teams across 3 dimensions:

#### 1. ALMA Paper Results Assessment
- Tested on 4 game environments (ALFWorld, TextWorld, BabaIsAI, MiniHack)
- Results: 12.3% success rate with GPT-5-nano vs 6.1-8.6% for baselines; 53.9% with GPT-5-mini vs 40.1-48.6% for baselines
- Codebase quality: **Research prototype** — no unit tests for core logic, commented-out debug prints, hardcoded Docker paths, minimal sandboxing for generated code

#### 2. Current State of Coding Agent Memory
- **No production coding agent learns from past task outcomes**: Devin (user-curated knowledge base), Copilot (auto-memories with 28-day expiry), Claude Code (CLAUDE.md files), Codex (AGENTS.md), Cursor (embedding index + rules). All use instruction memory, not experience-driven learning.
- **Research papers**: MemRL (Q-value learning on episodic memory, Jan 2026), Reflexion (verbal self-critique, NeurIPS 2023), SWE-Search (MCTS for coding, ICLR 2025), A-MEM (Zettelkasten-style, Feb 2025)
- **Key gap**: No one has meta-learned memory architectures specifically for coding agents

#### 3. Critical Analysis of ALMA-for-Coding Fit
- **Task granularity**: Reward signal (test pass rate) is actually decent — fractional, not just binary
- **Memory relevance tension**: Memory that transfers across projects = stuff the LLM already knows. Memory that helps = project-specific context that doesn't transfer.
- **Sample efficiency**: ~$500-2,000 per meaningful evolution run, 50-100+ hours wall-clock
- **Action space gaps**: No file pagination, no undo, grep-only search (vs SWE-agent's richer interface)
- **Evolution vs hand-tuning**: For cross-project SWE-bench tasks, a human spending 2 hours hand-tuning CLAUDE.md likely beats evolved memory at 1/100th the cost. Evolution has stronger case for within-project longitudinal memory.

### Three Hypotheses Framework

Defined 3 hypotheses to test sequentially, each gating the next:

- **H1**: Does memory help at all for coding tasks? (no_mem vs claude_md on 50+ tasks)
- **H2**: Does within-project memory accumulate useful signal? (sequential tasks from same repo)
- **H3**: Can the meta-agent discover memory structures a human wouldn't think of? (strip hints, run evolution)

### H1 Experiment Setup

#### Dataset Creation (Multi-Agent Team)

Created team `h1-experiment` with 2 parallel agents:

**dataset-creator** built `~/alma/generate_dataset.py` which generates:
- 6 Python projects: mathlib (11 tasks), textprocessor (10), collections (9), taskmanager (8), httptools (7), dateutils (9)
- 54 total tasks with difficulty distribution: 17 easy / 23 medium / 14 hard
- Each task: a Python project with a specific bug introduced, pytest tests that fail on the bug
- All tasks validated: tests fail on buggy code, pass on correct code
- Output: `~/alma/data/coding/tasks.jsonl` + 54 repo directories in `sample_repos/`

**baseline-engineer** created:
- `memo_archive/baseline/memo_structure_claude_md_seeded.py` — identical to claude_md but pre-seeded with 1,986 chars of battle-tested coding conventions (read tests first, minimal changes, common Python pitfalls, 7-step workflow)
- Registered `claude_md_seeded` in `eval_in_container.py` BASELINES set
- Verified all 3 baselines instantiate correctly

#### H1 Experiment Run 1: ALMA Pipeline (Underpowered)

Ran 3 baselines through the standard ALMA pipeline:
```
--task_type coding --rollout_type batched --train_size 27 --status test
```

Pipeline mechanics:
- 54 tasks → `_split_tasks('test', 27)` → 27 test tasks
- Shuffled with seed(42), split at mid=13
- **Update phase**: 13 tasks run WITHOUT memory retrieval, then `general_update()` called → claude_md learns conventions
- **Retrieve phase**: 14 tasks × 3 repeats = 42 runs WITH memory injected into prompt

Results:
| Baseline | AVG Reward | SE | Delta vs no_mem |
|---|---|---|---|
| no_mem | 0.786 | 0.041 | — |
| claude_md (learned) | 0.881 | 0.024 | +12.1% |
| claude_md_seeded | 0.881 | 0.024 | +12.1% |

#### Statistical Problem Identified

The SE was computed from only 3 group averages (3 chunks of 14 tasks). Initial z-test claimed p<0.05 (z=2.00), but this was **wrong**:

- With N=3 groups, should use Welch's t-test, not z-test
- Critical t at p<0.05 with df≈3.2 is 3.073, not 1.96
- **Correct p-value: 0.134 (NOT significant)**
- The 3 "repeats" aren't truly independent (same tasks, same memory)

The directional signal is clear (+12.1% with consistent direction across all groups), but statistical significance was not established.

#### H1 Experiment Run 2: Paired Comparison (Pending)

To get proper statistical power, running a paired design:
- Each of the 54 tasks run TWICE: once with no_mem, once with claude_md_seeded
- Paired t-test on per-task deltas → N=54 paired observations
- This is ~18x more powerful than the grouped design

[Results pending — experiment running]

---

## Architecture Notes

### ALMA Core Abstractions
- `MemoStructure` — orchestrates memory layers (has `general_retrieve` and `general_update`)
- `Sub_memo_layer` — individual memory component (has `retrieve` and `update`)
- `Basic_Env` — environment interface: `set_task_env`, `run_step`, `cal_reward`, `get_prompt`
- `Basic_Recorder` — tracks task execution (init, steps, reward)
- `Agent_Workflow` — orchestrates: set_task_env → general_retrieve → step loop → cal_reward → general_update
- `MetaAgent` — outer evolution loop: analyze → generate → examine → evaluate → select

### Execution Flow
```
run_main.py
  → MetaAgent.run_single_memo() / forward()
    → MemoManager.execute_memo_structure()
      → eval_in_container.run_evaluation()
        → launch.py (subprocess, cwd=evals/)
          → Agent_Workflow.run_all_tasks()
            → run_single_task() for each task
              → Coding_Env.set_task_env()
              → MemoStructure.general_retrieve()
              → Agent.ask() loop (up to 30 steps)
              → Coding_Env.cal_reward()
              → MemoStructure.general_update()
```

### Coding Environment Action Space
| Action | Description |
|---|---|
| read_file | Read file contents (up to 10K chars) |
| edit_file | Find/replace or full content replacement |
| create_file | Create new file with content |
| run_command | Shell command with timeout |
| search | grep -rn with file type filters |
| list_dir | List directory contents |
| submit | Signal completion, trigger test execution |

### Key File Paths
```
~/alma/
├── envs_archive/coding_envs.py          # Coding environment
├── envs_archive/prompts/coding_prompt.py # Prompt templates
├── envs_archive/configs/coding_config.yaml
├── memo_archive/baseline/
│   ├── memo_structure_claude_md.py       # CLAUDE.md baseline
│   ├── memo_structure_claude_md_seeded.py # Seeded variant
│   ├── memo_structure_memory_bank.py     # Memory Bank baseline
│   └── memo_structure_rag_codebase.py    # RAG baseline
├── evals/
│   ├── launch.py                         # Evaluation entry point
│   ├── workflows/agent_workflow.py       # Task execution orchestration
│   ├── utils/hire_agent.py               # OpenAI API wrapper
│   └── utils/codex_client.py             # Codex app-server adapter
├── core/
│   ├── meta_agent.py                     # Evolution loop
│   ├── meta_agent_prompt.py              # Meta agent prompts
│   └── memo_manager.py                   # Memory versioning (SHA-based)
├── data/coding/
│   ├── tasks.jsonl                       # 54 benchmark tasks
│   └── sample_repos/                     # 54 buggy project directories
├── generate_dataset.py                   # Dataset generator script
├── run_coding.sh                         # Convenience runner
├── run_main.py                           # CLI entry point
└── .env                                  # OpenAI API key
```

---

## Open Questions & Next Steps

1. **H1 paired results** — pending, will determine if memory genuinely helps
2. **H2**: Within-project longitudinal test — 20 sequential tasks from the same repo, plot reward over time
3. **H3**: Strip meta-agent hints, run evolution, compare generated architectures to hand-designed ones
4. **Codex integration**: The pipeline currently uses gpt-4o-mini via standard OpenAI API. The plan called for gpt-5.3-codex (meta agent) and gpt-5.3-codex-spark (execution agent) via the Codex app-server. The `CodexAgent` adapter exists but isn't wired into the workflow.
5. **Real benchmark**: Current 54 tasks are synthetic. For publication, need SWE-bench-lite or SWE-bench Verified.
6. **Action space gaps**: No file pagination, no undo, no semantic search. These limit absolute performance but may not affect the relative comparison (memory vs no-memory).

---

## Cost & Performance

- H1 Run 1 (3 baselines × 54 tasks): ~7.3M tokens total, ~$5-10 API cost, ~15 min wall-clock
- gpt-4o-mini solves ~79% of synthetic tasks without memory (high baseline)
- Memory baselines showed +12.1% improvement (directional, significance pending)
- claude_md learned from scratch matched claude_md with pre-seeded conventions → learning process works
