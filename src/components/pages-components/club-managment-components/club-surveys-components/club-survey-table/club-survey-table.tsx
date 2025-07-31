"use client";

import { Icon } from "@iconify/react";
import {
  Alert,
  Button,
  Skeleton,
  Switch,
  Table,
  TableColumnsType,
  TableProps,
  Tooltip,
} from "antd";
import clsx from "clsx";
import moment from "jalali-moment";
import { useState, useMemo, lazy } from "react";
import style from "../../club-levels-components/club-managment-table/club-managment-table.module.css";
import { ISurvey } from "@/types/club-types/club-surveys-type";
import { useSurveyTable } from "@/hooks/club-survey-hooks/useSurveysTable";
import { LoadingOutlined, RedoOutlined } from "@ant-design/icons";
import { useDeleteSurvey } from "@/hooks/club-survey-hooks/useDeleteSurvey";
const CustomPagination = lazy(
  () => import("@/components/shared-components/custom-pagination/custom-pagination")
);
const ClubSurveyTAbleHeader = lazy(() => import("./club-survey-table-header"));

const ClubSurveyTableContainer = () => {
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const {
    sortedData,
    toggleSortOrder,
    sortedInfo,
    setSortedInfo,
    error,
    isLoading,
    isRefetching,
    refetch,
    pageSize,
    setCurrentPage,
    setPageSize,
    totalPage,
  } = useSurveyTable();
  const { mutate: deleteSurvey, isPending: isDeleting } = useDeleteSurvey();

  const handleDeleteSurvey = (id: number) => {
    setDeletingId(id);
    deleteSurvey(id, {
      onSuccess: () => {
        refetch();
        setDeletingId(null);
      },
    }); // 🔥 Re-fetch after creation
  };

  // 🟢 Custom Sort Icon Generator
  const getSortButton = (column: keyof ISurvey, title: string) => {
    const order = sortedInfo.columnKey === column ? sortedInfo.order : null;
    return (
      <button
        onClick={() => toggleSortOrder(column)}
        className="w-full flex justify-center gap-2 items-center"
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
  };

  // 🟢 Table Columns (Memoized for Performance)
  const columns: TableColumnsType<ISurvey> = useMemo(
    () => [
      { title: "#", render: (_, __, index) => <span>{index + 1}</span> },
      { title: "عنوان", dataIndex: "title" },
      {
        title: getSortButton("surveyDetailsCount", "تعداد پرسش"),
        dataIndex: "surveyDetailsCount",
      },
      { title: getSortButton("maxPoint", "امتیاز"), dataIndex: "maxPoint" },
      {
        title: getSortButton("createdAt", "تاریخ ثبت"),
        dataIndex: "createdAt",
        render: (value) => (
          <span>
            {moment(value, "YYYY-MM-DD").locale("fa").format("YYYY/MM/DD")}
          </span>
        ),
      },
      {
        title: getSortButton("isActive", "وضعیت"),
        dataIndex: "isActive",
        render: (_, record) => (
          <Switch
            defaultChecked={record.isActive}
            onChange={console.log}
            disabled
          />
        ),
      },
      {
        title: "",
        render: (_, record) => (
          <button
            onClick={() => console.log(record)}
            className="hover:bg-[rgb(58,95,151,0.1)] transition-all rounded-lg active:scale-90 p-2"
          >
            <Icon
              icon="mage:edit"
              width="24"
              height="24"
              style={{ color: "var(--cta)" }}
            />
          </button>
        ),
      },
      {
        title: "",
        render: (_, record) => (
          <Tooltip
            placement="top"
            title={<span className="font-Medium">حذف نظرسنجی</span>}
            arrow={{
              pointAtCenter: true,
            }}
          >
            <button
              onClick={() => handleDeleteSurvey(record.id)}
              className="hover:bg-[rgb(58,95,151,0.1)] transition-all rounded-lg active:scale-90 p-2"
            >
              {isDeleting && record.id == deletingId ? (
                <LoadingOutlined width="28" height="28" />
              ) : (
                <Icon
                  icon="lets-icons:trash-light"
                  width="28"
                  height="28"
                  style={{ color: "var(--Alert)" }}
                />
              )}
            </button>
          </Tooltip>
        ),
      },
    ],
    [sortedInfo, isDeleting]
  );

  const handleTableChange: TableProps<ISurvey>["onChange"] = (_, __, sorter) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setSortedInfo(sorter as any);

  // 🟢 Loading & Error States
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
          className="font-Medium"
          showIcon
        />
        <Button
          onClick={() => refetch()}
          className="absolute left-2 top-2"
          icon={<RedoOutlined />}
        />
      </div>
    );

  return (
    <div className="w-full flex flex-col gap-4">
      {/* 🟢 New Survey Button */}
      <ClubSurveyTAbleHeader refetch={refetch} />

      {/* 🟢 Surveys Table */}
      <Table
        columns={columns}
        dataSource={sortedData}
        onChange={handleTableChange}
        direction="rtl"
        className={clsx(
          style["club-custom-table"],
          "!font-Regular [&_.ant-switch.ant-switch-checked]:!bg-Tritary"
        )}
        pagination={false}
        showSorterTooltip
      />

      {/* 🟢 Pagination */}
      <CustomPagination
        pageSize={pageSize}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
        totalPage={totalPage || 0}
      />
    </div>
  );
};

export default ClubSurveyTableContainer;
