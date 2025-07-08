/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "./apiConfig";
export interface LoginResponse {
  refresh: string; // Refresh token
  access: string; // Access token
}
interface ErrorResponse {
  detail?: string; // Assuming the API sends error details in this format
}
const login = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  const response = await axiosInstance.post(
    "/auth/api/token/", // Login API endpoint
    { username, password },
    {
      headers: {
        skipAuth: true, // Prevent attaching the token
      },
    }
  );
  return response.data;
};

const getRefreshToken = async (refresh: string) => {
  try {
    return await axiosInstance.post(
      `/auth/api/token/refresh/`,
      {
        refresh: refresh,
      },
      {
        headers: {
          skipAuth: true, // Prevent attaching the token
        },
      }
    );
  } catch (error: any) {
    // Extract error details if available
    const errorMessage =
      (error?.response?.data as ErrorResponse)?.detail || "Login failed";

    console.error("Login Error:", errorMessage);
    return null; // Returning null or handle as needed
  }
};

export { login, getRefreshToken };
