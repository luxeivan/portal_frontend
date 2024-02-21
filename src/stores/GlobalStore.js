import create from "zustand";

const useStore = create((set) => ({
    global: {
        auth: false,
        darkMode: false,
        isAuthModalOpen: false, 
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
    }
}));

export default useStore;
