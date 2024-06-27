import { create } from 'zustand'
import config from "../../config";
import axios from "axios";

const useNewServicetest = create((set) => ({
    claim: {},   
    fetchClaim: async (key) => {
        set((state) => ({ claim: null }))
        const res = await axios.get(`${config.backServerTest}/api/servicestest/item/${key}`)
        set((state) => {
            // console.log(res.data)
            return {
                claim: res.data
            }
        })
    },

}));
export default useNewServicetest;