import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Spin } from "antd";
import { useMemo } from "react";
export type optionType = {
  label: string;
  key: number;
};
interface SelectBranchProps {
  title?: string;
  label?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: optionType[];
  selectedItem: optionType[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onMenuClick: (e: any, options: optionType[]) => void;
  isLoading?: boolean;
}
const SelectMultiDropdown = ({
  title,
  options = [],
  selectedItem,
  onMenuClick,
  label,
  isLoading = false,
}: SelectBranchProps) => {
  const selectOptions = useMemo(
    () =>
      [
        {
          label: title,
          key: 0,
        },
        ...options,
      ] as optionType[],
    [options]
  );
  const defaultCategory = [
    { key: 0, label: "انتخاب دسته بندی" },
  ] as optionType[];
  const value = useMemo(() => {
    return selectedItem ? selectedItem : defaultCategory;
  }, [selectedItem]);

  return (
    <div className="w-full flex flex-col">
      {title && <span className="text-secondary1  !mb-1">{title}</span>}
      <Dropdown
        menu={{
          items: selectOptions,
          selectable: true,
          defaultSelectedKeys: [],
          onClick: (e) => {
            onMenuClick(e, options);
          },
        }}
        disabled={isLoading}
        overlayClassName="!font-Regular"
        overlayStyle={{ direction: "rtl" }}
        className="w-full border border-[#d9d9d9] rounded-[6px] p-[6px] flex items-center justify-between"
      >
        <div className="!font-Medium flex items-center gap-2 cursor-pointer hover:bg-[#E6F4FF] rounded-[6px]">
          {isLoading ? (
            <Spin />
          ) : (
            <span className={"text-gray-800 text-ellipsis overflow-hidden whitespace-nowrap overflow-hidden w-full"}>{label}</span>
          )}
          <DownOutlined className="!h-max text-xs" />
        </div>
      </Dropdown>
    </div>
  );
};
export default SelectMultiDropdown;
