import {
  IMenuDetailSlice,
  initMenuDetail,
  menuDetailUpdateCategoryById,
} from "@/redux/menuDetail/menuDetailSlice";
import { RootState } from "@/redux/store";
import { DiscountType, IMenuDetail } from "@/types/ditgitalmenu-types/menu";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { optionType } from "../../../branch-tab/selectMultiItem";
export interface IMenuProducts {
  category_id: number;
  label: string;
  product_id: number;
  has_discount?: boolean;
  discount_type?: DiscountType;
  discount_value?: string;
  discount_start_date?: string;
  discount_end_date?: string;
}

export interface IMenuDetailItemsModalProps {
  itemId: number | null;
  state: boolean;
}
const useCategorySelection = (params: { initialData: IMenuDetail }) => {
  const [openProductModal, setOpenProductModal] =
    useState<IMenuDetailItemsModalProps>({
      itemId: null,
      state: false,
    });

  const dispatch = useDispatch();
  const { tempData: payloadData } = useSelector<RootState, IMenuDetailSlice>(
    (state) => state.menuDetailSlice
  );
  const selectedCategories: optionType[] = useMemo(() => {
    return (
      (payloadData?.categories?.map((i) => ({
        key: i.category_id || 0,
        label: i.category_name || "",
      })) as optionType[]) || []
    );
  }, []);
  const handleSelectCategory = (e: { key: string }) => {
    dispatch(
      menuDetailUpdateCategoryById({
        category_id: +e.key,
        products: [],
      })
    );
  };

  const InitializeData = useCallback(() => {
    if (params.initialData) {
      // const transformed = transformMenuData(params.initialData);
      dispatch(initMenuDetail(params.initialData));
    }
  }, [params.initialData, dispatch]);
  useEffect(() => {
    InitializeData();
  }, [InitializeData]);
  return {
    selectedCategories,
    handleSelectCategory,
    openProductModal,
    setOpenProductModal,
    payloadData,
  };
};

export { useCategorySelection };
