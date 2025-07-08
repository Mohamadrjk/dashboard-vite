import { UseFormSetValue } from "react-hook-form";
import CustomThemeColorPicker from "../customThemeColorPicker";
import { CompanyConfig } from "../../useMenuSettings";
import clsx from "clsx";
import ThemeImageUploader from "../../theme-image-uplaoder";

const ThemePanel = ({
  control,
  modeValue,
  setValue,
  getValues
}: {
  getValues: any;
  control: any;
  setValue: any;
  modeValue: any;
}) => {
 
  return (
    <div className=" flex flex-col gap-5">
      <div>بارگزاری لوگوی مجموعه</div>
      <div className=" w-max mx-auto">
        <ThemeImageUploader
          name="generalConfigs.image_url"
          defaultValue={getValues("generalConfigs.image_url")}
          control={control}
        />
      </div>
      <div className=" ">
        <span className=" mb-3">انتخاب رنگ دکمه ها</span>
        <div className=" bg-Highlighter rounded-md  grid xl:grid-cols-4  grid-cols-2 p-2 gap-5">
          <CustomThemeColorPicker
            title="دکمه اصلی "
            control={control}
            lable="themeConfigs.primary"
          />
          <CustomThemeColorPicker
            title="متن دکمه اصلی "
            control={control}
            lable="themeConfigs.primaryText"
          />

          <CustomThemeColorPicker
            title=" دکمه ثانویه "
            control={control}
            lable="themeConfigs.secondary"
          />
          <CustomThemeColorPicker
            title=" متن دکمه ثانویه "
            control={control}
            lable="themeConfigs.secondaryText"
          />
        </div>
      </div>
      <div>
        <span className=" mb-3">انتخاب رنگ اجزای اصلی </span>
        <div className=" bg-Highlighter rounded-md grid  xl:grid-cols-4  grid-cols-2    gap-5">
          <CustomThemeColorPicker
            title="پس زمینه اصلی "
            control={control}
            lable="themeConfigs.background"
          />
          <CustomThemeColorPicker
            title="رنگ سفید تم "
            control={control}
            lable="themeConfigs.white"
          />
          <CustomThemeColorPicker
            title="رنگ خاکستری  تم "
            control={control}
            lable="themeConfigs.gray"
          />
          <CustomThemeColorPicker
            title="رنگ عناوین اصلی "
            control={control}
            lable="themeConfigs.text"
          />
        </div>
      </div>
      <div className=" grid grid-cols-4 items-center  gap-4">
        <div className="flex flex-col grow gap-2 items-center">
          <span className="w-full ">انتخاب حالت </span>
          <LightAndDarkThemeSelection
            selectedMode={modeValue ? modeValue : "light"}
            setValue={setValue}
          />
        </div>
      </div>
    </div>
  );
};
const LightAndDarkThemeSelection = ({
  selectedMode,
  setValue,
}: {
  selectedMode: "light" | "dark";
  setValue: UseFormSetValue<CompanyConfig>;
}) => {
  return (
    <div className=" flex relative  border rounded-md overflow-hidden  h-full w-full font-light text-xs  gap-1 bg-Highlighter transition-all duration-150 ">
      <button
        type="button"
        onClick={() => setValue("themeConfigs.mode", "light")}
        className={clsx(
          selectedMode == "light"
            ? "bg-Highlighter-Faded "
            : "bg-Highlighter z-10  ",
          "grow w-full h-[36px]  aspect-square"
        )}
      >
        روشن
      </button>
      <button
        type="button"
        onClick={() => setValue("themeConfigs.mode", "dark")}
        className={clsx(
          selectedMode == "dark"
            ? "bg-Highlighter-Faded grow"
            : "bg-Highlighter grow",
          "grow w-full h-[36px] aspect-square"
        )}
      >
        تیره
      </button>
    </div>
  );
};

export default ThemePanel;
