import { CloseCircleOutlined } from "@ant-design/icons";
import { Modal, Skeleton } from "antd";
import { Dispatch, SetStateAction, lazy } from "react";
import useAssignProductToMenu from "./useAssignProductToMenu";
import { IMenuItem } from "@/types/ditgitalmenu-types/menu";
import useCategoryList from "@/hooks/branch-management-hooks/useCategoryList";
import SelectionSkeleton from "./SelectionSkeleton";
const ContentLoading = () => (
  <div className="  flex flex-col gap-4">
    <Skeleton.Node active className=" !w-[200px] !h-[40px]" />
    <div className=" grid lg:grid-cols-4 grid-cols-2 gap-4">
      <SelectionSkeleton />
    </div>
    <div className=" flex  justify-end">
      <Skeleton.Node active className=" !w-[200px] !h-[40px]" />
    </div>
  </div>
);
const AssignProductToMenu = lazy(() => import("./assign-product-to-menu"));

interface MenuDetailModalProps {
  realodMethod?: () => void;
  selectedItem: IMenuItem;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

function MenuDetailModal({
  realodMethod,
  open,
  selectedItem,
  setOpen,
}: MenuDetailModalProps) {
  const {
    AssignForm,
    loading,
    onSubmit,
    MenuDetailData,
    MenuDetailDataLoading,
  } = useAssignProductToMenu(selectedItem?.menu_id);
  function handleCloseModal() {
    setOpen(false);
    AssignForm.reset();
  }
  const { categoryOption, CategoryList, isLoading, isRefetching } =
    useCategoryList(true);
  const loadingInitData =
    isLoading || isRefetching || MenuDetailDataLoading || loading;
  return (
    <>
      <Modal
        open={!!open}
        onClose={handleCloseModal}
        onCancel={() => handleCloseModal()}
        destroyOnClose
        title={
          <div className="w-full flex items-center justify-between relative">
            <span className="text-[18px] font-Regular">افزودن جزییات منو</span>
            <CloseCircleOutlined
              className="!text-Alert !text-[20px]"
              role="button"
              onClick={() => {
                handleCloseModal();
              }}
            />
          </div>
        }
        style={{
          direction: "rtl",
        }}
        classNames={{
          header:
            "w-full text-center font-Medium !bg-transparent !p-0 !pb-4 !m-0",
          content:
            "lg:!w-2/3  max-w-full !px-5  !py-4  !bg-Highlighter  !h-full !mx-auto",
          footer: "!hidden",
        }}
        closeIcon={false}
        footer={false}
      >
        {loadingInitData ? (
          <ContentLoading />
        ) : (
          <AssignProductToMenu
            AssignForm={AssignForm}
            loading={loadingInitData}
            initData={MenuDetailData}
            CategoryList={CategoryList}
            categoryOption={categoryOption}
            onSubmit={(data) =>
              onSubmit(
                {
                  menu_id: selectedItem.menu_id,
                  ...data,
                },
                () => {
                  realodMethod?.();
                  handleCloseModal();
                }
              )
            }
          />
        )}
      </Modal>
    </>
  );
}

export default MenuDetailModal;
