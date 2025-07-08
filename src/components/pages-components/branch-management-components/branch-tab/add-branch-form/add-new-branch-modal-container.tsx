import { CloseCircleOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React, { useState } from "react";
import AddNewBranchForm from "./add-new-branch-form";
import useAddNewBranch from "./useAddNewBranch";

interface AddNewBranchModalContainerProps {
  realodMethod?: () => void;
}

function AddNewBranchModalContainer({
  realodMethod,
}: AddNewBranchModalContainerProps) {
  const [open, setOpen] = useState<boolean>(false);
  const { AddBranchForm, FormFiledItems, loading, onSubmit } =
    useAddNewBranch(realodMethod);
  function handleCloseModal() {
    setOpen(false);
    AddBranchForm.reset();
    AddBranchForm.clearErrors();
  }
  return (
    <div className=" w-full justify-end flex">
      <button
        onClick={() => setOpen(true)}
        className={`w-max  items-center flex py-2 px-4 rounded-md text-gray-100 text-base gap-2 font-Regular disabled:opacity-70 bg-[#1677FF] hover:bg-blue-700 hover:text-gray-100 transition-all `}
      >
        <span>شعبه جدید</span>
        <PlusSquareOutlined />
      </button>
      <Modal
        open={!!open}
        onClose={handleCloseModal}
        onCancel={() => handleCloseModal()}
        destroyOnClose
        title={
          <div className="w-full flex items-center justify-between relative">
            <span className="text-[18px] font-Regular">تعریف شعبه جدید</span>
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
            "!w-1/3 min-w-[500px] max-w-full !px-5 !py-4 !bg-Highlighter !h-full !mx-auto",
          footer: "!hidden",
        }}
        closeIcon={false}
        footer={false}
      >
        <AddNewBranchForm
          AddBranchForm={AddBranchForm}
          FormFiledItems={FormFiledItems}
          loading={loading}
          onSubmit={onSubmit}
        />
      </Modal>
    </div>
  );
}

export default AddNewBranchModalContainer;
