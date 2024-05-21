import { authKey } from "@/constants/authKey";
import { IGenericErrorResponse, ResponseSuccessType } from "@/types";
import { getFromLocalStorage } from "@/utils/local-storage";
import axios from "axios";

const instance = axios.create();

instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000
export { instance };


// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent

    const accessToken = getFromLocalStorage(authKey)

    if (accessToken) {
        config.headers.Authorization = accessToken;
    }

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
//@ts-ignore
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger

    const responseObject: ResponseSuccessType = {
        data: response?.data?.data,
        meta: response?.data?.meta
    }


    // Do something with response data
    return responseObject;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger

    const responseObject: IGenericErrorResponse = {
        statusCode: error?.response?.data?.statusCode || 500,
        message: error?.response?.data?.errorMessage || "Something went wrong",
        errorMessage: error?.response?.message,

    }
    return responseObject

    // Do something with response error
    // return Promise.reject(error);
});