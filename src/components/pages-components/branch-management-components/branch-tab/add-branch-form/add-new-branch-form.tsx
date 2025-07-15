import { Form } from "antd";
import { lazy, useMemo } from "react";
import { IBranchItem } from "@/types/ditgitalmenu-types/branch";
import { UseFormReturn } from "react-hook-form";
import { LoadingOutlined } from "@ant-design/icons";
import { LatLngExpression, LatLngLiteral } from "leaflet";
import { IFormFiledProps } from "./useAddNewBranch";
import OperationFileds from "./OperationTextFields";
import EditProductImageSelect from "../../product-tab/edit-product/ImageSelectComponent";
import ReusableFormField from "@/components/pages-components/club-managment-components/club-create-modals/club-crete-level/create-level-form-components/reusable-form-input";
import ReusableFormCheckBox from "@/components/pages-components/club-managment-components/club-create-modals/club-crete-level/create-level-form-components/reusable-form-checkbox";
const SelectAddressMap = lazy(() => import("../map-selection/map-selection"));
interface AddNewBranchFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  AddBranchForm: UseFormReturn<IBranchItem, any, undefined>;
  FormFiledItems: Partial<Record<keyof IBranchItem, IFormFiledProps>>;
  onSubmit: (data: IBranchItem) => void;
  loading: boolean;
}

function AddNewBranchForm({
  AddBranchForm,
  FormFiledItems,
  loading,
  onSubmit,
}: AddNewBranchFormProps) {
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = AddBranchForm;

  const watchFileds = watch(["latitude", "longitude"]);
  const watchImage = watch("image_url");
  const handleSelectLocationFromMap = async (e: LatLngLiteral) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${e.lat}&lon=${e.lng}&format=json`
      );
      if (response.ok) {
        const data = await response.json();
        const address = data.display_name || "";
        setValue("location", address);
        setValue("latitude", String(e.lat.toFixed(6)));
        setValue("longitude", String(e.lng.toFixed(6)));
        AddBranchForm.clearErrors("location");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };
  const mapValue = useMemo(() => {
    const numberValues =
      watchFileds.length && watchFileds.map((i) => Number(i));
    return watchFileds[0] && watchFileds[1]
      ? (numberValues as LatLngExpression)
      : ([36.297972, 59.606152] as LatLngExpression);
  }, [watchFileds]);
  return (
    <Form
      onFinish={handleSubmit(onSubmit)}
      className=" flex flex-col   !font-Regular"
    >
      <div className=" flex flex-col max-h-[70vh] overflow-auto  no-scrollbar">
        <div className=" pb-5 flex flex-col gap-1">
          <label className="">بارگزاری تصویر</label>
          {watchImage ? (
            <EditProductImageSelect
              image={watchImage}
              setImage={() => setValue("image_url", undefined)}
              isLoading={loading}
              className="h-[70px]"
            />
          ) : null
          // <DashboardImageUploader
          //   onImageConvert={(base64) => handleChangeImage(base64)}
          //   info={
          //     <span className="font-Regular">
          //       تصویر را اینجا کشیده و رها کنید
          //     </span>
          //   }
          //   maxHeight={500}
          //   maxWidth={500}
          //   hasSizeLimit={false}
          //   successMessage=" "
          //   showUploadedImage
          // />
          }
        </div>
        <div className=" grid grid-cols-2  gap-x-5 font-Regular">
          {Object.entries(FormFiledItems)
            .filter(
              (filed) => filed[0] != "location" && filed[0] != "operating_hours"
            )
            .map(([key, value], index) => (
              <div key={index} className="mb-1">
                <ReusableFormField
                  control={control}
                  placeholder=""
                  length={value.length}
                  requierd={value.isRequierd}
                  type={value.type}
                  errors={errors}
                  name={key as keyof IBranchItem}
                  label={value.name}
                  loading={loading}
                />
              </div>
            ))}
          <div className="mb-1 flex  items-center">
            <OperationFileds
              setValue={setValue}
              control={control}
              placeholder=""
              requierd={true}
              errors={errors}
              clearErrors={clearErrors}
              name={"operating_hours"}
              label={"ساعات کاری"}
              loading={loading}
            />
          </div>
        </div>
        <div className=" grid grid-cols-1 gap-5 font-Regular">
          {Object.entries(FormFiledItems)
            .filter((filed) => filed[0] == "location")
            .map(([key, value], index) => (
              <div key={index} className="mb-1">
                <ReusableFormField
                  control={control}
                  placeholder=""
                  requierd={value.isRequierd}
                  type={value.type}
                  errors={errors}
                  name={key as keyof IBranchItem}
                  label={value.name}
                  loading={loading}
                />
              </div>
            ))}
          <SelectAddressMap
            onChange={handleSelectLocationFromMap}
            location={mapValue}
          />
        </div>
      </div>
      {/* Submit Button */}
      <div className="col-span-2 flex justify-end gap-4 items-center mt-3">
        <ReusableFormCheckBox
          control={control}
          name="status"
          label="ثبت به صورت فعال"
          errors={errors}
          requierd={false}
        />
        <button
          type="submit"
          className="rounded-[6px]  border  border-Primary text-Primary px-4 py-2 "
          disabled={Object.keys(errors).length > 0 || loading}
        >
          ثبت شعبه
          {loading && <LoadingOutlined />}
        </button>
      </div>
    </Form>
  );
}

export default AddNewBranchForm;
