import { create } from "zustand";
import axios from "axios";
import { message } from "antd";

const backServer = process.env.REACT_APP_BACK_BACK_SERVER;

const useDocuments = create((set, get) => ({
  documents: [],
  nameDocs: [],
  loadingDocuments: false,
  errorLoadingDocuments: false,
  openModalAdd: false,

  setOpenModalAdd: (status = false) => {
    set({ openModalAdd: status });
  },

  fetchDocuments: async () => {
    set({ documents: [], loadingDocuments: true });
    try {
      const response = await axios.get(`${backServer}/api/cabinet/documents`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        withCredentials: true,
      });

      console.log("response.data!!!!!!", response.data);

      set({
        documents: response.data.documents,
        loadingDocuments: false,
      });
    } catch (error) {
      set({
        loadingDocuments: false,
        errorLoadingDocuments: "Не удалось загрузить документы",
      });
      console.error("Ошибка при загрузке документов", error);
    }
  },

  getNameDocs: async () => {
    try {
      const response = await axios.get(
        `${backServer}/api/cabinet/documents/getNameDocs`,
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

// import { create } from "zustand";
// import axios from "axios";
// import { message } from "antd";

// const backServer = process.env.REACT_APP_BACK_BACK_SERVER;

// const useDocuments = create((set, get) => ({
//   documents: [],
//   nameDocs: [],
//   loadingDocuments: false,
//   errorLoadingDocuments: false,
//   openModalAdd: false,

//   setOpenModalAdd: (status = false) => {
//     set({ openModalAdd: status });
//   },

//   fetchDocuments: async () => {
//     set({ documents: [], loadingDocuments: true });
//     try {
//       const response = await axios.get(`${backServer}/api/cabinet/documents`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//         },
//         withCredentials: true,
//       });
//       set({
//         documents: response.data.documents,
//         loadingDocuments: false,
//       });
//     } catch (error) {
//       set({
//         loadingDocuments: false,
//         errorLoadingDocuments: "Не удалось загрузить документы",
//       });
//       console.error("Ошибка при загрузке документов", error);
//     }
//   },

//   getNameDocs: async () => {
//     try {
//       const response = await axios.get(
//         `${backServer}/api/cabinet/documents/getNameDocs`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//           },
//         }
//       );
//       set({ nameDocs: response.data.nameDocs });
//     } catch (error) {
//       console.error("Ошибка при загрузке наименований документов", error);
//     }
//   },

//   // deleteDocument: async (id) => {
//   //   try {
//   //     await axios.delete(`${backServer}/api/cabinet/documents/${id}`, {
//   //       headers: {
//   //         Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//   //       },
//   //       withCredentials: true,
//   //     });
//   //     message.success("Документ успешно удален");
//   //     get().fetchDocuments();
//   //   } catch (error) {
//   //     console.error("Ошибка при удалении документа", error);
//   //     message.error("Не удалось удалить документ");
//   //   }
//   // },

//   deleteDocument: async (id) => {
//     try {
//       await axios.delete(`${backServer}/api/cabinet/documents/${id}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//         },
//         withCredentials: true,
//       });
//       message.success("Документ успешно удален");
//       get().fetchDocuments();
//     } catch (error) {
//       console.error("Ошибка при удалении документа", error);
//       message.error("Не удалось удалить документ");
//     }
//   },
// }));

// export default useDocuments;
