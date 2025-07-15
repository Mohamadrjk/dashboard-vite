import { useNotify } from "@/components/shared-components/notife/notife";
import { IMenuItem } from "@/types/ditgitalmenu-types/menu";
import { createMenuItem } from "@/api/digitalmenu-api/menuService";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
const validationSchema = yup.object().shape({
  name: yup.string().required("فیلد نام شعبه الزامی است"),
});

function useAddNewMenu() {
  const FormFiledItems: Partial<
    Record<
      keyof IMenuItem,
      {
        name: string;
        isRequierd: boolean;
        type: string;
      }
    >
  > = {
    name: {
      name: "عنوان",
      isRequierd: true,
      type: "text",
    },
    description: {
      name: "توضیحات",
      isRequierd: false,
      type: "text",
    },
  };

  const AddMenuForm = useForm<IMenuItem>({
    resolver: yupResolver(validationSchema),
    mode: "onSubmit",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const { notify } = useNotify();

  async function onSubmit(data: IMenuItem, relaodMethod?: () => void) {
    setLoading(true);
    try {
      const response = await createMenuItem(data);
      if (response.status) {
        notify("success", response.data.message);
        relaodMethod?.();
      } else {
        notify("error", "خطا در ایجاد منو");
      }
    } catch (error) {
      notify("error", error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return { onSubmit, AddMenuForm, loading, FormFiledItems };
}

export default useAddNewMenu;
