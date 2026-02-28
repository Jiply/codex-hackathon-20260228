import type { SidebarLogEntry } from "@/mocks/contracts";
import {
  SIDEBAR_LOG_FALLBACK_AGENT_IDS,
  SIDEBAR_LOG_FALLBACK_CHANNELS,
  SIDEBAR_LOG_FALLBACK_MODAL_APPS,
  SIDEBAR_LOG_FALLBACK_SEVERITIES,
  SIDEBAR_LOG_FALLBACK_TOOLS,
} from "@/mocks/fixtures";

export interface ParsedCursor {
  anchorMs: number;
  offset: number;
}

export function parseLogsCursorStrict(cursor: string | null): ParsedCursor {
  if (!cursor) return { anchorMs: Date.now(), offset: 0 };

  const [anchorRaw, offsetRaw] = cursor.split(":");
  const anchorMs = Number(anchorRaw);
  const offset = Number(offsetRaw);
  if (!Number.isFinite(anchorMs) || !Number.isFinite(offset) || anchorMs <= 0 || offset < 0) {
    throw new Error("Invalid cursor value");
  }
  return { anchorMs: Math.floor(anchorMs), offset: Math.floor(offset) };
}

export function parseLogsCursorLenient(cursor: string | null): ParsedCursor {
  try {
    return parseLogsCursorStrict(cursor);
  } catch {
    return { anchorMs: Date.now(), offset: 0 };
  }
}

function stableHash(input: string): number {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seededNumber(seed: string, modulo: number): number {
  const hash = stableHash(seed);
  return hash % modulo;
}

export function generateSidebarLog(anchorMs: number, position: number, agentIds: string[]): SidebarLogEntry {
  const seed = `${anchorMs}:${position}`;
  const channel = SIDEBAR_LOG_FALLBACK_CHANNELS[seededNumber(`${seed}:channel`, SIDEBAR_LOG_FALLBACK_CHANNELS.length)];
  const severity = SIDEBAR_LOG_FALLBACK_SEVERITIES[seededNumber(`${seed}:severity`, SIDEBAR_LOG_FALLBACK_SEVERITIES.length)];
  const action =
    channel === "TOOL"
      ? "TOOL_CALLED"
      : channel === "AGENT"
        ? "TASK_CREDITED"
        : channel === "MODAL"
          ? "MODAL_CONTAINER_WARMED"
          : channel === "SUPERVISOR"
            ? "SUPERVISOR_TICK"
            : "API_HEALTH_PULSE";
  const agentId = agentIds[seededNumber(`${seed}:agent`, agentIds.length)];
  const tool = channel === "TOOL" ? SIDEBAR_LOG_FALLBACK_TOOLS[seededNumber(`${seed}:tool`, SIDEBAR_LOG_FALLBACK_TOOLS.length)] : undefined;
  const modalApp =
    channel === "MODAL" || channel === "SYSTEM"
      ? SIDEBAR_LOG_FALLBACK_MODAL_APPS[seededNumber(`${seed}:modal`, SIDEBAR_LOG_FALLBACK_MODAL_APPS.length)]
      : undefined;
  const durationMs = channel === "TOOL" || channel === "MODAL" ? 40 + seededNumber(`${seed}:duration`, 920) : undefined;
  const secondsBack = position * 9 + seededNumber(`${seed}:jitter`, 7);
  const ts = new Date(anchorMs - secondsBack * 1000).toISOString();

  return {
    id: `log-${anchorMs}-${String(position).padStart(6, "0")}`,
    ts,
    channel,
    severity,
    action,
    summary:
      channel === "TOOL"
        ? `${agentId} executed ${tool} against workspace mirror.`
        : channel === "AGENT"
          ? `${agentId} captured +${(seededNumber(`${seed}:delta`, 150) / 100).toFixed(2)} revenue credit from async task.`
          : channel === "MODAL"
            ? `Modal app ${modalApp} warmed a worker for colony traffic.`
            : channel === "SUPERVISOR"
              ? `Supervisor tick completed for ${Math.max(agentIds.length, 1)} active agents.`
              : `API heartbeat confirmed from ${modalApp}.`,
    details: `mock=local hash=${stableHash(seed).toString(16)} risk=${seededNumber(`${seed}:risk`, 99) + 1}%`,
    agentId,
    tool,
    modalApp,
    durationMs,
  };
}

export function generateSidebarLogPage(
  cursor: string | null,
  limit: number,
  agentIds: string[],
  fallbackAnchorMs: number,
): { logs: SidebarLogEntry[]; nextCursor: string } {
  const parsed = cursor ? parseLogsCursorLenient(cursor) : { anchorMs: fallbackAnchorMs, offset: 0 };
  const pool = agentIds.length > 0 ? agentIds : [...SIDEBAR_LOG_FALLBACK_AGENT_IDS];
  const logs = Array.from({ length: limit }, (_, i) => generateSidebarLog(parsed.anchorMs, parsed.offset + i, pool));
  return {
    logs,
    nextCursor: `${parsed.anchorMs}:${parsed.offset + logs.length}`,
  };
}
