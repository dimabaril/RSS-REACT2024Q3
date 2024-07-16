import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import BlankCard from "./components/characterCard/BlankCard.tsx";
import CharacterCard from "./components/characterCard/CharacterCard.tsx";
import { characterCardLoader } from "./components/characterCard/CharacterCardLoader.ts";
import Error from "./components/error/Error.tsx";
import Root from "./components/root/Root.tsx";
import { rootLoader } from "./components/root/RootLoader.tsx";
import "./index.css";

export const router = createBrowserRouter([
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
            element: <BlankCard />,
          },
          {
            path: "people/:id",
            element: <CharacterCard />,
            loader: characterCardLoader,
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
