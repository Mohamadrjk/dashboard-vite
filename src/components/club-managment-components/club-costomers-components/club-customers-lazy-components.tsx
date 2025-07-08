"use client";
import { Skeleton } from "antd";
import dynamic from "next/dynamic";

const CustomersTableContainerLazy = dynamic(
  () =>
    import(
      "@/components/club-managment-components/club-costomers-components/costomers-table/costomers-table-container"
    ),
  {
    ssr: false,
    loading: () => (
      <div className="w-full aspect-[16/6]">
        <Skeleton.Node active className="!w-full !h-full" />
      </div>
    ),
  }
);

export { CustomersTableContainerLazy };
