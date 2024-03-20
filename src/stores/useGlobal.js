import { create } from "zustand";

const useGlobal = create((set) => ({
  darkMode: false,

  toggleDarkMode: () => {
    set((state) => {
      localStorage.setItem('darkMode', !state.darkMode ? 1 : 0)
      return {
        darkMode: !state.darkMode,
      }
    });
  },
  checkDarkMode: () => {
    console.log(localStorage.getItem('darkMode') === '1')
    if (localStorage.getItem('darkMode') === '1') {
      set((state) => ({
        darkMode: true,
      }))
    }
  }
}));

export default useGlobal;
