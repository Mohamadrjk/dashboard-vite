import { useQuery } from "@tanstack/react-query";
import { getCityStates } from "@/utils/dashboardServices"; // Adjust the import path
import { numberToPersianPrice } from "@/utils/common-methods/number-to-price";

const useGetCityStates = () => {
  return useQuery({
    queryKey: ["CityStates"], // ✅ Unique key for caching & refetching
    queryFn: async () => {
      const data = await getCityStates();

      return {
        totalCustomers: data.data.data.map((item) => item.total_customers),
        cities: data.data.data.map((item) => item.city),
      };
    },
    staleTime: 15 * 60 * 1000, // ✅ Cache data for 5 minutes
    refetchOnWindowFocus: false, // ✅ Prevents unnecessary refetches
  });
};

export default useGetCityStates;
