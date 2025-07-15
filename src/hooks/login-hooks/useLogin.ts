/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useNotification } from "@/components/shared/message-provider/messageProvider";
import { useNotification } from "@/components/shared-components/message-provider/messageProvider";
import { triggerVisibility } from "@/redux/commonSlice/commonSlice";
import { onInitProfile } from "@/redux/profile/profileSlice";
import { login, LoginResponse } from "@/api/authinticationService";
import { setCookie } from "@/utils/common-methods/coockieMethods";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useMemo, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router";

// Define types
interface FormData {
  username?: string;
  password?: string;
}

interface LoginPayload {
  username: string;
  password: string;
}

// Separate mutation hook
const useValidateUser = () => {
  return useMutation<LoginResponse, AxiosError, LoginPayload>({
    mutationKey: ["loginValidation"],
    mutationFn: ({ username, password }) => login(username, password),
  });
};

const useLogin = () => {
  const { mutate: onValidateUser, isPending } = useValidateUser();
  const { showNotification } = useNotification();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const backUrl = useMemo(() => {
    return searchParams.get("backUrl");
  }, [searchParams]);
  useEffect(() => {
    navigate("/");
  }, []);
  // Handle successful login
  const handleLoginSuccess = (res: LoginResponse, username: string) => {
    setCookie("token", res.access, 20, "/");
    setCookie("refreshToken", res.refresh, 20, "/");
    dispatch(
      onInitProfile({
        refreshToken: res.refresh,
        token: res.access,
        userNAme: username,
      })
    );
    showNotification("success", "موفق", "ورود با موفقیت انجام شد", "top");
    // Handle navigation
    if (backUrl?.includes(window.origin)) {
      navigate(backUrl.split(window.origin)[1]);
    } else {
      navigate("/dashboard");
    }
  };

  // Handle login error
  const handleLoginError = (error: any) => {
    const errorMessage = error.response?.data?.detail;
    showNotification(
      "error",
      "خطا",
      errorMessage ?? "رمز عبور یا نام کاربری اشتباه است.",
      "top"
    );
  };

  const onSubmit = (formData: FormData) => {
    if (!formData.username || !formData.password) return;

    onValidateUser(
      {
        username: formData.username,
        password: formData.password,
      },
      {
        onSuccess: (data) => {
          if (data) {
            handleLoginSuccess(data, formData.username!);
          } else {
            handleLoginError({} as AxiosError);
          }
        },
        onError: handleLoginError,
      }
    );
  };
  const hasShownNotification = useRef(false);

  // Check for expired session
  useEffect(() => {
    // Use a ref to track if notification was shown
    if (backUrl?.includes(window.origin) && !hasShownNotification.current) {
      showNotification(
        "info",
        "اتمام نشست",
        "نشست قبلی شما به پایان رسید لطفا دوباره ورود کنید."
      );
      hasShownNotification.current = true;
      dispatch(triggerVisibility(false));
    }
  }, [backUrl]);

  return {
    navigate,
    backUrl,
    onSubmit,
    isPending,
  };
};

export default useLogin;
