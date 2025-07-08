import React from "react";
import useCategoryList from "@/hooks/branch-management-hooks/useCategoryList";
import { lazy } from "react";
import TabelLoading from "../tabs-component/Loadings/TabelLoading";
// import CategoryTabAddAction from "";
const CategoryTabTable = dynamic(
  () => import("./category-tab-table/category-tab-table-container"),
  {
    ssr: false,
    loading: TabelLoading,
  }
);
const CategoryTabAddAction = dynamic(
  () => import("./category-add-action/category-tab-add-action"),
  {
    ssr: false,
  }
);
function CategoryTabContent() {
  const CategoryTableProps = useCategoryList(false);
  return (
    <div className=" flex flex-col w-full gap-5">
      <CategoryTabAddAction realodMethod={CategoryTableProps.refetch} />
      <CategoryTabTable {...CategoryTableProps} />
    </div>
  );
}

export default CategoryTabContent;
