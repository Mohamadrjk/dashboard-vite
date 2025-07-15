
import MenuGridCardItem from "./menu-grid-card-item";
import { MenuDataProps } from "../menu-tab-table/menu-tab-table-container";

import { Empty, Skeleton } from "antd";
import { MenuGridHeroIcon } from "@/components/shared-components/custom-icons";
import CustomPagination from "@/components/shared-components/custom-pagination/custom-pagination";



function MenuGridContainer({
  isLoading,
  isRefetching,
  refetch,
  paginatedList,
  totalPage,
  pageSize,
  setCurrentPage,
  setPageSize,
}: MenuDataProps) {
  //
  return (
    <div className=" flex flex-col gap-5">
      <div className=" w-full px-2">
        <div className="   w-full grid xl:grid-cols-4  lg:grid-cols-2 grid-cols-1 gap-5 ">
          {isLoading || isRefetching ? (
            <Skeleton.Node
              active
              className=" !aspect-video rounded-[10px]  !w-full  !h-full"
            />
          ) : (
            <>
              {paginatedList.length > 0 ? paginatedList.map((menu, index) => (
                <MenuGridCardItem
                  key={index}
                  item={menu}
                  reloadMethod={refetch}
                  loading={isLoading || isRefetching}
                  className=" !aspect-[16/4]"
                  icon={<MenuGridHeroIcon />}
                />
              )) : (
                <Empty description={
                  <span className=" font-Regular text-Secondary">
                    داده ای وجود ندارد
                  </span>
                } />
              )}

            </>
          )}

        </div>

      </div>
      <div className=" w-full py-5">
        <CustomPagination
          pageSize={pageSize}
          setCurrentPage={setCurrentPage}
          setPageSize={setPageSize}
          totalPage={totalPage}
        />
      </div>
    </div>
  );
}

export default MenuGridContainer;
