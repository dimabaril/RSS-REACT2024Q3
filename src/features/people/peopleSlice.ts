import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "../../app/store";
import { Characters } from "../../interfaces/interfaces";

const initialState: Characters = {
  count: 0,
  next: null,
  previous: null,
  results: [],
};

export const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    setPeople: (state, action: PayloadAction<Characters>) => {
      state.count = action.payload.count;
      state.next = action.payload.next;
      state.previous = action.payload.previous;
      state.results = action.payload.results;
    },
  },
});

export const { setPeople } = peopleSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectPeople = (state: RootState) => state.people;

export default peopleSlice.reducer;
