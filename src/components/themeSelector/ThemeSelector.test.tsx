import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { useTheme } from "../../hooks/useTheme";
import ThemeSelector from "./ThemeSelector";

vi.mock("../../hooks/useTheme");

describe("ThemeSelector", () => {
  it("renders correctly with dark theme", () => {
    (useTheme as vi.Mock).mockReturnValue({
      isDark: true,
      toggleTheme: vi.fn(),
    });

    render(<ThemeSelector />);

    expect(screen.getByAltText("moon")).toBeInTheDocument();
    expect(screen.queryByAltText("sun")).not.toBeInTheDocument();
  });

  it("renders correctly with light theme", () => {
    (useTheme as vi.Mock).mockReturnValue({
      isDark: false,
      toggleTheme: vi.fn(),
    });

    render(<ThemeSelector />);

    expect(screen.getByAltText("sun")).toBeInTheDocument();
    expect(screen.queryByAltText("moon")).not.toBeInTheDocument();
  });

  it("toggles theme when button is clicked", () => {
    const toggleTheme = vi.fn();
    (useTheme as vi.Mock).mockReturnValue({
      isDark: false,
      toggleTheme,
    });

    render(<ThemeSelector />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(toggleTheme).toHaveBeenCalled();
  });
});
