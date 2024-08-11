import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import peopleSelectedReducer from "../features/people/peopleSlice";
import { starWarsApi } from "../services/api";

export const makeStore = () =>
  configureStore({
    reducer: {
      peopleSelected: peopleSelectedReducer,
      [starWarsApi.reducerPath]: starWarsApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(starWarsApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
