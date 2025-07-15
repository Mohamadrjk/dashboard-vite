import { useNotify } from "@/components/shared-components/notife/notife";
import { IProductItem } from "@/types/ditgitalmenu-types/product";
import { createProductItem } from "@/api/digitalmenu-api/productService";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { IFormFiledProps } from "../../branch-tab/add-branch-form/useAddNewBranch";
const validationSchema = yup.object().shape({
  name: yup.string().required("فیلد عنوان الزامی است"),
  price: yup.number().required("فیلد قیمت الزامی است"),
  category_id: yup.number(),
  discount: yup.number(),
  inventory: yup.number(),
  description: yup.string(),
});

export const ProductFormFileds: Partial<
  Record<keyof IProductItem, IFormFiledProps>
> = {
  name: {
    name: "عنوان",
    isRequierd: true,
    type: "text",
  },
  category_id: {
    name: "انتخاب دسته بندی",
    isRequierd: false,
    type: "number",
  },
  price: {
    name: "قیمت",
    isRequierd: true,
    type: "price",
  },
  description: {
    name: "توضیحات",
    isRequierd: false,
    type: "text",
  },
  discount: {
    name: " تخفیف",
    isRequierd: false,
    type: "number",
  },
  inventory: {
    name: "موجودی",
    isRequierd: false,
    type: "number",
  },
};
function useAddNewProduct() {
  const AddProductForm = useForm<IProductItem>({
    resolver: yupResolver(validationSchema),
    mode: "onSubmit",
    defaultValues: {
      is_available: 1,
    },
  });
  const [loading, setLoading] = useState<boolean>(false);
  const { notify } = useNotify();

  async function onSubmit(data: IProductItem, relaodMethod?: () => void) {
    const payload = data.category_id
      ? data
      : {
        ...data,
        category_id: 0,
      };
    setLoading(true);
    try {
      const res = await createProductItem(payload);
      if (res.data.status) {
        notify("success", res.data.message);
        relaodMethod?.();
      } else {
        notify("error", "خطا در ایجاد محصول");
      }
    } catch (e) {
      notify("success", e.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return { onSubmit, AddProductForm, loading, ProductFormFileds };
}

export default useAddNewProduct;
