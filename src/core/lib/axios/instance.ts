import axios from "axios";

const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'cache-control': 'no-cache',
    Expires: 0
}

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers,
    timeout: 60 * 1000
})

// Handle request interceptor
instance.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error instanceof Error ? error : new Error(error.message || 'Request error'))
);

// Handle response interceptor
instance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error instanceof Error ? error : new Error(error.message || 'Response error'))
);

export default instance;
