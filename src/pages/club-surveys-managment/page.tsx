import { Suspense } from "react";
import AppLoading from "../loading";

import {
  ClubSurveyTableContainerLazy,
  ClubSurveyTopCartsContainerLazy,
} from "@/components/club-managment-components/club-surveys-components/club-survey-lazyloading";

const ClubSurveysManagementPage = () => {
  return (
    <div className="p-8 w-full grid grid-cols-2 lg:grid-cols-4 gap-8">
      <Suspense fallback={<AppLoading />}>
        <div className="col-span-4 w-full flex flex-col gap-[20px]">
          <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-8">
            <ClubSurveyTopCartsContainerLazy />
          </div>
          {/* <div className="w-full grid grid-cols-5 gap-8">
            <div className="col-span-5 dxl:col-span-3">
              <UsersLevelsData data={data} />
            </div>
            <div className="col-span-5 dxl:col-span-2">
              <LevelDataAbundance
                loyaltyData={data.filter((item) => item.level != "New Users")}
              />
            </div>
          </div> */}
        </div>
        <div className="col-span-4 w-full  rounded-[10px]">
          <ClubSurveyTableContainerLazy />
        </div>
      </Suspense>
    </div>
  );
};

export default ClubSurveysManagementPage;
