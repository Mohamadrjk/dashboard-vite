import { Flex, Radio, RadioChangeEvent } from "antd";
import { CheckboxGroupProps } from "antd/es/checkbox";
import style from "./exchange-radio.module.css";
import clsx from "clsx";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Dispatch, SetStateAction } from "react";
const options: CheckboxGroupProps<string>["options"] = [
  {
    label: (
      <span className="flex items-center justify-center gap-2 font-Medium">
        <span>خرید</span>
        <span>
          <Icon icon="si:arrow-left-line" width="24" height="24" />
        </span>
        <span>امتیاز</span>
      </span>
    ),
    value: "rankExchangeRate",
  },
  {
    label: (
      <span className="flex items-center justify-center gap-2 font-Medium">
        <span>خرید</span>
        <span>
          <Icon icon="si:arrow-left-line" width="24" height="24" />
        </span>
        <span>سکه</span>
      </span>
    ),
    value: "coinExchangeRate",
  },
];

interface ExchangeHeaderProps {
  setTab: Dispatch<SetStateAction<"coinExchangeRate" | "rankExchangeRate">>;
}

const ExchangeHeader: React.FC<ExchangeHeaderProps> = ({ setTab }) => {
  const onChange = (e: RadioChangeEvent) => {
    setTab(e.target.value);
  };
  return (
    <Flex vertical gap="middle">
      <Radio.Group
        block
        options={options}
        onChange={onChange}
        defaultValue="rankExchangeRate"
        optionType="button"
        buttonStyle="solid"
        className={clsx(style["custom-rado"])}
      />
    </Flex>
  );
};

export default ExchangeHeader;
