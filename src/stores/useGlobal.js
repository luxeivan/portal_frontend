import { create } from "zustand";

const useGlobal = create((set) => ({
  darkMode: false,

  toggleDarkMode: () => {
    set((state) => ({
      darkMode: !state.darkMode,
    }));
  },
}));

export default useGlobal;
