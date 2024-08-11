import { configureStore } from "@reduxjs/toolkit";

import peopleSelectedReducer from "../features/people/peopleSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      peopleSelected: peopleSelectedReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
