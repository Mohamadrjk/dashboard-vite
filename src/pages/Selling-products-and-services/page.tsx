import { LazyBottomSellingProductsAnalysis, LazySalesComparison, LazyTopSellingProductsAnalysis, LazyTotalRevenueDistribution } from "@/components/pages-components/overall-sales-performance-components/Selling-products-and-services-components/seliing-analysis-index";
import AppLoading from "@/components/shared-components/loadings-components/app-loading/loading";
import { Suspense } from "react";

const SellingProductsAndServicesPage = () => {
  return (
    <div className="p-4 w-full grid grid-cols-2 gap-4 ">
      <Suspense fallback={<AppLoading />}>
        <div className="col-span-2 w-full grid grid-cols-1 xl:grid-cols-2 gap-4">
          <LazyTopSellingProductsAnalysis />
          <LazyBottomSellingProductsAnalysis />
        </div>
        <div className="col-span-2 w-full grid grid-cols-1 xl:grid-cols-2 gap-4">
          <LazyTotalRevenueDistribution />
          <LazySalesComparison />
        </div>
      </Suspense>
    </div>
  );
};

export default SellingProductsAndServicesPage;
