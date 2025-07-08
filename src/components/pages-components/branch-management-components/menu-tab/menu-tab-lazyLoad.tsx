"use client";
import { lazy } from "react";

export const MenuGridContainerLazy = lazy(
  () => import("./menu-grid-cards/menu-grid-container")
);
export const MenuAddModalLazy = lazy(
  () => import("./add-menu/add-menu-modal")
);

export const MenuTabTableLazy = lazy(
  () => import("./menu-tab-table/menu-tab-table-container")
);
