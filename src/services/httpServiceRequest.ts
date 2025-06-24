// src/lib/httpServiceRequest.ts
import axios, { AxiosRequestConfig } from 'axios';
import { BASE_URL } from '../constants/ApiConstant';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Optional: for cookies/sessions
});

// Optional: Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Example: attach token from localStorage
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global error here (e.g. 401 redirect to login)
    return Promise.reject(error);
  }
);

export const http = {
  get: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    axiosInstance.get(url, config).then((res) => res.data),

  post: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    axiosInstance.post(url, data, config).then((res) => res.data),

  put: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    axiosInstance.put(url, data, config).then((res) => res.data),

  patch: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    axiosInstance.patch(url, data, config).then((res) => res.data),

  delete: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    axiosInstance.delete(url, config).then((res) => res.data),
};
