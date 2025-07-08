import { Skeleton } from "antd";
import React from "react";

function GridLoading() {
  return (
    <div className=" w-full  h-[calc(100vh-270px)]  overflow-auto px-2">
      <div className="    w-full grid xl:grid-cols-3  lg:grid-cols-2 grid-cols-1 gap-5 ">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className=" !aspect-video rounded-[10px]  !w-full  !h-full"
          >
            <Skeleton.Node
              active
              className=" !aspect-video rounded-[10px]  !w-full  !h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default GridLoading;
