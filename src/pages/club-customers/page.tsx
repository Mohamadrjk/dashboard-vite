import { CustomersTableContainerLazy } from "@/components/pages-components/club-managment-components/club-costomers-components/club-customers-lazy-components";
import { Spin } from "antd";

import { Suspense } from "react";

const ClubCustomers = () => {
  return (
    <div className="w-full grow h-full">
      <Suspense fallback={<Spin />}>
        <CustomersTableContainerLazy />
      </Suspense>
    </div>
  );
};

export default ClubCustomers;
