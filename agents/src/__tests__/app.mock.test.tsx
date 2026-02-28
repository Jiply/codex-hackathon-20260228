import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import App from "@/App";
import { installMockFetch, uninstallMockFetch } from "@/mocks/fetchInterceptor";

vi.mock("@xyflow/react", () => {
  const React = require("react");

  function ReactFlow(props: any) {
    React.useEffect(() => {
      if (props.onInit) {
        props.onInit({
          fitView: () => undefined,
        });
      }
    }, [props.onInit]);

    return (
      <div data-testid="mock-react-flow">
        <div data-testid="mock-react-flow-nodes">{props.nodes?.length ?? 0}</div>
        {props.children}
      </div>
    );
  }

  return {
    ReactFlow,
    Background: () => <div data-testid="mock-react-flow-bg" />,
    Controls: () => <div data-testid="mock-react-flow-controls" />,
    MarkerType: {
      ArrowClosed: "ArrowClosed",
    },
  };
});

function getLogScrollContainer(): HTMLElement {
  const summary = screen.getByText(/streamed records/i);
  const panel = summary.closest("div");
  if (!panel) throw new Error("Could not locate logs summary panel");
  const container = panel.nextElementSibling as HTMLElement | null;
  if (!container) throw new Error("Could not locate logs scroll container");
  return container;
}

describe("App mock mode integration", () => {
  beforeEach(() => {
    installMockFetch({ scenario: "seeded" });
  });

  afterEach(() => {
    uninstallMockFetch();
  });

  it("boots with seeded mock state", async () => {
    render(<App />);

    expect(await screen.findByText("Agent Capitalism")).toBeInTheDocument();
    expect(await screen.findByText(/mock-seeded|--|unknown/i)).toBeInTheDocument();
    expect(screen.getByTestId("mock-react-flow")).toBeInTheDocument();
  });

  it("runs action flow for spawn/tick/credit/replicate/hide/kill", async () => {
    render(<App />);

    const spawn = await screen.findByRole("button", { name: "Spawn" });
    fireEvent.click(spawn);

    await screen.findByText(/agt_mock_/i);

    const tick = screen.getByRole("button", { name: "Tick" });
    fireEvent.click(tick);

    const creditButtons = screen.getAllByRole("button", { name: "Credit" });
    fireEvent.click(creditButtons[0]);

    const replicateButtons = screen.getAllByRole("button", { name: "Replicate" });
    fireEvent.click(replicateButtons[0]);
    await waitFor(() => {
      expect(screen.getAllByText(/agt_mock_/i).length).toBeGreaterThan(1);
    });

    const hideButtons = screen.getAllByRole("button", { name: "Hide" });
    fireEvent.click(hideButtons[0]);
    await waitFor(() => {
      expect(screen.getAllByRole("button", { name: /Unhide|Hide/ }).length).toBeGreaterThan(0);
    });

    const killButtons = screen.getAllByRole("button", { name: "Kill" });
    const targetKillButton = killButtons[0];
    fireEvent.click(targetKillButton);
    await waitFor(() => {
      expect(targetKillButton).toBeDisabled();
    });
  });

  it("loads additional sidebar logs on scroll", async () => {
    render(<App />);

    const summary = await screen.findByText(/streamed records/i);
    const container = getLogScrollContainer();
    const initialCount = Number((summary.textContent || "0").split(" ")[0] || "0");

    Object.defineProperty(container, "scrollHeight", { configurable: true, value: 1000 });
    Object.defineProperty(container, "clientHeight", { configurable: true, value: 200 });
    Object.defineProperty(container, "scrollTop", { configurable: true, value: 820, writable: true });

    fireEvent.scroll(container);

    await waitFor(() => {
      const nextSummary = screen.getByText(/streamed records/i);
      const nextCount = Number((nextSummary.textContent || "0").split(" ")[0] || "0");
      expect(nextCount).toBeGreaterThan(initialCount);
    });
  });
});
