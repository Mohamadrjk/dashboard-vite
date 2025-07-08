import React from "react";
import useProductList from "@/hooks/branch-management-hooks/useProductList";
import dynamic from "next/dynamic";
import TabelLoading from "../tabs-component/Loadings/TabelLoading";
import ButtonLoading from "../tabs-component/Loadings/buttonLoading";

const ProductTabTable = dynamic(
  () => import("./product-tab-table/product-tab-table-container"),
  {
    ssr: false,
    loading: TabelLoading,
  }
);
const ProductAddModal = dynamic(
  () => import("./add-product/add-product-modal"),
  {
    ssr: false,
    loading: ButtonLoading,
  }
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
