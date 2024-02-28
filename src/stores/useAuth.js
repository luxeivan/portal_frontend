import { create } from "zustand";
import axios from "axios";
import config from "../config";

const useAuth = create((set) => ({
  auth: false,
  isAuthModalOpen: false,
  isCodeModalOpen: false,
  loginError: "",
  email: "",
  password: "",

  toggleAuth: (value) => {
    set((state) => ({
      auth: typeof value === "undefined" ? !state.auth : value,
    }));
  },
  
  toggleModal: (modalName, value) => {
    set((state) => ({
      ...state,
      [modalName]: typeof value === "undefined" ? !state[modalName] : value,
    }));
  },

  login: async (email, password) => {
    try {
      const response = await axios.post(
        `${config.backServer}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      if (response.data && response.status === 200) {
        set(() => ({
          email,
          password,
          isCodeModalOpen: true,
          loginError: "",
        }));
      }
    } catch (error) {
      set(() => ({
        loginError: error.response?.data?.message || "Ошибка авторизации.",
      }));
    }
  },

  verifyPincode: async (pincode) => {
    try {
      const response = await axios.post(
        `${config.backServer}/api/auth/logincode`,
        { pincode },
        { withCredentials: true }
      );
      if (response.data && response.status === 200) {
        localStorage.setItem("jwt", response.data.jwt);
        set(() => ({
          auth: true,
          isCodeModalOpen: false,
          isAuthModalOpen: false,
          loginError: "",
        }));
      } else {
        set(() => ({
          loginError: "Неверный пинкод.",
        }));
      }
    } catch (error) {
      set(() => ({
        loginError:
          error.response?.data?.message || "Ошибка при подтверждении пинкода.",
      }));
    }
  },

  logout: () => {
    localStorage.removeItem("jwt");
    set(() => ({
      auth: false,
      email: "",
      password: "",
    }));
  },
}));

export default useAuth;
