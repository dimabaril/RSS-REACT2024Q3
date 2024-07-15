import { render, screen } from "@testing-library/react";
import { useRouteError } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import Error from "./Error";

vi.mock("react-router-dom", () => ({
  useRouteError: vi.fn(),
}));

describe("Error component", () => {
  it("displays statusText when available", () => {
    vi.mocked(useRouteError).mockReturnValue({
      message: "Not Found",
      statusText: "404",
    });

    render(<Error />);

    expect(screen.getByText("404")).toBeInTheDocument();
  });

  it("displays message when statusText is not available", () => {
    vi.mocked(useRouteError).mockReturnValue({
      message: "An error occurred",
    });

    render(<Error />);

    expect(screen.getByText("An error occurred")).toBeInTheDocument();
  });

  it("displays default message when error is not available", () => {
    vi.mocked(useRouteError).mockReturnValue({});

    render(<Error />);

    expect(screen.getByText("Damn")).toBeInTheDocument();
  });
});
