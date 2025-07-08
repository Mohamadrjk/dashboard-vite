import useCategoryList from "@/hooks/branch-management-hooks/useCategoryList";
import { lazy } from "react";
// import CategoryTabAddAction from "";
const CategoryTabTable = lazy(() => import("./category-tab-table/category-tab-table-container"));
const CategoryTabAddAction = lazy(
  () => import("./category-add-action/category-tab-add-action")
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
