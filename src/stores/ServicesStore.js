import axios from "axios";
import create from "zustand";
import config from "../config";

const useStore = create((set) => ({
    services: [],
    fetchServices: async (url, type) => {
        set((state) => ({ services: [] }))
        const res = await axios.get(`${config.apiServer}/api/${url}?filters[type][$eq]=${type}`)
        //console.log(res.data.data)
        set((state) => {
            //console.log('changeAuth',state.global)
            return {
                services: res.data.data
            }
        })
    },

}));
export default useStore;