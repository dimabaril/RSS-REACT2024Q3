import { LoaderFunctionArgs } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import * as api from "../../services/api";
import { mockedCharactersResponse } from "../../test/mocks";
import { rootLoader } from "./RootLoader";

const localStorageMock = (function () {
  let store: { [key: string]: string } = {};
  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("rootLoader", () => {
  it("loads data using query parameters from the URL", async () => {
    const mockFetchSWPeople = vi
      .spyOn(api, "fetchSWPeople")
      .mockResolvedValueOnce(mockedCharactersResponse);

    const request = {
      url: "https://test.com/?q=luke&page=1",
    };

    const result = await rootLoader({ request } as LoaderFunctionArgs);

    expect(mockFetchSWPeople).toHaveBeenCalledWith("luke", "1");
    expect(result).toEqual({ response: mockedCharactersResponse, q: "luke" });

    mockFetchSWPeople.mockRestore();
  });

  it("loads data using values from localStorage when URL parameters are absent", async () => {
    window.localStorage.setItem("searchText", "yoda");
    window.localStorage.setItem("page", "2");

    const mockFetchSWPeople = vi
      .spyOn(api, "fetchSWPeople")
      .mockResolvedValueOnce(mockedCharactersResponse);

    const request = {
      url: "https://test.com/",
    };

    const result = await rootLoader({ request } as LoaderFunctionArgs);

    expect(mockFetchSWPeople).toHaveBeenCalledWith("yoda", "1");
    expect(result).toEqual({ response: mockedCharactersResponse, q: "yoda" });

    window.localStorage.clear();
    mockFetchSWPeople.mockRestore();
  });
});
