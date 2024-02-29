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
//         set(() => ({ phone, registrationStep: 1 }));
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

const useRegistration = create((set) => ({
  registrationStep: 0,
  phone: "",
  email: "",
  phoneCode: "",
  emailCode: "",
  password: "",

  setRegistrationStep: (step) => set(() => ({ registrationStep: step })),
  setPhone: (phone) => set(() => ({ phone })),
  setEmail: (email) => set(() => ({ email })),
  setPhoneCode: (phoneCode) => set(() => ({ phoneCode })),
  setEmailCode: (emailCode) => set(() => ({ emailCode })),
  setPassword: (password) => set(() => ({ password })),

  submitPhone: async (phone) => {
    try {
      const response = await axios.post(`${config.backServer}/api/registration/phone`, { phone });
      if (response.data.status === 'ok') {
        set({ phone, registrationStep: 1 }); 
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
      if (response.data.success) {
        set((state) => ({
          global: {
            ...state.global,
            registrationStep: 2,
          }
        }));
      } else {
        console.error("Неверный пин-код");
      }
    } catch (error) {
      console.error("Ошибка при подтверждении пин-кода", error);
    }
  },
}));

export default useRegistration;
