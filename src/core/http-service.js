import axios from "axios";

const BASE_URL = 'https://react-mini-projects-api.classbon.com';

export const httpService = axios.create({
    baseURL : BASE_URL,
})

export const httpInterceptedServices = axios.create({
    baseURL :BASE_URL
})

httpInterceptedServices.interceptors.request.use(
    async (config) => {
        const token  = localStorage.getItem('token');
        if(token){
            config.headers = {
                authorization : `Bearer ${token}`
            }
        }
        return config;
    },

    (error) => Promise.reject(error)
)