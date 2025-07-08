import { CloseCircleOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React, { useState } from "react";
import useAddNewCategory from "./useAddNewCategory";
import AddNewCategoryForm from "./category-tab-action-form";

interface CategoryTabAddActionProps {
  realodMethod?: () => void;
}

function CategoryTabAddAction({ realodMethod }: CategoryTabAddActionProps) {
  const [open, setOpen] = useState<boolean>(false);
  const { AddCategoryForm, FormFiledItems, loading, onSubmit } =
    useAddNewCategory();
  function handleCloseModal() {
    setOpen(false);
    AddCategoryForm.reset();
  }

  return (
    <>
      <div className=" w-full justify-end flex">
        <button
          onClick={() => setOpen(!open)}
          className={`w-max  items-center flex py-2 px-4 rounded-md text-gray-100 text-base gap-2 font-Regular disabled:opacity-70 bg-[#1677FF] hover:bg-blue-700 hover:text-gray-100 transition-all `}
        >
          <span>دسته بندی جدید</span>
          <PlusSquareOutlined />
        </button>
      </div>
      <Modal
        open={!!open}
        onClose={handleCloseModal}
        onCancel={() => handleCloseModal()}
        destroyOnClose
        title={
          <div className="w-full flex items-center justify-between relative">
            <span className="text-[18px] font-Regular">ایجاد دسته بندی</span>
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
          width: "95% !important",
          maxWidth: "100vw",
          height: "95dvh",
        }}
        classNames={{
          header:
            "w-full text-center font-Medium !bg-transparent !p-0 !pb-4 !m-0",
          content:
            "lg:!w-1/2 max-w-full !px-5  !py-4  !bg-Highlighter  !h-full !mx-auto",
          footer: "!hidden",
        }}
        closeIcon={false}
        footer={false}
      >
        <AddNewCategoryForm
          AddCategoryForm={AddCategoryForm}
          FormFiledItems={FormFiledItems}
          loading={loading}
          onSubmit={(data) =>
            onSubmit(data, () => {
              realodMethod?.();
              handleCloseModal();
            })
          }
        />
      </Modal>
    </>
  );
}

export default CategoryTabAddAction;
