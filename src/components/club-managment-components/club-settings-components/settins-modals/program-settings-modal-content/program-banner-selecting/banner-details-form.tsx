import DashboardImageUploader from "@/components/shared/image-uploader";
import { Icon } from "@iconify/react";
import { Button, Image, Input, Skeleton, Tag } from "antd";
import clsx from "clsx";
import { numberToFarsiText } from "@/utils/common-methods/number-to-price";
import useUpdateClubBanners from "@/hooks/club-settings-hooks/useUpdateClubBanners";
import { IBannerList } from "./banner-selecting-container";

interface BannerDetailFormProps {
  onDeleteBanner: (id: number) => void;
  banner: IBannerList;
  className: string;
}

const BannerDetailForm: React.FC<BannerDetailFormProps> = ({
  onDeleteBanner,
  banner,
  className,
}) => {
  const {
    image,
    setImage,
    handleImageChange,
    banner: defaultBanner,
    setBanner,
    handleUpdateBanner,
    handleDeleteBanner,
    handleAddBanner,
    isUpdating,
    isDeleting,
    isAdding,
  } = useUpdateClubBanners(banner);

  const isProcessing = isUpdating || isDeleting || isAdding;
  const handleSave = () => {
    const payload = {
      id: defaultBanner.id,
      linkUrl: defaultBanner.linkUrl,
      mobileImageUrl: defaultBanner.mobileImageUrl,
      siteImageUrl: defaultBanner.siteImageUrl,
      title: defaultBanner.title,
    };

    if (defaultBanner.isNew) {
      handleAddBanner({
        LinkUrl: payload.linkUrl,
        MobileImageFile: payload.mobileImageUrl,
        SiteImageFile: payload.siteImageUrl,
        Title: payload.title,
      });
    } else {
      handleUpdateBanner(payload);
    }
  };

  return (
    <div
      className={clsx(
        "w-full relative flex flex-col gap-2 justify-between transition-all border border-gray-300 overflow-hidden text-cta rounded-[10px] p-3 hover:border-cta scale-x-0 opacity-0",
        className
      )}
    >
      <Tag className="w-max !font-Medium" bordered={false} color="processing">
        بنر {numberToFarsiText[defaultBanner.id]}
      </Tag>

      <label className="text-base">
        عنوان
        <Input
          disabled={isProcessing}
          value={defaultBanner.title}
          className="!font-Regular"
          onChange={(e) =>
            setBanner((prev) => ({ ...prev, title: e.target.value }))
          }
        />
      </label>

      {image ? (
        <div className="relative w-full aspect-[16/4] overflow-hidden border border-dashed border-gray-300 rounded-[10px] p-1">
          <span className="absolute top-4 right-4 text-gray-200">
            {image.uploadedFile?.name}
          </span>
          <Image
            width="100%"
            height="100%"
            src={image.uploadedImage}
            alt={image.uploadedFile?.name || ""}
            className="!object-contain w-full !h-full"
            placeholder={
              <Skeleton.Image
                active
                className="w-full object-contain"
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  inset: 0,
                }}
              />
            }
          />
          <button
            onClick={() => setImage(undefined)}
            disabled={isProcessing}
            className="absolute top-4 left-4 p-1 transition-all rounded hover:bg-[rgb(58,95,151,0.1)] active:scale-90"
          >
            <Icon
              icon="lets-icons:trash-light"
              width="28"
              height="28"
              style={{ color: "var(--Alert)" }}
            />
          </button>
        </div>
      ) : (
        <DashboardImageUploader
          onImageConvert={(base64, baseBlob, file) =>
            handleImageChange(base64, baseBlob, file)
          }
          maxHeight={712}
          maxWidth={1924}
          className="bg-Highlighter"
        />
      )}

      <label className="text-base">
        لطفا تعیین کنید کاربر با کلیک روی بنر به کدام آدرس ارجاع داده شود:
        <Input
          dir="ltr"
          disabled={isProcessing}
          value={defaultBanner.linkUrl}
          className="!font-Regular"
          onChange={(e) =>
            setBanner((prev) => ({ ...prev, linkUrl: e.target.value }))
          }
        />
      </label>

      <div className="absolute top-3 left-3 flex items-center gap-2">
        <Button
          onClick={handleSave}
          type="primary"
          className="!font-Medium"
          disabled={isProcessing}
          loading={isUpdating || isAdding}
        >
          {defaultBanner.isNew ? "ثبت بنر" : "ثبت تغییرات"}
        </Button>
        <Button
          disabled={isProcessing}
          onClick={() =>
            defaultBanner.isNew
              ? onDeleteBanner(defaultBanner.id)
              : handleDeleteBanner(defaultBanner.id, onDeleteBanner)
          }
          className="!p-1 !w-max transition-all rounded hover:bg-[rgb(58,95,151,0.1)] active:scale-90"
          color="danger"
          variant="text"
          loading={isDeleting}
        >
          <Icon
            icon="lets-icons:trash-light"
            width="28"
            height="28"
            style={{ color: "var(--Alert)" }}
          />
        </Button>
      </div>
    </div>
  );
};

export default BannerDetailForm;
