import { memo } from "react";
// import ImageWithLoader from "../image-with-loader/image-with-loader";
import { Image } from "antd";

const LoginLogoSection = () => {
  return (
    <div className="lg:w-1/3 hidden lg:flex flex-col items-center gap-8">
      <Image
        width={200}
        height={200}
        // placeHolderSize={{ width: 200, height: 200 }}
        alt="logo"
        fetchPriority="high"
        loading="eager"
      // imageClass="!size-[200px] object-cover"
      />
      <div
        style={{
          borderWidth: "2px",
          borderStyle: "solid",
          borderImage:
            "linear-gradient(to right, transparent, rgb(255,255,255,0.5),transparent) 1",
        }}
        className="w-full col-span-1 h-max relative flex flex-col gap-8 p-8 backdrop-blur-sm"
      >
        <h2 className="text-5xl font-bold mb-2 text-right text-white font-Bold">
          خوش آمدید!
        </h2>
        <p className=" text-2xl mb-6 text-right text-white font-medium">
          سامانه تحلیل هوش تجاری
        </p>
      </div>
    </div>
  );
};

const MemoizedLoginLogoSection = memo(LoginLogoSection);
export default MemoizedLoginLogoSection;
