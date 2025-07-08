import useProductList from "@/hooks/branch-management-hooks/useProductList";
import { lazy } from "react";

const ProductTabTable = lazy(
  () => import("./product-tab-table/product-tab-table-container")
);
const ProductAddModal = lazy(
  () => import("./add-product/add-product-modal")
);
function ProductTabContent() {
  const ProductListProps = useProductList(false);
  return (
    <div className=" flex flex-col gap-5">
      <ProductAddModal reloadMethod={ProductListProps.refetch} />
      <ProductTabTable {...ProductListProps} />
    </div>
  );
}

export default ProductTabContent;
