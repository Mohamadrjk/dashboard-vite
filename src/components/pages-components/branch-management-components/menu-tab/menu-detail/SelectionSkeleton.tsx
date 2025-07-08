import { Skeleton } from "antd";
import React from "react";

function SelectionSkeleton() {
  return Array.from({ length: 4 }).map((_, index) => (
    <div key={index} className=" w-full  !h-full  ">
      <Skeleton.Node active className=" !aspect-square !w-full !h-full  " />
    </div>
  ));
}

export default SelectionSkeleton;
