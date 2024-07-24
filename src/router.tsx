import { createBrowserRouter } from "react-router-dom";

import BlankDetails from "./components/characterDetails/BlankDetails";
import CharacterDetails from "./components/characterDetails/CharacterDetails";
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
            element: <BlankDetails />,
          },
          {
            path: PATH.PEOPLE_ID,
            element: <CharacterDetails />,
          },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routs);
