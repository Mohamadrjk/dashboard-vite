import { ICreateLevelPayload } from "@/types/club-types/club-levels-type";
import { Controller, useForm } from "react-hook-form";
import { Divider, Input, Button } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import LevelsBenefitsList from "./levels-benefits-list";

interface NewLevelBenefitsContainerProps {
  handleCancel: () => void;
  loading: boolean;
  handleAddLevel: (payload: string[]) => Promise<void>;
}

interface Benefit {
  id: string;
  description: string;
}

const NewLevelBenefitsContainer: React.FC<NewLevelBenefitsContainerProps> = ({
  handleAddLevel,
  handleCancel,
  loading,
}) => {
  const [benefits, setBenefits] = useState<Benefit[]>([
    { id: "1", description: "دريافت 25 درصد تخفيف روز تولد" },
    { id: "2", description: "دريافت 5 درصد اعتبار از هر فاکتور ..." },
    { id: "3", description: "دريافت 25 درصد تخفيف سالگرد ازدواج" },
  ]);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<{ description: string }>({ mode: "onBlur" });

  // ✅ Add Benefit Item
  const onAddBenefitsItem = ({ description }: { description: string }) => {
    setBenefits((prev) => {
      const nextId = String(prev.length + 1);
      return [{ id: nextId, description }, ...prev];
    });

    reset(); // ✅ Clear input field after adding
  };

  // ✅ Delete Benefit Item & Reorder IDs
  const onDeleteBenefitItem = (idToDelete: string) => {
    setBenefits((prev) =>
      prev
        .filter((item) => item.id !== idToDelete)
        .map((item, index) => ({ ...item, id: String(index + 1) }))
    );
  };

  return (
    <div className="w-full flex flex-col justify-between h-[500px] p-2">
      <div className="w-full flex flex-col gap-6 ">
        <h2 className="text-lg font-Medium">تعریف مزایا</h2>

        <div className="relative w-full flex flex-col gap-4 p-4 bg-Highlighter rounded-[6px]">
          {/* ✅ Form */}
          <form
            onSubmit={handleSubmit(onAddBenefitsItem)}
            className="w-full flex items-center gap-2"
          >
            <Controller
              name="description"
              control={control}
              rules={{ required: "شرح مزایا الزامی است" }}
              render={({ field }) => (
                <Input
                  {...field}
                  dir="rtl"
                  placeholder="شرح مزایا سطح را وارد کنید"
                  className="!font-Medium placeholder:text-gray-300 placeholder:text-secondary !py-[10px] pr-[6px]"
                />
              )}
            />
            <Button
              htmlType="submit"
              type="primary"
              icon={<PlusOutlined />}
              className="flex items-center justify-center"
            />
          </form>

          {errors.description && (
            <span className="text-red-500 text-xs font-Regular">
              {errors.description.message}
            </span>
          )}

          <Divider className="!m-0" />

          {/* ✅ Benefits List */}
          <LevelsBenefitsList
            benefits={benefits}
            onDeleteBenefitItem={onDeleteBenefitItem}
            setBenefits={setBenefits}
          />
        </div>
      </div>
      <div className="w-full flex justify-end gap-4 items-center mt-3">
        <button onClick={handleCancel} className="text-gray-900 !font-Medium">
          انصراف
        </button>
        <button
          onClick={() =>
            handleAddLevel(benefits.map((item) => item.description))
          }
          className="rounded-[6px] shadow bg-cta text-Highlighter font-Medium px-4 py-2 disabled:bg-gray-300"
        >
          ثبت سطح جدید
          {loading && <LoadingOutlined />}
        </button>
      </div>
    </div>
  );
};

export default NewLevelBenefitsContainer;
