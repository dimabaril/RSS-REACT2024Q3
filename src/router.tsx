import { createBrowserRouter } from "react-router-dom";

import BlankCard from "./components/characterCard/BlankCard";
import CharacterCard from "./components/characterCard/CharacterCard";
import Error from "./components/error/Error";
import Root from "./components/root/Root";
import { PATH } from "./constants";

export const routs = [
  {
    path: PATH.ROOT,
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        errorElement: <Error />,
        children: [
          {
            index: true,
            element: <BlankCard />,
          },
          {
            path: PATH.PEOPLE_ID,
            element: <CharacterCard />,
          },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routs);
