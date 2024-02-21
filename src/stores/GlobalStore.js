import create from "zustand";
const useStore = create((set) => ({
    global: {
        auth: false,
        darkMode: false
    },
    toggleAuth: () => {
        set((state) => {
            return {
                global: {
                    ...state.global,
                    auth: !state.global.auth
                }
            }
        })
    },
    toggleDarkMode: () => {
        set((state) => {
            return {
                global: {
                    ...state.global,
                    darkMode: !state.global.darkMode
                }
            }
        })
    }
}));
export default useStore;