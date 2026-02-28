import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";
import { installMockFetch, parseScenario, shouldEnableMocksFromEnv } from "@/mocks";

if (shouldEnableMocksFromEnv()) {
  installMockFetch({
    scenario: parseScenario(import.meta.env.VITE_MOCK_SCENARIO as string | undefined),
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

console.log("[codex] loaded: agents/src/main.tsx");
