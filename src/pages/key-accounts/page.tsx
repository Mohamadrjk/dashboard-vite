import { Suspense } from "react";
import AppLoading from "../loading";
import {
  LazyCustomerPurchasingTrendsData,
  LazyKeyCustomersShareSales,
  LazyTopCustomersByers,
} from "@/components/overall-sales-performance-components/key-customets-components/key-customers-lazy-components";

const KeyAccounts = () => {
  return (
    <>
      <div className=" lg:!p-8 py-6   w-full grid grid-cols-1 px-4 overflow-x-hidden gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Suspense fallback={<AppLoading />}>
          <div className="col-span-1 md:col-span-2 lg:col-span-5">
            <LazyCustomerPurchasingTrendsData />
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <LazyTopCustomersByers />
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <LazyKeyCustomersShareSales />
          </div>
        </Suspense>
      </div>
    </>
  );
};

export default KeyAccounts;
