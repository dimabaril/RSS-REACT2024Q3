import { fireEvent, screen, waitFor, within } from "@testing-library/react";
import mockRouter from "next-router-mock";
import { describe, expect, it } from "vitest";

import CharacterDetails from "./pages/people/[id]";
import { renderWithProviders } from "./test/wrappedRender/wrappedRender";

describe("main", () => {
  it("click on a character to switch detailed information", async () => {
    mockRouter.push("/people/2");
    renderWithProviders(<CharacterDetails />);

    await waitFor(() => {
      const navList = screen.getByTestId("nav-list");
      const lukeSkywalker = within(navList).getByText("Luke Skywalker");
      fireEvent.click(lukeSkywalker);
      const detailsContainer = screen.getByTestId("character-details");
      within(detailsContainer).getByText("Luke Skywalker");

      expect(
        within(detailsContainer).getByText("Luke Skywalker"),
      ).toBeInTheDocument();
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
