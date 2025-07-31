import { dynamic } from "@/components/shared-components/dynamicImport/dynamicImport";
import { Skeleton } from "antd";

export const ClubSurveyTableContainerLazy = dynamic(
  () => import("./club-survey-table/club-survey-table"),
  {
    loading: () => (
      <div className="w-full aspect-[16/6]">
        <Skeleton.Node active className="!w-full !h-full" />
      </div>
    ),
  }
);

export const ClubSurveyTopCartsContainerLazy = dynamic(
  () => import("./club-survey-top-carts/club-survey-top-carts"),
  {
    loading: () => (
      <>
        {Array.from({ length: 4 }).map((_, index) => {
          return (
            <Skeleton.Node
              key={index}
              active
              className="col-span-1 !w-full !h-full aspect-[16/6]"
            />
          );
        })}
      </>
    ),
  }
);
