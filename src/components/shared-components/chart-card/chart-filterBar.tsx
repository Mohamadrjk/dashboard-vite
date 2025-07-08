"use client";
import { Select, InputNumber, Button } from "antd";
import { useState } from "react";

type FilterBarProps = {
  config: { interval: string; limit: number };
  isLoading: boolean;
  handleSubmit: (config: { interval: string; limit: number }) => void;
  INTERVAL_OPTIONS: {
    value: string;
    label: string;
  }[];
};

const FilterBar = ({
  config,
  isLoading,
  handleSubmit,
  INTERVAL_OPTIONS,
}: FilterBarProps) => {
  const [tempConfig, setTempConfig] = useState(config);
  return (
    <div className="w-full flex items-center justify-end gap-4">
      <span className="flex items-center gap-1">
        <span>تعداد</span>
        <InputNumber
          min={1}
          max={50}
          value={tempConfig.limit}
          onChange={(value) =>
            setTempConfig({ ...tempConfig, limit: value || 1 })
          }
          className="!w-12"
        />
      </span>
      <Select
        defaultValue={config.interval}
        style={{ width: 120 }}
        onChange={(value) => setTempConfig({ ...tempConfig, interval: value })}
        options={INTERVAL_OPTIONS}
        className="!font-Medium"
        placeholder="انتخاب بازه زمانی"
        popupClassName="rtl-custom !font-Medium"
      />
      <Button
        type="primary"
        className="!font-Medium"
        onClick={() => handleSubmit(tempConfig)}
        loading={isLoading}
      >
        دریافت
      </Button>
    </div>
  );
};

export default FilterBar;
