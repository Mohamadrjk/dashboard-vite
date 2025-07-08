import { Skeleton } from "antd";
import React from "react";

function ButtonLoading() {
  return (
    <div className=" w-full flex justify-end">
      <Skeleton.Node active className=" !w-[200px] !h-[35px] " />
    </div>
  );
}

export default ButtonLoading;
