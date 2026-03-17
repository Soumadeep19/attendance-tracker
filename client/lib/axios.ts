import { getToken } from "@/services/tokenService";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BACKEND_SERVER_URL,
  withCredentials: true,
});

//add header
axiosInstance.interceptors.request.use(async (config) => {
  const publicRoutes = ["/auth/login", "/auth/register"];

  if (!publicRoutes.includes(config.url as string)) {
    const jwt = await getToken();

    if (jwt) {
      config.headers.Authorization = `Bearer ${jwt}`;
    }
  }
  return config;
});
