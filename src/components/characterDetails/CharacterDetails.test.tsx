import { screen, waitFor, within } from "@testing-library/react";
import mockRouter from "next-router-mock";
import { describe, expect, it } from "vitest";

import CharacterDetails from "../../pages/people/[id]";
import { mockedCharacterDetailResponse } from "../../test/mock/mocks";
import { renderWithProviders } from "../../test/wrappedRender/wrappedRender";

describe("CharacterDetails", () => {
  it("renders the character data", async () => {
    mockRouter.push("/people/1");

    renderWithProviders(<CharacterDetails />);

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
