import { create } from 'zustand'
import config from "../config";
import axios from "axios";

const useServices = create((set) => ({
    services: [],
    serviceItem: null,
    isLoading: false,

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

    fetchServices: async (key = "00000000-0000-0000-0000-000000000000") => {
        set((state) => ({ services: [], isLoading: true }))
        try {
            const res = await Promise.all([axios.get(`${config.backServer}/api/services/${key}`), axios.get(`${config.backServer}/api/services/item/${key}`)])
            // const res = await axios.get(`${config.backServer}/api/services/${key}`)
            console.log(res)
            set((state) => {
                return {
                    services: res[0].data.value,
                    serviceItem: res[1].data.value[0],
                    isLoading: false
                }
            })
        } catch (error) {
            console.log(error)
        }
    },
    fetchServiceItem: async (key) => {
        set((state) => ({ serviceItem: null, isLoading: true }))
        try {
            const res = await axios.get(`${config.backServer}/api/services/item/${key}`)
            console.log(res)
            set((state) => {
                return {
                    serviceItem: res.data.value[0],
                    isLoading: false
                }
            })
        } catch (error) {
            console.log(error)
        }
    },

}));
export default useServices;