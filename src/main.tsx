import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import {
  ErrorBoundary,
  ErrorFallbackUI,
} from "./components/errorBoundary/_ErrorBoundary.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<ErrorFallbackUI />}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
