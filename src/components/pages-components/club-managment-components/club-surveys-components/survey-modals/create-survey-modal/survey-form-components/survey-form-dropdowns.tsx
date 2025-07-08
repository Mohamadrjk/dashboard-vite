import { ISurveyPointGroup } from "@/types/club-types/club-surveys-type";
import { DownOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps, Popover } from "antd";
import { useState } from "react";
import PointGroupsPreview from "./point-groups-preview";
import clsx from "clsx";

interface PointGroupsDropDownProps {
  surveyPointGroup: ISurveyPointGroup[];
  error: boolean;
  handleSetId: (id: number) => void;
}

export const PointGroupsDropDown: React.FC<PointGroupsDropDownProps> = ({
  surveyPointGroup,
  error,
  handleSetId,
}) => {
  const [currentPointGroupId, setCurrentPointGroupId] = useState<number>(0);
  const selectedItem =
    surveyPointGroup.find((item) => item.id === currentPointGroupId)?.title ||
    "رتبه بندی";

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    setCurrentPointGroupId(Number(e.key));
    handleSetId(Number(e.key));
  };
  const items: MenuProps["items"] = surveyPointGroup.map((item, index) => {
    return {
      label: item.title,
      key: item.id,
      icon: (
        <Popover
          className="!font-Regular"
          placement="topLeft"
          title={
            <span className="w-full text-center !font-Megular">
              {item.title}
            </span>
          }
          overlayClassName=" [&_.ant-popover-title]:!flex [&_.ant-popover-title]:!justify-center [&_.ant-popover-title]:!w-full"
          content={
            <PointGroupsPreview pointTitleValues={item.pointTitleValues} />
          }
        >
          <InfoCircleOutlined className="!text-cta pr-2" />
        </Popover>
      ),
    };
  });
  return (
    <div className="col-span-2 h-full flex flex-col justify-between pb-4">
      <span className="text-secondary1 mb-1">انتخاب گروه امتیاز</span>
      <Dropdown
        menu={{
          items: items,
          selectable: true,
          defaultSelectedKeys: ["1"],
          onClick: handleMenuClick,
        }}
        overlayClassName="!font-Regular [&_.ant-dropdown-menu-item]:flex-row-reverse [&_.ant-dropdown-menu-item]:justify-between [&_.ant-dropdown-menu-item]:!mt-1"
        overlayStyle={{ direction: "rtl" }}
        className={clsx(
          error && "!border-Alert",
          "w-full border border-[#d9d9d9] rounded-[6px] p-[6px] flex items-center justify-between"
        )}
      >
        <div className="!font-Medium flex items-center gap-2 cursor-pointer hover:bg-[#E6F4FF] rounded-[6px]">
          <span
            className={
              selectedItem === "انتخاب گروه امتیاز..."
                ? "text-gray-300"
                : "text-gray-800"
            }
          >
            {selectedItem}
          </span>
          <DownOutlined className="!h-max text-xs" />
        </div>
      </Dropdown>
    </div>
  );
};

interface UsersGroupsDropDownProps {
  surveyUsersGroup: {
    id: number;
    title: string;
    key: string;
  }[];
  error: boolean;
  handleSetId: (id: number) => void;
}

export const UsersGroupsDropDown: React.FC<UsersGroupsDropDownProps> = ({
  surveyUsersGroup,
  error,
  handleSetId,
}) => {
  const [currentPointGroupId, setCurrentPointGroupId] = useState<number>(0);
  const selectedItem =
    surveyUsersGroup.find((item) => item.id === currentPointGroupId)?.title ||
    "رتبه بندی";

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    setCurrentPointGroupId(Number(e.key));
    handleSetId(Number(e.key));
  };
  const items: MenuProps["items"] = surveyUsersGroup.map((item, index) => {
    return {
      label: item.title,
      key: item.id,
    };
  });
  return (
    <div className="col-span-1">
      <span className="text-secondary1 mb-1">انتخاب گروه هدف</span>
      <Dropdown
        menu={{
          items: items,
          selectable: true,
          defaultSelectedKeys: ["1"],
          onClick: handleMenuClick,
        }}
        overlayClassName="!font-Regular"
        overlayStyle={{ direction: "rtl" }}
        className={clsx(
          error && "!border-Alert",
          "w-full border border-[#d9d9d9] rounded-[6px] p-[6px] flex items-center justify-between"
        )}
      >
        <div className="!font-Medium flex items-center gap-2 cursor-pointer hover:bg-[#E6F4FF] rounded-[6px]">
          <span
            className={
              selectedItem === "انتخاب گروه هدف..."
                ? "text-gray-300"
                : "text-gray-800"
            }
          >
            {selectedItem}
          </span>
          <DownOutlined className="!h-max text-xs" />
        </div>
      </Dropdown>
    </div>
  );
};
