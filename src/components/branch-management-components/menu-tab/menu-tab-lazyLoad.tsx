"use client";
import dynamic from "next/dynamic";
import ButtonLoading from "../tabs-component/Loadings/buttonLoading";
import GridLoading from "../tabs-component/Loadings/GridLoading";
import TabelLoading from "../tabs-component/Loadings/TabelLoading";

export const MenuGridContainerLazy = dynamic(
  () => import("./menu-grid-cards/menu-grid-container"),
  {
    ssr: false,
    loading: GridLoading,
  }
);
export const MenuAddModalLazy = dynamic(
  () => import("./add-menu/add-menu-modal"),
  {
    ssr: false,
    loading: ButtonLoading,
  }
);

export const MenuTabTableLazy = dynamic(
  () => import("./menu-tab-table/menu-tab-table-container"),
  {
    ssr: false,
    loading: TabelLoading,
  }
);
