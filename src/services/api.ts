import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_URL } from "../constants";
import { CharacterDetails, Characters } from "../interfaces/interfaces";

export const starWarsApi = createApi({
  reducerPath: "starWarsApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL.BASE_URL }),
  endpoints: (builder) => ({
    getCharacterDetailById: builder.query<CharacterDetails, number | string>({
      query: (id) => `people/${id}`,
    }),
    getCharacters: builder.query<Characters, string | null>({
      query: (searchParams) => {
        if (!searchParams) return API_URL.PEOPLE;
        return `${API_URL.PEOPLE}?${searchParams}`;
      },
    }),
  }),
});

// export const { useGetCharacterDetailByIdQuery, useGetCharactersQuery } =
//   starWarsApi;
