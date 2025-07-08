/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
const cookies = new Cookies();

// interface ProfileNotifeProps {
//   show: boolean;
//   content: {
//     severity: "success" | "info" | "warn" | "error" | undefined;
//     summary: string;
//     detail: string;
//   };
// }
// interface ProfileMissedFieldsProps {
//   fields: Array<string>;
//   isRequierdMissed: boolean;
// }
export interface ProfileSliceType {
  userName: string;
  token: string;
  refreshToken: string;
}

const initialState: ProfileSliceType = {
  refreshToken: "",
  token: "",
  userName: "",
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    onInitProfile: (
      state,
      payload: PayloadAction<{
        userNAme: string;
        token: string;
        refreshToken: string;
      }>
    ) => {
      state.userName = payload.payload.userNAme;
      state.token = payload.payload.token;
      state.refreshToken = payload.payload.refreshToken;
    },
    onLogOut: (state) => {
      cookies.remove("token");
      cookies.remove("refreshToken");
      state.userName = "";
    },
    onSetToken: (
      state,
      payload: PayloadAction<{
        token: string;
        expires: string;
        refreshToken: string;
      }>
    ) => {
      cookies.remove("token");
      cookies.remove("refreshToken");
      localStorage.removeItem("expires-time");
      state.token = payload.payload.token;
      state.refreshToken = payload.payload.refreshToken;

      cookies.set("token", payload.payload.token, {
        path: "/",
        expires: new Date(payload.payload.expires),
      });
      cookies.set("refreshToken", payload.payload.refreshToken, {
        path: "/",
      });
      localStorage.setItem("expires-time", payload.payload.expires);
    },
    resetAuthData: (state) => {
      state = initialState;
    },
  },
});

export const { onLogOut, onInitProfile, resetAuthData, onSetToken } =
  profileSlice.actions;

export default profileSlice.reducer;
