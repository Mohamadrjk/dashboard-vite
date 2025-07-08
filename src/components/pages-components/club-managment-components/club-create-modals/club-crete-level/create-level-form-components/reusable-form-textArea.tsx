import { NewLevelFormValues } from "@/hooks/levels-hooks/useCreateNewLevel";
import { Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import clsx from "clsx";

import { Controller } from "react-hook-form";
import { FormFieldProps } from "./reusable-form-input";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ReusableFormFieldTextArea: React.FC<FormFieldProps> = ({
  label,
  name,
  placeholder,
  control,
  errors,
  loading,
  length,
  disabled = false,
  requierd,
  className,
}) => (
  <div
    className={
      className ? className : "col-span-1  w-full flex flex-col pb-4 relative"
    }
  >
    <label className="text-secondary1 mb-1">
      {label}
      {requierd && <span className="text-Alert">*</span>}
    </label>
    <Controller
      name={name}
      control={control}
      disabled={disabled}
      render={({ field }) => (
        <TextArea
          {...field}
          maxLength={length}
          autoSize={{ minRows: 2, maxRows: 6 }}
          disabled={loading || disabled}
          dir="rtl"
          placeholder={placeholder}
          className={clsx(
            errors && errors[name] && "!border-Alert",
            "!font-Medium placeholder:!text-gray-300 placeholder:!text-secondary !p-[6px]"
          )}
        />
      )}
    />
    {errors && errors[name] && (
      <span className="text-red-500 text-xs absolute translate-x-4 opacity-0 right-0 bottom-0 animate-fadeRight">
        {errors[name]?.message}
      </span>
    )}
  </div>
);

export default ReusableFormFieldTextArea;
