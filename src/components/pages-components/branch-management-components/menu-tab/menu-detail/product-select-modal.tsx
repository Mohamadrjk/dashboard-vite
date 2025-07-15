import { CloseCircleOutlined } from "@ant-design/icons";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Empty, Image, Modal, Tooltip } from "antd";
import clsx from "clsx";

import ProductDetailModal from "./product-detail-modal";
import { useNotify } from "@/components/shared-components/notife/notife";
import useProductSelection from "./hooks/useProductSelection";
import SelectionSkeleton from "./SelectionSkeleton";
import { IProductItem } from "@/types/ditgitalmenu-types/product";

interface IProductSelectModal {
  selectedCategory: number;
  open: boolean;
  onClose: () => void;
}
function ProductSelectModal({
  onClose,
  selectedCategory,
  open,
}: IProductSelectModal) {
  const {
    productOptions,
    selectedProducts,
    handleSelectProducts,
    openProductDetailModal,
    payloadData,
    setOpenProductDetailModal,
    setSelectedProducts,
    handleSubmit,
  } = useProductSelection(selectedCategory);
  const { notify } = useNotify();

  return (
    <Modal
      open={!!open}
      onClose={onClose}
      onCancel={() => onClose()}
      destroyOnClose
      title={
        <div className="w-full flex items-center justify-between relative">
          <span className="text-[18px] font-Regular">افزودن محصول</span>
          <CloseCircleOutlined
            className="!text-Alert !text-[20px]"
            role="button"
            onClick={() => {
              onClose();
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
          "lg:!w-1/2 font-Regular   max-w-full !px-5  !py-4  !bg-Highlighter  !h-full !mx-auto",
        footer: "!hidden",
      }}
      closeIcon={false}
      footer={false}
    >
      <div className="">
        <div className="  mb-4">
          <p className="font-bold text-sm">انتخاب محصولات</p>{" "}
          <span className=" text-Secondary text-xs">
            {" "}
            محصولات مورد نظر خود را از لیست زیر انتخاب نمایید
          </span>
        </div>
        <div className=" bg-Highlighter max-h-[40vh] overflow-auto  no-scrollbar text-center font-Regular gap-4  rounded-md grid lg:grid-cols-4 md:grid-cols-2  ">
          {productOptions ? productOptions.length > 0 ? (
            productOptions.map((item, index) => (
              <ProductSelectItem key={index} handleSelectProducts={handleSelectProducts} isSelected={selectedProducts.includes(item.product_id)} item={item} onChooseItem={() => {
                if (selectedProducts.includes(item.product_id)) {
                  setOpenProductDetailModal({
                    itemId: item.product_id,
                    state: true,
                  });
                  return;
                }
                notify("error", "ابتدا محصول را انتخاب نمایید");
              }} />
            ))
          ) : (<Empty className=" col-span-full" description={
            <span className=" font-Regular text-Secondary">
              محصولی انتخاب نشده است
            </span>
          } />) : (
            <SelectionSkeleton />
          )}
        </div>
      </div>
      <div className="col-span-2 flex justify-end gap-4 items-center mt-3">
        <button
          onClick={() => {
            handleSubmit();
            onClose();
          }}
          className="rounded-[6px]  border  border-Primary text-Primary px-4 py-2 "
        >
          ثبت محصول
        </button>
      </div>
      <ProductDetailModal
        onClose={() =>
          setOpenProductDetailModal({
            itemId: null,
            state: false,
          })
        }
        selectedCategory={selectedCategory}
        selectedProduct={openProductDetailModal.itemId}
        open={openProductDetailModal.state}
      />
    </Modal>
  );
}

export default ProductSelectModal;

const ProductSelectItem = ({ onChooseItem, item, isSelected, handleSelectProducts }: { onChooseItem: any, item: IProductItem, isSelected: boolean, handleSelectProducts: any }) => {
  return (<div

    className={clsx(
      " border relative  rounded-md cursor-pointer overflow-hidden grow"
    )}
  >
    <div
      onClick={onChooseItem}
      className=" z-10 absolute top-0 left-0  bg-white  transition-all duration-300 p-2 hover:shadow-md hover:opacity-100 opacity-50 active:scale-75"
    >
      <Tooltip title="جزییات محصول">
        <Icon
          icon="mage:edit"
          width="24"
          height="24"
          style={{ color: "var(--secondary)" }}
        />
      </Tooltip>
    </div>
    <Tooltip title="انتخاب محصول">
      <div
        className={clsx(
          "  absolute inset-0 w-full h-full z-0  transition-all duration-300 bg-transparent",
          isSelected &&
          "!bg-Secondary opacity-50"
        )}
        onClick={() => handleSelectProducts(item)}
      ></div>
    </Tooltip>

    <div className="aspect-[16/7]  w-full md:aspect-video  flex flex-col">
      <Image
        alt={item.product_id + item.name}
        src={item.image_url ? item.image_url : '/placeholder/Logo.png'}
        width={300}
        height={300}
        className={clsx(" w-full h-full   max-lg:aspect-video aspect-square  object-contain", item?.image_url && " !object-cover")}
      />
      <span className=" p-2 text-ellipsis overflow-hidden    whitespace-nowrap w-full ">
        {item.name}
      </span>
    </div>

  </div>)
}