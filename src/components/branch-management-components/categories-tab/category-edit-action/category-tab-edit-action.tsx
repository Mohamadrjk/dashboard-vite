import { CloseCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React, { useCallback, useEffect } from "react";
import AddNewCategoryForm from "../category-add-action/category-tab-action-form";
import { ICategoryItem } from "@/types/ditgitalmenu-types/category";
import useEditCategory from "./useEditCategory";
interface CategoryTabEditActionProps {
  realodMethod?: () => void;
  selectedItem: ICategoryItem;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}

function CategoryTabEditAction({
  open,
  selectedItem,
  setOpen,
  realodMethod,
}: CategoryTabEditActionProps) {
  const { EditCategoryForm, FormFiledItems, loading, handleEdit } =
    useEditCategory();
  function handleCloseModal() {
    setOpen(false);
    EditCategoryForm.reset();
  }
  const setDefaultValue = useCallback(() => {
    if (selectedItem) {
      Object.entries(selectedItem).map(([key, value]) =>
        EditCategoryForm.setValue(key as keyof ICategoryItem, value)
      );
    }
  }, [open]);
  useEffect(() => {
    setDefaultValue();
  }, [setDefaultValue]);
  return (
    <>
      <Modal
        open={open}
        onClose={handleCloseModal}
        onCancel={handleCloseModal}
        title={
          <div className="w-full flex items-center justify-between relative">
            <span className="text-[18px] font-Regular">ویرایش دسته بندی</span>
            <CloseCircleOutlined
              className="!text-Alert !text-[20px]"
              role="button"
              onClick={() => {
                handleCloseModal();
              }}
            />
          </div>
        }
        style={{
          direction: "rtl",
        }}
        classNames={{
          header:
            "w-full text-center font-Medium !bg-transparent !p-0 !pb-4 !m-0",
          content:
            "lg:!w-1/2 max-w-full !px-5  !py-4  !bg-Highlighter  !h-full !mx-auto",
          footer: "!hidden",
        }}
        destroyOnClose
        closeIcon={false}
        footer={false}
      >
        <AddNewCategoryForm
          AddCategoryForm={EditCategoryForm}
          FormFiledItems={FormFiledItems}
          loading={loading}
          onSubmit={(data) =>
            handleEdit(
              {
                category_id: selectedItem.category_id,
                item: data,
              },
              () => {
                realodMethod?.();
                handleCloseModal?.();
              }
            )
          }
        />
      </Modal>
    </>
  );
}

export default CategoryTabEditAction;
