import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import BlankDetails from "./BlankDetails";

describe("BlankDetails", () => {
  test("renders without crashing", () => {
    render(<BlankDetails />);
    expect(
      screen.getByText("Select some persona, for details"),
    ).toBeInTheDocument();
  });
});
