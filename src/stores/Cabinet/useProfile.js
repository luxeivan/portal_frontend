import { create } from "zustand";
import axios from "axios";
const backServer = process.env.REACT_APP_BACK_BACK_SERVER
const useProfile = create((set, get) => ({
    profile: {},
    isLoadingProfile: false,
    fetchProfile: async (id) => {
        try {
            set({ isLoadingProfile: true });
            const token = localStorage.getItem("jwt");
            const response = await axios.get(
                `${backServer}/api/cabinet/profile`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            //console.log(response.data);
            set({ profile: response.data, isLoadingProfile: false });
        } catch (error) {
            console.log(error);
        }
    },

}))

export default useProfile;