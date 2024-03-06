import { create } from 'zustand'
import config from "../config";
import axios from "axios";

const useNewClaim = create((set) => ({
    claim: {},   
    fetchClaim: async (url, id) => {
        set((state) => ({ claim: null }))
        const res = await axios.get(`${config.apiServer}/api/${url}/${id}?populate[0]=fields&populate[1]=icon&populate[2]=fields.common&populate[3]=steps`)
        set((state) => {
            console.log(res.data.data)
            return {
                claim: res.data.data
            }
        })
    },

}));
export default useNewClaim;