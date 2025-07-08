import AppLoading from "@/components/Loadings/AppLoading/loading";
import NumberOfCustomerPurchases from "@/components/pages-components/statistical-reports-of-customers/Number-of-customer-purchases/Number-of-customer-purchases";
import PurchaseDistribution from "@/components/pages-components/statistical-reports-of-customers/purchase-distribution/purchase-distribution";
import { TopCustomers, TopProductsByGenderContainer } from "@/components/pages-components/statistical-reports-of-customers/statical-report-lazy/statical-report-lazy";
import { Suspense } from "react";


const StatisticalReportsPage = () => {
  return (
    <div className="lg:!p-8 py-6 w-full grid grid-cols-6 px-4 overflow-x-hidden gap-4">
      <Suspense fallback={<AppLoading />}>
        <div className="col-span-6 w-full grid grid-cols-4 gap-4">
          <div className="col-span-2 max-lg:col-span-4">
            <TopProductsByGenderContainer />
          </div>
          <div className="col-span-2 max-lg:col-span-full">
            <TopCustomers />
          </div>
        </div>
        <div className="col-span-6 w-full grid grid-cols-2  gap-4">
          <PurchaseDistribution />
          <NumberOfCustomerPurchases />
        </div>
      </Suspense>
    </div>
  );
};

export default StatisticalReportsPage;
