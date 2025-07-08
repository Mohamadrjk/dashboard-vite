import { CityStatesChartComponentLAzy, DashboardTopCellingProductsLAzy, SalePerMonthChartsContainerLAzy, WeeklyIncomeChartComponentLAzy } from "@/components/dashboard-components/dashboar-dynamic-components/dashboard-dynamic-components";
import DashboardTopBArCardsContainer from "@/components/dashboard-components/dashboars-topbar-carts/dashboard-topbar-lazy-cards";


const Dashboard = () => {
    return (
        <div className="lg:!p-8 py-6 w-full grid grid-cols-4 px-4 overflow-x-hidden gap-4">
            <div className="col-span-4 w-full">
                <DashboardTopBArCardsContainer />
            </div>
            <div className="col-span-4 w-full grid grid-cols-1 dxl:grid-cols-2 gap-4 ">
                <SalePerMonthChartsContainerLAzy />
            </div>
            <div className="col-span-4 w-full">
                <DashboardTopCellingProductsLAzy />
            </div>
            <div className="col-span-4 w-full grid grid-cols-5 gap-4">
                <div className="lg:col-span-3 col-span-5">
                    <WeeklyIncomeChartComponentLAzy />
                </div>
                <div className="lg:col-span-2 col-span-5 ">
                    <CityStatesChartComponentLAzy />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
