import clsx from "clsx";
import React from "react";

interface SettingCartComponentProps {
  title: string;
  icon: React.JSX.Element;
  descriptionList: string[];
  className: string;
  cartKey: string;
  cartAction: (key: string) => void;
}

const SettingCartComponent: React.FC<SettingCartComponentProps> = ({
  descriptionList,
  icon,
  title,
  className,
  cartAction,
  cartKey,
}) => {
  return (
    <div
      role="button"
      onClick={() => cartAction(cartKey)}
      className={clsx(
        className,
        "w-full aspect-[16/8] animate-fadeIn rounded-[10px] transition-all duration-300 bg-Highlighter overflow-hidden relative cursor-pointer"
      )}
    >
      <div className="w-full h-full flex flex-col gap-2 dxl:gap-3 ldxl:gap-4 vdxl:gap-5 absolute top-0 right-0 p-3 dxl:p-4 ldxl:p-5 vdxl:p-6">
        <p className="font-Medium text-xl">{title}</p>
        <ul className="w-full flex flex-col gap-4 pr-6">
          {descriptionList.map((item, index) => {
            return (
              <li
                key={index}
                className="text-Focus font-Regular text-[13px] dxl:text-[16px] vdxl:text-[18px]  !list-disc"
              >
                {item}
              </li>
            );
          })}
        </ul>
      </div>
      <span className="absolute left-8 transition-opacity duration-300 bottom-8 opacity-10 size-24 dxl:size-36 ldxl:size-[150px] vdxl:size-40 ">
        {icon}
      </span>
    </div>
  );
};

export default SettingCartComponent;
