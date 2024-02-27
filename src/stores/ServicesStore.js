import { create } from 'zustand'
import config from "../config";
import axios from "axios";

const useStore = create((set) => ({
    services: [],
    serviceItem: null,
    fetchServices: async (url, type) => {
        set((state) => ({ services: [] }))
        const res = await axios.get(`${config.apiServer}/api/${url}?filters[type][$eq]=${type}`)
        set((state) => {
            return {
                services: res.data.data
            }
        })
    },
    fetchServiceItem: async (url, id) => {
        set((state) => ({ serviceItem: null }))
        const res = await axios.get(`${config.apiServer}/api/${url}/${id}?populate[0]=fields`)
        set((state) => {
            return {
                serviceItem: res.data.data
            }
        })
    },

}));
export default useStore;