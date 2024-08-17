import { createSlice } from "@reduxjs/toolkit";
import { countries } from "countries-list";

const countriesSlice = createSlice({
  name: "countries",
  initialState: Object.values(countries).map((country) => country.name),
  reducers: {},
});

export default countriesSlice.reducer;
