import { ISalesByGenderAndCityReport } from "@/types/genderTypes";
import { numberToPersianPrice } from "@/utils/common-methods/number-to-price";
import { Icon } from "@iconify/react/dist/iconify.js";

const GenderIcon = ({ gender }: { gender: string }) => (
  <span className="w-10 h-10 flex justify-center items-center rounded-lg bg-gray-100">
    <Icon
      icon={gender === "آقا" ? "fontisto:male" : "foundation:torso-female"}
      width={gender === "آقا" ? 22 : 30}
      height={gender === "آقا" ? 24 : 30}
      style={{ color: gender === "آقا" ? "#2CA4D2" : "#B13173" }}
    />
  </span>
);

const CityInfo = ({ cityInfo }: { cityInfo: ISalesByGenderAndCityReport }) => (
  <div className="w-full p-2 flex flex-col gap-3 animate-fadeIn font-Regular">
    {/* City Name & Gender Icon */}
    <div className="flex justify-between items-center">
      <p className="text-xl font-medium text-Highlighter">
        {cityInfo.city_name}
      </p>
      <GenderIcon gender={cityInfo.gender} />
    </div>

    {/* Purchase Count & Total Sales */}
    <div className="flex justify-between text-sm font-medium text-Highlighter">
      <p>
        <span className="text-xs">تعداد خرید: </span>
        {cityInfo.purchase_count}
      </p>
      <p className="whitespace-nowrap">
        <span className="text-xs">مبلغ خرید: </span>
        {numberToPersianPrice(cityInfo.total_sales * 10)}
      </p>
    </div>
  </div>
);

export default CityInfo;
