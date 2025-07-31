import { IRankingPageLabels } from "@/types/club-types/club-reports-type";
import { getRankingPageLabels } from "@/api/club-api/club-report-service";
import { RedoOutlined } from "@ant-design/icons";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Alert, Skeleton } from "antd";
import { useCallback, useEffect, useState } from "react";
import TopBarCardItem from "@/components/pages-components/dashboard-components/dashboars-topbar-carts/topBarCardItem";

const ClmTopbarCardComponent = () => {
  const [cartsData, setCartsData] = useState<IRankingPageLabels | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getRankingPageLabels();
      if (response.status) {
        setCartsData(() => response.result);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [cartsData]);

  useEffect(() => {
    getData();
  }, []);

  if (loading)
    return (
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
    );
  if (error)
    return (
      <div className="font-Regular relative">
        <Alert
          message="خطا"
          description="در بارگذاری اطلاعات خطایی رخ داده است"
          type="error"
          className="!font-Medium"
          showIcon
        />
        <button
          onClick={() => getData()}
          className="absolute left-2 top-2 w-max h-max "
        >
          <RedoOutlined />
        </button>
      </div>
    );

  if (cartsData)
    return (
      <>
        {cartsData.levels.map((item, index) => {
          return (
            <TopBarCardItem
              key={index}
              cardClass="col-span-1 animate-fadeIn w-full aspect-video dxl:aspect-[16/5] ldxl:aspect-[16/6] max-lg:aspect-[16/7]   bg-Highlighter rounded-[10px] flex p-2 shadow"
              cardTitle={item.title}
              cardValue={item.value}
              cardGrowth={item.growthRate}
              icon={
                <Icon
                  icon="mdi:users"
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
        <TopBarCardItem
          cardClass="col-span-1 animate-fadeIn w-full aspect-video dxl:aspect-[16/5] ldxl:aspect-[16/6] max-lg:aspect-[16/7] bg-Highlighter rounded-[10px] flex p-2 shadow"
          cardTitle={cartsData.newcommers.title}
          cardValue={cartsData.newcommers.value}
          cardGrowth={cartsData.newcommers.growthRate}
          icon={
            <Icon
              icon="mdi:users"
              width="24"
              height="24"
              className="text-gray-700"
            />
          }
          elemntIndixcator={
            <Icon icon="carbon:growth" width="24" height="24" />
          }
        />
      </>
    );
};

export default ClmTopbarCardComponent;
