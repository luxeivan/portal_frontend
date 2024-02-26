import { create } from 'zustand'
import axios from "axios";

const useStore = create((set) => ({
    global: {
        auth: false,
        darkMode: false,
        isAuthModalOpen: false,
        isCodeModalOpen: false,
        loginError: "",
        email: "",  
        password: "",
    },
    toggleAuth: (value) => {
        set((state) => ({
            global: {
                ...state.global,
                auth: typeof value === 'undefined' ? !state.global.auth : value
            }
        }))
    },
    toggleDarkMode: () => {
        set((state) => ({
            global: {
                ...state.global,
                darkMode: !state.global.darkMode
            }
        }))
    },
    toggleModal: (modalName, value) => {
        set((state) => ({
            global: {
                ...state.global,
                [modalName]: typeof value === 'undefined' ? !state.global[modalName] : value,
            }
        }));
    },
    login: async (email, password) => {
        try {
            const response = await axios.post("http://5.35.9.42:5000/api/auth/login", { email, password });
            if (response.data && response.status === 200) {
                set((state) => ({
                    global: {
                        ...state.global,
                        email,
                        password,
                        isCodeModalOpen: true,
                        loginError: "",
                    }
                }));
            }
        } catch (error) {
            set((state) => ({
                global: {
                    ...state.global,
                    loginError: error.response?.data?.message || "Ошибка авторизации.",
                }
            }));
        }
    },
    verifyPincode: async (pincode) => {
        try {
            const response = await axios.post("http://5.35.9.42:5000/api/auth/logincode", { pincode });
            if (response.data && response.status === 200) {
                localStorage.setItem('jwt', response.data.jwt);
                set((state) => ({
                    global: {
                        ...state.global,
                        auth: true,
                        isCodeModalOpen: false,
                        isAuthModalOpen: false,
                        loginError: "",
                    }
                }));
            }
        } catch (error) {
            set((state) => ({
                global: {
                    ...state.global,
                    loginError: error.response?.data?.message || "Неверный пинкод.",
                }
            }));
        }
    },
}));

export default useStore;


