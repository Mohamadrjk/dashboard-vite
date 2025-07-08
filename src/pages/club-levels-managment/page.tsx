import { Suspense } from "react";
import AppLoading from "../loading";
import {
  UsersLevelsDataLazy,
  ClmTopbarCardComponentLazy,
  LevelDataAbundanceLazy,
  ClubManagementTableComponentLazy,
} from "@/components/club-managment-components/club-levels-components/club-levels-managment-componets/club-levels-lazy";

const ClubLevelsManagementPage = () => {
  return (
    <div className="p-8 w-full grid grid-cols-4 gap-8">
      <Suspense fallback={<AppLoading />}>
        <div className="col-span-4  w-full flex flex-col gap-[20px]">
          <div className="w-full grid grid-cols-4 max-lg:grid-cols-2 md:gap-8 gap-4">
            <ClmTopbarCardComponentLazy />
          </div>
          <div className="w-full grid grid-cols-5 gap-8">
            <div className="col-span-5 dxl:col-span-3">
              <UsersLevelsDataLazy />
            </div>
            <div className="col-span-5 dxl:col-span-2">
              <LevelDataAbundanceLazy />
            </div>
          </div>
        </div>
        <div className="col-span-4 w-full  rounded-[10px]">
          <ClubManagementTableComponentLazy />
        </div>
      </Suspense>
    </div>
  );
};

export default ClubLevelsManagementPage;
