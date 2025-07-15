import { useNotify } from "@/components/shared-components/notife/notife";
import { IProductItem } from "@/types/ditgitalmenu-types/product";
import { deleteProductItem } from "@/api/digitalmenu-api/productService";
import { useState } from "react";

function useDeleteProductItem() {
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const { notify } = useNotify();

  const handleDeleteProductItem = async (
    item: IProductItem,
    relaodMethod?: () => void
  ) => {
    setDeleteLoading(true);
    try {
      const response = await deleteProductItem({
        product_id: item.product_id,
      });
      console.log(response.data);

      if (response.data.status == "success") {
        notify("success", "محصول با موفقیت حذف شد");
        relaodMethod?.();
      } else {
        notify("error", "خطا در حذف محصول");
      }
    } catch (error) {
      notify("error", error.response.data.message);
    } finally {
      setDeleteLoading(false);
    }
  };
  return { handleDeleteProductItem, deleteLoading };
}

export default useDeleteProductItem;
