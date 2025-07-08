import Checkbox from "antd/es/checkbox/Checkbox";
import { Controller } from "react-hook-form";
import { FormFieldProps } from "./reusable-form-input";
import clsx from "clsx";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ReusableFormCheckBox: React.FC<FormFieldProps> = ({
  label,
  name,
  control,
  requierd = true,
  errors,
  endIcon,
  loading,
  className,
  labelClassName,
}) => (
  <div
    className={className ? className : "relative w-max flex flex-col  gap-1  "}
  >
    <div
      className={
        className
          ? className
          : "relative w-max flex gap-1  [&_.ant-checkbox-checked_.ant-checkbox-inner]:!border-Focus3 [&_.ant-checkbox-checked_.ant-checkbox-inner]:!bg-Focus3"
      }
    >
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className=" relative  ">
            <Checkbox
              {...field}
              id={name}
              value={Boolean(field.value)} // Enforce length
              checked={Boolean(field.value)}
              disabled={loading}
            />
            {endIcon && (
              <span className=" absolute left-2    top-0 my-0 h-full flex justify-center items-center ">
                {endIcon}
              </span>
            )}
          </div>
        )}
      />
      <label
        htmlFor={name}
        className={clsx("text-secondary1 mb-1", labelClassName)}
      >
        {label}
        {requierd && <span className="text-Alert">*</span>}
      </label>
    </div>
    {errors && errors[name] && (
      <span className="text-red-500 text-xs absolute translate-x-4 opacity-0 right-0 bottom-0 animate-fadeRight">
        {errors[name]?.message}
      </span>
    )}
  </div>
);

export default ReusableFormCheckBox;
