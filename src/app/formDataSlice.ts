import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { FormInputPictureBase64 } from "../types/types";

const formDataSlice = createSlice({
  name: "formData",
  initialState: [] as FormInputPictureBase64[],
  reducers: {
    addFormData: (state, action: PayloadAction<FormInputPictureBase64>) => {
      state.push(action.payload);
    },
  },
});

export const { addFormData } = formDataSlice.actions;

export default formDataSlice.reducer;
