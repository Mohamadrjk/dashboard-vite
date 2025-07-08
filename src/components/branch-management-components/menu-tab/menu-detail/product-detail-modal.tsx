import PersianRangePicker from "@/components/shared/custome-range-picker";
import { DiscountType } from "@/types/ditgitalmenu-types/menu";
import { Input, Modal } from "antd";
import SelectDisocuntType from "./select-discount";
import clsx from "clsx";
import { CloseCircleOutlined } from "@ant-design/icons";
import useProductDetail from "./hooks/useProductDetail";

const ProductDetailModal = ({
  open,
  selectedProduct,
  onClose,
  selectedCategory
}: {
  open: boolean;
  onClose: () => void;
  selectedProduct: number;
  selectedCategory: number
}) => {
  const { discountType, discountValue, setValue, handleSubmit, setDiscountType } = useProductDetail(selectedProduct, selectedCategory)

  return (
    <Modal
      open={!!open}
      onClose={onClose}
      onCancel={() => onClose()}
      destroyOnClose
      title={
        <div className="w-full flex items-center justify-between relative">
          <span className="text-[18px] font-Regular">افزودن جزییات محصول </span>
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
          "!w-max font-Regular  max-w-full !px-5  !py-4  !bg-Highlighter  !h-full !mx-auto",
        footer: "!hidden",
      }}
      closeIcon={false}
      footer={false}
    >
      <div className=" flex flex-col gap-5">
        <div className="w-full justify-between flex gap-1 relative items-center">
          <label htmlFor="discountField">تخفیف</label>
          <div className="flex w-[294px] gap-1">
            <div className="border border-1 grow w-full flex gap-1 relative items-center rounded-md overflow-hidden">
              <SelectDisocuntType
                selectedType={discountType}
                setSelectedType={(value: DiscountType) => {
                  setDiscountType(value);
                }}
              />
            </div>
            <div>
              <Input
                id="discountField"
                type="number"
                value={discountValue}
                onChange={(e) => {
                  let value;
                  if (discountType == "amount") {
                    value = e.target.value;
                  } else {
                    if (+e.target.value > 100) return;
                    value = e.target.value;
                  }
                  setValue('discount_value', value);
                }}
                dir="rtl"
                placeholder={discountType === "percentage" ? "%" : "تومان"}
                className={clsx(
                  "!font-Medium  grow h-[36px] focus-within:!shadow-none placeholder:!text-gray-300 placeholder:!text-secondary !p-[6px]"
                )}
              />
            </div>
          </div>
        </div>
        {discountType == "time_based" && (
          <div
            className={clsx(
              " flex gap-1   transition-all duration-200 items-center"
            )}
          >
            <label htmlFor="discountField">بازه تخفیف</label>
            <PersianRangePicker setDate={(value) => {
              setValue('discount_start_date', value[0]);
              setValue('discount_end_date', value[1]);
            }} />
          </div>
        )}
      </div>
      <div className="col-span-2 flex justify-end gap-4 items-center mt-3">
        <button
          className="rounded-[6px]  border  border-Primary text-Primary px-4 py-2 "
          onClick={() => {
            handleSubmit();
            onClose()
          }}
        >
          ثبت جزییات محصول

        </button>
      </div>
    </Modal >
  );
};
export default ProductDetailModal;
