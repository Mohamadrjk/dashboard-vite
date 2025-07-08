import CompanyColorSetting from "./program-color-setting";
import BannerSelectingContainer from "./program-banner-selecting/banner-selecting-container";

const ProgramSettingsContainer = ({ handleOk }: { handleOk: () => void }) => {
  return (
    <div className="w-full h-full animate-fadeIn flex flex-col gap-10 mt-5">
      <div className="w-full flex flex-col gap-5 min-h-[370px]">
        <CompanyColorSetting onEditMethod={handleOk} />
        <BannerSelectingContainer />
      </div>
    </div>
  );
};

export default ProgramSettingsContainer;
