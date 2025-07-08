"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Alert, Button, Skeleton, Table, TableColumnsType } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import clsx from "clsx";
import style from "./product-tab-table-container.module.css";
import ToggleSwitch from "../../branch-tab/togglers/toggleSwitch";
import { IProductItem } from "@/types/ditgitalmenu-types/product";
import { numberToPersianPrice } from "@/utils/common-methods/number-to-price";
import moment from "jalali-moment";
import { Icon } from "@iconify/react/dist/iconify.js";
import useDeleteProductItem from "../delete-product/useDeleteProductItem";
import dynamic from "next/dynamic";
import useEditProduct from "../edit-product/useEditProduct";
import TabsErrorElement from "../../tabs-component/tabs-error-element";
import CustomPagination from "@/components/shared/custom-pagination/custom-pagination";
const EditProductModalContainer = dynamic(
  () => import("../edit-product/edit-product-modal"),
  {
    ssr: false,
  }
);
interface ProductTabTableProps {
  isLoading: boolean;
  error: Error;
  isRefetching: boolean;
  refetch: () => void;
  paginatedList: IProductItem[];
  setCurrentPage: Dispatch<SetStateAction<number>>;
  pageSize: number;
  totalPage: number;
  currentPage: number;
  setPageSize: Dispatch<SetStateAction<number>>;
}

const ProductTabTable: React.FC<ProductTabTableProps> = ({
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
  const { handleDeleteProductItem } = useDeleteProductItem();
  const { handleEdit } = useEditProduct();
  const [selectedItem, setSelectedItem] = useState<IProductItem>();
  const [open, setOpen] = useState<boolean>(false);

  const columns: TableColumnsType<IProductItem> = [
    { title: "#", render: (_, __, index) => <span>{index + 1}</span> },
    { title: "عنوان", dataIndex: "name" },
    { title: "موجودی", dataIndex: "inventory" },
    {
      title: "قیمت",
      dataIndex: "price",
      render: (text) => <span>{numberToPersianPrice(text) + " ت"}</span>,
    },
    {
      title: "تخفیف",
      dataIndex: "discount",
      render: (value) => <span>{value == 0 ? "ندارد" : value}</span>,
    },
    { title: "امتیاز", dataIndex: "score", render: () => <span>_</span> },
    {
      title: "تاریخ ایجاد",
      dataIndex: "created_at",
      render: (date) => moment(date).locale("fa").format("YYYY/MM/DD"),
    },

    {
      title: "وضعیت",
      render: (_, record) => (
        <ToggleSwitch
          onChange={() =>
            handleEdit(
              {
                product_id: record.product_id,
                item: {
                  ...record,
                  is_available: record.is_available == 1 ? 0 : 1,
                },
              },
              refetch
            )
          }
          checked={record.is_available == 1}
        />
      ),
      width: 40,
    },
    {
      title: "",
      render: (_, record) => (
        <button
          onClick={() => {
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
          onClick={() => handleDeleteProductItem(record, refetch)}
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

  if (error) return <TabsErrorElement />;

  return (
    <div className=" flex flex-col  gap-4 font-Regular">
      <Table<IProductItem>
        columns={columns}
        dataSource={paginatedList}
        pagination={false}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        direction="rtl"
        rowClassName={"!h-[40px]"}
        className={clsx(style["product-table"], "font-Regular  !overflow-auto bg-Highlighter")}
      />
      {/* 🟢 Pagination */}
      <CustomPagination
        pageSize={pageSize}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
        totalPage={totalPage}
      />
      <EditProductModalContainer
        open={open}
        setOpen={setOpen}
        selectedItem={selectedItem}
      />
    </div>
  );
};

export default ProductTabTable;
