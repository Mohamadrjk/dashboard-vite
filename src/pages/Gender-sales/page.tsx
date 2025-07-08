import CityGendersMApReportContainer from "@/components/gender-components/new-cityGenders-report/cityGenders-report-container";
import GenderTopbarContainer from "@/components/gender-components/topbar-carts/topbar-carts-container";

const GenderSalesPage = () => {
  return (
    <div className="py-8 w-full flex flex-col gap-4">
      <GenderTopbarContainer />
      <CityGendersMApReportContainer />
    </div>
  );
};

export default GenderSalesPage;
