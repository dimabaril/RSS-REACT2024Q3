import { render, screen, waitFor, within } from "@testing-library/react";
import mockRouter from "next-router-mock";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import CharacterDetails from "../../components/characterDetails/CharacterDetails";
import { mockedCharacterDetailResponse } from "../../test/mock/mocks";

vi.mock("next/navigation", async () => {
  const actual = await vi.importActual("next/navigation");
  return {
    ...actual,
    useRouter: () => mockRouter,
    useSearchParams: () => ({
      get: (key: string) => {
        if (key === "id") return "1";
        return null;
      },
    }),
  };
});

describe("CharacterDetails", () => {
  it("renders the character data", async () => {
    const characterDetailsRender =
      await (async (): Promise<React.ReactElement> =>
        CharacterDetails({ params: { id: "1" } }))();

    render(<>{characterDetailsRender}</>);

    await waitFor(() => {
      const characterDetailsContainer = screen.getByTestId("character-details");

      expect(
        within(characterDetailsContainer).getByText(
          mockedCharacterDetailResponse.name,
        ),
      ).toBeInTheDocument();
      expect(
        within(characterDetailsContainer).getByText(
          `birth year: ${mockedCharacterDetailResponse.birth_year}`,
        ),
      ).toBeInTheDocument();
      expect(
        within(characterDetailsContainer).getByText(
          `gender: ${mockedCharacterDetailResponse.gender}`,
        ),
      ).toBeInTheDocument();
      expect(
        within(characterDetailsContainer).getByText(
          `height: ${mockedCharacterDetailResponse.height} cm.`,
        ),
      ).toBeInTheDocument();
      expect(
        within(characterDetailsContainer).getByText(
          `mass: ${mockedCharacterDetailResponse.mass} kg.`,
        ),
      ).toBeInTheDocument();
      expect(
        within(characterDetailsContainer).getByText(
          `skin color: ${mockedCharacterDetailResponse.skin_color}`,
        ),
      ).toBeInTheDocument();
      expect(
        within(characterDetailsContainer).getByText(
          `hair color: ${mockedCharacterDetailResponse.hair_color}`,
        ),
      ).toBeInTheDocument();
      expect(
        within(characterDetailsContainer).getByText(
          `eye color: ${mockedCharacterDetailResponse.eye_color}`,
        ),
      ).toBeInTheDocument();
    });
  });
});
