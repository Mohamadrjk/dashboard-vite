import {
  IMenuDetail,
  IMenuSelectedCategoryList,
  IMenuSelectedProduct,
} from "@/types/ditgitalmenu-types/menu";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IMenuDetailSlice {
  data?: IMenuDetail;
  tempData?: IMenuDetail;
}

const initialState: IMenuDetailSlice = {
  data: undefined,
  tempData: undefined,
};

const MenuDetailSlice = createSlice({
  name: "MenuDetailSlice",
  initialState,
  reducers: {
    initMenuDetail: (state, action: PayloadAction<IMenuDetail | undefined>) => {
      if (!action.payload) return;
      state.tempData = {
        ...action.payload,
        categories: action.payload.categories.map((category) => ({
          ...category,
          products: category?.products?.map((product) => ({
            ...product,
            discount_value: product.discount_value
              ? String(Number(product.discount_value).toFixed(0))
              : "0",
          })),
        })),
      };
    },

    menuDetailUpdateCategoryById: (
      state,
      action: PayloadAction<IMenuSelectedCategoryList | undefined>
    ) => {
      if (!action.payload || !state.tempData?.categories) return;

      const { category_id } = action.payload;
      const categoryExists = state.tempData.categories.some(
        (category) => category.category_id === category_id
      );

      state.tempData.categories = categoryExists
        ? state.tempData.categories.filter(
            (category) => category.category_id !== category_id
          )
        : [...state.tempData.categories, action.payload];
    },

    menuDetailUpdateProducts: (
      state,
      action: PayloadAction<IMenuSelectedCategoryList | undefined>
    ) => {
      if (!action.payload || !state.tempData?.categories) return;

      const { category_id, products } = action.payload;
      const existingCategory = state.tempData.categories.find(
        (category) => category.category_id === category_id
      );

      if (existingCategory) {
        existingCategory.products = products;
      } else {
        state.tempData.categories.push(action.payload);
      }
    },

    menuDetailUpdateProductDetail: (
      state,
      action: PayloadAction<
        { categoryId: number; value: IMenuSelectedProduct } | undefined
      >
    ) => {
      if (!action.payload || !state.tempData?.categories) return;

      const { categoryId, value } = action.payload;
      const existingCategory = state.tempData.categories.find(
        (category) => category.category_id === categoryId
      );

      if (existingCategory) {
        const existingProduct = existingCategory?.products?.find(
          (product) => product.product_id === value.product_id
        );

        if (existingProduct) {
          Object.assign(existingProduct, value);
        }
      }
    },

    menuDetailSubmitPayload: (state) => {
      state.data = state.tempData;
    },
  },
});

export const {
  initMenuDetail,
  menuDetailUpdateCategoryById,
  menuDetailUpdateProducts,
  menuDetailUpdateProductDetail,
  menuDetailSubmitPayload,
} = MenuDetailSlice.actions;

export default MenuDetailSlice.reducer;
