import { IBranchItem } from "@/types/ditgitalmenu-types/branch";
import { deleteBranchItem } from "@/api/digitalmenu-api/branchesService";
import { useState } from "react";

function useDeleteBranchItem() {
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  // const { notify } = useNotify();

  const handleDeleteBranchItem = async (
    item: IBranchItem,
    relaodMethod?: () => void
  ) => {
    setDeleteLoading(true);
    try {
      const response = await deleteBranchItem({
        branch_id: item.branch_id ?? 0,
      });

      if (response.data.status == "success") {
        // notify("success", "شعبه با موفقیت حذف شد");
        relaodMethod?.();
      } else {
        // notify("error", "خطا در حذف شعبه");
      }
    } catch (error) {
      // notify("error", error.response.data.message);
    } finally {
      setDeleteLoading(false);
    }
  };
  return { handleDeleteBranchItem, deleteLoading };
}

export default useDeleteBranchItem;
