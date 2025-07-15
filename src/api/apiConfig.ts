/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { store } from "@/redux/store";
import {
  deleteCookie,
  getCookie,
  setCookie,
} from "../utils/common-methods/coockieMethods";
import { triggerVisibility } from "@/redux/commonSlice/commonSlice";

// Create the Axios instance
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Use environment variables for flexibility
  timeout: 15000, // Set a timeout to handle long requests
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Ensure cookies are sent with requests
});

export const controlers = {
  SalesPerMonth: "/api/monthly-sales/",
  customer: "/customer",
  product: "/product",
  reportSale: "/report_sale",
  digitalMenu: "/digital-menu",
};

// 📌 Request Interceptor
axiosInstance.interceptors.request.use((config) => {
  const skipAuth = config?.headers?.skipAuth;

  if (!skipAuth) {
    const token = getCookie("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  delete config.headers.skipAuth;

  return config;
}, Promise.reject);

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

// 📌 Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isTokenExpired = error.response?.status === 401;
    const hasNotRetried = !originalRequest._retry;

    if (isTokenExpired && hasNotRetried) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(axiosInstance(originalRequest));
            },
            reject: (err: any) => reject(err),
          });
        });
      }

      isRefreshing = true;

      try {
        const refreshToken = getCookie("refreshToken");

        if (!refreshToken) throw new Error("No refresh token");

        const response = await axiosInstance.post(
          `/auth/api/token/refresh/`,
          { refresh: refreshToken },
          { headers: { skipAuth: true } } // برای جلوگیری از حلقه
        );

        const newAccessToken = response.data.access;
        const newRefreshToken = response.data.refresh;

        setCookie("refreshToken", newRefreshToken, 15);
        setCookie("token", newAccessToken, 20);

        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        isRefreshing = false;
        processQueue(err, null);

        deleteCookie("access");
        deleteCookie("refresh");
        const currentUrl = window.location.href;

        if (!currentUrl.includes("/login")) {
          store.dispatch(triggerVisibility(true));
          const encodedUrl = encodeURIComponent(currentUrl);
          window.location.href = `/login?backUrl=${encodedUrl}`;
        }
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use((config) => {
  const skipAuth = config?.headers?.skipAuth;

  if (!skipAuth) {
    const token = getCookie("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
}, Promise.reject);

export default axiosInstance;
