"use client";
import { Skeleton } from "antd";
import dynamic from "next/dynamic";

export const ClmTopbarCardComponentLazy = dynamic(
  () => import("./clm-topbar-cards"),
  {
    ssr: false,
    loading: () => (
      <>
        {Array.from({ length: 4 }).map((_, index) => {
          return (
            <Skeleton.Node
              key={index}
              active
              className="col-span-1 !w-full !h-full aspect-[16/6]"
            />
          );
        })}
      </>
    ),
  }
);

export const LevelDataAbundanceLazy = dynamic(
  () => import("./LevelDataAbundance"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-start justify-between p-2 bg-white">
        <Skeleton.Node
          active
          className="!w-[300px] !h-[300px] !rounded-full overflow-hidden"
        />
        <div className="flex flex-col gap-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton.Node key={index} className="!w-24 !h-4" />
          ))}
        </div>
      </div>
    ),
  }
);

export const UsersLevelsDataLazy = dynamic(
  () => import("./users-levels-data"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full aspect-[16/6]">
        <Skeleton.Node active className="!w-full !h-full" />
      </div>
    ),
  }
);

export const ClubManagementTableComponentLazy = dynamic(
  () => import("../club-managment-table/club-managment-table"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full aspect-[16/6]">
        <Skeleton.Node active className="!w-full !h-full" />
      </div>
    ),
  }
);
