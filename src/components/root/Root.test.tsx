import { screen, waitFor, within } from "@testing-library/react";
import mockRouter from "next-router-mock";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import Root from "../../components/root/Root";
import {
  MockedSearchLuCharacterResponse,
  mockedCharacterDetailResponse,
} from "../../test/mock/mocks";
import { renderWithProviders } from "../../test/wrappedRender/wrappedRender";

vi.mock("next/navigation", async () => {
  const actual = await vi.importActual("next/navigation");
  return {
    ...actual,
    useRouter: () => mockRouter,
    useSearchParams: () => ({
      get: (key: string) => {
        if (key === "search") return "Luke";
        return null;
      },
    }),
  };
});

describe("Root", () => {
  it("renders the root component with characters", async () => {
    const rootRender = await (async (): Promise<React.ReactElement> =>
      Root({ searchParams: { search: "" } }))();

    renderWithProviders(<>{rootRender}</>);

    await waitFor(() => {
      const navListContainer = screen.getByTestId("nav-list");

      expect(
        within(navListContainer).getByText(mockedCharacterDetailResponse.name),
      ).toBeInTheDocument();
    });
  });

  it("renders the root component with characters", async () => {
    const rootRender = await (async (): Promise<React.ReactElement> =>
      Root({ searchParams: { search: "lu" } }))();

    renderWithProviders(<>{rootRender}</>);

    await waitFor(() => {
      const navListContainer = screen.getByTestId("nav-list");

      expect(
        within(navListContainer).getAllByTestId("nav-list__item").length,
      ).toBe(MockedSearchLuCharacterResponse.results.length);
    });
  });
});
