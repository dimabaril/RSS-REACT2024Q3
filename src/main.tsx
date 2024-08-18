import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { store } from "./app/store";
import ErrorPage from "./components/ErrorPage";
import "./index.css";
import Root from "./routes/Root";
import ControlledForm from "./routes/controlled-form/ControlledForm";
import UnControlledForm from "./routes/uncontrolled-form/UncontrolledForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "uncontrolled/",
    element: <UnControlledForm />,
  },
  {
    path: "controlled/",
    element: <ControlledForm />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
