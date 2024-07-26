import { HttpResponse, http } from "msw";

import {
  MockedEmptyCharactersResponse,
  MockedSearchLuCharacterResponse,
  mockedCharacterDetailResponse,
  mockedCharactersResponse,
} from "./mocks";

export const handlers = [
  http.get("https://swapi.dev/api/people/:id", ({ params }) => {
    const { id } = params;

    if (id === "1") {
      return HttpResponse.json(mockedCharacterDetailResponse, { status: 200 });
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
  //   http.get("*", () => {
  //     return HttpResponse.json({ detail: "Not found" });
  //   }),
];
