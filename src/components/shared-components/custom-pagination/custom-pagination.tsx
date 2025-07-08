import React, { Dispatch, SetStateAction } from "react";
import type { PaginationProps } from "antd";
import { Pagination } from "antd";
import clsx from "clsx";

const itemRender: PaginationProps["itemRender"] = (
  _,
  type,
  originalElement
) => {
  if (type === "prev") {
    return <a>قبلی</a>;
  }
  if (type === "next") {
    return <a>بعدی</a>;
  }
  return originalElement;
};

interface CustomPaginationProps {
  totalPage: number;
  pageSize: number;
  setPageSize: Dispatch<SetStateAction<number>>;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  totalPage,
  setPageSize,
  pageSize,
  setCurrentPage,
}) => (
  <Pagination
    total={totalPage}
    onShowSizeChange={(current: number, size: number) => {
      setPageSize(() => size);
    }}
    onChange={(current: number, size: number) => {
      setCurrentPage(() => current);
    }}
    pageSize={pageSize}
    itemRender={itemRender}
    className={clsx(
      totalPage < 2 && "!hidden",
      "!font-Regular [&_a]:!font-Regular !w-max"
    )}
  />
);

export default CustomPagination;
