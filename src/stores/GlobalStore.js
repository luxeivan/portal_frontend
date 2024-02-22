import create from "zustand";
import axios from "axios";

const useStore = create((set) => ({
    global: {
        auth: false,
        darkMode: false,
        isAuthModalOpen: false,
        isCodeModalOpen: false, 
    },
    toggleAuth: () => {
        set((state) => ({
            global: {
                ...state.global,
                auth: !state.global.auth
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
    openAuthModal: () => {
        set((state) => ({
            global: {
                ...state.global,
                isAuthModalOpen: true
            }
        }))
    },
    closeAuthModal: () => {
        set((state) => ({
            global: {
                ...state.global,
                isAuthModalOpen: false
            }
        }))
    },
    openCodeModal: () => {
        set((state) => ({
            global: {
                ...state.global,
                isCodeModalOpen: true
            }
        }))
    },
    closeCodeModal: () => {
        set((state) => ({
            global: {
                ...state.global,
                isCodeModalOpen: false
            }
        }))
    },
    login: async (email, password) => {
        try {
            const response = await axios.post(
                "http://5.35.9.42:5000/api/auth/login",
                { email, password }
            );

            if (response.data && response.status === 200) {
                console.log("Login Success:", response.data);
                set((state) => ({
                    global: {
                        ...state.global,
                        auth: true,
                        isCodeModalOpen: true,
                        loginError: "",
                    }
                }));
            }
        } catch (error) {
            console.error("Login Error:", error);
            set((state) => ({
                global: {
                    ...state.global,
                    loginError: error.response?.data?.message || "Неверный логин или пароль.",
                }
            }));
        }
    },
}));

export default useStore;
