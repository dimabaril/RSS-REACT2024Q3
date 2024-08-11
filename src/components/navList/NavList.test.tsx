import "@testing-library/jest-dom";
import { screen, waitFor, within } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import {
  MockedEmptyCharactersResponse,
  mockedCharactersResponse,
} from "../../test/mock/mocks";
import { renderWithProviders } from "../../test/wrappedRender/wrappedRender";
import NavList from "./NavList";

vi.mock("next/navigation", async () => {
  const actual = await vi.importActual("next/navigation");
  return {
    ...actual,
    useSearchParams: () => ({
      get: (key: string) => {
        if (key === "search") return "a";
        return null;
      },
    }),
  };
});

describe("Card List component", () => {
  test("the component renders the specified number of cards", async () => {
    renderWithProviders(<NavList characters={mockedCharactersResponse} />);

    await waitFor(() => {
      const characterDetailsContainer = screen.getByTestId("nav-list");
      const items = within(characterDetailsContainer).getAllByRole("listitem");
      expect(items).toHaveLength(mockedCharactersResponse.results.length);
    });
  });

  test("an appropriate message is displayed if no cards are present", () => {
    renderWithProviders(<NavList characters={MockedEmptyCharactersResponse} />);
    const message = screen.getByText("No results found");
    expect(message).toBeInTheDocument();
  });
});

describe("Card component", () => {
  test("the card component renders the relevant card data", async () => {
    renderWithProviders(<NavList characters={mockedCharactersResponse} />);

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
