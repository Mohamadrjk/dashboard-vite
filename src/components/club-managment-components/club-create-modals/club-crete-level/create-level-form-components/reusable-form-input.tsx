import { Input } from "antd";
import clsx from "clsx";
import { Controller } from "react-hook-form";
export interface FormFieldProps {
  label?: string;
  name?: string;
  placeholder?: string;
  labelClassName?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors?: any;
  customeError?: any
  length?: number;
  disabled?: boolean;
  requierd?: boolean;
  type?: string;
  loading?: boolean;
  className?: string;
  endIcon?: React.JSX.Element;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ReusableFormField: React.FC<FormFieldProps> = ({
  label,
  name,
  placeholder,
  customeError,
  control,
  disabled = false,
  requierd = true,
  errors,
  endIcon,
  loading,
  length,
  type = "text",
  className,
}) => {
  const renderPriceExtraIcon = () => {
    return <div className=" absolute z-10 h-full  justify-center items-center  top-0 left-2 flex flex-col">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.7072 18.6377C13.1264 18.7279 13.6099 19.2968 13.6096 19.7812C13.5145 20.2397 13.1538 20.646 12.6926 20.9834C12.6396 21.0224 12.4769 20.9843 12.4006 20.9346C12.1202 20.75 11.858 20.5407 11.5812 20.3516C11.4534 20.2644 11.4478 20.1878 11.5324 20.0713C11.8554 19.6269 12.1677 19.1769 12.4943 18.7354C12.5346 18.681 12.6457 18.6247 12.7072 18.6377ZM14.5695 18.6357C14.6749 18.4813 14.7807 18.4688 14.9416 18.5684C15.328 18.8089 15.6912 19.0593 15.7394 19.6094C15.7017 19.7089 15.6628 19.8772 15.5764 20.0215C15.4697 20.2009 15.337 20.3726 15.1926 20.5283C14.7478 21.0071 14.7445 21.0016 14.2131 20.5957C14.0565 20.4763 13.898 20.3563 13.7268 20.2578C13.5646 20.165 13.5597 20.0751 13.6584 19.9375C13.9674 19.5067 14.2715 19.0728 14.5695 18.6357ZM13.1574 3.02246C13.1611 3.09309 13.1708 3.1643 13.1672 3.23438C13.0276 5.69186 12.9119 8.15025 12.7394 10.6055C12.6005 12.5817 12.0457 14.4541 10.8342 16.1133C9.98815 17.2716 8.8753 18.0899 7.33808 18.3203C5.71915 18.5632 4.20516 17.6124 4.03632 16.2129C3.9383 15.4001 4.04574 14.5959 4.27363 13.8047C4.55217 12.8366 5.00942 11.9413 5.49824 11.0576C5.52681 11.0661 5.5556 11.0745 5.58417 11.083C5.52506 11.2738 5.47616 11.4675 5.40546 11.6543C5.18363 12.2401 4.90182 12.8113 4.73847 13.4102C4.28866 15.0592 5.21248 16.1905 7.05 16.3066C9.14669 16.4385 11.5462 15.199 11.8762 12.582C12.0346 11.3208 12.0664 10.0438 12.131 8.77344C12.1877 7.66277 12.1222 6.53947 12.2775 5.44238C12.3921 4.63394 12.7761 3.85812 13.0412 3.06836C13.0498 3.04379 13.0723 3.02292 13.0881 3C13.1112 3.00736 13.1343 3.0151 13.1574 3.02246ZM19.9934 11.167C19.9934 11.2558 20.0111 11.3484 19.9904 11.4326C19.7314 12.5264 19.4777 13.6216 19.2004 14.7119C18.9858 15.556 18.4322 16.1041 17.5002 16.2988C17.1449 16.373 16.7957 16.4757 16.4416 16.5566C16.3411 16.5798 16.2319 16.5719 16.1271 16.5781C16.1113 16.5549 16.0951 16.5306 16.0793 16.5068C16.1798 16.3988 16.2673 16.2771 16.383 16.1865C16.8181 15.8469 17.2566 15.5106 17.7033 15.1846C18.361 14.7045 18.8294 14.107 19.0744 13.3604C19.2755 12.7479 19.4815 12.1364 19.6935 11.5273C19.7404 11.3921 19.8224 11.2672 19.8889 11.1377C19.9235 11.1473 19.9587 11.1574 19.9934 11.167ZM16.0021 4.38477C15.9424 4.80859 15.8723 5.23073 15.8254 5.65625C15.6779 6.96912 15.5307 8.28211 15.4045 9.59668C15.379 9.86322 15.4325 10.1405 15.4807 10.4082C15.5044 10.5424 15.581 10.6765 15.6633 10.792C16.0107 11.2805 16.6406 11.2464 16.9338 10.7256C17.049 10.5201 17.1457 10.3049 17.2512 10.0938C17.2815 10.096 17.3113 10.0983 17.341 10.1006C17.3526 10.22 17.4022 10.3495 17.3693 10.457C17.1695 11.1068 17.0055 11.773 16.7228 12.3916C16.434 13.0226 15.9425 13.2707 15.4611 13.1826C15.0137 13.1011 14.6165 12.6403 14.5842 12.0068C14.5494 11.323 14.5562 10.6284 14.6477 9.9502C14.8311 8.58541 15.0564 7.22456 15.3215 5.87109C15.4233 5.35251 15.6791 4.8599 15.8644 4.35547C15.91 4.36507 15.9565 4.37517 16.0021 4.38477Z" fill="#7e7e7e" />
      </svg>
    </div>
  }

  return (
    <div
      className={
        className ? className : "col-span-1 relative w-full flex flex-col pb-4 "
      }
    >
      <label className="text-secondary1 mb-1">
        {label}
        {requierd && <span className="text-Alert">*</span>}
      </label>
      <Controller
        name={name}
        disabled={disabled}
        control={control}
        render={({ field }) => (
          <div className="  flex flex-col ">
            <div className=" relative   items-center gap-1 flex ">
              <Input
                {...field}
                maxLength={length}
                type={type == 'price' ? 'number' : type}
                value={length ? field.value?.slice(0, length) : field.value} // Enforce length
                onChange={(e) => {
                  if (length) {
                    field.onChange(e.target.value.slice(0, length)); // Prevent extra characters
                  } else {
                    field.onChange(e.target.value);
                  }
                }}
                disabled={loading || disabled}
                dir="rtl"
                placeholder={placeholder}
                className={clsx(
                  errors && errors[name] && "!border-Alert",

                  "!font-Medium w-full disabled:text-gray-300  placeholder:!text-gray-300 placeholder:!text-secondary !p-[6px]"
                )}
              />
              {type == 'price' && renderPriceExtraIcon()}
              {endIcon && (
                <span className=" absolute left-2   top-0 my-0 h-full flex justify-center items-center ">
                  {endIcon}
                </span>
              )}
            </div>
          </div>
        )}
      />
      {errors && errors[name] && (
        <span className="text-red-500 text-xs absolute translate-x-4 opacity-0 right-0 bottom-0 animate-fadeRight">
          {errors[name]?.message}
        </span>
      )}

      {customeError && (
        <span className="text-red-500 text-xs absolute translate-x-4 opacity-0 right-0 bottom-0 animate-fadeRight">
          {customeError?.message}
        </span>
      )}
    </div>
  )
};

export default ReusableFormField;
