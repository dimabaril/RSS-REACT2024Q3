import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

// import counterReducer from "../features/counter/counterSlice";
import peopleReducer from "../features/people/peopleSlice";
import { starWarsApi } from "../services/api";

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    people: peopleReducer,
    [starWarsApi.reducerPath]: starWarsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(starWarsApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
