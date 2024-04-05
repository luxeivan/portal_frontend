import { create } from 'zustand'
import config from "../config";
import axios from "axios";

const useServices = create((set) => ({
    services: [],
    serviceItem: null,
    
    fetchServices: async (url, type) => {
        set((state) => ({ services: [] }))
        const res = await axios.get(`${config.apiServer}/api/${url}?filters[type][$eq]=${type}&populate[0]=icon&populate[3]=filters`)
        set((state) => {
            return {
                services: res.data.data
            }
        })
    },
    fetchServiceItem: async (url, id) => {
        set((state) => ({ serviceItem: null }))
        const res = await axios.get(`${config.apiServer}/api/${url}/${id}?populate[0]=fields&populate[1]=icon&populate[2]=fields.common&populate[3]=steps&populate[3]=filters`)
        set((state) => {
            return {
                serviceItem: res.data.data
            }
        })
    },

}));
export default useServices;