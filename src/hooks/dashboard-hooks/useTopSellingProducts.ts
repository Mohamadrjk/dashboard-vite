import { useQuery } from "@tanstack/react-query";
import { getTopCellingProducts } from "@/api/dashboardServices"; // Adjust the import path

const useTopSellingProducts = () => {
  return useQuery({
    queryKey: ["TopSellingProducts"], // ✅ Unique key for caching & refetching
    queryFn: async () => {
      const data = await getTopCellingProducts();

      return {
        products: data.data.top_selling_products,
        categories: data.data.top_selling_products.map(
          (item) => item.product_name
        ),
        salesData: data.data.top_selling_products.map(
          (item) => item.total_sales
        ),
      };
    },
    staleTime: 15 * 60 * 1000, // ✅ Cache data for 5 minutes
    refetchOnWindowFocus: false, // ✅ Prevents unnecessary refetches
  });
};

export default useTopSellingProducts;
