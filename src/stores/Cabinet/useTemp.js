import { create } from "zustand";
const useTemp = create((set) => ({
    unit: {},
    setUnit: (props) => {
        set((state) => {
            return {
                unit: { ...props }
            };
        })
    },
    currency: {},
    setCurrency: (props) => {
        set((state) => {
            return {
                currency: { ...props }
            };
        })
    },

}));
export default useTemp;
