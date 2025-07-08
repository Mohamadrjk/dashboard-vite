// store.ts
import { configureStore } from "@reduxjs/toolkit";
import profileSlice from "./profile/profileSlice";
import clubSettingSlice from "./clubSetting/clubSettingSlice";
import menuDetailSlice from "./menuDetail/menuDetailSlice";
import commonSlice from "./commonSlice/commonSlice";
export const store = configureStore({
  reducer: {
    profileSlice: profileSlice,
    clubSettingSlice: clubSettingSlice,
    menuDetailSlice: menuDetailSlice,
    commonSlice: commonSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
    }),
  devTools: false,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
