"use client";
import TabsErrorElement from "@/components/branch-management-components/tabs-component/tabs-error-element";
import CustomPagination from "@/components/shared/custom-pagination/custom-pagination";
import useGetCustomersList, {
  IMapCustomer,
} from "@/hooks/club-costomers-hooks/useGetCostomersList";
import style from "@/styles/custom-table-styles.module.css";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Skeleton, Table, TableColumnsType } from "antd";
import clsx from "clsx";
import moment from "jalali-moment";
import { memo, useEffect, useState } from "react";

const CustomersTableContainer = () => {
  const {
    customers,
    isFetching,
    isError,
    refetch,
    totalPage,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
  } = useGetCustomersList();
  const [sortedData, setSortedData] = useState<IMapCustomer[]>(customers);
  const [sortedInfo, setSortedInfo] = useState<{
    columnKey: string | null;
    order: "ascend" | "descend" | null;
  }>({
    columnKey: null,
    order: null,
  });

  useEffect(() => {
    setSortedData(customers);
  }, [customers]);

  // Function to handle sorting the data
  const sortDataByColumn = (
    data: IMapCustomer[],
    column: string,
    order: "ascend" | "descend" | null
  ) => {
    if (order === null) {
      return data; // Return unsorted data if order is null
    }

    return [...data].sort((a, b) => {
      if (order === "ascend") {
        return a[column] - b[column];
      } else {
        return b[column] - a[column];
      }
    });
  };

  // Handle sorting toggle
  const toggleSortOrder = (column: string) => {
    setSortedInfo((prevState) => {
      let newOrder;

      // If the column clicked is the same as the previous column
      if (prevState.columnKey === column) {
        // Toggle between ascend, descend, and none
        if (prevState.order === "ascend") {
          newOrder = "descend";
        } else if (prevState.order === "descend") {
          newOrder = null; // Reset to no sorting
        } else {
          newOrder = "ascend"; // First click: set to ascending
        }
      } else {
        // If a new column is clicked, reset the order to "ascend"
        newOrder = "ascend";
      }
      const sortedData = sortDataByColumn(customers, column, newOrder); // Sort the data
      setSortedData(sortedData);
      return { columnKey: column, order: newOrder };
    });
  };

  const getCustomSortIcon = (
    column: string,
    order: "ascend" | "descend" | null,
    title: string
  ) => (
    <button
      onClick={() => toggleSortOrder(column)}
      className="w-full flex justify-between items-center"
    >
      <span>{title}</span>
      <Icon
        icon={
          order === "ascend"
            ? "cil:sort-ascending"
            : order === "descend"
            ? "cil:sort-descending"
            : "lets-icons:sort-list-light"
        }
        width="28"
        height="28"
      />
    </button>
  );

  const columns: TableColumnsType<IMapCustomer> = [
    {
      title: "#",
      render: (_, __, index) => (
        <span className="p-1">{index + 1 + (currentPage - 1) * pageSize}</span>
      ),
    },
    { title: "شناسه", dataIndex: "id", render: (text) => text || "_" },
    {
      title: "نام و نام خانوادگی",
      dataIndex: "fullName",
      render: (text) => text || "_",
    },
    {
      title: "شماره موبایل",
      dataIndex: "number",
      render: (text) => <span dir="ltr">{text ? text : "_"}</span>,
    },
    {
      title: "جنسیت",
      dataIndex: "sex",
      render: (gender: boolean) => (
        <span>
          {gender === true && "زن"}
          {gender === false && "مرد"}
          {gender === null && "_"}
        </span>
      ),
    },
    {
      title: "عضویت",
      dataIndex: "signDate",
      sortOrder: sortedInfo.columnKey === "signDate" ? sortedInfo.order : null,
      render: (date) =>
        date ? moment(date).locale("fa").format("YYYY/MM/DD") : "_",
    },
    {
      title: "امتیاز",
      dataIndex: "score",
      sortOrder: sortedInfo.columnKey === "score" ? sortedInfo.order : null,
      render: (text) => text || "_",
    },
    {
      title: "امتیاز استفاده شده",
      dataIndex: "usedScore",
      sortOrder: sortedInfo.columnKey === "usedScore" ? sortedInfo.order : null,
      render: (text) => text || "_",
    },
    {
      title: "سطح",
      dataIndex: "levelName",
      render: (text) => text || "_",
    },
    {
      title: "استان",
      dataIndex: "province",
      render: (text) => text || "_",
    },
    {
      title: "شهر",
      dataIndex: "city",
      render: (text) => text || "_",
    },
  ];

  if (isError) return <TabsErrorElement reloadMethod={() => refetch()} />;

  return (
    <div className="w-full h-full flex flex-col justify-between grow py-4">
      {isFetching ? (
        <div className="w-full aspect-[16/6]">
          <Skeleton.Node active className="!w-full !h-full" />
        </div>
      ) : (
        <Table<IMapCustomer>
          columns={columns}
          dataSource={sortedData}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(_, __, sorter) => setSortedInfo(sorter as any)}
          direction="rtl"
          pagination={false}
          className={clsx(style["ant-custom-table"], "font-Regular")}
          scroll={{ y: 55 * 10 }}
        />
      )}
      {/* 🟢 Pagination */}
      <div className="w-full flex justify-center">
        <CustomPagination
          pageSize={pageSize}
          setCurrentPage={setCurrentPage}
          setPageSize={setPageSize}
          totalPage={totalPage}
        />
      </div>
    </div>
  );
};

export default memo(CustomersTableContainer);
