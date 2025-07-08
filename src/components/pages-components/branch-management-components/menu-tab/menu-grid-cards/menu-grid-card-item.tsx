import React, { useState } from "react";
import ToggleSwitch from "../../branch-tab/togglers/toggleSwitch";
import { IMenuItem } from "@/types/ditgitalmenu-types/menu";
import useEditMenu from "../edit-menu/useEditMenu";
import { Button, Divider } from "antd";
import { Icon } from "@iconify/react/dist/iconify.js";
import { PlusOutlined } from "@ant-design/icons";
import { lazy } from "react";
export const MenuDetailModal = dynamic(
  () => import("../menu-detail/menu-detail-modal"),
  {
    ssr: false,
  }
);
export const MenuEditModal = dynamic(
  () => import("../edit-menu/edit-menu-modal"),
  {
    ssr: false,
  }
);

interface MenuGridCardItemProps {
  icon: React.JSX.Element;
  item: IMenuItem;
  className: string;
  loading: boolean;
  reloadMethod?: () => void;
}

const MenuGridCardItem: React.FC<MenuGridCardItemProps> = ({
  item,
  icon,
  loading,
  reloadMethod,
}) => {
  const { loading: isStatusChanging, onSubmit } = useEditMenu();

  const handleChangeStatus = async (record: IMenuItem) => {
    await onSubmit(
      {
        item: { ...record, status: !record.status },
        menu_id: record.menu_id,
      },
      reloadMethod
    );
  };
  const [opneEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openAddDetailModal, setOpenAddDetailModal] = useState<boolean>(false);

  return (
    <>
      <div className="rounded-[10px] w-full h-full col-span-1 overflow-hidden flex flex-col bg-Highlighter shadow-lg gap-5 p-5">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center">
          <p className="text-Primary font-bold text-base text-ellipsis overflow-hidden w-full whitespace-nowrap" >{item.name}</p>
          <div className="flex gap-4 items-center">
            <label htmlFor="status-switch" className="flex gap-2 items-center">
              <span className="whitespace-nowrap">وضعیت :</span>
              <ToggleSwitch
                disabled={loading || isStatusChanging}
                loading={loading || isStatusChanging}
                checked={item.status}
                onChange={() => handleChangeStatus(item)}
                id="status-switch"
              />
            </label>
            <button
              onClick={() => {
                setOpenEditModal(true);
              }}
              className="hover:bg-blue-100 transition-all rounded-lg active:scale-90 p-2"
            >
              <Icon
                icon="mage:edit"
                width="24"
                height="24"
                style={{ color: "var(--cta)" }}
              />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="relative min-h-[220px] h-full grow">
          <div className="font-Regular absolute left-0 bottom-0 text-base flex flex-col gap-4">
            <div className="w-full rounded-[6px] overflow-hidden">{icon}</div>
          </div>
          <div className="relative z-10 flex flex-col grow h-full gap-[10px]">
            {/* Branch Info */}
            <div className="font-Regular text-lg flex gap-[10px]">
              <p className="text-Primary">در شعبه: {item.branch_name ?? "__"}</p>
              {item.total_products_count > 0 && (
                <>
                  <Divider
                    variant="solid"
                    plain
                    orientationMargin={0}
                    rootClassName="!h-auto !w-[1px]"
                    type="vertical"
                  />
                  <p className={"!text-Primary font-Light"}>
                    {item.total_products_count} کالا
                  </p>
                </>
              )}
            </div>
            {/* Description */}
            <p className="text-Primary text-lg">{item.description}</p>
            <div className=" w-max absolute right-0 bottom-0">
              <Button
                onClick={() => setOpenAddDetailModal(true)}
                // className="rounded-[6px]  hover:bg-Highlighter-Faded transition-all duration-150  border  border-Primary text-Primary px-4 py-2 "
                variant="filled"
                className="  !font-Regular"
                color="primary"
              >
                <div className=" flex items-center gap-2">
                  افزودن محصول
                  <PlusOutlined />
                </div>
              </Button>
            </div>
          </div>
        </div>
        <MenuEditModal
          selectedItem={item}
          open={opneEditModal}
          setOpen={setOpenEditModal}
          reloadMethod={reloadMethod}
        />
        {openAddDetailModal && (
          <MenuDetailModal
            open={openAddDetailModal}
            selectedItem={item}
            setOpen={setOpenAddDetailModal}
            realodMethod={reloadMethod}
          />
        )}
      </div>
    </>
  );
};

export default MenuGridCardItem;
