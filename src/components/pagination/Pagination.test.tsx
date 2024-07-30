import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import Pagination from "./Pagination";

describe("Pagination Component", () => {
  beforeEach(() => {
    localStorage.clear();
  });
  afterEach(() => {
    localStorage.clear();
  });

  it("renders with next and prev buttons", () => {
    const response = {
      previous: "http://example.com/api/characters?page=1",
      next: "http://example.com/api/characters?page=3",
      count: 10,
      results: [],
    };

    render(
      <MemoryRouter>
        <Pagination response={response} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Prev")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("disables prev button if no previous page", () => {
    const response = {
      previous: null,
      next: "http://example.com/api/characters?page=2",
      count: 0,
      results: [],
    };

    render(
      <MemoryRouter>
        <Pagination response={response} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Prev")).toBeDisabled();
    expect(screen.getByText("Next")).not.toBeDisabled();
  });

  it("disables next button if no next page", () => {
    const response = {
      previous: "http://example.com/api/characters?page=1",
      next: null,
      count: 0,
      results: [],
    };

    render(
      <MemoryRouter>
        <Pagination response={response} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Prev")).not.toBeDisabled();
    expect(screen.getByText("Next")).toBeDisabled();
  });
});
