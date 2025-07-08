import { CloseCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React, { useCallback, useEffect } from "react";
import useEditBranchItem from "./useEditBranchItem";
import { IBranchItem } from "@/types/ditgitalmenu-types/branch";
import AddNewBranchForm from "../add-branch-form/add-new-branch-form";

interface EditBranchModalContainerProps {
  realodMethod?: () => void;
  selectedItem: IBranchItem;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}

function EditBranchModalContainer({
  realodMethod,
  selectedItem,
  setOpen,
  open,
}: EditBranchModalContainerProps) {
  const { handleEdit, EditBranchForm, loading, FormFiledItems } =
    useEditBranchItem();
  const setDefaultValue = useCallback(() => {
    Object.entries(selectedItem).map(([key, value]) =>
      EditBranchForm.setValue(key as keyof IBranchItem, value)
    );
  }, [open]);
  useEffect(() => {
    setDefaultValue();
  }, [setDefaultValue]);
  function handleCloseModal() {
    setOpen(false);
    EditBranchForm.reset();
    EditBranchForm.clearErrors();
  }
  return (
    <Modal
      open={!!open}
      onClose={handleCloseModal}

      onCancel={() => handleCloseModal()}
      destroyOnClose

      title={
        <div className="w-full flex items-center justify-between relative">
          <span className="text-[18px] font-Regular">ویرایش شعبه </span>
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
          "lg:!w-1/3  !px-5 !py-4 !bg-Highlighter !h-full !mx-auto",
        footer: "!hidden",
      }}
      closeIcon={false}
      footer={false}
    >
      <AddNewBranchForm
        AddBranchForm={EditBranchForm}
        FormFiledItems={FormFiledItems}
        loading={loading}
        onSubmit={(d) =>
          handleEdit(
            {
              branch_id: selectedItem.branch_id,
              item: d,
            },
            realodMethod
          )
        }
      />
    </Modal>
  );
}

export default EditBranchModalContainer;
