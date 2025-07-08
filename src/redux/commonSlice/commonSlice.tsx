import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CommonState {
  shoeRedirectLoading: boolean;
}

const initialState: CommonState = {
  shoeRedirectLoading: false,
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    triggerVisibility: (state, payload: PayloadAction<boolean | undefined>) => {
      state.shoeRedirectLoading = !!payload.payload;
    },
  },
});

export const { triggerVisibility } = commonSlice.actions;

export default commonSlice.reducer;
