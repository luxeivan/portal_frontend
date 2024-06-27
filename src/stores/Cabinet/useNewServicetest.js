import { create } from 'zustand'
import config from "../../config";
import axios from "axios";

const useNewServicetest = create((set) => ({
    claim: {},
    fetchClaim: async (key) => {
        set((state) => ({ claim: null }))
        const res = await axios.get(`${config.backServerTest}/api/servicestest/item/${key}`)
        if (res.data) {
            res.data.fields = res.data.fields.map((item, index) => {
                if(item.in1C && item.name == '') item.name = item.in1C.Description + '_' + index 
                return item
            })
            // console.log(data)
            set((state) => {
                // console.log(res.data)
                return {
                    claim: res.data
                }
            })
        }
    },

}));
export default useNewServicetest;