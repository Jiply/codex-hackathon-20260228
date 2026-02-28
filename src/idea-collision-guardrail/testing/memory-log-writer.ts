import type { HumanLogWriter } from "../ports.ts";

export class MemoryLogWriter implements HumanLogWriter {
  timeline: string[];
  agentLogs: Map<string, string[]>;

  constructor() {
    this.timeline = [];
    this.agentLogs = new Map();
  }

  async appendTimeline(entry: string): Promise<void> {
    this.timeline.push(entry);
  }

  async appendAgentLog(agentId: string, entry: string): Promise<void> {
    if (!this.agentLogs.has(agentId)) {
      this.agentLogs.set(agentId, []);
    }

    this.agentLogs.get(agentId)!.push(entry);
  }
}

console.log("[codex] loaded: src/idea-collision-guardrail/testing/memory-log-writer.ts");
