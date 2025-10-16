import axios from "axios";
import { API_URL } from "../config";

const axiosInstance = axios.create({
    baseURL: `${API_URL}/api/v1`,
    withCredentials: true,
});

export default axiosInstance;