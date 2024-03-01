// import { create } from "zustand";
// import axios from "axios";
// import config from "../config";

// const useRegistration = create((set) => ({
//   registrationStep: 0,
//   phone: "",
//   email: "",
//   phoneCode: "",
//   emailCode: "",
//   password: "",

//   setRegistrationStep: (step) => set(() => ({ registrationStep: step })),
//   setPhone: (phone) => set(() => ({ phone })),
//   setEmail: (email) => set(() => ({ email })),
//   setPhoneCode: (phoneCode) => set(() => ({ phoneCode })),
//   setEmailCode: (emailCode) => set(() => ({ emailCode })),
//   setPassword: (password) => set(() => ({ password })),

//   submitPhone: async (phone) => {
//     try {
//       const response = await axios.post(`${config.backServer}/api/registration/phone`, { phone });
//       if (response.data.status === 'ok') {
//         set({ phone, registrationStep: 1 }); 
//       } else {
//         console.error(response.data.message);
//       }
//     } catch (error) {
//       console.error("Ошибка при отправке номера телефона", error);
//     }
//   },
  

//   submitPhoneCode: async (phoneCode) => {
//     try {
//       const response = await axios.post(`${config.backServer}/api/registration/phonecode`, { phoneCode });
//       if (response.data.success) {
//         set((state) => ({
//           global: {
//             ...state.global,
//             registrationStep: 2,
//           }
//         }));
//       } else {
//         console.error("Неверный пин-код");
//       }
//     } catch (error) {
//       console.error("Ошибка при подтверждении пин-кода", error);
//     }
//   },
// }));

// export default useRegistration;

import { create } from "zustand";
import axios from "axios";
import config from "../config";

const useRegistration = create((set, get) => ({
  registrationStep: 0,
  phone: "",
  email: "",
  phoneCode: "",
  emailCode: "",
  password: "",
  phoneVerified: false,
  timer: null,

  setRegistrationStep: (step) => set(() => ({ registrationStep: step })),
  setPhone: (phone) => set(() => ({ phone })),
  setEmail: (email) => set(() => ({ email })),
  setPhoneCode: (phoneCode) => set(() => ({ phoneCode })),
  setEmailCode: (emailCode) => set(() => ({ emailCode })),
  setPassword: (password) => set(() => ({ password })),
  setPhoneVerified: (verified) => set(() => ({ phoneVerified: verified })),
  setTimer: (timer) => set(() => ({ timer })),


  submitPhone: async (phone) => {
    try {
      const response = await axios.post(`${config.backServer}/api/registration/phone`, { phone });
      if (response.data.status === 'ok') {
        set({ phone, registrationStep: 1 }); // тут мы устанавливаем registrationStep в 1, чтобы перейти к следующему шагу
        const timer = setTimeout(() => get().setPhoneVerified(false), 60000); // 60 секунд
        get().setTimer(timer);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Ошибка при отправке номера телефона", error);
    }
  },

  submitPhoneCode: async (phoneCode) => {
    try {
      const response = await axios.post(`${config.backServer}/api/registration/phonecode`, { phoneCode });
      if (response.data.status === 'ok') {
        // Сброс таймера обратного отсчета
        clearTimeout(get().timer);
        get().setTimer(null);
        get().setPhoneVerified(false); // Устанавливаем phoneVerified в false после успешного ввода кода
        set(() => ({ registrationStep: 2 })); // Переход на следующий шаг
      } else {
        console.error("Неверный пин-код");
      }
    } catch (error) {
      console.error("Ошибка при подтверждении пин-кода", error);
    }
  },
  // ... (другие методы)
}));

export default useRegistration;

