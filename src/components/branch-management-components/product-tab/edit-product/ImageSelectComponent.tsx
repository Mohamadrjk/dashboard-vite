import { Icon } from "@iconify/react/dist/iconify.js";
import { Image, Skeleton } from "antd";
import clsx from "clsx";
import React from "react";

interface EditProductImageSelectProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any;
  isLoading: boolean;
  className?: string;
  setImage: () => void;
}
function EditProductImageSelect({
  image,
  isLoading,
  setImage,
  className,
}: EditProductImageSelectProps) {
  return (
    <div
      className={clsx(
        "relative w-full aspect-square overflow-hidden border border-dashed border-gray-300 rounded-[10px] p-1",
        className
      )}
    >
      <span className="absolute top-4 right-4 text-gray-200">
        {image.uploadedFile?.name}
      </span>
      <Image
        width="100%"
        height="100%"
        src={image}
        alt={Math.random().toString() || ""}
        className="!object-contain w-full !h-full"
        placeholder={
          <Skeleton.Image
            active
            className="w-full object-contain"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              inset: 0,
            }}
          />
        }
      />
      <button
        onClick={setImage}
        disabled={isLoading}
        className="absolute top-4 left-4 p-1 transition-all rounded hover:bg-[rgb(58,95,151,0.1)] active:scale-90"
      >
        <Icon
          icon="lets-icons:trash-light"
          width="28"
          height="28"
          style={{ color: "var(--Alert)" }}
        />
      </button>
    </div>
  );
}

export default EditProductImageSelect;
