import { CloseCircleOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React, { useState } from "react";
import useAddNewMenu from "./useAddMenu";
import AddNewMenuForm from "./add-menu-form";

function MenuAddModal({ reloadMethod }: { reloadMethod?: () => void }) {
  const [open, setOpen] = useState<boolean>(false);
  const { AddMenuForm, FormFiledItems, loading, onSubmit } = useAddNewMenu();
  function handleCloseModal() {
    setOpen(false);
    AddMenuForm.reset();
  }
  return (
    <div className=" w-full justify-end flex">
      <button
        onClick={() => setOpen(true)}
        className={`w-max  items-center flex py-2 px-4 rounded-md text-gray-100 text-base gap-2 font-Regular disabled:opacity-70 bg-[#1677FF] hover:bg-blue-700 hover:text-gray-100 transition-all `}
      >
        <span> منو جدید</span>
        <PlusSquareOutlined />
      </button>
      <Modal
        open={!!open}
        maskClosable
        title={
          <div className="w-full flex items-center justify-between relative">
            <span className="text-[18px] font-Regular">تعریف منو </span>
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
        onClose={handleCloseModal}
        onCancel={() => handleCloseModal()}
        destroyOnClose
      >
        <AddNewMenuForm
          AddMenuForm={AddMenuForm}
          FormFiledItems={FormFiledItems}
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
}

export default MenuAddModal;
