import type { EventPublisher } from "../ports.ts";

export class MemoryEventPublisher implements EventPublisher {
  events: Array<{ eventType: string; payload: Record<string, unknown> }>;

  constructor() {
    this.events = [];
  }

  async publish(eventType: string, payload: Record<string, unknown>): Promise<void> {
    this.events.push({ eventType, payload });
  }
}

console.log("[codex] loaded: src/idea-collision-guardrail/testing/memory-event-publisher.ts");
