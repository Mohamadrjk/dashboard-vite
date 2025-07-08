import { Suspense } from "react";
import AppLoading from "../loading";
import CustomersClvChart from "@/components/customesr-interaction-components/customesr-clv/customers-clv";
import InteractionsChart from "@/components/customesr-interaction-components/customer-interaction/customer-interactions";
import CustomerSegmentsChart from "@/components/customesr-interaction-components/customer-segments/customer-segments";
import AnalysisCustomersInteractionChart from "@/components/customesr-interaction-components/analysis-customers-interaction/analysis-customers-interaction";

const CustomersInteractionPAge = () => {
  return (
    <div className="lg:!p-8 py-6 w-full grid grid-cols-5 px-4 overflow-x-hidden gap-4">
      <Suspense fallback={<AppLoading />}>
        {/* <div className="col-span-3 w-full flex flex-col gap-8">
          <CustomersClvChart />
        </div> */}
        {/* <div className="col-span-2">
          <CustomerSegmentsChart />
        </div> */}
        <div className="col-span-5 w-full">
          <AnalysisCustomersInteractionChart />
        </div>
        <div className="col-span-5 w-full">
          <InteractionsChart />
        </div>
      </Suspense>
    </div>
  );
};

export default CustomersInteractionPAge;
