import { configureStore } from "@reduxjs/toolkit";

import countriesReducer from "./countriesSlice";
import formDataReducer from "./formDataSlice";

export const store = configureStore({
  reducer: {
    countries: countriesReducer,
    formData: formDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
