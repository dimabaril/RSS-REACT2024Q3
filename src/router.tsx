import { createBrowserRouter } from "react-router-dom";

import CharacterCard from "./components/characterCard/CharacterCard";
import { characterCardLoader } from "./components/characterCard/CharacterCardLoader";
import Error from "./components/error/Error";
import Root from "./components/root/Root";
import { rootLoader } from "./components/root/RootLoader";

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
            element: <div>Select some persona, for details</div>,
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
