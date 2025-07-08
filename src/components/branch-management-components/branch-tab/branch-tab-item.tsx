import React, { lazy, useMemo, useState } from "react";
import ToggleSwitch from "./togglers/toggleSwitch";
import { Dropdown, MenuProps, Spin, Tooltip } from "antd";
import { IBranchItem } from "@/types/ditgitalmenu-types/branch";
import { MoreOutlined } from "@ant-design/icons";
import useEditBranchItem from "./edit-branch-item/useEditBranchItem";
import useDeleteBranchItem from "./delete-branch-item/useDeleteBranchItem";
const EditBranchModalContainer = lazy(() => import("./edit-branch-item/edit-branch-modal"));
interface BranchTabItemProps {
  item: IBranchItem;
  refetch: () => void;
}

const FIELD_NAMES: Partial<Record<keyof IBranchItem, string>> = {
  name: "نام",
  contact_phone: "شماره تلفن",
  email: "ایمیل",
  location: "آدرس",
  operating_hours: "ساعات کاری",
  en_name: "نام انگلیسی شعبه",
};

const BranchTabItem: React.FC<BranchTabItemProps> = ({ item, refetch }) => {
  const { handleEdit, loading } = useEditBranchItem();
  const branchFields = useMemo(
    () =>
      Object.entries(FIELD_NAMES).map(([key, label]) => ({
        key,
        label,
        value: item[key as keyof IBranchItem],
      })),
    [item]
  );
  const { deleteLoading, handleDeleteBranchItem } = useDeleteBranchItem();
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  return (
    <div className="rounded-[10px]  bg-Highlighter shadow-lg grid max-md:grid-cols-1   grid-cols-2 gap-5 p-5 relative">
      {deleteLoading && (
        <div className="absolute inset-0 w-full h-full flex justify-center items-center bg-white opacity-50">
          <Spin />
        </div>
      )}
      <div className="font-Regular   grid grid-cols-1 max-md:order-last text-base gap-4">
        {branchFields.map(({ key, label, value }, index) => (
          <div key={index} className=" flex  grow   gap-4 ">
            <p key={key} className="  whitespace-nowrap text-Secondary  flex gap-1  ">
              <span>{label}</span> <span className="ml-3 flex"> :</span>
            </p>
            <Tooltip
              title={value ? value : "__"}
            >
              <span className="text-Primary  grow max-w-[80%] overflow-hidden text-ellipsis     whitespace-nowrap">
                {value ? value : "__"}
              </span>
            </Tooltip>
          </div>
        ))}
      </div>
      <div className="font-Regular max-md:order-0  text-base flex flex-col gap-4">
        <div className="flex gap-4 flex-row justify-end items-center">
          <label htmlFor="status-switch" className="flex gap-2 items-center">
            <span> وضعیت :</span>
            <ToggleSwitch
              disabled={loading}
              loading={loading}
              checked={item.status == 1}
              onChange={() => {
                handleEdit(
                  {
                    branch_id: item.branch_id ?? 0,
                    item: {
                      ...item,
                      status: item.status == 1 ? 0 : 1,
                    },
                  },
                  refetch
                );
              }}
              id="status-switch"
            />
          </label>
          <div className="flex flex-col w-max">
            <BranchOptions
              openEdit={openEdit}
              setOpenEdit={setOpenEdit}
              onDelete={() => handleDeleteBranchItem(item, refetch)}
            />
          </div>
        </div>
        <div className="w-full rounded-[6px] overflow-hidden">
          <iframe
            src={`https://maps.google.com/maps?q=${item.latitude},${item.longitude}&hl=es&z=15&output=embed`}
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen
          />
        </div>
      </div>
      <EditBranchModalContainer
        open={openEdit}
        selectedItem={item}
        setOpen={setOpenEdit}
        realodMethod={refetch}
      />
    </div>
  );
};
interface BranchOptionDropDown {
  setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
  openEdit: boolean;
  onDelete: () => void;
}
const BranchOptions: React.FC<BranchOptionDropDown> = ({
  setOpenEdit,
  onDelete,
}) => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <span
          role="button"
          onClick={() => {
            setOpenEdit(true);
          }}
        >
          ویرایش
        </span>
      ),
    },
    {
      key: "2",
      label: (
        <span role="button" onClick={() => onDelete()}>
          حذف
        </span>
      ),
    },
  ];

  return (
    <Dropdown
      menu={{ items, className: "!font-Regular  !text-right" }}
      className="!font-Regular cursor-pointer [&_.ant-dropdown-menu-title-content]:!font-Regular text-right"
      placement="bottom"
    >
      <MoreOutlined />
    </Dropdown>
  );
};

export default BranchTabItem;
