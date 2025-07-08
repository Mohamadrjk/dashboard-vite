import { ISalesByGenderAndCityReport } from "@/types/genderTypes";
import CityInfo from "./cityInfo";
import MapCityInfo from "./MapCityInfo";
import style from "@/styles/IranMap.module.css";
import clsx from "clsx";

export function CursorTooltip({
  tooltip,
}: {
  tooltip: {
    followCursor: boolean;
    visible: boolean;
    x: number;
    y: number;
    content: {
      element: "hoveredMapInfo" | "hoveredCityInfo";
      data: ISalesByGenderAndCityReport | ISalesByGenderAndCityReport[];
    };
  };
}) {
  if (!tooltip.visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: tooltip.y,
        left: tooltip.x,
        background: "rgba(0, 0, 0, 0.8)",
        color: "#fff",
        padding: "6px 10px",
        borderRadius: "6px",
        fontSize: "14px",
        pointerEvents: "none",
        transform: tooltip.followCursor
          ? "translate(0, 0)"
          : "translate(-50%, -100%)",
        whiteSpace: "nowrap",
        zIndex: 1000,
      }}
      className="font-Regular"
    >
      <div
        className={clsx(
          !tooltip.followCursor && style["city-tooltip-bottom"],
          "w-full h-full"
        )}
      >
        {tooltip.content.element == "hoveredCityInfo" && (
          <CityInfo
            cityInfo={tooltip.content.data as ISalesByGenderAndCityReport}
          />
        )}
        {tooltip.content.element == "hoveredMapInfo" &&
          (tooltip.content.data as ISalesByGenderAndCityReport[]).length >
            0 && (
            <MapCityInfo
              mapCityInfo={
                tooltip.content.data as ISalesByGenderAndCityReport[]
              }
            />
          )}

        {!tooltip.content.data ||
          ((tooltip.content.data as ISalesByGenderAndCityReport[]).length ==
            0 && (
            <div className="w-full h-full flex justify-center items-center font-medium text-Highlighter">
              داده‌ای وجود ندارد
            </div>
          ))}
      </div>
    </div>
  );
}
