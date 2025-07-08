import ReusableFormField, {
  FormFieldProps,
} from "@/components/club-managment-components/club-create-modals/club-crete-level/create-level-form-components/reusable-form-input";
import { Icon } from "@iconify/react/dist/iconify.js";
import clsx from "clsx";
import React, { useState } from "react";
function CategoryTabDetailItem(props: FormFieldProps) {
  const [status, setStatus] = useState<"Edit" | "View">("View");
  if (status == "View")
    return (
      <div
        className={clsx(
          "border border-1  p-4 gap-2  flex flex-col  min-h-[80px] ",
          props.className
        )}
      >
        <div className="  w-full flex justify-between  items-center ">
          <span className=" text-Primary"> {props.label}</span>
          <span onClick={() => setStatus("Edit")} role="button">
            <Icon
              icon="mage:edit"
              width="24"
              height="24"
              style={{ color: "var(--cta)" }}
            />
          </span>
        </div>
        <span className=" text-Secondary">
          {props.control._getWatch(props.name)}
        </span>
      </div>
    );
  return <ReusableFormField {...props}></ReusableFormField>;
}

export default CategoryTabDetailItem;
