import "@testing-library/jest-dom";
import { fireEvent, screen } from "@testing-library/react";
import mockRouter from "next-router-mock";
import { describe, expect, test, vi } from "vitest";

import { renderWithProviders } from "../../test/wrappedRender/wrappedRender";
import Search from "./Search";

vi.mock("next/navigation", async () => {
  const actual = await vi.importActual("next/navigation");
  return {
    ...actual,
    useRouter: () => mockRouter,
    usePathname: () => "/",
  };
});

describe("Search component", () => {
  test("renders the search input and button", () => {
    renderWithProviders(<Search searchParams={{}} />);
    const input = screen.getByPlaceholderText("Search...");
    const button = screen.getByText("Search");

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test("updates the search term on input change", () => {
    renderWithProviders(<Search searchParams={{}} />);
    const input = screen.getByPlaceholderText("Search...");

    fireEvent.change(input, { target: { value: "Luke Skywalker" } });
    expect(input).toHaveValue("Luke Skywalker");
  });
});
