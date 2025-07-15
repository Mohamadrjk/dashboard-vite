import { useNotify } from "@/components/shared-components/notife/notife";
import {
  IMenuDetail,
  IMenuDetailResult,
} from "@/types/ditgitalmenu-types/menu";
import {
  createMenuDetail,
  getMenuDetail,
  updateMenuDetail,
} from "@/api/digitalmenu-api/menuService";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

function useAssignProductToMenu(selectedMenu?: number) {
  const AssignForm = useForm<IMenuDetail>({
    mode: "onSubmit",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const { notify } = useNotify();
  const {
    data: MenuDetailData,
    isLoading,
    isRefetching,
  } = useQuery<AxiosResponse<IMenuDetailResult>, Error>({
    queryKey: ["getMenuDetail", selectedMenu],
    queryFn: () => {
      if (selectedMenu) {
        return getMenuDetail({
          menu_id: selectedMenu,
        });
      }
      return;
    },
    refetchOnWindowFocus: false,
  });

  const MenuDetailDataLoading = isLoading || isRefetching;
  async function onSubmit(data: IMenuDetail, relaodMethod?: () => void) {
    setLoading(true);

    try {
      const response = MenuDetailData.data.is_detail
        ? await updateMenuDetail(data)
        : await createMenuDetail(data);
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

  return {
    onSubmit,
    AssignForm,
    loading,
    MenuDetailData,
    MenuDetailDataLoading,
  };
}

export default useAssignProductToMenu;
