"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Alert, Button, Skeleton, Table, TableColumnsType } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import clsx from "clsx";
import style from "./category-tab-table.module.css";
import { ICategoryItem } from "@/types/ditgitalmenu-types/category";
import ToggleSwitch from "../../branch-tab/togglers/toggleSwitch";
import moment from "jalali-moment";
import useEditCategory from "../category-edit-action/useEditCategory";
import { Icon } from "@iconify/react/dist/iconify.js";
import useDeleteCategoryItem from "../category-delete-action/useDeleteCategory";
import CustomPagination from "@/components/shared/custom-pagination/custom-pagination";
import dynamic from "next/dynamic";
const CategoryTabEditAction = dynamic(
  () => import("../category-edit-action/category-tab-edit-action"),
  {
    ssr: false,
  }
);
interface CategoryTabTableProps {
  isLoading: boolean;
  isRefetching: boolean;
  refetch: () => void;
  error: Error;
  paginatedList: ICategoryItem[];
  setCurrentPage: Dispatch<SetStateAction<number>>;
  pageSize: number;
  totalPage: number;
  currentPage: number;
  setPageSize: Dispatch<SetStateAction<number>>;
}
const CategoryTabTable: React.FC<CategoryTabTableProps> = ({
  error,
  isLoading,
  isRefetching,
  refetch,
  setCurrentPage,
  pageSize,
  totalPage,
  paginatedList,
  setPageSize,
}) => {
  const { handleEdit, loading } = useEditCategory();
  const { deleteLoading, handleDeleteCategoryItem } = useDeleteCategoryItem();
  const [selectedItem, setSelectedItem] = useState<ICategoryItem>();
  const [open, setOpen] = useState<boolean>(false);

  const columns: TableColumnsType<ICategoryItem> = [
    { title: "#", render: (_, __, index) => <span>{index + 1}</span> },
    { title: "عنوان", dataIndex: "name" },
    {
      title: "در منو",
      dataIndex: "branchName",
      render: (text) => <span>{text ? text : "_"}</span>,
    },
    {
      title: "تاریخ ایجاد",
      dataIndex: "created_at",
      render: (date) => moment(date).locale("fa").format("YYYY/MM/DD"),
    },
    {
      title: "وضعیت",
      dataIndex: "is_active",
      render: (_, record) => (
        <ToggleSwitch
          onChange={() =>
            handleEdit(
              {
                category_id: record.category_id,
                item: { ...record, is_active: record.is_active == 1 ? 0 : 1 },
              },
              refetch
            )
          }
          loading={loading}
          checked={record.is_active == 1}
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
            setSelectedItem(record);
            setOpen(true);
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
          onClick={() => handleDeleteCategoryItem(record, refetch)}
          className="hover:bg-red-100 transition-all rounded-lg active:scale-90 p-2"
        >
          <Icon
            icon="lets-icons:trash-light"
            width="28"
            height="28"
            style={{ color: "var(--Alert)" }}
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
    <div className="flex flex-col gap-4 ">
      <Table<ICategoryItem>
        columns={columns}
        dataSource={paginatedList}
        rowClassName={"!h-[40px]"}
        pagination={false}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        direction="rtl"
        className={clsx(style["category-table"], "font-Regular !overflow-auto bg-Highlighter ")}
      />
      {/* 🟢 Pagination */}
      <CustomPagination
        pageSize={pageSize}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
        totalPage={totalPage}
      />
      <CategoryTabEditAction
        selectedItem={selectedItem}
        open={open}
        setOpen={setOpen}
        realodMethod={refetch}
      />
    </div>
  );
};

export default CategoryTabTable;
