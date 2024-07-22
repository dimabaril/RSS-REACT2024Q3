import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "../features/counter/counterSlice";
import peopleReducer from "../features/people/peopleSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    people: peopleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
