import { create } from "zustand";
import axios from "axios";
import config from "../config";

const useAuth = create((set) => {
  return {
    auth: false,
    isAuthModalOpen: false,
    isCodeModalOpen: false,
    loginError: "",
    email: "",
    password: "",
    isCodeRequested: false,
    authTimer: 0,

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

    startAuthTimer: () => {
      set((state) => {
        if (state.authTimerInterval) {
          clearInterval(state.authTimerInterval);
        }
        return { authTimer: 30, authTimerInterval: null };
      });
      const timerId = setInterval(() => {
        set((state) => {
          if (state.authTimer <= 0) {
            clearInterval(timerId);
            return { authTimer: 0, authTimerInterval: null };
          }
          return { authTimer: state.authTimer - 1 };
        });
      }, 1000);
      set({ authTimerInterval: timerId });
    },


    login: async (email, password) => {
      try {
        const response = await axios.post(
          `${config.backServer}/api/auth/login`,
          { email, password },
          { withCredentials: true }
        );
        if (response.data && response.status === 200) {
          set((state) => {
            state.startAuthTimer();
            return {
              email,
              password,
              isCodeRequested: true,
              loginError: "",
            };
          });
        }
      } catch (error) {
        set(() => ({
          loginError: error.response?.data?.message || "Ошибка авторизации.",
          authTimer: 0,
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
            error.response?.data?.message ||
            "Ошибка при подтверждении пинкода.",
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

    checkJWT: async () => {
      let validJwt = false;
      //console.log(validJwt)
      if (localStorage.getItem("jwt")) {
        try {
          const res = await axios.post(`${config.backServer}/api/auth/checkjwt`, {
            jwt: localStorage.getItem("jwt"),
          });
          validJwt = res.data;
        } catch (error) {
          console.log(error)
        }
      }
      if (validJwt) {
        set((state) => ({
          ...state,
          auth: true,
        }));
      }
    },

    resetCodeRequest: () => {
      set({ isCodeRequested: false });
    }

  };
});

export default useAuth;
