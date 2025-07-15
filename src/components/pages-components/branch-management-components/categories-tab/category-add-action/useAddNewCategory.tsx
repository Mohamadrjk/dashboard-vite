import { useNotify } from "@/components/shared-components/notife/notife";
import { ICategoryItem } from "@/types/ditgitalmenu-types/category";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { IFormFiledProps } from "../../branch-tab/add-branch-form/useAddNewBranch";
import { createCategoryItem } from "@/api/digitalmenu-api/categoryService";
const validationSchema = yup.object().shape({
  name: yup.string().required("فیلد نام شعبه الزامی است"),
  image_base64: yup.string(),
  discount: yup.number(),
  branch_id: yup.number(),
});

function useAddNewCategory() {
  const FormFiledItems: Partial<Record<keyof ICategoryItem, IFormFiledProps>> =
  {
    name: {
      name: "عنوان",
      isRequierd: true,
    },
    discount: {
      name: "اعمال تخفیف",
      isRequierd: false,
    },
  };

  const AddCategoryForm = useForm<ICategoryItem>({
    resolver: yupResolver(validationSchema),
    mode: "onSubmit",
    defaultValues: {
      is_active: 1,
    },
  });
  const [loading, setLoading] = useState<boolean>(false);
  const { notify } = useNotify();
  async function onSubmit(data: ICategoryItem, relaodMethod?: () => void) {
    setLoading(true);
    try {
      const res = await createCategoryItem({
        ...data,
        menu_id: 0,
      });
      if (res.data.status == "success") {
        notify("success", "دسته بندی با موفقیت ایجاد شد");
        relaodMethod?.();
      } else {
        notify("error", "خطا در ایجاد دسته بندی");
      }
    } catch (error) {
      notify("error", error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return { onSubmit, AddCategoryForm, loading, FormFiledItems };
}

export default useAddNewCategory;
