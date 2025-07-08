import { DiscountType } from "@/types/ditgitalmenu-types/menu";
import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";

const SelectDisocuntType = ({
  selectedType,
  setSelectedType,
}: {
  selectedType: DiscountType;
  setSelectedType: Dispatch<SetStateAction<DiscountType>>;
}) => {
  return (
    <div className=" flex relative   h-full w-full font-light text-xs  gap-1 bg-Highlighter transition-all duration-150 ">
      <button
        type="button"
        onClick={() => setSelectedType("amount")}
        className={clsx(
          selectedType == "amount"
            ? "bg-Highlighter-Faded "
            : "bg-Highlighter z-10  ",
          "grow w-full h-[36px]  aspect-square"
        )}
      >
        مقدار
      </button>
      <button
        type="button"
        onClick={() => setSelectedType("percentage")}
        className={clsx(
          selectedType == "percentage"
            ? "bg-Highlighter-Faded grow"
            : "bg-Highlighter grow",
          "grow w-full h-[36px] aspect-square"
        )}
      >
        درصد
      </button>
      <button
        type="button"
        onClick={() => setSelectedType("time_based")}
        className={clsx(
          selectedType == "time_based"
            ? "bg-Highlighter-Faded grow"
            : "bg-Highlighter grow",
          "grow w-full h-[36px] aspect-square"
        )}
      >
        زمان دار
      </button>
    </div>
  );
};
export default SelectDisocuntType;
