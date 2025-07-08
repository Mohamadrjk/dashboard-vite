import LoyaltyChangesComponent from "@/components/customer-loyalty-level-components/loyalty-changes/loyalty-changes";
import CustomerSegmentsChart from "@/components/customesr-interaction-components/customer-segments/customer-segments";
import NumberOfCustomerPurchases from "@/components/statistical-reports-of-customers/Number-of-customer-purchases/Number-of-customer-purchases";

const CustomerLoyaltyLevelPage = () => {
  return (
    <div className="lg:!p-8 py-6 w-full grid grid-cols-4 px-4 overflow-x-hidden gap-4">
      <div className="col-span-5 dxl:col-span-3 w-full flex flex-col gap-8">
        <NumberOfCustomerPurchases />
      </div>
      <div className="col-span-5 dxl:col-span-2">
        <CustomerSegmentsChart />
      </div>
      <div className="col-span-5">
        <LoyaltyChangesComponent />
      </div>
    </div>
  );
};

export default CustomerLoyaltyLevelPage;
