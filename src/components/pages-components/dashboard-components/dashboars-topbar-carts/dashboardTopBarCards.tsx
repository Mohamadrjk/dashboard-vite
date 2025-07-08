"use client";

import { RedoOutlined } from "@ant-design/icons";
import { Alert, Skeleton } from "antd";
import { memo } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import useDashboardCardsData from "@/hooks/dashboard-hooks/useDashboardCards";
import useDragLabels from "@/hooks/dragg-hook/useDraggLabels";
import clsx from "clsx";
import MemoizedDashboardTopBarCardsContainer from "./dashboard-topbar-container-cards";

// Memoize child components
const CustomersReports = () => {
  const {
    customersData,
    isError,
    isLoading,
    isRefetching,
    productsData,
    refetch,
    totalSalesData,
  } = useDashboardCardsData();
  const {
    containerRef,
    handleMouseDown,
    handleMouseLeave,
    handleMouseMove,
    handleMouseUp,
    isDragging,
    handleSlideNext,
    handleSlidePrev,
  } = useDragLabels();

  if (isLoading || isRefetching) {
    return (
      <div className="w-full grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => {
          return (
            <Skeleton.Node
              key={index}
              active
              className="!w-full aspect-[16/6]"
            />
          );
        })}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="font-Regular w-full relative">
        <Alert
          message="خطا"
          description="در دریافت اطلاعات خطایی رخ داده است"
          type="error"
          className="!font-Medium"
          showIcon
        />
        <button onClick={refetch} className="absolute left-2 top-2 w-max h-max">
          <RedoOutlined />
        </button>
      </div>
    );
  }

  {
    return (
      <div
        className={clsx(
          "w-full relative overflow-hidden ",
          "max-ldxl:[&_.prev-button]:hover:!opacity-100 max-ldxl:[&_.next-button]:hover:!opacity-100",
          "max-ldxl:[&_.prev-button]:hover:!translate-x-0 max-ldxl:[&_.next-button]:hover:!translate-x-0"
        )}
      >
        <button
          onClick={() => handleSlideNext(150, 600)}
          style={{
            background:
              "linear-gradient(to left, var(--highlighter), transparent)",
          }}
          className="absolute prev-button opacity-0 transition-all ldxl:!hidden max-ldxl:flex justify-center items-center z-[10] right-0 top-0 h-full w-10 translate-x-full"
        >
          <Icon icon="mingcute:right-line" width="30" height="30" />
        </button>
        <div
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          ref={containerRef}
          className={clsx(
            "w-full overflow-x-auto h-max no-scrollbar hover:cursor-grab relative transition-all overflow-y-hidden ",
            isDragging && "!cursor-grabbing"
          )}
        >
          <div className="w-max dxl:w-full grid grid-cols-4 gap-4 py-1">
            <MemoizedDashboardTopBarCardsContainer
              customersData={customersData}
              productsData={productsData}
              totalSalesData={totalSalesData}
            />
          </div>
        </div>
        <button
          onClick={() => handleSlidePrev(150, 600)}
          style={{
            background:
              "linear-gradient(to right, var(--highlighter), transparent)",
          }}
          className="absolute next-button opacity-0 transition-all  flex justify-center items-center z-[10] left-0 top-0 h-full w-10 -translate-x-full"
        >
          <Icon icon="mingcute:left-line" width="30" height="30" />
        </button>
      </div>
    );
  }
};

export default memo(CustomersReports);
