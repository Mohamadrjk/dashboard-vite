import { LoadingOutlined } from "@ant-design/icons";

const AppLoading = () => {
  return (
    <div className="w-full h-full bg-BG flex flex-col items-center justify-center gap-4 ">
      <div className="w-full h-max flex flex-col gap-4 items-center ">
        <LoadingOutlined color="blue" className="text-6xl" width={"4rem"} />
      </div>
    </div>
  );
};

export default AppLoading;
