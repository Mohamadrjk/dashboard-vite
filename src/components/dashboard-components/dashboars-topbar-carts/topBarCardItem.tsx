import clsx from "clsx";
import React from "react";

export interface TopBarCardItemProps {
  cardClass: string;
  cardTitle: string;
  cardValue: React.JSX.Element | number;
  cardGrowth: number;
  elemntIndixcator: React.JSX.Element;
  icon: React.JSX.Element;
  type?: "default" | "product"; // default behavior
}

const TopBarCardItem: React.FC<TopBarCardItemProps> = ({
  cardClass,
  cardGrowth,
  cardTitle,
  cardValue,
  elemntIndixcator,
  icon,
  type = "default", // 👈 پیش‌فرض
}) => {
  const isPositive = cardGrowth > 0;

  return (
    <div dir="rtl" className={cardClass}>
      <div
        className={clsx(
          "flex flex-col grow",
          type === "product" ? "gap-2" : "justify-between"
        )}
      >
        <h2 className="text-sm font-Regular text-Secondary">{cardTitle}</h2>
        <span className="text-xl font-Medium">{cardValue}</span>

        <span
          className={clsx(
            "font-Regular flex items-center gap-1",
            type === "product"
              ? "text-red-700"
              : isPositive
              ? "text-green-700"
              : "text-red-700"
          )}
        >
          <span>{type === "default" ? `%${cardGrowth}` : cardGrowth}</span>
          {elemntIndixcator}
        </span>
      </div>

      <span className="w-10 h-10 rounded-full bg-blue-400 flex justify-center items-center ">
        {icon}
      </span>
    </div>
  );
};

export default TopBarCardItem;
