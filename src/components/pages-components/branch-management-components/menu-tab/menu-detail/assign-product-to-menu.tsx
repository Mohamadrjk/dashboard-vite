import {
  IMenuDetail,
  IMenuDetailResult,
} from "@/types/ditgitalmenu-types/menu";
import { Empty, Form, Image, Tooltip } from "antd";
import { useCallback } from "react";
import { UseFormReturn } from "react-hook-form";
import { CloseOutlined, LoadingOutlined } from "@ant-design/icons";
import SelectMultiDropdown from "../../branch-tab/selectMultiItem";
import { useCategorySelection } from "./hooks/useCategorySelection";
import { AxiosResponse } from "axios";
import ProductSelectModal from "./product-select-modal";
import { Icon } from "@iconify/react/dist/iconify.js";
import SelectionSkeleton from "./SelectionSkeleton";
import { ICategoryItem } from "@/types/ditgitalmenu-types/category";
import clsx from "clsx";

interface AssignProductToMenuProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  AssignForm: UseFormReturn<IMenuDetail, any, undefined>;
  onSubmit: (data: IMenuDetail) => void;
  loading: boolean;
  CategoryList: ICategoryItem[];
  categoryOption: {
    label: string;
    key: number;
  }[];
  initData: AxiosResponse<IMenuDetailResult, any>;
}

function AssignProductToMenu({
  AssignForm,
  loading,
  initData,
  CategoryList,
  categoryOption,
  onSubmit,
}: AssignProductToMenuProps) {
  const {
    handleSubmit,
    formState: { errors },
  } = AssignForm;
  const {
    openProductModal,
    selectedCategories,
    handleSelectCategory,
    setOpenProductModal,
    payloadData,
  } = useCategorySelection({ initialData: initData.data.data });

  const BeforeSubmit = () => {
    onSubmit({ categories: payloadData.categories });
  };
  const getCategoryDetail = useCallback(
    (id: number) => {
      return CategoryList && CategoryList.find((c) => c.category_id == id);
    },
    [CategoryList]
  );

  return (
    <Form onFinish={handleSubmit(BeforeSubmit)} className=" !font-Regular">
      <div className="flex flex-col  max-h-[70vh] overflow-auto  p-2  gap-5 ">
        <div className=" grid grid-cols-2 font-Regular gap-x-5 ">
          <div className=" flex flex-col">
            <SelectMultiDropdown
              onMenuClick={handleSelectCategory}
              options={categoryOption}
              title="انتخاب دسته بندی"
              label="انتخاب دسته بندی"
              selectedItem={selectedCategories}
            />
          </div>
        </div>
        <div className=" grid md:grid-cols-3  lg:grid-cols-4  min-[450px]:grid-cols-2  overflow-auto max-h-[40vh] no-scrollbar gap-4">
          {payloadData ? (
            payloadData.categories.length > 0 ? (
              payloadData?.categories.map(
                (i, index) =>
                  getCategoryDetail(i.category_id) && (
                    <CategorySelectItem
                      key={index}
                      handleSelectCategory={handleSelectCategory}
                      item={getCategoryDetail(i.category_id)}
                      productLength={i.products.length}
                      setOpenProductModal={setOpenProductModal}
                    />
                  )
              )
            ) : (
              <Empty
                className=" col-span-full"
                description={
                  <span className=" font-Regular text-Secondary">
                    دسته بندی ای انتخاب نشده است
                  </span>
                }
              />
            )
          ) : (
            <SelectionSkeleton />
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="col-span-2 flex justify-end gap-4 items-center mt-3">
        <button
          type="submit"
          className="rounded-[6px]  border  border-Primary text-Primary px-4 py-2 "
          disabled={Object.keys(errors).length > 0 || loading}
        >
          تایید و ثبت جزییات منو
          {loading && <LoadingOutlined />}
        </button>
      </div>
      <ProductSelectModal
        onClose={() =>
          setOpenProductModal({
            itemId: null,
            state: false,
          })
        }
        open={openProductModal.state}
        selectedCategory={openProductModal.itemId}
      />
    </Form>
  );
}

export default AssignProductToMenu;

const CategorySelectItem = ({
  item,
  handleSelectCategory,
  setOpenProductModal,
  productLength,
}: {
  productLength: number;
  item: ICategoryItem;
  handleSelectCategory: any;
  setOpenProductModal: any;
}) => {
  return (
    item && (
      <div className="flex relative border rounded-md  overflow-hidden   items-center  justify-between ">
        <div className="aspect-[16/7] w-full md:aspect-video relative flex gap-1 flex-col items-center">
          <Image
            src={
              item?.image_base64 ? item?.image_base64 : "/placeholder/Logo.png"
            }
            width={300}
            height={300}
            alt={item && item?.name + item?.category_id}
            className={clsx(
              " w-full h-full   max-lg:aspect-video aspect-square  object-contain",
              item?.image_base64 && " !object-cover"
            )}
          />

          <div className=" md:p-2 w-full overflow-auto p-1  flex flex-col gap-2 items-center justify-center">
            <span className=" md:text-lg text-base w-full  text-ellipsis  overflow-hidden text-nowrap">
              {item.name}
            </span>
            <div className="md:text-base text-xs flex max-w-full  gap-2">
              <span>تعداد کالاهای انتخاب شده:</span>
              <span>{productLength} </span>
            </div>
          </div>
        </div>
        <div className=" bg-white absolute top-0 left-0 z-10 flex flex-row  items-center">
          <div
            onClick={() => {
              setOpenProductModal({
                itemId: item.category_id,
                state: true,
              });
            }}
            className="  hover:bg-gray-300 cursor-pointer transition-all duration-300 p-2 hover:opacity-100 opacity-50 active:scale-75"
          >
            <Tooltip title="انتخاب محصول">
              <Icon
                icon="mage:edit"
                width="24"
                height="24"
                style={{ color: "var(--secondary)" }}
              />
            </Tooltip>
          </div>
          <span
            role="button"
            className="text-Alert  hover:bg-gray-300 cursor-pointer  transition-all duration-300 p-2 hover:opacity-100 opacity-50 active:scale-75 "
            onClick={() =>
              handleSelectCategory({
                key: String(item.category_id),
              })
            }
          >
            <Tooltip title="حذف دسته">
              <CloseOutlined />
            </Tooltip>
          </span>
        </div>
      </div>
    )
  );
};
