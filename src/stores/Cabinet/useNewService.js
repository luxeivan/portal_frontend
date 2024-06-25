import { create } from 'zustand'
import config from "../../config";
import axios from "axios";

const useNewService = create((set) => ({
    claim: {},   
    fetchClaim: async (key) => {
        set((state) => ({ claim: null }))
        const res = await axios.get(`${config.backServer}/api/services/item/${key}`)
        set((state) => {
            console.log(res.data[0])
            return {
                claim: res.data[0]
            }
        })
    },

}));
export default useNewService;