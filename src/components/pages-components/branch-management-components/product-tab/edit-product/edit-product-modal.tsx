import { CloseCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React, { useCallback, useEffect } from "react";
import useEditProduct from "./useEditProduct";
import { IProductItem } from "@/types/ditgitalmenu-types/product";
import AddNewProductForm from "../add-product/add-product-form";

interface EditProductModalContainerProps {
  realodMethod?: () => void;
  selectedItem: IProductItem;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}

function EditProductModalContainer({
  realodMethod,
  selectedItem,
  setOpen,
  open,
}: EditProductModalContainerProps) {
  const { handleEdit, EditProductForm, loading, ProductFormFileds } =
    useEditProduct();
  const setDefaultValue = useCallback(() => {
    if (selectedItem) {
      Object.entries(selectedItem).map(([key, value]) =>
        EditProductForm.setValue(key as keyof IProductItem, value)
      );
    }
  }, [open]);
  useEffect(() => {
    setDefaultValue();
  }, [setDefaultValue]);
  function handleCloseModal() {
    setOpen(false);
    EditProductForm.reset();
    EditProductForm.clearErrors();
  }
  return (
    <Modal
      open={!!open}
      onClose={handleCloseModal}
      onCancel={() => handleCloseModal()}
      destroyOnClose
      title={
        <div className="w-full flex items-center justify-between relative">
          <span className="text-[18px] font-Regular">ویرایش محصول </span>
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
          "!w-1/3 !min-w-[500px]  max-w-full !px-5 !py-4 !bg-Highlighter !h-full !mx-auto",
        footer: "!hidden",
      }}
      closeIcon={false}
      footer={false}
    >
      <AddNewProductForm
        AddProductForm={EditProductForm}
        FormFiledItems={ProductFormFileds}
        loading={loading}
        onSubmit={(d) =>
          handleEdit(
            {
              product_id: selectedItem.product_id,
              item: d,
            },
            () => {
              realodMethod?.();
              handleCloseModal?.();
            }
          )
        }
      />
    </Modal>
  );
}

export default EditProductModalContainer;
