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
  setPhoneVerified: (verified) => set(() => ({ phoneVerified: verified })),

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
}));

export default useRegistration;
