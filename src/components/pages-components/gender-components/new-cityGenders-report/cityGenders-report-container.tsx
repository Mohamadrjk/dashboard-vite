"use client";
import useCityByGendersReport from "@/hooks/new-useCity/useCityByGendersReport";
import { RedoOutlined } from "@ant-design/icons";
import { Alert, Skeleton } from "antd";
import IranMapComponent from "./iran-map-component";
import CitesGenderReportCarts from "./city-gender-report-carts";
import { useEffect, useState } from "react";
import CitesGenderReportCartsDrawer from "./city-gender-float";


// Simple hook to detect mobile view
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
}

const CityGendersMApReportContainer = () => {
  const isMobile = useIsMobile();
  const {
    loading,
    error,
    refetch,
    reportData,
    setDefaultPayload,
    handleMapHover,
    hoveredMapInfo,
    hoveredCityInfo,
    setHoveredCityInfo,
  } = useCityByGendersReport();

  if (loading)
    return (
      <div className="w-full flex items-center justify-center gap-20">
        <Skeleton.Node active className="!w-full  !h-[800px]" />
        <Skeleton />
      </div>
    );

  if (error)
    return (
      <div className="font-Regular relative">
        <Alert
          message="خطا"
          description="در بارگذاری اطلاعات خطایی رخ داده است"
          type="error"
          className="!font-Medium"
          showIcon
        />
        <button
          onClick={() => refetch()}
          className="absolute left-2 top-2 w-max h-max"
        >
          <RedoOutlined />
        </button>
      </div>
    );

  // Responsive rendering
  if (isMobile) {
    return (
      <div className="w-full flex flex-col px-2 gap-4">
        <div className="w-full">
          <IranMapComponent allData={reportData.salesData} />
        </div>
        <div className="w-full">
          <CitesGenderReportCartsDrawer
            cityInfo={hoveredCityInfo}
            isLoading={loading}
            reportData={reportData}
            setCityInfo={setHoveredCityInfo}
            setDefaultPayload={setDefaultPayload}
          />
        </div>
      </div>
    );
  }

  // Desktop rendering
  return (
    <div className="w-full grid grid-cols-6 px-4">
      <div className="col-span-3">
        <IranMapComponent allData={reportData.salesData} />
      </div>
      <div className="col-span-3">
        <CitesGenderReportCarts
          cityInfo={hoveredCityInfo}
          isLoading={loading}
          reportData={reportData}
          setCityInfo={setHoveredCityInfo}
          setDefaultPayload={setDefaultPayload}
        />
      </div>
    </div>
  );
};

export default CityGendersMApReportContainer;
