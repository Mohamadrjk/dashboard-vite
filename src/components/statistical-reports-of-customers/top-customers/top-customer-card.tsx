import { ITopCustomers } from "@/types/customers-model";
import { numberToPersianPrice } from "@/utils/common-methods/number-to-price";
import React from "react";
interface TopCustomerCardItemProps {
  customer: ITopCustomers;
  icon: React.ReactNode;

  cardClass: string;
}

const TopCustomerCardItem: React.FC<TopCustomerCardItemProps> = ({
  customer,
  cardClass,
  icon,
}) => {
  return (
    <div dir="rtl" className={cardClass}>
      {/* <div className="flex items-center justify-between w-full">
        <h2 className="text-xl font-Regular text-Tritary">
          {customer.customer_name}
        </h2>
        <p className="flex items-center gap-3">
          <span className="w-28 h-7 py-1 text-center overflow-hidden hover:w-40 transition-all bg-Tritary px-1 rounded-full  font-Medium text-ellipsis  whitespace-nowrap  text-Highlighter">
            {customer.top_product}
          </span>
          <span className="w-8 h-8 rounded-full bg-Tritary px-1 flex justify-center items-center hover:drop-shadow-lg hover:scale-105 transition-all">
            {icon}
          </span>
        </p>
      </div> */}
      <div className="w-full flex items-center justify-between">
        <span className="max-w-[calc(100%-2rem)] line-clamp-2 text-ellipsis text-Tritary font-Medium">
          {customer.top_product}
        </span>
        <span className="w-8 h-8 rounded-[10px] bg-Highlighter px-1 flex justify-center items-center hover:drop-shadow-lg hover:scale-105 transition-all">
          {icon}
        </span>
      </div>
      <div className="w-full h-max">
        <div className="flex h-full justify-between w-full">
          <p className="w-max flex flex-col pl-1 items-center  font-Medium gap-2 text-primary2 whitespace-nowrap">
            <span className="text-xs">تعداد کل خرید </span>
            <span className="text-xs">{customer.total_purchases}</span>
          </p>
          <span className="h-full border-r border-primary"></span>

          <p className="w-max px-1 flex flex-col  items-center  font-Medium gap-2 text-primary2 whitespace-nowrap">
            <span className="text-xs pr-1">مبلغ کل خرید</span>

            <span className="text-xs">
              {numberToPersianPrice(customer.total_spent)}
            </span>
          </p>
          <span className="h-full border-r border-primary"></span>

          <p className="w-max pr-1 flex flex-col  items-center  font-Medium gap-2 text-primary2 whitespace-nowrap">
            <span className="text-xs whitespace-nowrap">میانگین خرید</span>
            <span className="text-xs">
              {numberToPersianPrice(+customer.avg_purchase_value.toFixed(2))}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopCustomerCardItem;
