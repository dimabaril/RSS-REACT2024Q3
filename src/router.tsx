import { createBrowserRouter } from "react-router-dom";

import BlankCard from "./components/characterCard/BlankCard";
import CharacterCard from "./components/characterCard/CharacterCard";
import { characterCardLoader } from "./components/characterCard/CharacterCardLoader";
import Error from "./components/error/Error";
import Root from "./components/root/Root";
import { rootLoader } from "./components/root/RootLoader";

export const routs = [
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
];

export const router = createBrowserRouter(routs);
