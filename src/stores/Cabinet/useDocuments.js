import { create } from "zustand";
import axios from "axios";
import { message } from "antd";

const backServer = process.env.REACT_APP_BACK_BACK_SERVER;

const useDocuments = create((set, get) => ({
  documents: [],
  loadingDocuments: false,
  errorLoadingDocuments: false,
  openModalAdd: false,

  setOpenModalAdd: (status = false) => {
    set({ openModalAdd: status });
  },

  fetchDocuments: async (categoryKey = null) => {
    set({ documents: [], loadingDocuments: true });
    try {
      let url = `${backServer}/api/cabinet/documents`;


      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        withCredentials: true,
      });

      // Логируем весь объект документов, чтобы проверить его структуру
      console.log("Загруженные документы:", response.data.documents);

      if (response.data.documents && categoryKey ) {
        // Теперь логируем название документа (Description) и его ВидФайла_Key
        
        response.data.documents = response.data.documents.filter(
          (document) => document.ВидФайла_Key === categoryKey
        );

      }

      set({ documents: response.data.documents, loadingDocuments: false });
    } catch (error) {
      set({
        loadingDocuments: false,
        errorLoadingDocuments: "Не удалось загрузить документы",
      });
      console.error("Ошибка при загрузке документов", error);
    }
  },

  deleteDocument: async (id) => {
    try {
      await axios.delete(`${backServer}/api/cabinet/documents/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        withCredentials: true,
      });
      message.success("Документ успешно удален");
      get().fetchDocuments();
    } catch (error) {
      console.error("Ошибка при удалении документа", error);
      message.error("Не удалось удалить документ");
    }
  },
}));

export default useDocuments;
