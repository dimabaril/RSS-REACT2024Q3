import type { Action, PayloadAction } from "@reduxjs/toolkit";
import {
  CombinedState,
  EndpointDefinitions,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

import type { RootState } from "../app/store";
import { API_URL } from "../constants";
import { CharacterDetails, Characters } from "../interfaces/interfaces";

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === HYDRATE;
}

export const starWarsApi = createApi({
  reducerPath: "starWarsApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL.BASE_URL }),

  extractRehydrationInfo(
    action,
    { reducerPath },
  ): CombinedState<EndpointDefinitions, string, "starWarsApi"> | undefined {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath];
    }
  },

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
