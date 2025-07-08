import SalesComparison from "@/components/overall-sales-performance-components/Sales-Comparison/sales-comparison";
import AppLoading from "../loading";
import { Suspense } from "react";
import TopCitiesBySales from "@/components/overall-sales-performance-components/Sales-Comparison/top-cties-by-sales";
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
