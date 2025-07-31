import TopBarCardItem from "@/components/pages-components/dashboard-components/dashboars-topbar-carts/topBarCardItem";
import { survetTopCartsData } from "../survey-data";
import { Icon } from "@iconify/react/dist/iconify.js";

const ClubSurveyTopCartsContainer = () => {
  return (
    <>
      <TopBarCardItem
        cardClass="col-span-1 animate-fadeIn w-full aspect-video dxl:aspect-[16/5] ldxl:aspect-[16/6] bg-Highlighter rounded-[10px] flex p-2 shadow"
        cardTitle={survetTopCartsData.allSurveys.title}
        cardValue={survetTopCartsData.allSurveys.value}
        cardGrowth={survetTopCartsData.allSurveys.growthRate}
        icon={
          <Icon
            icon="wpf:survey"
            width="24"
            height="24"
            className="text-gray-700"
          />
        }
        elemntIndixcator={<Icon icon="carbon:growth" width="24" height="24" />}
      />
      {survetTopCartsData.surveysStates.map((item, index) => {
        return (
          <TopBarCardItem
            key={index}
            cardClass="col-span-1 animate-fadeIn w-full aspect-video dxl:aspect-[16/5] ldxl:aspect-[16/6] bg-Highlighter rounded-[10px] flex p-2 shadow"
            cardTitle={item.title}
            cardValue={item.value}
            cardGrowth={item.growthRate}
            icon={
              <Icon
                icon="wpf:survey"
                width="24"
                height="24"
                className="text-gray-700"
              />
            }
            elemntIndixcator={
              <Icon icon="carbon:growth" width="24" height="24" />
            }
          />
        );
      })}
    </>
  );
};

export default ClubSurveyTopCartsContainer;
