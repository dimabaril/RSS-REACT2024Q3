import "@testing-library/jest-dom";
import { render, screen, waitFor, within } from "@testing-library/react";
import { Provider } from "react-redux";
import {
  MemoryRouter,
  RouterProvider,
  createMemoryRouter,
} from "react-router-dom";
import { describe, expect, test } from "vitest";

import { store } from "../../app/store";
import { ThemeProvider } from "../../contexts/ThemeContext";
import { router, routs } from "../../router";
import {
  MockedEmptyCharactersResponse,
  mockedCharactersResponse,
} from "../../test/mock/mocks";
import NavList from "./NavList";

describe("Card List component", () => {
  test("the component renders the specified number of cards", async () => {
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
      const characterDetailsContainer = screen.getByTestId("nav-list");
      const items = within(characterDetailsContainer).getAllByRole("listitem");
      expect(items).toHaveLength(mockedCharactersResponse.results.length);
    });
  });

  test("an appropriate message is displayed if no cards are present", () => {
    render(
      <MemoryRouter>
        <NavList response={MockedEmptyCharactersResponse} />
      </MemoryRouter>,
    );
    const message = screen.getByText("No results found");
    expect(message).toBeInTheDocument();
  });
});

describe("Card component", () => {
  test("the card component renders the relevant card data", async () => {
    const router = createMemoryRouter(routs, {
      initialEntries: ["/"],
      initialIndex: 0,
    });
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
      const navList = screen.getByTestId("nav-list");
      expect(within(navList).getByText("Luke Skywalker")).toBeInTheDocument();
      expect(within(navList).getByText("C-3PO")).toBeInTheDocument();
      expect(within(navList).getByText("R2-D2")).toBeInTheDocument();
      expect(within(navList).getByText("Darth Vader")).toBeInTheDocument();
      expect(within(navList).getByText("Leia Organa")).toBeInTheDocument();
      expect(within(navList).getByText("Owen Lars")).toBeInTheDocument();
      expect(
        within(navList).getByText("Beru Whitesun lars"),
      ).toBeInTheDocument();
      expect(within(navList).getByText("R5-D4")).toBeInTheDocument();
      expect(
        within(navList).getByText("Biggs Darklighter"),
      ).toBeInTheDocument();
      expect(within(navList).getByText("Obi-Wan Kenobi")).toBeInTheDocument();
    });
  });
});
