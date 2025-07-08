import { ITopProductsByGender } from "@/types/customers-model";
import { numberToPersianPrice } from "@/utils/common-methods/number-to-price";
import { Icon } from "@iconify/react/dist/iconify.js";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css/autoplay";

interface TopProductsByGenderListProps {
  items: ITopProductsByGender[];
}
const GENDER_ICONS = {
  آقا: "fontisto:male",
  خانم: "foundation:torso-female",
};
const TopProductsByGenderList: React.FC<TopProductsByGenderListProps> = ({
  items,
}) => {
  return (
    <div className="flex flex-col gap-4">
      {items.map((product, index) => {
        return (
          <div key={index}>
            <div className="w-full aspect-[16/5] p-4 font-Medium bg-gray-100 rounded-[6px] border border-gray-300 flex flex-col justify-between relative">
              <span>{product.product_name}</span>
              <span className="text-sm">
                <span>تعداد:</span>
                {numberToPersianPrice(product.total_purchases)}
              </span>
              <span className="w-8 h-8 rounded-[10px] bg-Highlighter absolute top-4 left-4 px-1 flex justify-center items-center hover:drop-shadow-lg hover:scale-105 transition-all">
                <Icon
                  icon={GENDER_ICONS[product.gender]}
                  width={product.gender === "آقا" ? "18" : "26"}
                  height={product.gender === "آقا" ? "20" : "26"}
                  style={{
                    color: product.gender === "آقا" ? "#2CA4D2" : "#B13173",
                  }}
                />
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TopProductsByGenderList;
