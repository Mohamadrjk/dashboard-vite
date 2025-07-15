"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Alert, Button, Skeleton, Table, TableColumnsType } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import clsx from "clsx";
import style from "./menu-tab-table-container.module.css";
import ToggleSwitch from "../../branch-tab/togglers/toggleSwitch";
import { IMenuItem } from "@/types/ditgitalmenu-types/menu";
import MenuEditModal from "../edit-menu/edit-menu-modal";
import { Icon } from "@iconify/react/dist/iconify.js";
import useEditMenu from "../edit-menu/useEditMenu";
import MenuDetailModal from "../menu-detail/menu-detail-modal";
import CustomPagination from "@/components/shared-components/custom-pagination/custom-pagination";
export interface MenuDataProps {
  isLoading: boolean;
  isRefetching: boolean;
  refetch: () => void;
  error: Error;
  paginatedList: IMenuItem[];
  setCurrentPage: Dispatch<SetStateAction<number>>;
  pageSize: number;
  totalPage: number;
  currentPage: number;
  setPageSize: Dispatch<SetStateAction<number>>;
}
const MenuTabTable: React.FC<MenuDataProps> = ({
  error,
  isLoading,
  isRefetching,
  refetch,
  paginatedList,
  totalPage,
  pageSize,
  setCurrentPage,
  setPageSize,
}) => {
  const { loading: ChangeStatusLoading, onSubmit } = useEditMenu();
  const handleChnageStatus = async (record: IMenuItem) => {
    await onSubmit(
      {
        item: {
          ...record,
          status: !record.status,
        },
        menu_id: record.menu_id,
      },
      refetch
    );
  };
  const [selectedItem, setSelectedItem] = useState<IMenuItem>();
  const [opneEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openAddDetailModal, setOpenAddDetailModal] = useState<boolean>(false);

  const handleEditModal = (record: IMenuItem) => {
    setSelectedItem(record);
    setOpenEditModal(true);
  };

  const handleDetailModal = (record: IMenuItem) => {
    setSelectedItem(record);
    setOpenAddDetailModal(true);
  };
  const columns: TableColumnsType<IMenuItem> = [
    { title: "#", render: (_, __, index) => <span>{index + 1}</span> },
    { title: "عنوان", dataIndex: "name" },
    {
      title: "در شعبه",
      dataIndex: "branch_name",
      render: (value) => <span>{value ? value : "_"}</span>,
    },
    {
      title: "تعداد کالا",
      dataIndex: "total_products_count",
      render: (value) => <span>{value ? value : "_"}</span>,
    },
    {
      title: "وضعیت",
      render: (_, record) => (
        <ToggleSwitch
          loading={ChangeStatusLoading}
          disabled={ChangeStatusLoading}
          checked={record.status}
          onChange={() => handleChnageStatus(record)}
        />
      ),
      width: 40,
    },
    {
      title: "",
      render: (_, record) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleEditModal(record);
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
      ),
      width: 40,
    },
    {
      title: "",
      render: (_, record) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDetailModal(record);
          }}
          className="hover:bg-blue-100 transition-all rounded-lg active:scale-90 p-2"
        >
          <Icon
            icon="mdi-light:plus"
            width="24"
            height="24"
            style={{ color: "var(--Foucos)" }}
          />
        </button>
      ),
      width: 40,
    },
  ];

  if (isLoading || isRefetching)
    return (
      <div className="w-full aspect-[16/6]">
        <Skeleton.Node active className="!w-full !h-full" />
      </div>
    );

  if (error)
    return (
      <div className="font-Regular relative w-full aspect-[16/6]">
        <Alert
          message="خطا"
          description="در بارگذاری اطلاعات خطایی رخ داده است"
          type="error"
          className="!font-Medium"
          showIcon
        />
        <Button
          onClick={() => {
            refetch();
          }}
          className="absolute left-2 top-2"
          icon={<RedoOutlined />}
        />
      </div>
    );

  return (
    <div className=" flex flex-col gap-4 font-Regular">
      <Table<IMenuItem>
        columns={columns}
        dataSource={paginatedList}
        pagination={false}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        direction="rtl"
        rowClassName={"!h-[40px]"}
        className={clsx(style["product-table"], "font-Regular   !overflow-auto bg-Highlighter ")}
      />
      {/* 🟢 Pagination */}
      <CustomPagination
        pageSize={pageSize}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
        totalPage={totalPage}
      />
      <MenuEditModal
        selectedItem={selectedItem}
        open={opneEditModal}
        setOpen={setOpenEditModal}
        reloadMethod={refetch}
      />
      <MenuDetailModal
        open={openAddDetailModal}
        selectedItem={selectedItem}
        setOpen={setOpenAddDetailModal}
        realodMethod={refetch}
      />
    </div>
  );
};

export default MenuTabTable;
