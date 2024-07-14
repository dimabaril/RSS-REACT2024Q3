import { render } from "@testing-library/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { describe, expect, test } from "vitest";

import CharacterCard from "./components/characterCard/CharacterCard.tsx";
import { loader as characterLoader } from "./components/characterCard/loader.tsx";
import Error from "./components/error/Error.tsx";
import Root from "./components/root/Root.tsx";
import { loader as rootLoader } from "./components/root/loader.tsx";
import "./index.css";

describe("main", () => {
  const testRouter = createBrowserRouter([
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

  test("renders without crashing", async () => {
    render(
      <RouterProvider
        router={testRouter}
        fallbackElement={<div>Loading...</div>}
      />,
    );

    expect(true).toBe(true);
  });
});
