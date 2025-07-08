import { Icon } from "@iconify/react/dist/iconify.js";
import { Dropdown, MenuProps, Space } from "antd";
import clsx from "clsx";

interface SettingModalsDropdownProps {
  placeHolder: string;
  dropdownItems: MenuProps["items"];
  selectedItem: string | undefined;
  handleSetId: (id: number) => void;
  defaultSelectedKeys?: string[];
}

const SettingModalsDropdown: React.FC<SettingModalsDropdownProps> = ({
  placeHolder,
  dropdownItems,
  selectedItem,
  handleSetId,
  defaultSelectedKeys,
}) => {
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    handleSetId(Number(e.key));
  };
  return (
    <div className="w-full">
      <Dropdown
        menu={{
          items: dropdownItems,
          selectable: true,
          defaultSelectedKeys: defaultSelectedKeys ?? ["1"],
          onClick: handleMenuClick,
        }}
        overlayClassName="!font-Medium !text-right"
        trigger={["click"]}
        className="!w-full !rounded-[10px] bg-[#F5F5F5] cursor-pointer hover:first:!text-gray-800 "
      >
        <span
          className={clsx(
            "w-full font-Medium text-[15px] px-[10px] py-3  flex justify-between items-center transition-colors",
            selectedItem ? "text-gray-800" : "text-gray-400"
          )}
        >
          <span>{selectedItem ? selectedItem : placeHolder}</span>
          <Icon icon="mingcute:down-line" width="22" height="22" />
        </span>
      </Dropdown>
    </div>
  );
};

export default SettingModalsDropdown;
