import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { describe, expect, it, vi } from "vitest";

import { togglePeopleSelected } from "../../features/people/peopleSlice";
import { mockedCharacterDetailResponse } from "../../test/mock/mocks";
import CharacterShort from "./CharacterShort";

const mockStore = configureStore([]);

describe("CharacterShort", () => {
  it("renders character details", () => {
    const store = mockStore({
      peopleSelected: [],
    });

    render(
      <Provider store={store}>
        <CharacterShort character={mockedCharacterDetailResponse} />
      </Provider>,
    );

    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("birth year: 19BBY")).toBeInTheDocument();
  });

  it("toggles character selection", () => {
    const store = mockStore({
      peopleSelected: [],
    });

    store.dispatch = vi.fn();

    render(
      <Provider store={store}>
        <CharacterShort character={mockedCharacterDetailResponse} />
      </Provider>,
    );

    const checkbox = screen.getByTestId("custom-checkbox");

    fireEvent.click(checkbox);

    expect(store.dispatch).toHaveBeenCalledWith(
      togglePeopleSelected(mockedCharacterDetailResponse),
    );
  });

  it("shows checkmark if character is selected", () => {
    const store = mockStore({
      peopleSelected: [mockedCharacterDetailResponse],
    });

    render(
      <Provider store={store}>
        <CharacterShort character={mockedCharacterDetailResponse} />
      </Provider>,
    );

    expect(screen.getByText("✓")).toBeInTheDocument();
  });
});
