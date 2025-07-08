import { numberToPersianPrice } from "@/utils/common-methods/number-to-price";
import { Icon } from "@iconify/react";
import { Input } from "antd";
import { Dispatch, SetStateAction, useState } from "react";

interface ExchangeContentsProps {
  tab: "coinExchangeRate" | "rankExchangeRate";
  setExchangeRates: Dispatch<
    SetStateAction<{ rankExchangeRate: number; coinExchangeRate: number }>
  >;
  exchangeRates: { rankExchangeRate: number; coinExchangeRate: number };
}

const ExchangeContents: React.FC<ExchangeContentsProps> = ({
  tab,
  setExchangeRates,
  exchangeRates,
}) => {
  const [values, setValues] = useState({
    purchase: 1 / (exchangeRates[tab] > 0 ? exchangeRates[tab] : 1),
    coins: 1,
    points: 1,
  });

  const handleChange = (key: keyof typeof values, value: number) => {
    setValues((prev) => {
      const updatedValues = { ...prev, [key]: value };
      console.log(updatedValues.coins / updatedValues.purchase);
      if (
        tab === "coinExchangeRate" &&
        updatedValues.purchase > 0 &&
        updatedValues.coins > 0
      ) {
        setExchangeRates((prev) => ({
          ...prev,
          coinExchangeRate: updatedValues.coins / updatedValues.purchase,
        }));
      }

      if (
        tab === "rankExchangeRate" &&
        updatedValues.purchase > 0 &&
        updatedValues.points > 0
      ) {
        setExchangeRates((prev) => ({
          ...prev,
          rankExchangeRate: updatedValues.points / updatedValues.purchase,
        }));
      }

      return updatedValues;
    });
  };

  const inputs = {
    coinExchangeRate: [
      { label: "خرید", key: "purchase", value: values.purchase },
      { label: "سکه", key: "coins", value: values.coins },
    ],
    rankExchangeRate: [
      { label: "خرید", key: "purchase", value: values.purchase },
      { label: "امتیاز", key: "points", value: values.points },
    ],
  };

  return (
    <div className="w-full grow h-full flex flex-col gap-4 items-center justify-center">
      <div className="w-full flex flex-col gap-4 font-Regular py-4">
        {inputs[tab].map(({ label, key, value }) => (
          <InputField
            key={key}
            label={label}
            value={value}
            onChange={(val) => handleChange(key as keyof typeof values, val)}
          />
        ))}
      </div>

      <ExchangeDisplay
        purchase={values.purchase}
        exchangeValue={
          tab === "coinExchangeRate" ? values.coins : values.points
        }
        unit={tab === "coinExchangeRate" ? "عدد" : "امتیاز"}
      />
    </div>
  );
};

export default ExchangeContents;

// Reusable Input Field Component
const InputField = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (val: number) => void;
}) => (
  <label className="text-base flex flex-col gap-2">
    {label}
    <Input
      dir="ltr"
      type="number"
      value={value}
      className="!font-Regular"
      onChange={(e) => onChange(Number(e.target.value))}
    />
  </label>
);

// Reusable Exchange Display Component
const ExchangeDisplay = ({
  purchase,
  exchangeValue,
  unit,
}: {
  purchase: number;
  exchangeValue: number;
  unit: string;
}) => (
  <div className="w-full flex items-center justify-center gap-4">
    <ExchangeBox value={numberToPersianPrice(purchase * 10)} unit="ریال" />
    <Icon icon="si:arrow-left-line" width="32" height="32" />
    <ExchangeBox value={exchangeValue.toString()} unit={unit} />
  </div>
);

// Reusable Exchange Box Component
const ExchangeBox = ({ value, unit }: { value: string; unit: string }) => (
  <div className="bg-gray-100 border border-gray-300 rounded-[10px] text-lg font-Medium min-w-24 text-center p-2">
    <span>{value}</span>
    <span className="pr-1 text-xs">{unit}</span>
  </div>
);
