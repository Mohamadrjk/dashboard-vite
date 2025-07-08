import { useNotify } from "@/components/shared-components/notife/notife";
import { IMenuItem } from "@/types/ditgitalmenu-types/menu";
import {
  createMenuItem,
  editMenuItem,
} from "@/utils/digitalmenu-api/menuService";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
const validationSchema = yup.object().shape({
  name: yup.string().required("فیلد نام شعبه الزامی است"),
});

function useEditMenu() {
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

  const EditMenuForm = useForm<IMenuItem>({
    resolver: yupResolver(validationSchema),
    mode: "onSubmit",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const { notify } = useNotify();

  async function onSubmit(
    data: { menu_id: number; item: IMenuItem },
    relaodMethod?: () => void
  ) {
    setLoading(true);
    // Remove null or undefined values from item
    const cleanedItem = Object.fromEntries(
      Object.entries(data.item).filter(([_, value]) => value != null)
    ) as IMenuItem;
    try {
      const response = await editMenuItem({
        item: cleanedItem,
        menu_id: data.menu_id,
      });
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

  return { onSubmit, EditMenuForm, loading, FormFiledItems };
}

export default useEditMenu;
