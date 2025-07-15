import { useNotify } from "@/components/shared-components/notife/notife";
import { ICategoryItem } from "@/types/ditgitalmenu-types/category";
import { deleteCategoryItem } from "@/api/digitalmenu-api/categoryService";
import { useState } from "react";

function useDeleteMenuItem() {
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const { notify } = useNotify();

  const handleDeleteMenuItem = async (
    item: ICategoryItem,
    relaodMethod?: () => void
  ) => {
    setDeleteLoading(true);
    try {
      const response = await deleteCategoryItem({
        category_id: item.category_id,
      });
      if (response.data.status == "success") {
        notify("success", "دسته بندی با موفقیت حذف شد");
        relaodMethod?.();
      } else {
        notify("error", "خطا در حذف دسته بندی");
      }
    } catch (error) {
      notify("error", error.response.data.message);
    } finally {
      setDeleteLoading(false);
    }
  };
  return { handleDeleteMenuItem, deleteLoading };
}

export default useDeleteMenuItem;
