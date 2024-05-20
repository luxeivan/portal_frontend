import { create } from 'zustand'
import config from "../config";
import axios from "axios";

const useServices = create((set) => ({
    services: [],
    serviceItem: null,
    
    // fetchServices: async (url, type) => {
    //     set((state) => ({ services: [] }))
    //     const res = await axios.get(`${config.apiServer}/api/${url}?populate[0]=icon&populate[1]=filters&pagination[pageSize]=100&sort=sort`)
    //     set((state) => {
    //         return {
    //             services: res.data.data
    //         }
    //     })
    // },
    // fetchServiceItem: async (url, id) => {
    //     set((state) => ({ serviceItem: null }))
    //     const res = await axios.get(`${config.apiServer}/api/${url}/${id}?populate[0]=fields&populate[1]=icon&populate[2]=fields.common&populate[3]=steps&populate[4]=filters`)
    //     set((state) => {
    //         return {
    //             serviceItem: res.data.data
    //         }
    //     })
    // },
     
    fetchServices: async (key='') => {
        set((state) => ({ services: [] }))
        const res = await axios.get(`${config.backServer}/api/services/${key}`)
        console.log(res)
        set((state) => {
            return {
                services: res.data.value
            }
        })
    },
    fetchServiceItem: async (key) => {
        set((state) => ({ serviceItem: null }))
        const res = await axios.get(`${config.backServer}/api/services/item/${key}`)
        console.log(res)
        set((state) => {
            return {
                serviceItem: res.data.value[0]
            }
        })
    },

}));
export default useServices;