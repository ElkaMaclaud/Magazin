import axios, { InternalAxiosRequestConfig } from 'axios';
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const primaryAxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL_WITH_WS_SUPPORT + "/api",
});

const fallbackAxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL + "/api",
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

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

let initialRequestMade = false;

const sendRequest = async (
    url: string,
    method: HttpMethod = 'GET',
    body?: Record<string, any>,
    queryParams?: Record<string, any>
): Promise<any> => {
    let response;
    let attempt = 0;

    if (!initialRequestMade) {
        while (attempt < 2) {
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
                attempt++;
                if (attempt === 2) {
                    initialRequestMade = true
                }
            }
        }
    }

    let attemptsToBackupAddress = 0;
    while (attemptsToBackupAddress < 2) {
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
            attemptsToBackupAddress++;
            if(attemptsToBackupAddress === 2) {
                throw error;
            }
        }
    }
};

export { sendRequest };




// import axios, { InternalAxiosRequestConfig } from 'axios';
// import NProgress from "nprogress";
// import "nprogress/nprogress.css";

// const axiosInstance = axios.create({
//     baseURL: process.env.REACT_APP_API_URL + "/api",
// });

// //REACT_APP_API_URL_WITH_WS_SUPPORT

// axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
//     const token = localStorage.getItem("access_token");
//     if(token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     config.headers['Content-Type'] = 'application/json';
//     return config;
// }, (error) => {
//     return Promise.reject(error);
// });


// type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// const sendRequest = async (
//     url: string,
//     method: HttpMethod = 'GET',
//     body?: Record<string, any>,
//     queryParams?: Record<string, any>
// ): Promise<any> => {
//     try {
//         NProgress.start();
//         const response = await axiosInstance({
//             method,
//             url,
//             data: body,
//             params: queryParams,
//         });
//         NProgress.done();
//         return response;
//     } catch (error) {
//         NProgress.done();
//         throw error;
//     }
// };

// export { sendRequest };