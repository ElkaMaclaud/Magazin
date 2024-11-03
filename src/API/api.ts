import axios, { InternalAxiosRequestConfig } from 'axios';
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL + "/api",
});


axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("access_token");
    if(token) {
      config.headers['Authorization'] = `Bearer ${token}`;  
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
}, (error) => {
    return Promise.reject(error);
});


type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

const sendRequest = async (
    url: string,
    method: HttpMethod = 'GET',
    body?: Record<string, any>,
    queryParams?: Record<string, any>
): Promise<any> => {
    try {
        NProgress.start();
        const response = await axiosInstance({
            method,
            url,
            data: body,
            params: queryParams,
        });
        NProgress.done();
        return response;
    } catch (error) {
        NProgress.done();
        throw error;
    }
};

export { sendRequest };