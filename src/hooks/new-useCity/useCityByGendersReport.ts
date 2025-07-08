import { ISalesByGenderAndCityReport } from "@/types/genderTypes";
import { getSalesByGenderAndCityReport } from "@/utils/genderServices";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

const useCityByGendersReport = () => {
  // Default payload with calculated dates
  const [defaultPayload, setDefaultPayload] = useState(() => {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);

    return {
      start_date: sevenDaysAgo.toISOString().split("T")[0], // Standardized date format
      end_date: today.toISOString().split("T")[0],
      limit: 10,
    };
  });

  // Query to fetch sales data
  const { data, error, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ["salesByGenderAndCity", defaultPayload],
    queryFn: () => getSalesByGenderAndCityReport(defaultPayload),
    refetchOnWindowFocus: false,
  });

  // Extract sales data efficiently
  const salesData = data?.data?.data ?? [];

  // Memoized reportData to prevent unnecessary re-renders
  const reportData = useMemo(
    () => ({
      salesData,
      menData: salesData.filter((item) => item.gender === "آقا"),
      womenData: salesData.filter((item) => item.gender === "خانم"),
    }),
    [salesData]
  );

  // Hovering state handlers
  const [hoveredMapInfo, setHoveredMapInfo] = useState<
    ISalesByGenderAndCityReport[] | undefined
  >();
  const [hoveredCityInfo, setHoveredCityInfo] = useState<
    ISalesByGenderAndCityReport | undefined
  >();

  // Handles map element hovering to filter cities dynamically
  const handleMapHover = (cityId?: string) => {
    setHoveredMapInfo(
      cityId
        ? reportData.salesData.filter((item) => item.state_id == Number(cityId))
        : undefined
    );
  };

  return {
    loading: isLoading || isRefetching,
    error,
    refetch,
    reportData,
    setDefaultPayload,
    handleMapHover,
    hoveredMapInfo,
    hoveredCityInfo,
    setHoveredCityInfo,
  };
};

export default useCityByGendersReport;
