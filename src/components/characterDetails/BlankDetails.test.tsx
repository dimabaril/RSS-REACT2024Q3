import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";

import BlankDetails from "./BlankDetails";

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    useNavigation: () => vi.fn(),
  };
});

describe("BlankDetails", () => {
  test("renders without crashing", () => {
    render(
      <MemoryRouter>
        <BlankDetails />
      </MemoryRouter>,
    );
    expect(
      screen.getByText("Select some persona, for details"),
    ).toBeInTheDocument();
  });
});
