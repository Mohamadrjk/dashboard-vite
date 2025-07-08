import { memo } from "react";

import LoginFormContainer from "./loginFormContainer";
import MemoizedLoginLogoSection from "./login-Logo-section";
import MemoizedParticlesBackground from "./login-background-tsparticles ";

const LoginContainer = () => {
  return (
    <div dir="rtl" className="w-dvw h-dvh relative bg-[#1F2027]">
      <MemoizedParticlesBackground />
      <div
        style={{ position: "absolute", zIndex: 1 }}
        className="w-full h-dvh flex justify-center items-center !bg-transparent top-0 right-0"
      >
        <div
          dir="rtl"
          className="w-full h-full flex items-center lg:justify-between rounded-md justify-center   overflow-hidden px-[10%]"
        >
          <MemoizedLoginLogoSection />
          <div className="lg:w-[30vw] max-lg:h-max h-full flex justify-center items-center p-8 backdrop-blur-sm border-x border-[#333333]">
            <LoginFormContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

const MemoizedLoginContainer = memo(LoginContainer);

export default MemoizedLoginContainer;
