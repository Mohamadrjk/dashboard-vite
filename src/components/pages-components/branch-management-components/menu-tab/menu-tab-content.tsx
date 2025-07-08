import React, { useState } from "react";
import ViewToggler, { rowType } from "./menu-tab-view/view-toggler";
import clsx from "clsx";
import useMenuList from "@/hooks/branch-management-hooks/useMenuList";
import {
  MenuAddModalLazy,
  MenuGridContainerLazy,
  MenuTabTableLazy,
} from "./menu-tab-lazyLoad";

function MenuTabContent() {
  const [selectedRowType, setSelectedRowType] = useState<rowType>("grid");
  const menuListProps = useMenuList(false);
  const renderView = (viewType: "col" | "grid", Component: React.ReactNode) => (
    <div
      className={clsx(
        "transition-all duration-300 absolute w-full h-full inset-0",
        selectedRowType === viewType
          ? "!translate-x-0 z-10"
          : "!translate-x-[200%] overflow-hidden z-0"
      )}
    >
      {Component}
    </div>
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between gap-4 max-[420px]:flex-col items-center">
        <ViewToggler
          selectedRowType={selectedRowType}
          onChange={setSelectedRowType}
        />
        <MenuAddModalLazy reloadMethod={menuListProps.refetch} />
      </div>
      <div className="transition-all duration-300 relative w-full h-full grow">
        {renderView("col", <MenuTabTableLazy {...menuListProps} />)}
        {renderView("grid", <MenuGridContainerLazy {...menuListProps} />)}
      </div>
    </div>
  );
}

export default MenuTabContent;
