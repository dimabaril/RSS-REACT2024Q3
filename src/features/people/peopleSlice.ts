import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "../../app/store";
import { CharacterDetails } from "../../interfaces/interfaces";

const initialState: CharacterDetails[] = [];

export const peopleSelectedSlice = createSlice({
  name: "peopleSelected",
  initialState,
  reducers: {
    setPeopleSelected: (state, action: PayloadAction<CharacterDetails>) => {
      state.push(action.payload);
    },
    unsetPeopleSelected: (state, action: PayloadAction<CharacterDetails>) => {
      const index = state.findIndex(
        (character) => character.url === action.payload.url,
      );
      state.splice(index, 1);
    },
    togglePeopleSelected: (state, action: PayloadAction<CharacterDetails>) => {
      const index = state.findIndex(
        (character) => character.url === action.payload.url,
      );
      if (index === -1) {
        state.push(action.payload);
      } else {
        state.splice(index, 1);
      }
    },
    unsetAllPeopleSelected: () => initialState,
  },
});

export const {
  setPeopleSelected,
  unsetPeopleSelected,
  togglePeopleSelected,
  unsetAllPeopleSelected,
} = peopleSelectedSlice.actions;

export const selectPeopleSelected = (state: RootState) => state.peopleSelected;

export default peopleSelectedSlice.reducer;
