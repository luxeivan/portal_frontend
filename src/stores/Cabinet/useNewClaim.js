import { create } from 'zustand'
import axios from "axios";
const backServer = process.env.REACT_APP_BACK_BACK_SERVER
const useNewClaim = create((set) => ({
    claim: {},
    newClaim: {},
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
    createClaim: async (data) => {

        const res = await axios.post(`${backServer}/api/cabinet/claims`, {
            ...data
        },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
                withCredentials: true,
            })
        set((state) => {
            console.log(res.data)
            return {
                newClaim: res.data
            }
        })
    },

}));
export default useNewClaim;