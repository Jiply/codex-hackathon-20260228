import React from "react";
import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import App from "@/App";
import { installMockFetch, uninstallMockFetch } from "@/mocks/fetchInterceptor";

vi.mock("@xyflow/react", () => {
  const React = require("react");

  return {
    ReactFlow: ({ children, onInit }: any) => {
      React.useEffect(() => {
        onInit?.({ fitView: () => undefined });
      }, [onInit]);
      return <div data-testid="mock-react-flow">{children}</div>;
    },
    Background: () => <div />,
    Controls: () => <div />,
    MarkerType: {
      ArrowClosed: "ArrowClosed",
    },
  };
});

describe("App mock error UX", () => {
  beforeEach(() => {
    installMockFetch({ scenario: "backend-down" });
  });

  afterEach(() => {
    uninstallMockFetch();
  });

  it("shows local stream banner and API placeholder version", async () => {
    render(<App />);

    expect(await screen.findByText(/local stream/i)).toBeInTheDocument();
    expect(await screen.findByText(/API --/i)).toBeInTheDocument();
  });
});
