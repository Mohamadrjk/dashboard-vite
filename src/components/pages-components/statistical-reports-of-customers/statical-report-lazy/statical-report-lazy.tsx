"use client";
import { lazy } from "react";

// lazy imports for each component
export const PurchaseDistribution = lazy(
  () =>
    import(
      "@/components/pages-components/statistical-reports-of-customers/purchase-distribution/purchase-distribution"
    )
);

export const NumberOfCustomerPurchases = lazy(
  () =>
    import(
      "@/components/pages-components/statistical-reports-of-customers/Number-of-customer-purchases/Number-of-customer-purchases"
    )
);

export const TopCustomers = lazy(
  () =>
    import(
      "@/components/pages-components/statistical-reports-of-customers/top-customers/top-customers"
    )
);

export const TopProductsByGenderContainer = lazy(
  () =>
    import(
      "@/components/pages-components/statistical-reports-of-customers/top-products-by-gender/top-products-by-gender-contaier"
    ),

);
