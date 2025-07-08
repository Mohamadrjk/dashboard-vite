import { Suspense } from "react";
import AppLoading from "../loading";
import CustomerPurchaseCategory from "@/components/customer-buying-behavior/CustomerPurchaseCategory/CustomerPurchaseCategory";

const PurchaseCategoriPAge = () => {
  return (
    <div className="p-8 w-full grid grid-cols-6 gap-8">
      <Suspense fallback={<AppLoading />}>
        {/* <div className="col-span-6 w-full ">
              <TopProductsByGenderContainer />
            </div> */}
        <div className="col-span-4 w-full flex flex-col gap-8">
          <CustomerPurchaseCategory />
          {/* <NumberOfCustomerPurchases /> */}
        </div>
        {/* <div className="col-span-2">
              <TopCustomers />
            </div> */}
      </Suspense>
    </div>
  );
};

export default PurchaseCategoriPAge;
