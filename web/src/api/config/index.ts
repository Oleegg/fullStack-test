import axios from "axios";

// import { errorHandler } from "../utils";

const getQueriesConfig = ({ url, options = {} }: { url: string | undefined; options?: any }) => {
    const clientQueryConfig = axios.create({
        baseURL: url,
        ...options,
        withCredentials: true
    });

    const serverQueryConfig = axios.create({
        baseURL: url,
        ...options
    });

    clientQueryConfig.interceptors.request.use(
        (config) => {
            config.headers.accept = "*/*";
            config.headers["Content-Type"] = "application/json";

            return { ...config };
        },
        (error) => {
            throw error;
        }
    );

    [clientQueryConfig, serverQueryConfig].forEach((axiosConfig) => {
        axiosConfig.interceptors.response.use(
            (response) => response,
            (error) => {
                // const errorConfig = errorHandler(error);

                throw error;
            }
        );
    });

    return { clientQueryConfig, serverQueryConfig };
};

export default getQueriesConfig;
