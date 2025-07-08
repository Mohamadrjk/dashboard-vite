import { Skeleton } from "antd";
import React from "react";

function TabelLoading() {
  return (
    <div className="w-full aspect-[16/6]">
      <Skeleton.Node active className="  !w-full  !h-full" />
    </div>
  );
}

export default TabelLoading;
