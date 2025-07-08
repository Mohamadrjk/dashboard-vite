import useBranchList from "@/hooks/branch-management-hooks/useBranchList";
import BranchTabItem from "./branch-tab-item";
import { RedoOutlined } from "@ant-design/icons";
import { Alert, Button, Empty } from "antd";
import BranchPageLoader from "./branch-page-loader";
import { lazy } from "react";
const AddNewBranchModalContainer = lazy(() => import("./add-branch-form/add-new-branch-modal-container"));

function BranchTabContent() {
  const {
    error,
    isLoading,
    refetch,
    paginatedList,
    setCurrentPage,
    pageSize,
    setPageSize,
    totalPage,
  } = useBranchList(false);

  if (isLoading) {
    return <BranchPageLoader />;
  }
  if (error) {
    return (
      <div className="font-Regular relative w-full aspect-[16/6]">
        <Alert
          message="خطا"
          description="در بارگذاری اطلاعات خطایی رخ داده است"
          type="error"
          className="!font-Medium"
          showIcon
        />
        <Button
          onClick={() => {
            refetch();
          }}
          className="absolute left-2 top-2"
          icon={<RedoOutlined />}
        />
      </div>
    );
  }
  return (
    <div className="  flex flex-col gap-5">
      <div className=" w-full justify-end flex">
        <AddNewBranchModalContainer realodMethod={refetch} />
      </div>
      <div className=" w-full  px-2">
        <div className=" w-full grid dxl:grid-cols-2 grid-cols-1   gap-5">

          {paginatedList.length > 0 ? paginatedList.map((item, index) => (
            <BranchTabItem key={index} item={item} refetch={refetch} />
          )) : (
            <Empty description={
              <span className=" font-Regular text-Secondary">
                داده ای وجود ندارد
              </span>
            } />
          )}
        </div>
      </div>
      {/* 🟢 Pagination */}
      {/* <CustomPagination
        pageSize={pageSize}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
        totalPage={totalPage}
      /> */}
    </div>
  );
}

export default BranchTabContent;
