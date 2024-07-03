import { create } from "zustand";
import axios from "axios";
import { redirect } from "react-router-dom";
const backServer = process.env.REACT_APP_BACK_BACK_SERVER
const useAuth = create((set, get) => {
  return {
    auth: false,
    isAuthModalOpen: false,
    isCodeModalOpen: false,
    loginError: "",
    email: "",
    password: "",
    isCodeRequested: false,
    authTimer: 0,
    redirection: "",

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
      return true
    },
    setRedirection: (redirection) => {
      set((state) => ({
        redirection
      }));
      return true
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
          `${backServer}/api/auth/login`,
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
          `${backServer}/api/auth/logincode`,
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
        isCodeRequested: false, // Обнуляем флаг запроса кода
        loginError: "", // Очищаем сообщения об ошибках
        isAuthModalOpen: false, // Закрываем модальное окно аутентификации, если оно открыто
        isCodeModalOpen: false // Закрываем модальное окно ввода кода, если оно открыто
      }));
    },


    // logout: () => {
    //   localStorage.removeItem("jwt");
    //   set(() => ({
    //     auth: false,
    //     email: "",
    //     password: "",
    //   }));
    // },

    checkJWT: async () => {
      let validJwt = false;
      //console.log(validJwt)
      if (localStorage.getItem("jwt")) {
        try {
          const res = await axios.post(`${backServer}/api/auth/checkjwt`, {
            jwt: localStorage.getItem("jwt"),
          });
          validJwt = res.data;
        } catch (error) {
          console.log(error)
          return false
        }
      }
      if (!get().auth && validJwt) {
        set((state) => ({
          // ...state,
          auth: true,
        }));
        return true
      }
      // get().toggleModal('isAuthModalOpen', true);  
      return false
    },

    resetCodeRequest: () => {
      set({ isCodeRequested: false });
    }

  };
});

export default useAuth;
