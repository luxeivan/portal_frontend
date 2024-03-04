// import { create } from "zustand";
// import axios from "axios";
// import config from "../config";

// const useRegistration = create((set, get) => ({
//   registrationStep: 0,
//   phone: "",
//   email: "",
//   phoneCode: "",
//   emailCode: "",
//   password: "",
//   phoneVerified: false,
//   timer: null,

//   setRegistrationStep: (step) => set(() => ({ registrationStep: step })),
//   setPhone: (phone) => set(() => ({ phone })),
//   setEmail: (email) => set(() => ({ email })),
//   setPhoneCode: (phoneCode) => set(() => ({ phoneCode })),
//   setEmailCode: (emailCode) => set(() => ({ emailCode })),
//   setPassword: (password) => set(() => ({ password })),
//   setPhoneVerified: (verified) => set(() => ({ phoneVerified: verified })),
//   setTimer: (timer) => set(() => ({ timer })),

//   submitPhone: async (phone) => {
//     try {
//       const response = await axios.post(
//         `${config.backServer}/api/registration/phone`,
//         { phone }
//       );
//       if (response.data.status === "ok") {
//         set(() => ({
//           phone,
//           phoneSubmitted: true,
//         }));
//       } else {
//         console.error(response.data.message);
//       }
//     } catch (error) {
//       console.error("Ошибка при отправке номера телефона", error);
//     }
//   },

//   submitPhoneCode: async (phoneCode) => {
//     try {
//       const response = await axios.post(
//         `${config.backServer}/api/registration/phonecode`,
//         { phoneCode }
//       );
//       if (response.data.status === "ok") {
//         clearTimeout(get().timer);
//         get().setTimer(null);
//         get().setPhoneVerified(false);
//         set(() => ({ registrationStep: 2 }));
//       } else {
//         console.error("Неверный пин-код");
//       }
//     } catch (error) {
//       console.error("Ошибка при подтверждении пин-кода", error);
//     }
//   },
// }));

// export default useRegistration;

//Рабочий вариант 2
// import { create } from "zustand";
// import axios from "axios";
// import config from "../config";

// const useRegistration = create((set, get) => ({
//   registrationStep: 0,
//   phone: "",
//   email: "",
//   phoneCode: "",
//   emailCode: "",
//   password: "",
//   phoneVerified: false,
//   timer: null,
//   codeRequested: false, 

//   setRegistrationStep: (step) => set(() => ({ registrationStep: step })),
//   setPhone: (phone) => set(() => ({ phone })),
//   setEmail: (email) => set(() => ({ email })),
//   setPhoneCode: (phoneCode) => set(() => ({ phoneCode })),
//   setEmailCode: (emailCode) => set(() => ({ emailCode })),
//   setPassword: (password) => set(() => ({ password })),
//   setPhoneVerified: (verified) => set(() => ({ phoneVerified: verified })),
//   setTimer: (timer) => set(() => ({ timer })),

//   submitPhone: async (phone) => {
//     try {
//       const response = await axios.post(
//         `${config.backServer}/api/registration/phone`,
//         { phone }
//       );
//       if (response.data.status === "ok") {
//         set(() => ({
//           phone,
//           phoneSubmitted: true,
//           codeRequested: true,
//         }));
//       } else {
//         console.error(response.data.message);
//       }
//     } catch (error) {
//       console.error("Ошибка при отправке номера телефона", error);
//     }
//   },

//   submitPhoneCode: async (phoneCode) => {
//     try {
//       const response = await axios.post(
//         `${config.backServer}/api/registration/phonecode`,
//         { phoneCode }
//       );
//       if (response.data.status === "ok") {
//         clearTimeout(get().timer);
//         get().setTimer(null);
//         get().setPhoneVerified(false);
//         set(() => ({ registrationStep: 2 }));
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
  codeRequested: false, 

  setRegistrationStep: (step) => set(() => ({ registrationStep: step })),
  setPhone: (phone) => set(() => ({ phone })),
  setEmail: (email) => set(() => ({ email })),
  setPhoneCode: (phoneCode) => set(() => ({ phoneCode })),
  setEmailCode: (emailCode) => set(() => ({ emailCode })),
  setPassword: (password) => set(() => ({ password })),
  setPhoneVerified: (verified) => set(() => ({ phoneVerified: verified })),

  submitPhone: async (phone) => {
    try {
      const response = await axios.post(
        `${config.backServer}/api/registration/phone`,
        { phone }
      );
      if (response.data.status === "ok") {
        set(() => ({
          phone,
          phoneSubmitted: true,
          codeRequested: true,
        }));
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Ошибка при отправке номера телефона", error);
    }
  },

  submitPhoneCode: async (phoneCode) => {
    try {
      const response = await axios.post(
        `${config.backServer}/api/registration/phonecode`,
        { phoneCode }
      );
      if (response.data.status === "ok") {
        get().setPhoneVerified(true);
        set(() => ({ registrationStep: 2 }));
      } else {
        console.error("Неверный пин-код");
      }      
    } catch (error) {
      console.error("Ошибка при подтверждении пин-кода", error);
    }
  },
}));

export default useRegistration;
