import { create } from "zustand";
import axios from "axios";
import config from "../../config";
// import { relativeTimeThreshold } from "moment/moment";

const useDocuments = create((set, get) => ({
  documents: [],
  document: {},
  loadingDocuments: false,
  errorLoadingDocuments: false,
  loadingDocument: false,
  errorLoadingDocument: false,
  openModalAdd: false,
  openModalView: false,
  openModalUpdate: false,

  setOpenModalView: (id = false) => {
    console.log(id)
    set({ openModalView: id });
  },

  setOpenModalAdd: (status = false) => {
    console.log(status)
    set({ openModalAdd: status });
  },

  fetchDocuments: async () => {
    set({ loadingDocuments: true });
    try {
      const response = await axios.get(
        `${config.backServer}/api/cabinet/documents`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
          withCredentials: true,
        }
      );
      set({
        documents: response.data.documents.map((doc) => ({
          ...doc,
          documentName: doc.documentName || doc.name,
        })), loadingDocuments: false
      });

    } catch (error) {
      set({ loadingDocuments: true, errorLoadingDocuments: "Не удалось загрузить документы" });
      console.error("Ошибка при загрузке документов", error);
    }
  },

  fetchDocument: async (id) => {
    set({ loadingDocument: true });
    try {
      const response = await axios.get(
        `${config.backServer}/api/cabinet/documents/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
          withCredentials: true,
        }
      );
      set({
        document: response.data.documents.map((doc) => ({
          ...doc,
          documentName: doc.documentName || doc.name,
        })), loadingDocument: false
      });

    } catch (error) {
      set({ loadingDocument: true, errorLoadingDocument: "Не удалось загрузить документ" });
      console.error("Ошибка при загрузке документа", error);
    }
  }
}));

export default useDocuments;
