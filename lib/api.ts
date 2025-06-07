import axios from "axios";
import config from "../config";
import { Cookies } from "react-cookie";

export const instance = axios.create({
  baseURL: config.API_HOST,
  timeout: 20000,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json; charset=utf-8",
  },
  validateStatus: () => true,
});

const cookies = new Cookies();

instance.interceptors.request.use(
  async (config) => {
    const token = cookies.get("accessToken");
    if (token) config.headers["Authorization"] = `Bearer ${token}`;

    return config;
  },
  (error) => Promise.reject(error)
);

export const fetcher = (url: string) => {
  return instance.get(url).then((res) => {
    const r = res.data;

    return r;
  });
};

export default instance;
