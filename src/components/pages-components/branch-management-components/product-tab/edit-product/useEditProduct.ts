import { useNotify } from "@/components/shared-components/notife/notife";
import { ICategoryItem } from "@/types/ditgitalmenu-types/category";
import { IProductItem } from "@/types/ditgitalmenu-types/product";
import { editProductItem } from "@/api/digitalmenu-api/productService";
import { useState } from "react";
import useAddNewProduct from "../add-product/useAddProduct";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const validationSchema = yup.object().shape({
  name: yup.string().required("فیلد عنوان الزامی است"),
  price: yup.number().required("فیلد قیمت الزامی است"),
  category_id: yup.number().required("لطفا یک دسته بندی را انتخاب نمایید "),
  discount: yup.number(),
  inventory: yup.number(),
});
function useEditProduct() {
  const { ProductFormFileds } = useAddNewProduct();
  const EditProductForm = useForm<IProductItem>({
    resolver: yupResolver(validationSchema),
    mode: "onSubmit",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const { notify } = useNotify();
  const handleEdit = async (
    payload: {
      product_id: number;
      item: IProductItem;
    },
    relaodMethod?: () => void
  ) => {
    setLoading(true);
    try {
      const filteredItem = Object.fromEntries(
        Object.entries(payload.item).filter(([_, value]) => value != null)
      );
      payload = { ...payload, item: filteredItem };
      const response = await editProductItem(payload);
      if (response.status) {
        notify("success", "محصول با موفقیت ویرایش شد");
        relaodMethod?.();
      } else {
        notify("error", "خطا در ویرایش محصول");
      }
    } catch (error) {
      notify("error", error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return { handleEdit, loading, EditProductForm, ProductFormFileds };
}

export default useEditProduct;
