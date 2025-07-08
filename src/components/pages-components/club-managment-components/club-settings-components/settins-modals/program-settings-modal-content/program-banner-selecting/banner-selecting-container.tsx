import { useState } from "react";
import AddBanner from "./add-banner";
import BannerDetailForm from "./banner-details-form";
import {
  IBannerPayload,
  IBannerResultList,
} from "@/types/club-types/club-setting-type";
import { Swiper, SwiperSlide } from "swiper/react";
import useManageClubSBanners from "@/hooks/club-settings-hooks/useClubBanners";
import { Alert, Button, Skeleton } from "antd";
import { RedoOutlined } from "@ant-design/icons";

export interface IBannerList extends IBannerResultList {
  isNew: boolean;
}

const BannerSelectingContainer = () => {
  const {
    isLoading,
    isRefetching,
    refetch,
    error,
    bannersList,
    setBannersList,
  } = useManageClubSBanners();

  const handleDeleteBanner = (id: number) => {
    const newList = bannersList.filter((item) => item.id != id);
    setBannersList(() => newList);
  };

  if (isLoading || isRefetching)
    return (
      <div className="w-full flex flex-col justify-between p-3 bg-Highlighter rounded-[10px] h-[380px]">
        <div className="w-full flex items-center justify-between">
          <Skeleton.Node active className="!w-[180px] grow !h-[15px]" />
          <Skeleton.Node active className="!w-[90px] !h-[15px]" />
        </div>
        <div className="flex items-end justify-center gap-3">
          <Skeleton.Node active className="!w-full grow !h-[300px]" />
          <Skeleton.Node active className="!w-[90px] !h-[300px]" />
        </div>
      </div>
    );

  if (error)
    return (
      <div className="font-Regular relative w-full bg-Highlighter p-5 min-h-[400px] rounded-[12px]">
        <Alert
          message="خطا"
          description="در بارگذاری اطلاعات خطایی رخ داده است"
          type="error"
          className="font-Medium"
          showIcon
        />
        <Button
          onClick={() => refetch()}
          className="absolute left-2 top-2"
          icon={<RedoOutlined />}
        />
      </div>
    );

  return (
    <div className="w-full h-full flex flex-col gap-3 p-3 bg-Highlighter rounded-[10px] font-Regular animate-fadeIn">
      <p className="text-base flex items-center justify-between w-full">
        <span>بارگزاری تصویر بنر تبلیغاتی در صفحه خانه</span>
        <span>{`(${bannersList.length})`}</span>
      </p>
      <div className="w-full overflow-x-auto  no-scrollbar grow flex items-stretch h-max  relative">
        <Swiper
          dir="rtl"
          spaceBetween={20}
          slidesPerView={1.2}
          className="!w-full"
        >
          {bannersList.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <BannerDetailForm
                  banner={item}
                  onDeleteBanner={handleDeleteBanner}
                  className="!opacity-100 !scale-x-100 delay-150"
                />
              </SwiperSlide>
            );
          })}
          <SwiperSlide className="!w-[60px] h-full min-h-[310px]">
            <AddBanner
              lenght={bannersList.length + 1}
              onAddBAnner={() =>
                setBannersList((prev) => [
                  ...prev,
                  {
                    id: prev.length + 1,
                    linkUrl: "",
                    mobileImageUrl: undefined,
                    siteImageUrl: undefined,
                    title: "",
                    isNew: true,
                  },
                ])
              }
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default BannerSelectingContainer;
