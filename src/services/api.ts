import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { CharacterDetails, Characters } from "../interfaces/interfaces";

export const fetchSwCharacters = async (
  term: string | null = null,
  page: string | null = null,
): Promise<Characters> => {
  const endpoint = "https://swapi.dev/api/people/";

  const currentUrl = new URL(endpoint);
  if (term) {
    currentUrl.searchParams.set("search", term);
  }
  if (page) {
    currentUrl.searchParams.set("page", page);
  }

  const response = await fetch(currentUrl);
  if (!response.ok) {
    throw new Error(`Network response wasn't ok: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

// export const fetchSwCharacterDetails = async (
//   id: string,
// ): Promise<CharacterDetails> => {
//   const endpoint = "https://swapi.dev/api/people/";

//   const response = await fetch(endpoint + id);
//   if (!response.ok) {
//     throw new Error(`Network response wasn't ok: ${response.status}`);
//   }
//   const data = await response.json();
//   return data;
// };

export const starWarsApi = createApi({
  reducerPath: "starWarsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://swapi.dev/api/" }),
  endpoints: (builder) => ({
    getCharacterDetailById: builder.query<CharacterDetails, number>({
      query: (id) => `people/${id}`,
    }),
    getCharacters: builder.query<Characters, string | null>({
      query: (searchParams) => {
        if (!searchParams) return "people/";
        return `people/?${searchParams}`;
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
// export const { useGetCharacterDetailByIdQuery, useGetCharactersQuery } =
//   starWarsApi;
