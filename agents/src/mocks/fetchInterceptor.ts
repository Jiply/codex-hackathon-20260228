import type { EndpointFaultMap } from "@/mocks/contracts";
import { parseFaultMap, parseScenario, type MockScenarioName } from "@/mocks/scenarios";
import { getOrCreateMockColonyState, patchMockFaults, resetMockColonyState } from "@/mocks/state";

const HANDLED_PATH = [
  /^\/version$/,
  /^\/colony\/state$/,
  /^\/colony\/events$/,
  /^\/colony\/logs$/,
  /^\/agents\/spawn$/,
  /^\/agents\/[^/]+\/task$/,
  /^\/agents\/[^/]+\/replicate$/,
  /^\/agents\/[^/]+\/simulate\/hide-balance$/,
  /^\/agents\/[^/]+\/kill$/,
  /^\/supervisor\/tick$/,
];

let restore: (() => void) | null = null;
let originalFetch: typeof fetch | null = null;

function bodyToString(body: BodyInit | null | undefined): string | undefined {
  if (typeof body === "string") return body;
  if (!body) return undefined;
  if (body instanceof URLSearchParams) return body.toString();
  return undefined;
}

function shouldHandle(pathname: string): boolean {
  return HANDLED_PATH.some((pattern) => pattern.test(pathname));
}

async function requestToNormalized(input: RequestInfo | URL, init?: RequestInit): Promise<{ method: string; url: URL; bodyText?: string }> {
  if (input instanceof Request) {
    const method = (init?.method ?? input.method ?? "GET").toUpperCase();
    const url = new URL(input.url, window.location.origin);
    const initBody = bodyToString(init?.body);
    if (initBody !== undefined) return { method, url, bodyText: initBody };
    if (method === "GET" || method === "HEAD") return { method, url };
    const bodyText = await input.clone().text();
    return { method, url, bodyText: bodyText || undefined };
  }

  const raw = typeof input === "string" ? input : input.toString();
  const url = new URL(raw, window.location.origin);
  const method = (init?.method ?? "GET").toUpperCase();
  const bodyText = bodyToString(init?.body);
  return { method, url, bodyText };
}

export interface InstallMockFetchOptions {
  scenario?: MockScenarioName;
  faults?: EndpointFaultMap;
}

export function installMockFetch(options: InstallMockFetchOptions = {}): void {
  const scenario = options.scenario ?? parseScenario(import.meta.env.VITE_MOCK_SCENARIO as string | undefined);
  const envFaults = parseFaultMap(import.meta.env.VITE_MOCK_FAULTS as string | undefined);
  const mergedFaults = {
    ...envFaults,
    ...(options.faults ?? {}),
  };

  const state = getOrCreateMockColonyState(scenario, mergedFaults);

  if (restore) {
    state.setFaults({ ...state.getFaults(), ...mergedFaults });
    return;
  }

  originalFetch = globalThis.fetch.bind(globalThis);

  const mockFetch: typeof fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const normalized = await requestToNormalized(input, init);
    if (!shouldHandle(normalized.url.pathname)) {
      if (!originalFetch) throw new Error("Original fetch not available");
      return originalFetch(input, init);
    }

    return state.request({
      method: normalized.method,
      pathname: normalized.url.pathname,
      searchParams: normalized.url.searchParams,
      bodyText: normalized.bodyText,
    });
  };

  globalThis.fetch = mockFetch;
  restore = () => {
    if (originalFetch) {
      globalThis.fetch = originalFetch;
    }
    restore = null;
    originalFetch = null;
  };
}

export function uninstallMockFetch(): void {
  if (!restore) return;
  restore();
}

export function resetMockState(scenario: MockScenarioName): void {
  resetMockColonyState(scenario);
}

export function applyMockFaults(faults: EndpointFaultMap): void {
  patchMockFaults(faults);
}

export function isMockFetchInstalled(): boolean {
  return Boolean(restore);
}

export function shouldEnableMocksFromEnv(): boolean {
  return String(import.meta.env.VITE_USE_MOCKS ?? "").trim().toLowerCase() === "true";
}
