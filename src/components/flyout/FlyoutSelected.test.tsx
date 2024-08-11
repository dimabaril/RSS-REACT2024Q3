import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { describe, expect, it, vi } from "vitest";

import { unsetAllPeopleSelected } from "../../features/people/peopleSlice";
import { concertObjectToCsv } from "../../helpers/convertObjectToCsv";
import { createBlobURL } from "../../helpers/createBlobURL";
import { mockedCharacterDetailResponse } from "../../test/mock/mocks";
import FlyoutSelected from "./FlyoutSelected";

vi.mock("../../helpers/convertObjectToCsv");
vi.mock("../../helpers/createBlobURL");

const mockStore = configureStore([]);

describe("FlyoutSelected", () => {
  it("renders correctly when no characters are selected", () => {
    const store = mockStore({
      peopleSelected: [],
    });

    render(
      <Provider store={store}>
        <FlyoutSelected />
      </Provider>,
    );

    expect(screen.queryByText("0 character is selected")).toBeInTheDocument();
  });

  it("renders correctly when characters are selected", () => {
    const store = mockStore({
      peopleSelected: [mockedCharacterDetailResponse],
    });

    render(
      <Provider store={store}>
        <FlyoutSelected />
      </Provider>,
    );

    expect(screen.getByText("1 character is selected")).toBeInTheDocument();
  });

  it("unselects all characters when button is clicked", () => {
    const store = mockStore({
      peopleSelected: [mockedCharacterDetailResponse],
    });

    store.dispatch = vi.fn();

    render(
      <Provider store={store}>
        <FlyoutSelected />
      </Provider>,
    );

    const button = screen.getByText("Unselect all");
    fireEvent.click(button);

    expect(store.dispatch).toHaveBeenCalledWith(unsetAllPeopleSelected());
  });

  it("generates CSV download link when characters are selected", () => {
    const store = mockStore({
      peopleSelected: [mockedCharacterDetailResponse],
    });

    const mockCsvData =
      "name,birth_year,url\nLuke Skywalker,19BBY,https://swapi.dev/api/people/1/";
    const mockBlobUrl = "blob:http://localhost:3000/12345";

    (concertObjectToCsv as vi.Mock).mockReturnValue(mockCsvData);
    (createBlobURL as vi.Mock).mockReturnValue(mockBlobUrl);

    render(
      <Provider store={store}>
        <FlyoutSelected />
      </Provider>,
    );

    expect(concertObjectToCsv).toHaveBeenCalledWith([
      mockedCharacterDetailResponse,
    ]);
    expect(createBlobURL).toHaveBeenCalledWith(mockCsvData, "text/csv");

    const downloadLink = screen.getByText(/download selected as csv/i);
    expect(downloadLink).toBeInTheDocument();
    expect(downloadLink).toHaveAttribute("href", mockBlobUrl);
    expect(downloadLink).toHaveAttribute(
      "download",
      "1_selected_characters.csv",
    );
  });
});
