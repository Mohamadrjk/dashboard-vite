"use client";
import { lazy } from "react";
export const ClmTopbarCardComponentLazy = lazy(
  () => import("./clm-topbar-cards"),
);
export const LevelDataAbundanceLazy = lazy(
  () => import("./LevelDataAbundance"),
);
export const UsersLevelsDataLazy = lazy(
  () => import("./users-levels-data"),
);
export const ClubManagementTableComponentLazy = lazy(
  () => import("../club-managment-table/club-managment-table"),
);
