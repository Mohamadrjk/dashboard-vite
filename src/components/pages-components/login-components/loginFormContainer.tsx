import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import useLogin from "@/hooks/login-hooks/useLogin";
// Define form validation schema using Yup
const schema = yup.object().shape({
  username: yup.string().required("نام کاربری اجباری است"),
  password: yup
    .string()
    .required("رمز عبور اجباری است")
    .min(4, "رمز عبور باید حداقل 4 کاراکتر باشد"),
});
type FormData = {
  username: string; // optional to match Yup schema
  password: string;
};

const LoginFormContainer = () => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const { onSubmit, isPending } = useLogin();
  // React Hook Form setup with validation
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  return (
    <>
      <form
        dir="rtl"
        onSubmit={handleSubmit(onSubmit)}
        className="w-full mx-auto p-3  lg:p-6 font-medium  h-max"
      >
        <h2 className="lg:text-2xl text-lg font-bold mb-2 text-center text-gray-200">
          ورود مدیر به کسب و کار
        </h2>
        <p className="lg:text-base text-xs font-regular mb-6 w-full text-center text-gray-200 mt-5 lg:mt-[100px] ">
          لطفاً اطلاعات کاربری خود را برای ورود وارد کنید
        </p>

        {/* Username Input */}
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-200"
          >
            نام کاربری
          </label>
          <input
            id="username"
            type="text"
            {...register("username")}
            className="mt-1 block w-full bg-gray-100 text-gray-900 border-[#333333]  border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#333333]"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-100"
          >
            رمز عبور
          </label>
          <div className="w-full relative">
            <input
              id="password"
              type={showPass ? "text" : "password"}
              {...register("password")}
              className="mt-1 bg-gray-100 text-gray-900 border-[#333333]  block w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#333333]"
            />
            <span
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowPass(!showPass);
              }}
              className="absolute left-2 top-0 bottom-0 my-auto w-max h-max"
            >
              {showPass ? (
                <EyeOutlined className="!text-gray-900" />
              ) : (
                <EyeInvisibleOutlined className="!text-gray-900" />
              )}
            </span>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending || !isValid}
          className={`w-full  py-2 px-4 rounded-md text-gray-100 text-lg font-medium disabled:opacity-70 ${isPending
            ? "bg-[#1677FF] opacity-70 cursor-not-allowed"
            : "bg-[#1677FF] hover:bg-blue-700 hover:text-gray-100 transition-all"
            }`}
        >
          <span>ورود</span>
          {isPending && <LoadingOutlined />}
        </button>
      </form>
    </>
  );
};

export default LoginFormContainer;
