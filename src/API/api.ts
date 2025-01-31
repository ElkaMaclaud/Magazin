import axios, { InternalAxiosRequestConfig } from 'axios';
import NProgress from "nprogress";
import "nprogress/nprogress.css";


const primaryAxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL + "/api"
});

//Данный резервный сервер очень медленный(сначала требуется его разогнать немного) - НУЖЕН только для поддержки вебсокетов!
const fallbackAxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL_WITH_WS_SUPPORT + "/api"
});

primaryAxiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("access_token");
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
}, (error) => {
    return Promise.reject(error);
});

fallbackAxiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("access_token");
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
}, (error) => {
    return Promise.reject(error);
});

type HttpMethod = 'HEAD' | 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

let initialRequestMade = false;

const sendRequest = async (
    url: string,
    method: HttpMethod = 'GET',
    body?: Record<string, any>,
    queryParams?: Record<string, any>
): Promise<any> => {
    let response;

    if (!initialRequestMade) {
        let attempt = 0;
        while (attempt < 3) {
            try {
                NProgress.start();
                response = await primaryAxiosInstance({
                    method,
                    url,
                    data: body,
                    params: queryParams,
                });
                NProgress.done();
                return response;
            } catch (error) {
                NProgress.done();
                if (axios.isAxiosError(error) && error.response?.status === 403) {
                    throw error;
                }
                attempt++;
                if (attempt === 2) {
                    initialRequestMade = true
                }
            }
        }
    }

    let attempt = 0;
    while (attempt < 2) {
        try {
            NProgress.start();
            response = await fallbackAxiosInstance({
                method,
                url,
                data: body,
                params: queryParams,
            });
            NProgress.done();
            return response;
        } catch (error) {
            NProgress.done();
            if (axios.isAxiosError(error) && error.response?.status === 403) {
                throw error;
            }
            attempt++;
            if(attempt === 2) {
                throw error;
            }
        }
    }
};

export { sendRequest };