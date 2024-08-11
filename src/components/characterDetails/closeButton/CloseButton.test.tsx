import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import CloseButton from "./CloseButton";

const mockedRouterPush = vi.fn();

vi.mock("next/navigation", async () => {
  const actual = await vi.importActual("next/navigation");
  return {
    ...actual,
    useRouter: (): {
      push: () => void;
    } => ({ push: mockedRouterPush }),
    useSearchParams: vi.fn(() => {
      const searchParams = new URLSearchParams({ page: "1" });
      return searchParams;
    }),
  };
});

describe("CloseButton", () => {
  beforeEach(() => {
    mockedRouterPush.mockClear();
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the close button", () => {
    render(<CloseButton />);
    const closeButton = screen.getByRole("button");
    expect(closeButton).toBeInTheDocument();
  });

  it("closes the character details", async () => {
    render(<CloseButton />);
    const closeButton = screen.getByRole("button");
    closeButton.click();
    expect(mockedRouterPush).toHaveBeenCalled();
  });
});
