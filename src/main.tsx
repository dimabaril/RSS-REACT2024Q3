import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import CharacterCard from "./components/characterCard/CharacterCard.tsx";
import { loader as characterLoader } from "./components/characterCard/loader.tsx";
import Error from "./components/error/Error.tsx";
import Root from "./components/root/Root.tsx";
import { loader as rootLoader } from "./components/root/loader.tsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    loader: rootLoader,
    children: [
      {
        errorElement: <Error />,
        children: [
          {
            index: true,
            element: <div>Select some persona, for details</div>,
          },
          {
            path: "people/:id",
            element: <CharacterCard />,
            loader: characterLoader,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
  </React.StrictMode>,
);
