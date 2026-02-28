import type { LifecycleHookAdapter } from "./ports.ts";
import { GuardrailError } from "./errors.ts";
import { IdeaCollisionGuardrail } from "./service.ts";

function assertLifecycleHookAdapter(adapter: LifecycleHookAdapter | undefined): asserts adapter is LifecycleHookAdapter {
  if (!adapter || typeof adapter.onAgentTerminated !== "function") {
    throw new GuardrailError("INVALID_DEPENDENCY", "LifecycleHookAdapter must implement onAgentTerminated()");
  }

  if (typeof adapter.onPreSpawn !== "function") {
    throw new GuardrailError("INVALID_DEPENDENCY", "LifecycleHookAdapter must implement onPreSpawn()");
  }
}

export class GuardrailLifecycleBridge {
  private guardrail: IdeaCollisionGuardrail;
  private lifecycleHookAdapter: LifecycleHookAdapter;

  constructor(deps: { guardrail: IdeaCollisionGuardrail; lifecycleHookAdapter: LifecycleHookAdapter }) {
    if (!deps.guardrail) {
      throw new GuardrailError("INVALID_DEPENDENCY", "guardrail is required");
    }

    assertLifecycleHookAdapter(deps.lifecycleHookAdapter);

    this.guardrail = deps.guardrail;
    this.lifecycleHookAdapter = deps.lifecycleHookAdapter;
  }

  async handleAgentTerminated(terminationPayload: unknown) {
    const archivedIdea = this.lifecycleHookAdapter.onAgentTerminated(terminationPayload);

    return this.guardrail.archiveDeadIdea(archivedIdea);
  }

  async handlePreSpawn(
    preSpawnPayload: unknown,
    options: {
      top_k?: number;
      filters?: Record<string, unknown>;
      attempt?: number;
    } = {},
  ) {
    const candidateIdea = this.lifecycleHookAdapter.onPreSpawn(preSpawnPayload);

    return this.guardrail.checkCandidateCollision({
      candidate_idea: candidateIdea,
      top_k: options.top_k,
      filters: options.filters,
      attempt: options.attempt,
    });
  }
}

console.log("[codex] loaded: src/idea-collision-guardrail/lifecycle-bridge.ts");
