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
//   codeRequested: false,
//   emailVerified: false,
//   codeRequestedEmail: false, 

//   setRegistrationStep: (step) => set(() => ({ registrationStep: step })),
//   setPhone: (phone) => set(() => ({ phone })),
//   setEmail: (email) => set(() => ({ email })),
//   setPhoneVerified: (verified) => set(() => ({ phoneVerified: verified })),
//   setEmailVerified: (verified) => set(() => ({ emailVerified: verified })),

//   submitPhone: async (phone) => {
//     try {
//       const response = await axios.post(
//         `${config.backServer}/api/registration/phone`,
//         { phone },
//         { withCredentials: true }
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
//         { phoneCode },
//         { withCredentials: true }
//       );
//       if (response.data.status === "ok") {
//         get().setPhoneVerified(true);
//         set(() => ({
//           registrationStep: 1,
//           codeRequested: false
//         }));
//       } else {
//         console.error("Неверный пин-код");
//       }      
//     } catch (error) {
//       console.error("Ошибка при подтверждении пин-кода", error);
//     }
//   },

//   submitEmail: async (email) => {
//     try {
//       const response = await axios.post(
//         `${config.backServer}/api/registration/email`,
//         { email },
//         { withCredentials: true }
//       );
//       if (response.data.status === "ok") {
//         set(() => ({
//           email,
//           emailSubmitted: true,
//           codeRequestedEmail: true,
//         }));
//         // return response.data;
//       } else {
//         console.error(response.data.message);
//         // return response.data;
//       }
//     } catch (error) {
//       console.error("Ошибка при отправке email", error);
//       // return { status: 'error', message: "Ошибка при отправке email" };
//     }
//   },

//   submitEmailCode: async (emailCode) => {
//     try {
//       const response = await axios.post(
//         `${config.backServer}/api/registration/emailcode`,
//         { emailCode },
//         { withCredentials: true }
//       );
//       if (response.data.status === "ok") {
//         get().setEmailVerified(true);
//         set(() => ({
//           registrationStep: 2,
//           codeRequestedEmail: false
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
  codeRequested: false,
  emailVerified: false,
  codeRequestedEmail: false, 

  setRegistrationStep: (step) => set(() => ({ registrationStep: step })),
  setPhone: (phone) => set(() => ({ phone })),
  setEmail: (email) => set(() => ({ email })),
  setPhoneVerified: (verified) => set(() => ({ phoneVerified: verified })),
  setEmailVerified: (verified) => set(() => ({ emailVerified: verified })),

  submitPhone: async (phone) => {
    try {
      const response = await axios.post(
        `${config.backServer}/api/registration/phone`,
        { phone },
        { withCredentials: true }
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
        { phoneCode },
        { withCredentials: true }
      );
      if (response.data.status === "ok") {
        get().setPhoneVerified(true);
        set(() => ({
          registrationStep: 1,
          codeRequested: false
        }));
      } else {
        console.error("Неверный пин-код");
      }      
    } catch (error) {
      console.error("Ошибка при подтверждении пин-кода", error);
    }
  },

  submitEmail: async (email) => {
    try {
      const response = await axios.post(
        `${config.backServer}/api/registration/email`,
        { email },
        { withCredentials: true }
      );
      if (response.data.status === "ok") {
        set(() => ({
          email,
          emailSubmitted: true,
          codeRequestedEmail: true,
        }));
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Ошибка при отправке email", error);
    }
  },

  submitEmailCode: async (emailCode) => {
    try {
      const response = await axios.post(
        `${config.backServer}/api/registration/emailcode`,
        { emailCode },
        { withCredentials: true }
      );
      if (response.data.status === "ok") {
        get().setEmailVerified(true);
        set(() => ({
          registrationStep: 2,
          codeRequestedEmail: false
        }));
      } else {
        console.error("Неверный пин-код");
      }      
    } catch (error) {
      console.error("Ошибка при подтверждении пин-кода", error);
    }
  },

  registerUser: async (password) => {
    if (!get().emailVerified || !get().phoneVerified) {
      console.error("Email или телефон не подтвержден.");
      return;
    }
    try {
      const response = await axios.post(`${config.backServer}/api/registration/newuser`, {
        email: get().email,
        phone: get().phone,
        password,
      }, { withCredentials: true });
  
      if (response.data.status === "ok") {
        console.log("Пользователь зарегистрирован:", response.data);
        // Можете добавить здесь дополнительные действия после регистрации, например переход на другую страницу или вывод сообщения об успешной регистрации
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Ошибка при регистрации пользователя", error);
    }
  },
  
}));

export default useRegistration;
