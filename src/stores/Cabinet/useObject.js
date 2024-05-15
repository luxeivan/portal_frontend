import { create } from "zustand";
import axios from "axios";
import config from "../../config";

const useObjects = create((set, get) => ({
  objects: [],
  object: null,
  isLoadingObjects: false,
  isLoadingObjectItem: false,
  error: null,
  showModalView: false,
  showModalAdd: false,

  showObject: async (id = false) => {
    if (id !== false) {
      console.log("Объект с ID:", id);
      await get().fetchObjectItem(id);
      const object = get().object;
      console.log("Выбранный объект:", object);
      if (object && object.attributes) {
        set({ showModalView: true });
        console.log("Установка showModalView в значение true");
      }
    } else {
      set({
        showModalView: false,
        object: null,
      });
      console.log("Установка showModalView в значение false");
    }
  },

  setShowModalView: (show) => {
    console.log("setShowModalView called with:", show);
    set({ showModalView: show });
  },

  setShowModalAdd: (show) => {
    set({ showModalAdd: show });
  },

  fetchObjects: async () => {
    try {
      set({ isLoadingObjects: true });
      const token = localStorage.getItem("jwt");
      const response = await axios.get(
        `${config.backServer}/api/cabinet/objects`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({ objects: response.data, isLoadingObjects: false });
    } catch (error) {
      console.log(error);
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
    }
  },

  fetchObjectItem: async (id) => {
    return new Promise(async function (resolve, reject) {
      try {
        set({ isLoadingObjectItem: true });
        const token = localStorage.getItem("jwt");
        const response = await axios.get(
          `${config.backServer}/api/cabinet/objects/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        set({ object: response.data, isLoadingObjectItem: false });
        resolve();
      } catch (error) {
        console.log(error);
        set({
          error: error.response?.data?.message || error.message,
          isLoading: false,
        });
        reject();
      }
    });
  },

  submitNewObject: async (formData) => {
    try {
      const response = await axios.post(
        `${config.backServer}/api/cabinet/objects`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        set((state) => ({
          objects: [...state.objects, response.data],
        }));
        return response.data.object;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  deleteObjectItem: async (id) => {
    try {
      set({ isLoadingObjectItem: true });
      const token = localStorage.getItem("jwt");
      const response = await axios.delete(
        `${config.backServer}/api/cabinet/objects/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set((state) => ({
        objects: state.objects.filter((item) => item.id !== id),
      }));
    } catch (error) {
      console.log(error);
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
    }
  },
}));

export default useObjects;

// import { create } from "zustand";
// import axios from "axios";
// import config from "../../config";

// const useObjects = create((set, get) => ({
//   objects: [],
//   object: null,
//   isLoadingObjects: false,
//   isLoadingObjectItem: false,
//   error: null,
//   showModalView: false,
//   showModalAdd: false,

//   showObject: async (id = false) => {
//     if (id !== false) {
//       console.log("Объект с ID:", id);
//       await get().fetchObjectItem(id);
//       const object = get().object;
//       console.log("Выбранный объект:", object);
//       if (object && object.attributes) {
//         set({ showModalView: true });
//         console.log("Установка showModalView в значение true");
//       }
//     } else {
//       set({
//         showModalView: false,
//         object: null,
//       });
//       console.log("Установка showModalView в значение false");
//     }
//   },

//   setShowModalView: (show) => {
//     console.log("setShowModalView called with:", show);
//     set({ showModalView: show });
//   },

//   setShowModalAdd: (show) => {
//     set({ showModalAdd: show });
//   },

//   fetchObjects: async () => {
//     try {
//       set({ isLoadingObjects: true });
//       const token = localStorage.getItem("jwt");
//       const response = await axios.get(
//         `${config.backServer}/api/cabinet/objects`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       set({ objects: response.data, isLoadingObjects: false });
//     } catch (error) {
//       console.log(error);
//       set({
//         error: error.response?.data?.message || error.message,
//         isLoading: false,
//       });
//     }
//   },

//   fetchObjectItem: async (id) => {
//     return new Promise(async function (resolve, reject) {
//       try {
//         set({ isLoadingObjectItem: true });
//         const token = localStorage.getItem("jwt");
//         const response = await axios.get(
//           `${config.backServer}/api/cabinet/objects/${id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         set({ object: response.data, isLoadingObjectItem: false });
//         resolve();
//       } catch (error) {
//         console.log(error);
//         set({
//           error: error.response?.data?.message || error.message,
//           isLoading: false,
//         });
//         reject();
//       }
//     });
//   },

//   submitNewObject: async (formData) => {
//     try {
//       const response = await axios.post(
//         `${config.backServer}/api/cabinet/objects`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//           },
//           withCredentials: true,
//         }
//       );

//       if (response.status === 201) {
//         set((state) => ({
//           objects: [...state.objects, response.data],
//         }));
//         return response.data.object;
//       }
//     } catch (error) {
//       console.log(error);
//       throw error;
//     }
//   },

//   deleteObjectItem: async (id) => {
//     try {
//       set({ isLoadingObjectItem: true });
//       const token = localStorage.getItem("jwt");
//       const response = await axios.delete(
//         `${config.backServer}/api/cabinet/objects/${id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       set((state) => ({
//         objects: state.objects.filter((item) => item.id !== id),
//       }));
//     } catch (error) {
//       console.log(error);
//       set({
//         error: error.response?.data?.message || error.message,
//         isLoading: false,
//       });
//     }
//   },
// }));

// export default useObjects;

// import { create } from "zustand";
// import axios from "axios";
// import config from "../../config";

// const useObjects = create((set, get) => ({
//   objects: [],
//   object: null,
//   isLoadingObjects: false,
//   isLoadingObjectItem: false,
//   error: null,
//   showModalView: false,
//   showModalAdd: false,

//   showObject: async (id = false) => {
//     if (id !== false) {
//       console.log("Объект с ID:", id);
//       await get().fetchObjectItem(id);
//       const object = get().object;
//       console.log("Выбранный объект:", object);
//       console.log("object.attributes", object.attributes);
//       console.log("object.attributes.type", object.attributes.type);
//       if (object && object.attributes && object.attributes.type === "Объект") {
//         set({ showModalView: true });
//         console.log("Установка showModalView в значение true");
//       }
//     } else {
//       set({
//         showModalView: false,
//         object: null,
//       });
//       console.log("Установка showModalView в значение false");
//     }
//   },

//   setShowModalView: (show) => {
//     console.log("setShowModalView called with:", show);
//     set({ showModalView: show });
//   },

//   setShowModalAdd: (show) => {
//     set({ showModalAdd: show });
//   },

//   fetchObjects: async () => {
//     try {
//       set({ isLoadingObjects: true });
//       const token = localStorage.getItem("jwt");
//       const response = await axios.get(
//         `${config.backServer}/api/cabinet/objects`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       set({ objects: response.data, isLoadingObjects: false });
//     } catch (error) {
//       console.log(error);
//       set({
//         error: error.response?.data?.message || error.message,
//         isLoading: false,
//       });
//     }
//   },

//   fetchObjectItem: async (id) => {
//     return new Promise(async function (resolve, reject) {
//       try {
//         set({ isLoadingObjectItem: true });
//         const token = localStorage.getItem("jwt");
//         const response = await axios.get(
//           `${config.backServer}/api/cabinet/objects/${id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         set({ object: response.data, isLoadingObjectItem: false });
//         resolve();
//       } catch (error) {
//         console.log(error);
//         set({
//           error: error.response?.data?.message || error.message,
//           isLoading: false,
//         });
//         reject();
//       }
//     });
//   },

//   submitNewObject: async (formData) => {
//     try {
//       const response = await axios.post(
//         `${config.backServer}/api/cabinet/objects`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//           },
//           withCredentials: true,
//         }
//       );

//       if (response.status === 201) {
//         set((state) => ({
//           objects: [...state.objects, response.data],
//         }));
//         return response.data.object;
//       }
//     } catch (error) {
//       console.log(error);
//       throw error;
//     }
//   },

//   deleteObjectItem: async (id) => {
//     try {
//       set({ isLoadingObjectItem: true });
//       const token = localStorage.getItem("jwt");
//       const response = await axios.delete(
//         `${config.backServer}/api/cabinet/objects/${id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       set((state) => ({
//         objects: state.objects.filter((item) => item.id !== id),
//       }));
//     } catch (error) {
//       console.log(error);
//       set({
//         error: error.response?.data?.message || error.message,
//         isLoading: false,
//       });
//     }
//   },
// }));

// export default useObjects;

// import { create } from "zustand";
// import axios from "axios";
// import config from "../../config";

// const useObjects = create((set, get) => ({
//   objects: [],
//   object: null,
//   isLoadingObjects: false,
//   isLoadingObjectItem: false,
//   error: null,
//   showModalView: false,
//   showModalAdd: false,

//   // showObject: async (id = false) => {
//   //   if (id !== false) {
//   //     await get().fetchObjectItem(id);
//   //     const object = get().object;
//   //     if (object && object.attributes && object.attributes.type === "Объект") {
//   //       set({ showModalView: true });
//   //     }
//   //   } else {
//   //     set({
//   //       showModalView: false,
//   //       object: null,
//   //     });
//   //   }
//   // },

//   // showObject: async (id = false) => {
//   //   if (id !== false) {
//   //     console.log(id);
//   //     await get().fetchObjectItem(id);
//   //     console.log(get().object.attributes.type);
//   //     switch (get().object.attributes.type) {
//   //       case "Объект":
//   //         set({ showModalView: true });
//   //         break;
//   //     }
//   //   } else {
//   //     set({
//   //       showModalView: false,
//   //       object: null,
//   //     });
//   //   }
//   // },

//   showObject: async (id = false) => {
//     if (id !== false) {
//       console.log("Fetching object with ID:", id);
//       await get().fetchObjectItem(id);
//       const object = get().object;
//       console.log("Fetched object:", object);
//       if (object && object.attributes && object.attributes.type === "Объект") {
//         set({ showModalView: true });
//         console.log("Setting showModalView to true");
//       }
//     } else {
//       set({
//         showModalView: false,
//         object: null,
//       });
//       console.log("Setting showModalView to false");
//     }
//   },

//   setShowModalView: (show) => {
//     set({ showModalView: show });
//   },

//   setShowModalAdd: (show) => {
//     set({ showModalAdd: show });
//   },

//   fetchObjects: async () => {
//     try {
//       set({ isLoadingObjects: true });
//       const token = localStorage.getItem("jwt");
//       const response = await axios.get(
//         `${config.backServer}/api/cabinet/objects`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       set({ objects: response.data, isLoadingObjects: false });
//     } catch (error) {
//       console.log(error);
//       set({
//         error: error.response?.data?.message || error.message,
//         isLoading: false,
//       });
//     }
//   },

//   fetchObjectItem: async (id) => {
//     return new Promise(async function (resolve, reject) {
//       try {
//         set({ isLoadingObjectItem: true });
//         const token = localStorage.getItem("jwt");
//         const response = await axios.get(
//           `${config.backServer}/api/cabinet/objects/${id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         set({ object: response.data, isLoadingObjectItem: false });
//         resolve();
//       } catch (error) {
//         console.log(error);
//         set({
//           error: error.response?.data?.message || error.message,
//           isLoading: false,
//         });
//         reject();
//       }
//     });
//   },

//   submitNewObject: async (formData) => {
//     try {
//       const response = await axios.post(
//         `${config.backServer}/api/cabinet/objects`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//           },
//           withCredentials: true,
//         }
//       );

//       if (response.status === 201) {
//         set((state) => ({
//           objects: [...state.objects, response.data],
//         }));
//         return response.data.object;
//       }
//     } catch (error) {
//       console.log(error);
//       throw error;
//     }
//   },

//   deleteObjectItem: async (id) => {
//     try {
//       set({ isLoadingObjectItem: true });
//       const token = localStorage.getItem("jwt");
//       const response = await axios.delete(
//         `${config.backServer}/api/cabinet/objects/${id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       set((state) => ({
//         objects: state.objects.filter((item) => item.id !== id),
//       }));
//     } catch (error) {
//       console.log(error);
//       set({
//         error: error.response?.data?.message || error.message,
//         isLoading: false,
//       });
//     }
//   },
// }));

// export default useObjects;

// import { create } from "zustand";
// import axios from "axios";
// import config from "../../config";

// const useObjects = create((set, get) => ({
//   objects: [],
//   object: null,
//   isLoadingObjects: false,
//   isLoadingObjectItem: false,
//   error: null,
//   showModalView: false,
//   showModalAdd: false,

//   // Показать модальное окно для объекта или скрыть его
//   // showObject: async (id = false) => {
//   //   if (id !== false) {
//   //     console.log(id);
//   //     await get().fetchObjectItem(id);
//   //     console.log(get().object.attributes.type);
//   //     switch (get().object.attributes.type) {
//   //       case "Объект":
//   //         set({ showModalView: true });
//   //         break;
//   //     }
//   //   } else {
//   //     set({
//   //       showModalView: false,
//   //       object: null,
//   //     });
//   //   }
//   // },
//   showObject: async (id = false) => {
//     if (id !== false) {
//       await get().fetchObjectItem(id);
//       const object = get().object;
//       if (object && object.attributes && object.attributes.type === "Объект") {
//         set({ showModalView: true });
//       }
//     } else {
//       set({
//         showModalView: false,
//         object: null,
//       });
//     }
//   },

//   // Установить отображение модального окна для просмотра
//   setShowModalView: (show) => {
//     set({ showModalView: show });
//   },

//   // Установить отображение модального окна для добавления
//   setShowModalAdd: (show) => {
//     set({ showModalAdd: show });
//   },

//   // Получить список всех объектов
//   fetchObjects: async () => {
//     try {
//       set({ isLoadingObjects: true });
//       const token = localStorage.getItem("jwt");
//       const response = await axios.get(
//         `${config.backServer}/api/cabinet/objects`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       set({ objects: response.data, isLoadingObjects: false });
//     } catch (error) {
//       console.log(error);
//       set({
//         error: error.response?.data?.message || error.message,
//         isLoading: false,
//       });
//     }
//   },

//   // Получить детали конкретного объекта
//   fetchObjectItem: async (id) => {
//     return new Promise(async function (resolve, reject) {
//       try {
//         set({ isLoadingObjectItem: true });
//         const token = localStorage.getItem("jwt");
//         const response = await axios.get(
//           `${config.backServer}/api/cabinet/objects/${id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         set({ object: response.data, isLoadingObjectItem: false });
//         resolve();
//       } catch (error) {
//         console.log(error);
//         set({
//           error: error.response?.data?.message || error.message,
//           isLoading: false,
//         });
//         reject();
//       }
//     });
//   },

//   // Добавить новый объект
//   submitNewObject: async (formData) => {
//     try {
//       const response = await axios.post(
//         `${config.backServer}/api/cabinet/objects`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//           },
//           withCredentials: true,
//         }
//       );

//       if (response.status === 201) {
//         //console.log(response.data);
//         set((state) => ({
//           objects: [...state.objects, response.data],
//         }));
//         return response.data.object;
//       }
//     } catch (error) {
//       console.log(error);
//       throw error;
//     }
//   },

//   // Удалить объект
//   deleteObjectItem: async (id) => {
//     try {
//       set({ isLoadingObjectItem: true });
//       const token = localStorage.getItem("jwt");
//       const response = await axios.delete(
//         `${config.backServer}/api/cabinet/objects/${id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       set((state) => ({
//         objects: state.objects.filter((item) => item.id !== id),
//       }));
//     } catch (error) {
//       console.log(error);
//       set({
//         error: error.response?.data?.message || error.message,
//         isLoading: false,
//       });
//     }
//   },
// }));

// export default useObjects;
