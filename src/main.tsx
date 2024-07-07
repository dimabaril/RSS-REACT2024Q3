import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  ErrorBoundary,
  ErrorFallbackUI,
} from "./components/errorBoundary/errorBoundary.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<ErrorFallbackUI />}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
