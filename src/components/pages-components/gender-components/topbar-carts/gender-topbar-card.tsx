import React from "react";

interface GenderTopBarCardItemProps {
  cardClass: string;
  cardTitle: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
}

const GenderTopBarCardItem: React.FC<GenderTopBarCardItemProps> = ({
  cardClass,
  cardTitle,
  icon,
  children,
}) => {
  return (
    <div dir="rtl" className={cardClass}>
      <div className="flex items-center justify-between w-full">
        <h2 className="text-xl font-Regular text-Tritary">{cardTitle}</h2>
        <span className="w-10 h-10 rounded-[10px] bg-gray-100 flex justify-center items-center">
          {icon}
        </span>
      </div>
      {children}
    </div>
  );
};

export default GenderTopBarCardItem;
