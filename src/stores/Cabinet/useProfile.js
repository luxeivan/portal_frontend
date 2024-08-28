import { create } from "zustand";
import axios from "axios";
const backServer = process.env.REACT_APP_BACK_BACK_SERVER;

const useProfile = create((set, get) => ({
  profile: {},
  isLoadingProfile: false,
  fetchProfile: async () => {
    try {
      set({ isLoadingProfile: true });
      const token = localStorage.getItem("jwt");
      console.log("Токен для запроса профиля:", token); 
      const response = await axios.get(`${backServer}/api/cabinet/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Ответ API при получении профиля:", response.data); 
      if (response.data) {
        set({ profile: response.data, isLoadingProfile: false });
      } else {
        console.log("Данные профиля отсутствуют в ответе API.");
        set({ isLoadingProfile: false });
      }
    } catch (error) {
      console.error("Ошибка при получении профиля:", error);
      set({ isLoadingProfile: false });
    }
  },
}));

export default useProfile;

// import { create } from "zustand";
// import axios from "axios";
// const backServer = process.env.REACT_APP_BACK_BACK_SERVER
// const useProfile = create((set, get) => ({
//     profile: {},
//     isLoadingProfile: false,
//     fetchProfile: async (id) => {
//         try {
//             set({ isLoadingProfile: true });
//             const token = localStorage.getItem("jwt");
//             const response = await axios.get(
//                 `${backServer}/api/cabinet/profile`,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );
//             console.log("Консолька в useProfile",response.data);
//             set({ profile: response.data, isLoadingProfile: false });
//         } catch (error) {
//             console.log(error);
//         }
//     },

// }))

// export default useProfile;
