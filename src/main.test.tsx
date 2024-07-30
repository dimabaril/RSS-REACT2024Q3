import { render, screen, waitFor, within } from "@testing-library/react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { describe, expect, test } from "vitest";

import { store } from "./app/store.ts";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import { router } from "./router.tsx";

describe("main", () => {
  test("bid to select a character to display detailed information", async () => {
    render(
      <ThemeProvider>
        <Provider store={store}>
          <RouterProvider
            router={router}
            fallbackElement={<div>Loading...</div>}
          />
        </Provider>
      </ThemeProvider>,
    );

    await waitFor(() => {
      expect(
        screen.getByText("Select some persona, for details"),
      ).toBeInTheDocument();
    });
  });

  test("click on a character to display detailed information", async () => {
    render(
      <ThemeProvider>
        <Provider store={store}>
          <RouterProvider
            router={router}
            fallbackElement={<div>Loading...</div>}
          />
        </Provider>
      </ThemeProvider>,
    );

    await waitFor(() => {
      const lukeSkywalker = screen.getByText("Luke Skywalker");
      lukeSkywalker.click();
    });

    await waitFor(() => {
      const detailsContainer = screen.getByTestId("character-details");
      expect(
        within(detailsContainer).getByText("birth year: 19BBY"),
      ).toBeInTheDocument();
      expect(
        within(detailsContainer).getByText("gender: male"),
      ).toBeInTheDocument();
      expect(
        within(detailsContainer).getByText("height: 172 cm."),
      ).toBeInTheDocument();
      expect(
        within(detailsContainer).getByText("mass: 77 kg."),
      ).toBeInTheDocument();
      expect(
        within(detailsContainer).getByText("skin color: fair"),
      ).toBeInTheDocument();
      expect(
        within(detailsContainer).getByText("hair color: blond"),
      ).toBeInTheDocument();
      expect(
        within(detailsContainer).getByText("eye color: blue"),
      ).toBeInTheDocument();
    });
  });
});
