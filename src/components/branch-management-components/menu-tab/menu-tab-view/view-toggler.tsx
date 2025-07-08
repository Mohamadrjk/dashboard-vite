import { Icon } from "@iconify/react/dist/iconify.js";
import clsx from "clsx";
import React from "react";

export type rowType = "grid" | "col";

interface ViewTogglerProps {
  selectedRowType: rowType;
  onChange: (rowType: rowType) => void;
}

const ViewToggler: React.FC<ViewTogglerProps> = ({
  onChange,
  selectedRowType,
}) => {
  const getRowClass = (value: rowType) =>
    selectedRowType === value ? "text-primary shadow" : "text-secondary";

  const handleClick = (value: rowType) => () => onChange(value);

  return (
    <div className="flex  w-full items-center grow max-[420px]:justify-between justify-start gap-4">
      <span className="text-primary font-bold text-xl">لیست منوها</span>
      <div className="flex transition-all duration-300 gap-2">
        <span
          role="button"
          className={clsx(
            "p-1 transition-all duration-300 flex items-center justify-center rounded-md",
            getRowClass("grid")
          )}
          onClick={handleClick("grid")}
        >
          <Icon icon="circum:grid-4-1" fontSize="1.5rem" />
        </span>
        <span
          role="button"
          className={clsx(
            "p-1 transition-all duration-300 flex items-center justify-center rounded-md",
            getRowClass("col")
          )}
          onClick={handleClick("col")}
        >
          <Icon icon="circum:grid-2-h" fontSize="1.5rem" />
        </span>
      </div>
    </div>
  );
};

export default ViewToggler;
