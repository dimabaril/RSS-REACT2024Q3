import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import { store } from "./app/store";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./index.scss";
import { router } from "./router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <RouterProvider
          router={router}
          fallbackElement={<div>Loading...</div>}
        />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
);
