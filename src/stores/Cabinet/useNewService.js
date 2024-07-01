import { create } from 'zustand'
import axios from "axios";
const backServer = process.env.REACT_APP_BACK_BACK_SERVER
const useNewService = create((set) => ({
    claim: {},   
    fetchClaim: async (key) => {
        set((state) => ({ claim: null }))
        const res = await axios.get(`${backServer}/api/services/item/${key}`)
        set((state) => {
            console.log(res.data)
            return {
                claim: res.data
            }
        })
    },

}));
export default useNewService;