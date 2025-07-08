import { IClubStatusNew } from "@/types/club-types/club-levels-type";

import { Table, TableColumnsType } from "antd";
import { Icon } from "@iconify/react";
import { useState } from "react";
import clsx from "clsx";
import style from "./club-managment-table.module.css";

interface IClubLevelsTableProps {
  levels: IClubStatusNew[];
  handleEditLevelModal: (record: IClubStatusNew) => void;
  handleRemoveModal: (record: IClubStatusNew) => void;
}

const ClubLevelsTable = ({
  levels,
  handleEditLevelModal,
  handleRemoveModal,
}: IClubLevelsTableProps) => {
  const [sortedData, setSortedData] = useState<IClubStatusNew[]>(levels);
  const [sortedInfo, setSortedInfo] = useState<{
    columnKey: string | null;
    order: "ascend" | "descend" | null;
  }>({
    columnKey: null,
    order: null,
  });

  // Function to handle sorting the data
  const sortDataByColumn = (
    data: IClubStatusNew[],
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
      const sortedData = sortDataByColumn(levels, column, newOrder); // Sort the data
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

  const columns: TableColumnsType<IClubStatusNew> = [
    { title: "#", render: (_, __, index) => <span>{index + 1}</span> },
    { title: "عنوان", dataIndex: "title" },
    {
      title: "رنگ",
      dataIndex: "primaryColor",
      render: (value) => (
        <span
          style={{ backgroundColor: value || "#D1D5DB" }}
          className="size-5 rounded-full block"
        />
      ),
    },
    {
      title: "تصویر",
      dataIndex: "imageUrl",
      render: (text) => <span>{text ? "دارد" : "ندارد"}</span>,
    },
    { title: "شرح کوتاه", dataIndex: "description" },
    {
      title: () =>
        getCustomSortIcon(
          "requiredPoints",
          sortedInfo.columnKey === "requiredPoints" ? sortedInfo.order : null,
          "امتیاز دستیابی"
        ),
      dataIndex: "requiredPoints",
      sortOrder:
        sortedInfo.columnKey === "requiredPoints" ? sortedInfo.order : null,
      width: 130,
    },
    {
      title: "",
      render: (_, record) => (
        <button
          onClick={() => handleEditLevelModal(record)}
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
          onClick={() => handleRemoveModal(record)}
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

  return (
    <div className="w-full">
      <Table<IClubStatusNew>
        columns={columns}
        dataSource={sortedData}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange={(_, __, sorter) => setSortedInfo(sorter as any)}
        direction="rtl"
        className={clsx(style["club-custom-table"], "font-Regular")}
      />
    </div>
  );
};

export default ClubLevelsTable;
