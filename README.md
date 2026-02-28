# codex-hackathon-20260228

This entire project is directed, built, and evaluated by Codex.

## Implemented Module

- Idea Collision Guardrail docs: [docs/idea-collision-guardrail.md](docs/idea-collision-guardrail.md)
- Essential entrypoint: `src/idea-collision-guardrail/essential.ts`
- Testing-only entrypoint: `src/idea-collision-guardrail/testing.ts`
- Tests: `test/idea-collision-guardrail.test.ts`

## Colony Arena UI (shadcn/ui)

The observability dashboard UI is implemented in `dashboard-ui/` and styled to match:

- `step 6 - ui/colony_arena_dashboard/screen.png`

Run it locally:

```bash
cd dashboard-ui
pnpm install
pnpm dev
```

Optional API base override:

```bash
VITE_COLONY_API_BASE=http://127.0.0.1:8000 pnpm dev
```
