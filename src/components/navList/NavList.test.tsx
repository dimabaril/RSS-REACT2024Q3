import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, test } from "vitest";

import {
  MockedEmptyCharactersResponse,
  mockedCharactersResponse,
} from "../../test/mocks";
import NavList from "./NavList";
import "./NavList.scss";

describe("Card List component", () => {
  test("the component renders the specified number of cards", () => {
    render(
      <MemoryRouter>
        <NavList response={mockedCharactersResponse} />
      </MemoryRouter>,
    );
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(mockedCharactersResponse.results.length);
  });

  test("an appropriate message is displayed if no cards are present", () => {
    render(<NavList response={MockedEmptyCharactersResponse} />);
    const message = screen.getByText("No results found");
    expect(message).toBeInTheDocument();
  });
});

describe("Card component", () => {
  test("the card component renders the relevant card data", () => {
    render(
      <MemoryRouter>
        <NavList response={mockedCharactersResponse} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("C-3PO")).toBeInTheDocument();
    expect(screen.getByText("R2-D2")).toBeInTheDocument();
    expect(screen.getByText("Darth Vader")).toBeInTheDocument();
  });
});
