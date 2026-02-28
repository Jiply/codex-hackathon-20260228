export { IdeaCollisionGuardrail } from "./service.ts";
export { GuardrailLifecycleBridge } from "./lifecycle-bridge.ts";
export { DefaultCollisionPolicy, DEFAULT_COLLISION_POLICY_CONFIG } from "./policy.ts";
export { DEFAULT_RETRIEVAL_CONFIG, fuseMatchesWithRrf } from "./retrieval.ts";
export { canonicalizeIdeaText } from "./canonicalizer.ts";
export { GuardrailError } from "./errors.ts";
export { CollisionEventType, CollisionReasonCode } from "./contracts.ts";

export { InMemoryVectorStore } from "./adapters/in-memory-vector-store.ts";
export { TokenHashEmbeddingProvider } from "./adapters/token-hash-embedding-provider.ts";
export { lexicalOverlapScore } from "./adapters/lexical.ts";
