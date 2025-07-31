import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Spin } from "antd";
import { useMemo } from "react";
type optionType = {
  label: string;
  key: number;
};
interface SelectBranchProps {
  title?: string;
  label?: string;
  disabled?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: optionType[];
  selectedItem?: optionType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onMenuClick: (e: any, options: optionType[]) => void;
  isLoading?: boolean;
}
const SelectDropdown = ({
  title,
  options = [],
  label = "انتخاب کنید",
  disabled = false,
  selectedItem,
  onMenuClick,
  isLoading = false,
}: SelectBranchProps) => {
  const defaultValue = { key: 0, label: label } as optionType;
  const selectOptions = useMemo(
    () => [defaultValue, ...options] as optionType[],
    []
  );
  const value = useMemo(() => {
    return selectedItem ? selectedItem : defaultValue;
  }, [selectedItem]);

  return (
    <div className="w-full flex flex-col">
      <span className="text-secondary1  !mb-1">{title}</span>
      <Dropdown
        menu={{
          items: selectOptions,
          selectable: true,
          defaultSelectedKeys: [value.key ? String(value.key) : "0"],
          onClick: (e) => {
            onMenuClick(e, options);
          },
        }}
        disabled={isLoading || disabled}
        overlayClassName="!font-Regular"
        overlayStyle={{ direction: "rtl" }}
        className="w-full border border-[#d9d9d9] disabled:!text-gray-300 rounded-[6px] p-[6px] flex items-center justify-between"
      >
        <div className="!font-Medium flex items-center gap-2 cursor-pointer hover:bg-[#E6F4FF] rounded-[6px]">
          {isLoading ? (
            <Spin />
          ) : (
            <span
              className={
                value.key === 0 || disabled ? "text-gray-300" : "text-gray-800"
              }
            >
              {selectOptions.find((i) => i.key == value.key)?.label ??
                defaultValue.label}
            </span>
          )}
          <DownOutlined className="!h-max text-xs" />
        </div>
      </Dropdown>
    </div>
  );
};
export default SelectDropdown;
