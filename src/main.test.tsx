import { render, screen, waitFor } from "@testing-library/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";

import CharacterCard from "./components/characterCard/CharacterCard.tsx";
import { characterCardLoader } from "./components/characterCard/CharacterCardLoader.ts";
import Error from "./components/error/Error.tsx";
import Root from "./components/root/Root.tsx";
import { rootLoader } from "./components/root/RootLoader.tsx";
import "./index.css";
// import { router } from "./router.tsx";
import {
  mockedCharacterDetailResponse,
  mockedRootLoaderResponse,
} from "./test/mocks.ts";

vi.mock("./components/root/RootLoader.tsx", () => ({
  rootLoader: () => {
    return mockedRootLoaderResponse;
  },
}));

const mockedCharacterCardLoaderResponse = {
  character: mockedCharacterDetailResponse,
  id: "1",
};

vi.mock("./components/characterCard/CharacterCardLoader.ts", () => ({
  characterCardLoader: () => {
    return mockedCharacterCardLoaderResponse;
  },
}));

describe("main", () => {
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
              loader: characterCardLoader,
            },
          ],
        },
      ],
    },
  ]);

  test("bid to select a character to display detailed information", async () => {
    render(
      <RouterProvider
        router={router}
        fallbackElement={<div>Loading...</div>}
      />,
    );

    await waitFor(() => {
      expect(
        screen.getByText("Select some persona, for details"),
      ).toBeInTheDocument();
    });
  });

  test("click on a character to display detailed information", async () => {
    render(
      <RouterProvider
        router={router}
        fallbackElement={<div>Loading...</div>}
      />,
    );

    const lukeSkywalker = screen.getByText("Luke Skywalker");
    lukeSkywalker.click();

    await waitFor(() => {
      expect(screen.getByText("birth year: 19BBY")).toBeInTheDocument();
      expect(screen.getByText("gender: male")).toBeInTheDocument();
      expect(screen.getByText("height: 172 cm.")).toBeInTheDocument();
      expect(screen.getByText("mass: 77 kg.")).toBeInTheDocument();
      expect(screen.getByText("skin color: fair")).toBeInTheDocument();
      expect(screen.getByText("hair color: blond")).toBeInTheDocument();
      expect(screen.getByText("eye color: blue")).toBeInTheDocument();
    });
  });
});
