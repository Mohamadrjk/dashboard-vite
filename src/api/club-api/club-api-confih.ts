import axios, { AxiosError, AxiosResponse } from "axios";
import Cookies from "universal-cookie";

export const clubApiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CLUB_MANAGEMENT, // Use environment variables for flexibility
  timeout: 25000, // Set a timeout to handle long requests
  headers: {
    "Content-Type": "application/json",
  },
});

export const ClubControllers = {
  ranking: "api/admin/ranking",
  survey: "api/admin/survey",
  config: "api/admin/config",
  banner: "api/admin/banner",
  customers: "api/admin/enduser",
  photogallery: "/api/admin/photogallery",
  Banner: "api/Banner",
  Setting: "api/Setting",
  Level: "api/Level",
  report: "api/admin/report",
  Ranking: "api/Ranking",
};

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];
let tokenExpirationTime = Date.now() + 13 * 60 * 1000; // Initial expiry time
const cookies = new Cookies();
const getToken = () => cookies.get("token");
const getRefreshToken = () => cookies.get("refreshToken");

const setAuthToken = (token: string, expiresInMinutes: number = 15) => {
  cookies.set("token", token, {
    expires: new Date(expiresInMinutes / (24 * 60)),
  });
  tokenExpirationTime = Date.now() + (expiresInMinutes - 2) * 60 * 1000;
};

const refreshToken = async () => {
  const refresh = getRefreshToken();
  if (!refresh) {
    console.error("No refresh token available");
    return null;
  }

  try {
    const response = await clubApiInstance.post(
      `/auth/api/token/refresh/`,
      { refresh },
      { headers: { skipAuth: true } } // Prevent attaching old token
    );

    const newToken = response.data.access;
    setAuthToken(newToken);

    refreshSubscribers.forEach((callback) => callback(newToken));
    refreshSubscribers = [];

    return newToken;
  } catch (error) {
    console.error("Token refresh failed:", error);
    cookies.remove("token");
    cookies.remove("refreshToken");
    window.location.href = "/login";
    return null;
  }
};

const subscribeTokenRefresh = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

clubApiInstance.interceptors.request.use(
  async (config) => {
    const now = Date.now();
    let token = getToken();
    // اگر درخواست از احراز هویت معاف است، نیازی به بررسی توکن نیست
    if (config.headers?.skipAuth) {
      delete config.headers.skipAuth;
      return config;
    }
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    if (tokenExpirationTime - now <= 120000 && !isRefreshing) {
      isRefreshing = true;
      const newToken = await refreshToken();
      isRefreshing = false;

      if (newToken) {
        token = newToken;
      }
    }

    if (isRefreshing) {
      return new Promise((resolve) => {
        subscribeTokenRefresh((newToken) => {
          config.headers["Authorization"] = `Bearer ${newToken}`;
          resolve(config);
        });
      });
    }

    return config;
  },
  (error) => Promise.reject(error)
);

clubApiInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  (error: AxiosError): Promise<AxiosError> => {
    if (error.response?.status === 401 && !isRefreshing) {
      console.error("Unauthorized! Redirecting...");
      if (typeof window !== "undefined") {
        localStorage.removeItem("expires-time");
        const currentUrl = encodeURIComponent(window.location.href);
        window.location.href = `/login?backUrl=${currentUrl}`;
      }
    }
    return Promise.reject(error);
  }
);
