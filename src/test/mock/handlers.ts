import { HttpResponse, http } from "msw";

import {
  MockedEmptyCharactersResponse,
  MockedSearchLuCharacterResponse,
  mockedCharacterDetailResponse,
  mockedCharacterDetailResponse_2,
  mockedCharactersResponse,
} from "./mocks";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const handlers = [
  http.get("https://swapi.dev/api/people/:id", async ({ params }) => {
    const { id } = params;
    await delay(50);

    if (id === "1") {
      return HttpResponse.json(mockedCharacterDetailResponse, { status: 200 });
    }

    if (id === "2") {
      return HttpResponse.json(mockedCharacterDetailResponse_2, {
        status: 200,
      });
    }

    if (id === "12345") {
      return HttpResponse.json({ detail: "Not found" }, { status: 404 });
    }
  }),

  http.get("https://swapi.dev/api/people", ({ request }) => {
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get("search");

    if (!searchTerm)
      return HttpResponse.json(mockedCharactersResponse, { status: 200 });

    // for "https://swapi.dev/api/people?search=lu"
    if (searchTerm === "lu") {
      return HttpResponse.json(MockedSearchLuCharacterResponse, {
        status: 200,
      });
    }

    // for "https://swapi.dev/api/people?search=unknown"
    return HttpResponse.json(MockedEmptyCharactersResponse, { status: 200 });
  }),
  http.get("*", () => {
    return HttpResponse.json({ detail: "Not found" }, { status: 404 });
  }),
];
