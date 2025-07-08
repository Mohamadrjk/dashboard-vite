import type { IClubSettingPayload } from "@/types/club-types/club-setting-type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IClubSettingSlice {
  settings: IClubSettingPayload;
}

const initialState: IClubSettingSlice = {
  settings: {
    bannerIsActive: true,
    primaryColor: "",
    secondaryColor: "",
    textColor: "",
    highlightColor: "",
    actionColor: "",
    defaultRankingId: 0,
    defaultInvoiceSurveyId: 0,
    defaultCompanySurveyId: 0,
    rankExchangeRate: 0,
    coinExchangeRate: 0,
    acceptableDaysForReferral: 0,
    oldPaymentsIncludedForLevel: true,
    oldPaymentsIncludedForCoins: true,
  },
};

const clubSettingSlice = createSlice({
  name: "clubSettingSlice",
  initialState,
  reducers: {
    initClubSettings: (state, payload: PayloadAction<IClubSettingPayload>) => {
      state.settings = payload.payload;
    },
    onUpdateSettings: (
      state,
      payload: PayloadAction<{
        key: keyof IClubSettingPayload;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        value: any;
      }>
    ) => {
      state.settings = {
        ...state.settings,
        [payload.payload.key]: payload.payload.value,
      };
    },
  },
});

export const { initClubSettings, onUpdateSettings } = clubSettingSlice.actions;

export default clubSettingSlice.reducer;
