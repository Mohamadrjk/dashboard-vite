import style from "./init-loading.module.css";

const InitLoadingPage = () => {
  return (
    <div className="w-full h-dvh flex justify-center items-center bg-BG">
      <div className={style["loading9"]}>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
      </div>
    </div>
  );
};

export default InitLoadingPage;
