import AppLoading from "@/components/Loadings/AppLoading/loading";
import CategoriesSaleInPeriodOfTime from "@/components/pages-components/Product-analysis-components/sales-terms-components/categories-sale";
import CategoriesSoldInPeriodOfTime from "@/components/pages-components/Product-analysis-components/sales-terms-components/categories-sold";
import { SalesPercentagesPieChartLAzy, SalesTrendAnalysisLAzy } from "@/components/pages-components/Product-analysis-components/sales-terms-components/sale-terms-lazy-components";
import { Suspense } from "react";


const GeneralGoodsSalesTermsPage = () => {
  return (
    <div className="lg:!p-8 py-6 w-full grid grid-cols-4 px-4 overflow-x-hidden gap-4">
      <Suspense fallback={<AppLoading />}>
        <div className="col-span-3  max-lg:col-span-full">
          <SalesTrendAnalysisLAzy />
        </div>
        <div className="col-span-2 max-lg:col-span-full">
          <SalesPercentagesPieChartLAzy />
        </div>
        <div className="col-span-5 w-full grid grid-cols-4 gap-4 max-lg:col-span-full">
          <div className="col-span-2  max-lg:col-span-full">
            <CategoriesSaleInPeriodOfTime />
          </div>
          <div className="col-span-2  max-lg:col-span-full">
            <CategoriesSoldInPeriodOfTime />
          </div>
        </div>
      </Suspense>
    </div>
  );
};
export default GeneralGoodsSalesTermsPage;
