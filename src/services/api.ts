import { URL_API } from "./../config/index";
import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: URL_API
}) as AxiosInstance;

export default axiosInstance;
