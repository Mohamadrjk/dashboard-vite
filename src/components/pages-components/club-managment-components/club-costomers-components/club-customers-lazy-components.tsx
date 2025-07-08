"use client";
import { lazy } from "react";

const CustomersTableContainerLazy = lazy(
  () =>
    import(
      "@/components/pages-components/club-managment-components/club-costomers-components/costomers-table/costomers-table-container"
    )
);

export { CustomersTableContainerLazy };
