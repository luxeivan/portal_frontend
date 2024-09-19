import { create } from "zustand";
import axios from "axios";
import { message } from "antd";

const backServer = process.env.REACT_APP_BACK_BACK_SERVER;

const useGlobal = create((set) => ({
  darkMode: false,
  currentPage: "/",

  setCurrentPage: (url) => {
    console.log(url);
    //Добавляем новый URL в историю без перезагрузки страницы, как будто ничего не произошло.
    window.history.pushState({}, "", url);
    // Создаем событие, чтобы React Router понял, что нужно изменить маршрут
    const navEvent = new PopStateEvent("popstate");
    // Отправляем это событие
    // react заметит изменение URL и обновит представление.
    window.dispatchEvent(navEvent);
    set(() => ({
      currentPage: url,
    }));
  },

  // setCurrentPage: (url) => {
  //   console.log(url)
  //   redirect(url)
  //   set((state) => {
  //     return {
  //       currentPage: url,
  //     };
  //   });
  // },

  toggleDarkMode: () => {
    set((state) => {
      localStorage.setItem("darkMode", !state.darkMode ? 1 : 0);
      return {
        darkMode: !state.darkMode,
      };
    });
  },

  checkDarkMode: () => {
    if (localStorage.getItem("darkMode") === "1") {
      set((state) => ({
        darkMode: true,
      }));
    }
  },

  //Загрузчик
  uploadFile: async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${backServer}/api/cabinet/upload-file`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
          withCredentials: true,
        }
      );

      if (response.data) {
        set({ filePath: response.data.files[0] });
        message.success(`${file.name} файл успешно загружен.`);
      }
    } catch (error) {
      console.error("Ошибка при загрузке файла", error);
      message.error(`${file.name} не удалось загрузить файл.`);
    }
  },
}));

export default useGlobal;
