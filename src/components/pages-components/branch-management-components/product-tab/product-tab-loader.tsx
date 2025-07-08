import { Skeleton } from "antd";
import React from "react";

function ProductTabLoader() {
  return (
    <div className=" w-full grid dxl:grid-cols-2 grid-cols-1 gap-5">
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton.Node
          key={index}
          active
          className="!w-full !h-full !aspect-[16/4]"
        />
      ))}
    </div>
  );
}

export default ProductTabLoader;
