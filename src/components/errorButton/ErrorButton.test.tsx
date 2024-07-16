import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ErrorButton from "./ErrorButton";

describe("ErrorButton", () => {
  it("should render without error", () => {
    render(<ErrorButton />);
    const button = screen.getByRole("button", { name: "Throw Error Button" });
    expect(button).toBeInTheDocument();
  });

  it("should throw an error when clicked", () => {
    render(<ErrorButton errorMessage="Test Error Message" />);
    const button = screen.getByRole("button", { name: "Throw Error Button" });
    expect(() => {
      fireEvent.click(button);
    }).toThrow();
  });
});
