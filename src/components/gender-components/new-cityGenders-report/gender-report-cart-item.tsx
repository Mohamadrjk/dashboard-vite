import React, { Dispatch, SetStateAction, useCallback } from "react";
import clsx from "clsx";
import { Icon } from "@iconify/react";
import { numberToPersianPrice } from "@/utils/common-methods/number-to-price";
import { ISalesByGenderAndCityReport } from "@/types/genderTypes";
import { useCursorTooltip } from "@/hooks/new-useCity/useCursorTooltip";
import { CursorTooltip } from "./tooltip-components/CursorTooltip";

export const provinceData = [
  { id: 360, name: "tehran" },
  { id: 357, name: "esfahan" },

  { id: 353, name: "azarbayjan-sharghi" },
  { id: 354, name: "azarbayjan-gharbi" },
  { id: 355, name: "ardabil" },
  { id: 356, name: "alborz" },
  { id: 358, name: "ilam" },
  { id: 359, name: "bushehr" },
  { id: 361, name: "chaharmahal-bakhtiari" },
  { id: 362, name: "khorasan-jonobi" },
  { id: 363, name: "khorasan-razavi" },
  { id: 364, name: "khorasan-shomali" },
  { id: 365, name: "khozestan" },
  { id: 366, name: "zanjan" },
  { id: 367, name: "semnan" },
  { id: 368, name: "sistan-balouchestan" },
  { id: 369, name: "fars" },
  { id: 370, name: "qazvin" },
  { id: 371, name: "qom" },
  { id: 372, name: "kurdestan" },
  { id: 373, name: "kerman" },
  { id: 374, name: "kermanshah" },
  { id: 375, name: "kohgiluyeh-boyer-ahmad" },
  { id: 376, name: "golestan" },
  { id: 377, name: "gilan" },
  { id: 378, name: "lorestan" },
  { id: 379, name: "mazandaran" },
  { id: 380, name: "markazi" },
  { id: 381, name: "hormozgan" },
  { id: 382, name: "hemedan" },
  { id: 383, name: "yazd" },
];

interface SalesByGenderAndCityProps {
  genderItem: ISalesByGenderAndCityReport[];
  setCityInfo: Dispatch<
    SetStateAction<ISalesByGenderAndCityReport | undefined>
  >;
  cityInfo: ISalesByGenderAndCityReport | undefined;
}

const SalesByGenderAndCity: React.FC<SalesByGenderAndCityProps> = ({
  genderItem,
  setCityInfo,
  cityInfo,
}) => {
  const { tooltip, showTooltip, hideTooltip, moveTooltip } = useCursorTooltip();
  // Optimize event handlers with useCallback
  const handleMouseEnter = useCallback(
    (e, item: ISalesByGenderAndCityReport) => {
      console.log(item);
      setCityInfo(item);
      showTooltip(
        e,
        {
          element: "hoveredCityInfo",
          data: item,
        },
        {
          followCursor: false,
          targetId: provinceData.find(
            (province) => province.id == item.state_id
          ).name,
        }
      );
    },
    [setCityInfo]
  );

  const handleMouseLeave = useCallback(() => {
    setCityInfo(undefined);
    hideTooltip();
  }, [setCityInfo]);

  return (
    <div
      dir="rtl"
      className="w-full max-h-[70dvh] overflow-y-auto flex flex-col gap-2 p-2 custome-scrool-bar-small"
    >
      {genderItem.map((item) => {
        const isActive =
          cityInfo?.state_id === item.state_id &&
          cityInfo?.gender === item.gender;

        return (
          <div
            key={item.state_id}
            onMouseEnter={(e) => handleMouseEnter(e, item)}
            onMouseLeave={handleMouseLeave}
            className={clsx(
              "w-full aspect-[16/5] border border-transparent dxl:aspect-[16/4] flex flex-col gap-2 xl:gap-3 ldxl:gap-4 cursor-pointer bg-gray-100 rounded font-Regular p-2 shadow transition-all",
              "animate__animated animate__fadeInUp",
              isActive && "shadow-xl border !border-Tritary bg-gray-200"
            )}
          >
            {/* City Name & Gender Icon */}
            <div className="w-full flex justify-between items-center">
              <p className="text-lg font-Medium">{item.city_name}</p>
              <span className="w-6 xl:w-8 ldxl:w-10 aspect-square rounded-[10px] bg-Highlighter flex justify-center items-center">
                <Icon
                  icon={
                    item.gender === "آقا"
                      ? "fontisto:male"
                      : "foundation:torso-female"
                  }
                  className="size-4 xl:size-5 ldxl:size-6"
                  style={{
                    color: item.gender === "آقا" ? "#2CA4D2" : "#B13173",
                  }}
                />
              </span>
            </div>

            {/* Sales Data */}
            <div className="w-full flex justify-between items-center">
              <p className="flex gap-2">
                <span>تعداد خرید:</span>
                <span>{item.purchase_count}</span>
              </p>
              <p className="flex gap-2">
                <span>مبلغ خرید:</span>
                <span className="text-center">
                  {numberToPersianPrice(item.total_sales)}
                </span>
              </p>
            </div>
          </div>
        );
      })}
      <CursorTooltip tooltip={tooltip} />
    </div>
  );
};

export default SalesByGenderAndCity;
