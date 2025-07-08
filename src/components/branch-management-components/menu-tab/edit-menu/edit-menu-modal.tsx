import { CloseCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React, { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import useEditMenu from "./useEditMenu";
import AddNewMenuForm from "../add-menu/add-menu-form";
import { IMenuItem } from "@/types/ditgitalmenu-types/menu";

function MenuEditModal({
  reloadMethod,
  selectedItem,
  open,
  setOpen,
}: {
  reloadMethod?: () => void;
  selectedItem: IMenuItem;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { EditMenuForm, FormFiledItems, loading, onSubmit } = useEditMenu();
  function handleCloseModal() {
    setOpen(false);
    EditMenuForm.reset();
  }
  const setDefaultValue = useCallback(() => {
    if (selectedItem) {
      Object.entries(selectedItem).map(([key, value]) =>
        EditMenuForm.setValue(key as keyof IMenuItem, value)
      );
      EditMenuForm.setValue(
        "image_url" as keyof IMenuItem,
        selectedItem.menu_image
      );
    }
  }, [open]);
  useEffect(() => {
    setDefaultValue();
  }, [setDefaultValue]);
  return (
    <div className=" w-full justify-end flex">
      <Modal
        open={!!open}
        maskClosable
        title={
          <div className="w-full flex items-center justify-between relative">
            <span className="text-[18px] font-Regular">ویرایش منو </span>
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
          AddMenuForm={EditMenuForm}
          FormFiledItems={FormFiledItems}
          loading={loading}
          onSubmit={(data) =>
            onSubmit(
              {
                item: data,
                menu_id: selectedItem.menu_id,
              },
              () => {
                reloadMethod?.();
                handleCloseModal();
              }
            )
          }
        />
      </Modal>
    </div>
  );
}

export default MenuEditModal;
