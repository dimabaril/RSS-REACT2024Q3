import { fireEvent, screen, waitFor, within } from "@testing-library/react";
import mockRouter from "next-router-mock";
import { describe, expect, it } from "vitest";

import Index from "../pages/index.tsx";
import Id from "../pages/people/[id].tsx";
import { renderWithProviders } from "./wrappedRender/wrappedRender.tsx";

describe("CharacterDetails Component", () => {
  it("displays correct number of cards", async () => {
    mockRouter.push("/");
    renderWithProviders(<Index />);

    await waitFor(() => {
      expect(screen.getAllByRole("link").length).toBe(10);
    });
  });

  it("displays correct personal data after fetching", async () => {
    mockRouter.push("/people/1");
    renderWithProviders(<Id />);

    await waitFor(() => {
      const characterDetailsContainer = screen.getByTestId("character-details");
      expect(
        within(characterDetailsContainer).getByText("birth year: 19BBY"),
      ).toBeInTheDocument();
      expect(
        within(characterDetailsContainer).getByText("gender: male"),
      ).toBeInTheDocument();
      expect(
        within(characterDetailsContainer).getByText("height: 172 cm."),
      ).toBeInTheDocument();
      expect(
        within(characterDetailsContainer).getByText("mass: 77 kg."),
      ).toBeInTheDocument();
      expect(
        within(characterDetailsContainer).getByText("skin color: fair"),
      ).toBeInTheDocument();
      expect(
        within(characterDetailsContainer).getByText("hair color: blond"),
      ).toBeInTheDocument();
      expect(
        within(characterDetailsContainer).getByText("eye color: blue"),
      ).toBeInTheDocument();
    });
  });

  it("element is removed after click close button", async () => {
    mockRouter.push("/people/1");
    renderWithProviders(<Id />);

    await waitFor(() => {
      expect(screen.getByText("height: 172 cm.")).toBeInTheDocument();
      expect(screen.getByText("×")).toBeInTheDocument();
    });

    await waitFor(async () => {
      const close = screen.getByText("×");
      fireEvent.click(close);
    });

    await waitFor(() => {
      expect(screen.queryByText("height: 172 cm.")).not.toBeInTheDocument();
      expect(screen.queryByText("×")).not.toBeInTheDocument();
    });
  });

  it("element is removed after click away from card", async () => {
    mockRouter.push("/people/1");
    renderWithProviders(<Id />);

    await waitFor(() => {
      expect(screen.getByText("height: 172 cm.")).toBeInTheDocument();
      expect(screen.getByText("×")).toBeInTheDocument();
    });

    await waitFor(async () => {
      const body = document.body;
      fireEvent.click(body);
    });

    await waitFor(() => {
      expect(screen.queryByText("height: 172 cm.")).not.toBeInTheDocument();
      expect(screen.queryByText("×")).not.toBeInTheDocument();
    });
  });

  it("displays 404 page when user navigates to non-existing route", async () => {
    mockRouter.push("/people/12345");
    renderWithProviders(<Id />);

    await waitFor(() => {
      expect(screen.getByText(/Not found/)).toBeInTheDocument();
    });
  });

  it("displays search result ?search=lu", async () => {
    mockRouter.push("/?search=lu");
    renderWithProviders(<Index />);

    await waitFor(() => {
      expect(screen.getAllByRole("link").length).toBe(2);
    });
  });

  it("displays search result ?search=unknown", async () => {
    mockRouter.push("/?search=unknown");
    renderWithProviders(<Index />);

    await waitFor(() => {
      expect(screen.getByText("No results found")).toBeInTheDocument();
    });
  });
});
