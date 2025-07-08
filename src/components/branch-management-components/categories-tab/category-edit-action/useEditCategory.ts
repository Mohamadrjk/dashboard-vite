import { useNotify } from "@/components/shared-components/notife/notife";
import { IBranchItem } from "@/types/ditgitalmenu-types/branch";
import { ICategoryItem } from "@/types/ditgitalmenu-types/category";
import { editCategoryItem } from "@/utils/digitalmenu-api/categoryService";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
const validationSchema = yup.object().shape({
  name: yup.string().required("فیلد نام شعبه الزامی است"),
});

function useEditCategory() {
  const FormFiledItems: Partial<
    Record<
      keyof ICategoryItem,
      {
        name: string;
        isRequierd: boolean;
      }
    >
  > = {
    name: {
      name: "عنوان",
      isRequierd: true,
    },
    discount: {
      name: "اعمال تخفیف",
      isRequierd: false,
    },
    menu_id: {
      isRequierd: false,
      name: "انتخاب منو",
    },
  };

  const EditCategoryForm = useForm<ICategoryItem>({
    resolver: yupResolver(validationSchema),
    mode: "onSubmit",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const { notify } = useNotify();

  const handleEdit = async (
    payload: {
      category_id: number;
      item: ICategoryItem;
    },
    relaodMethod?: () => void
  ) => {
    setLoading(true);
    try {
      const filteredItem = Object.fromEntries(
        Object.entries(payload.item).filter(([_, value]) => value != null)
      );
      payload = { ...payload, item: filteredItem };
      const response = await editCategoryItem(payload);
      if (response.status) {
        notify("success", "دسته بندی با موفقیت ویرایش شد");
        relaodMethod?.();
      } else {
        notify("error", "خطا در ویرایش دسته بندی");
      }
    } catch (error) {
      notify("error", error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return { handleEdit, loading, EditCategoryForm, FormFiledItems };
}

export default useEditCategory;
