import ReusableFormField from "@/components/club-managment-components/club-create-modals/club-crete-level/create-level-form-components/reusable-form-input";
import ReusableFormCheckBox from "@/components/club-managment-components/club-create-modals/club-crete-level/create-level-form-components/reusable-form-checkbox";
import ReusableFormFieldTextArea from "@/components/club-managment-components/club-create-modals/club-crete-level/create-level-form-components/reusable-form-textArea";
import SelectDropdown from "@/components/branch-management-components/branch-tab/selectDropDown";
import { CompanyGenenralConfig } from "../useMenuSettings";
import { useState } from "react";

const GeneralPanel = ({
  control,
  generalConfigs,
  setValue,
}: {
  control: any;
  generalConfigs: CompanyGenenralConfig;
  setValue: any;
  modeValue: any;
}) => {
  const positionList = [
    { key: 1, label: "صفحه اصلی", value: "home" },
    { key: 2, label: "صفحه سبد خرید", value: "cart" },
    { key: 3, label: "صفحه جزییات محصول", value: "product" },
  ];
  const [selectedItem, setSelectedItem] = useState({
    key: positionList.find((i) => i.value == generalConfigs.wellcomeTextPos)
      ?.key,
    label: generalConfigs.wellcomeTextPos,
  });
  const handleSelectPosition = (e) => {
    if (+e.key !== 0) {
      setValue(
        "generalConfigs.wellcomeTextPos",
        positionList.find((i) => i.key == e.key)?.value
      );
      setSelectedItem({ key: e.key, label: e.label });
    }
  };
  return (
    <div className=" flex flex-col gap-3">
      <ReusableFormCheckBox
        control={control}
        requierd={false}
        name="generalConfigs.hasVat"
        label="مالیات بر ارزش افزوده"
      />
      <ReusableFormField
        className="!m-0"
        name="generalConfigs.vat"
        disabled={!generalConfigs.hasVat}
        control={control}
        requierd={false}
      />
      <div className=" flex items-center gap-2">
        <ReusableFormCheckBox
          control={control}
          requierd={false}
          name="generalConfigs.hasWellcomeText"
          label="متن خوش آمد گویی"
          labelClassName="!mb-0"
        />
        <div className=" w-max">
          <SelectDropdown
            onMenuClick={handleSelectPosition}
            options={positionList}
            label="انتخاب محل نمایش"
            disabled={!generalConfigs.hasWellcomeText}
            selectedItem={selectedItem}
          />
        </div>
      </div>
      <ReusableFormFieldTextArea
        className="!m-0"
        name="generalConfigs.wellcomeText"
        disabled={!generalConfigs.hasWellcomeText}
        control={control}
        requierd={false}
      />
    </div>
  );
};

export default GeneralPanel;
