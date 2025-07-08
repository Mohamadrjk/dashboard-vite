import { ISalesByGenderAndCityReport } from "@/types/genderTypes";
import { numberToPersianPrice } from "@/utils/common-methods/number-to-price";

const MapCityInfo = ({
  mapCityInfo,
}: {
  mapCityInfo: ISalesByGenderAndCityReport[];
}) => {
  const totalPurchases = mapCityInfo.reduce(
    (prev, cur) => prev + cur.purchase_count,
    0
  );
  const totalSales = mapCityInfo.reduce(
    (prev, cur) => prev + cur.total_sales,
    0
  );

  return (
    <div className="animate-fadeIn delay-300">
      {/* City Name & Totals */}
      <p className="text-xl font-medium text-Highlighter mb-2 text-center ">
        <span className="text-sm dxl:text-base ldxl:text-lg font-Medium">
          {" "}
          {mapCityInfo[0]?.city_name}
        </span>
        <span className="text-sm font-light flex justify-center gap-4 mt-1">
          <span className="flex flex-col gap-1 items-center">
            <span className="text-xs dxl:text-sm font-Light">مجموع تعداد:</span>
            <span className="text-xs  dxl:text-sm font-Medium">
              {totalPurchases}
            </span>
          </span>
          <span className="flex flex-col gap-1 items-center">
            <span className="text-xs dxl:text-sm font-Light">مجموع خرید:</span>
            <span className="text-xs  dxl:text-sm font-Medium">
              {numberToPersianPrice(totalSales)}
              <span className="text-xs font-light pr-1">تومان</span>
            </span>
          </span>
        </span>
      </p>

      {/* Divider */}
      <hr className="w-4/5 mx-auto my-2 border-gray-100" />

      {/* Gender Breakdown */}
      <div className="flex justify-center gap-4">
        {mapCityInfo.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-1 text-center"
          >
            <p className="text-Highlighter font-medium">{item.gender}</p>
            <p className="text-sm font-regular text-Highlighter flex gap-1">
              <span className="text-xs">تعداد:</span>
              <span>{item.purchase_count}</span>
            </p>
            <p className="text-sm font-regular text-Highlighter flex gap-1">
              <span className="text-xs">خرید:</span>
              <span>
                {numberToPersianPrice(item.total_sales)}
                <span className="text-xs font-light pr-1">تومان</span>
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapCityInfo;
