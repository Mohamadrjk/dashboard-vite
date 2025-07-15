import TopCitiesBySales from "@/components/pages-components/overall-sales-performance-components/Sales-Comparison/top-cties-by-sales";
import AppLoading from "@/components/shared-components/loadings-components/app-loading/loading";
import { Suspense } from "react";

const OverallSalesPerformancePage = () => {
  return (
    <div className="p-4 w-full h-full gap-4 overflow-hidden">
      <Suspense fallback={<AppLoading />}>
        <TopCitiesBySales />
      </Suspense>
    </div>
  );
};

export default OverallSalesPerformancePage;
