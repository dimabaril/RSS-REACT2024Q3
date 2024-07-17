import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

import {
  MockedEmptyCharactersResponse,
  mockedCharacterDetailResponse,
  mockedCharactersResponse,
} from "./mocks";

afterEach(() => {
  cleanup();
});

global.fetch = vi.fn().mockImplementation((input) => {
  const url = typeof input === "string" ? new URL(input) : input;

  return new Promise((resolve) => {
    setTimeout(() => {
      if (url.href.includes("https://swapi.dev/api/people/12345")) {
        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve({ detail: "Not found" }),
        });
      } else if (url.href.includes("https://swapi.dev/api/people/1")) {
        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(mockedCharacterDetailResponse),
        });
      } else if (url.href.startsWith("https://swapi.dev/api/people/")) {
        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(mockedCharactersResponse),
        });
      } else if (
        url.href.startsWith("https://swapi.dev/api/people/?q=unknoun")
      ) {
        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(MockedEmptyCharactersResponse),
        });
      } else {
        resolve({
          ok: false,
          status: 404,
          json: () => Promise.resolve({ detail: "Not found" }),
        });
      }
    }, 200);
  });
});
