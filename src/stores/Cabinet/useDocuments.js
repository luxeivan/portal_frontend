import { create } from "zustand";
import axios from "axios";
import config from "../../config";

const useDocuments = create((set, get) => ({
  documents: [],
  document: {},
  nameDocs: [],
  loadingDocuments: false,
  errorLoadingDocuments: false,
  loadingDocument: false,
  errorLoadingDocument: false,
  openModalAdd: false,
  openModalView: false,
  openModalUpdate: false,

  setOpenModalView: (id = false) => {
    set({ openModalView: id });
  },

  setOpenModalAdd: (status = false) => {
    set({ openModalAdd: status });
  },

  setOpenModalUpdate: (id = false) => {
    set({ openModalUpdate: id });
  },

  fetchDocuments: async () => {
    set({ documents: [], loadingDocuments: true });
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
      set({ loadingDocuments: false, errorLoadingDocuments: "Не удалось загрузить документы" });
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
      set({ document: response.data.document, loadingDocument: false });
    } catch (error) {
      set({ loadingDocument: false, errorLoadingDocument: "Не удалось загрузить документ" });
      console.error("Ошибка при загрузке документа", error);
    }
  },

  getNameDocs: async () => {
    try {
      const response = await axios.get(
        `${config.backServer}/api/cabinet/documents/getNameDocs`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      set({ nameDocs: response.data.nameDocs });
    } catch (error) {
      console.error("Ошибка при загрузке наименований документов", error);
    }
  },

  updateDocument: async (id, updatedData) => {
    set({ loadingDocument: true });
    try {
      const response = await axios.put(
        `${config.backServer}/api/cabinet/documents/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      set({ document: response.data.document, loadingDocument: false });
      get().fetchDocuments(); // Обновить список документов после редактирования
    } catch (error) {
      set({ loadingDocument: false, errorLoadingDocument: "Не удалось обновить документ" });
      console.error("Ошибка при обновлении документа", error);
    }
  },
}));

export default useDocuments;


// import { create } from "zustand";
// import axios from "axios";
// import config from "../../config";
// // import { relativeTimeThreshold } from "moment/moment";

// const useDocuments = create((set, get) => ({
//   documents: [],
//   document: {},
//   nameDocs: [],
//   loadingDocuments: false,
//   errorLoadingDocuments: false,
//   loadingDocument: false,
//   errorLoadingDocument: false,
//   openModalAdd: false,
//   openModalView: false,
//   openModalUpdate: false,
//   openModalUpdate: false,

//   setOpenModalView: (id = false) => {
//     //console.log(id)
//     set({ openModalView: id });
//   },

//   setOpenModalAdd: (status = false) => {
//     console.log(status)
//     set({ openModalAdd: status });
//   },

//   fetchDocuments: async () => {
//     set({documents:[], loadingDocuments: true });
//     try {
//       const response = await axios.get(
//         `${config.backServer}/api/cabinet/documents`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//           },
//           withCredentials: true,
//         }
//       );
//       set({
//         documents: response.data.documents.map((doc) => ({
//           ...doc,
//           documentName: doc.documentName || doc.name,
//         })), loadingDocuments: false
//       });

//     } catch (error) {
//       set({ loadingDocuments: true, errorLoadingDocuments: "Не удалось загрузить документы" });
//       console.error("Ошибка при загрузке документов", error);
//     }
//   },

//   fetchDocument: async (id) => {
//     set({ loadingDocument: true });
//     // console.log('id',id)
//     try {
//       const response = await axios.get(
//         `${config.backServer}/api/cabinet/documents/${id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//           },
//           withCredentials: true,
//         }
//       );
//       //console.log(response.data)
//       set({ document: response.data.document, loadingDocument: false });

//     } catch (error) {
//       set({ loadingDocument: true, errorLoadingDocument: "Не удалось загрузить документ" });
//       console.error("Ошибка при загрузке документа", error);
//     }
//   },
//   getNameDocs: () => {
//     axios.get(
//       `${config.backServer}/api/cabinet/documents/getNameDocs`,
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//         },
//       }
//     ).then(response => {
//       //console.log(response.data.nameDocs )
//       set({ nameDocs: response.data.nameDocs })
//     })
//       .catch(error => {
//         console.log(error)
//       })
//   }
// }))

// export default useDocuments;
