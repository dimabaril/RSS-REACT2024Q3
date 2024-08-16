import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import ErrorPage from "./components/ErrorPage";
import "./index.css";
import Root from "./routes/Root";
import ControlledForm from "./routes/controlled-form/ControlledForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "uncontrolled/",
        element: <div>Uncontrolled</div>,
      },
      {
        path: "controlled/",
        element: <ControlledForm />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
