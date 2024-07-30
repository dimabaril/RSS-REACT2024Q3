import { render, screen, waitFor, within } from "@testing-library/react";
import { Provider } from "react-redux";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { store } from "../../app/store";
import { ThemeProvider } from "../../contexts/ThemeContext";
import { routs } from "../../router";
import { mockedCharacterDetailResponse } from "../../test/mock/mocks";

describe("CharacterDetails", () => {
  it("renders the character data", async () => {
    const router = createMemoryRouter(routs, {
      initialEntries: ["/people/1"],
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
