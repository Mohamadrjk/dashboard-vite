import { useEffect } from "react";
import style from "./init-loading.module.css";

const RedirectLoadingPage = () => {
  // Disable scrolling when component mounts
  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Disable all buttons
  useEffect(() => {
    const buttons = document.getElementsByTagName("button");
    Array.from(buttons).forEach((button) => {
      button.disabled = true;
    });

    // Re-enable buttons when component unmounts
    return () => {
      Array.from(buttons).forEach((button) => {
        button.disabled = true;
      });
    };
  }, []);
  return (
    <div className="w-full z-[1000000000] fixed top-0 right-0 h-dvh flex flex-col gap-5 justify-center items-center bg-black/90 animate-fadeIn">
      <p className="w-full text-center text-2xl md:text-3xl lg:text-4xl font-medium text-Highlighter">
        در حال انتقال به صفحه ورود
      </p>
      <div className={style["loading9"]}>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
      </div>
    </div>
  );
};

export default RedirectLoadingPage;
