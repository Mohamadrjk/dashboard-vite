import { ITopSellingProduct } from "@/types/sales-per-month";
import "animate.css";
import clsx from "clsx";
const DashboardTopCellingProducts = ({
  products,
  chartColors,
}: {
  products: ITopSellingProduct[];
  chartColors: string[];
}) => {
  return (
    <div
      dir="rtl"
      className="w-full flex flex-col max-lg:col-span-full justify-between p-2 shadow bg-Highlighter h-full rounded-[10px]"
    >
      <h2 className="w-full text-center py-2 text-xl font-Medium">
        10 کالای پرفروش
      </h2>
      {products.map((item, index) => {
        return (
          <div
            key={index}
            className={clsx(
              "w-full grid grid-cols-3 items-center justify-betweens  font-Regular px-2",
              `animate__animated animate__fadeInUp animate__delay-${index * 10
              }s`
            )}
          >
            <p className="w-full col-span-2 flex items-center gap-1">
              <span
                style={{
                  backgroundColor: chartColors[index],
                }}
                className="size-4 block"
              ></span>
              <span>{item.product_name}</span>
            </p>
            <p className="w-full col-span-1 flex justify-end">
              <span>تعداد:</span>
              <span className="w-[20px] text-center pr-1">
                {item.total_sales}
              </span>
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardTopCellingProducts;
