"use client";
import { Skeleton } from "antd";
import dynamic from "next/dynamic";

// Dynamic imports for each component
export const PurchaseDistribution = dynamic(
  () =>
    import(
      "@/components/statistical-reports-of-customers/purchase-distribution/purchase-distribution"
    ),
  { loading: () => <p>در حال بارگذاری...</p>, ssr: false }
);

export const NumberOfCustomerPurchases = dynamic(
  () =>
    import(
      "@/components/statistical-reports-of-customers/Number-of-customer-purchases/Number-of-customer-purchases"
    ),
  { loading: () => <p>در حال بارگذاری...</p>, ssr: false }
);

export const TopCustomers = dynamic(
  () =>
    import(
      "@/components/statistical-reports-of-customers/top-customers/top-customers"
    ),
  {
    loading: () => (
      <div className="flex flex-col gap-2 p-6 shadow bg-Highlighter ">
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton.Node key={index} active className="!w-full aspect-[16/3]" />
        ))}
      </div>
    ),
    ssr: false,
  }
);

export const TopProductsByGenderContainer = dynamic(
  () =>
    import(
      "@/components/statistical-reports-of-customers/top-products-by-gender/top-products-by-gender-contaier"
    ),
  {
    loading: () => (
      <div className="w-full max-lg:col-span-full  grid grid-cols-2 gap-8">
        <div className="col-span-1 w-full relative bg-Highlighter rounded-[10px] p-4 flex items-center gap-3 overflow-x-auto no-scrollbar">
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton.Node
              key={index}
              active
              className="!w-full aspect-[16/4]"
            />
          ))}
        </div>
        <div className="col-span-1 w-full relative bg-Highlighter rounded-[10px] p-4 flex items-center gap-3 overflow-x-auto no-scrollbar">
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton.Node
              key={index}
              active
              className="!w-full aspect-[16/4]"
            />
          ))}
        </div>
      </div>
    ),
    ssr: false,
  }
);
