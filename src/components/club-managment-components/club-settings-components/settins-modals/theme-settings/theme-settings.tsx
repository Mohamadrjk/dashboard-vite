
import useClubThemeSetting from "./useClubThmem";
import ThemePanlesContainer from "./theme-setting-components/theme-panels";
import { Alert, Button, Form, Skeleton } from "antd";
import { RedoOutlined } from "@ant-design/icons";

interface ClubThemeSettingsProps {
    handleOk: () => void;
    handleCancel: () => void;
}
const ClubThemeSettings: React.FC<ClubThemeSettingsProps> = ({
    handleCancel,
    handleOk
}) => {

    const { onSubmit, ThemeForm, loading, error, refetch, initLaoding } = useClubThemeSetting(handleOk);
    const { handleSubmit } = ThemeForm;

    if (initLaoding) {
        return <div className="w-full flex flex-col gap-1 aspect-[16/6]">
            <Skeleton.Node active className="!w-full !h-[50px]" />
            <Skeleton.Node active className="!w-full !h-[50vh]" />
        </div>
    }
    return (
        <div
            dir="rtl"
            className="w-full h-full animate-fadeIn flex flex-col gap-10 mt-5"
        >

            <Form
                id="company-theme-form"
                onFinish={handleSubmit(onSubmit)}
            >
                {error ? <div className="!font-Regular relative w-full aspect-[16/6]">
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
                </div> : <ThemePanlesContainer form={ThemeForm} fromLoading={loading} />}


                <div className="w-full pt-4 flex justify-end gap-4 items-center">
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            handleCancel()
                        }}
                        type="button"
                        className="text-gray-900 !text-lg !font-Medium"
                    >
                        انصراف
                    </button>
                    <Button
                        type="primary"
                        disabled={!!error || loading}
                        htmlType="submit"
                        className="rounded-[6px] h-0 text-nowrap !px-6 !py-4 !bg-cta !opacity-70 !text-Highlighter !font-Medium !text-lg"
                    >
                        ثبت تغییرات
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default ClubThemeSettings;
