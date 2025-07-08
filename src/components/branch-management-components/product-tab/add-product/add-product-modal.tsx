import { CloseCircleOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React, { useState } from "react";
import useAddNewProduct from "./useAddProduct";
import AddNewProductForm from "./add-product-form";

interface ProductAddModalProps {
  reloadMethod?: () => void;
}

const ProductAddModal: React.FC<ProductAddModalProps> = ({ reloadMethod }) => {
  const [open, setOpen] = useState(false);
  const { AddProductForm, ProductFormFileds, loading, onSubmit } =
    useAddNewProduct();

  const handleCloseModal = () => {
    setOpen(false);
    AddProductForm.reset();
  };

  return (
    <div className="w-full flex justify-end">
      <button
        onClick={() => setOpen(true)}
        className="w-max flex items-center py-2 px-4 rounded-md text-gray-100 text-base gap-2 font-Regular disabled:opacity-70 bg-[#1677FF] hover:bg-blue-700 hover:text-gray-100 transition-all"
      >
        <span>محصول جدید</span>
        <PlusSquareOutlined />
      </button>
      <Modal
        open={open}
        maskClosable
        title={
          <div className="w-full flex items-center justify-between relative">
            <span className="text-[18px] font-Regular">تعریف محصول جدید</span>
            <CloseCircleOutlined
              className="!text-Alert !text-[20px] cursor-pointer"
              onClick={handleCloseModal}
            />
          </div>
        }
        style={{ direction: "rtl" }}
        classNames={{
          header:
            "w-full text-center font-Medium !bg-transparent !p-0 !pb-4 !m-0",
          content:
            "!w-1/3 max-w-full !min-w-[500px]  !px-5 !py-4 !bg-Highlighter !h-full !mx-auto",
          footer: "!hidden",
        }}
        closeIcon={false}
        footer={null}
        onCancel={handleCloseModal}
        destroyOnClose
      >
        <AddNewProductForm
          AddProductForm={AddProductForm}
          FormFiledItems={ProductFormFileds}
          loading={loading}
          onSubmit={(data) =>
            onSubmit(data, () => {
              reloadMethod?.();
              handleCloseModal();
            })
          }
        />
      </Modal>
    </div>
  );
};

export default ProductAddModal;
