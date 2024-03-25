import { create } from "zustand";
import axios from "axios";
import config from "../../config";
import { debounce } from "lodash";
import { Typography } from "antd";

const useSubjects = create((set, get) => ({
  subjects: [],
  subject: null,
  isLoadingSubjects: false,
  isLoadingSubjectItem: false,
  error: null,
  firstName: "",
  lastName: "",
  secondname: "",
  snils: "",
  searchText: "",
  addressOptions: [],

  fetchSubjects: async () => {
    try {
      set({ isLoadingSubjects: true });
      const token = localStorage.getItem("jwt");
      const response = await axios.get(
        `${config.backServer}/api/cabinet/subjects`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({ subjects: response.data, isLoadingSubjects: false });
    } catch (error) {
      console.log(error);
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
    }
  },

  fetchSubjectItem: async (id) => {
    try {
      set({ isLoadingSubjectItem: true });
      const token = localStorage.getItem("jwt");
      const response = await axios.get(
        `${config.backServer}/api/cabinet/subjects/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      set({ subject: response.data, isLoadingSubjectItem: false });
    } catch (error) {
      console.log(error);
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
    }
  },

  submitNewSubject: async (formData) => {
    try {
      const response = await axios.post(
        `${config.backServer}/api/cabinet/subjects`,
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
        console.log(response.data);
        set((state) => ({
          subjects: [...state.subjects, response.data],
        }));
        return response.data.subject;
      } else {
      }
    } catch (error) {
      throw error;
    }
  },

  // Действие для обновления searchText
  setSearchText: (text) => set({ searchText: text }),

  // Действие для установки адресных опций
  setAddressOptions: (options) => set({ addressOptions: options }),

  // Задержанная функция для получения адресов
  debouncedFetchAddresses: debounce(async (searchText) => {
    if (!searchText) {
      get().setAddressOptions([]);
      return;
    }
    try {
      const token = localStorage.getItem("jwt");
      const response = await axios.get(
        `${config.backServer}/api/cabinet/get-fias`,
        {
          params: { searchString: searchText },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let preparingData = response.data.data.map((item) => ({
        label: (
          <Typography.Text
            style={{ width: "100%", whiteSpace: "normal" }}
            type=""
          >
            {item.value}
          </Typography.Text>
        ),
        value: item.value,
      }));
      get().setAddressOptions(preparingData);
    } catch (error) {
      console.error("Ошибка при получении адресов:", error);
      get().setAddressOptions([]);
    }
  }, 800),
}));

export default useSubjects;

// import {create} from "zustand";
// import axios from "axios";
// import config from "../../config";

// const useSubjects = create((set) => ({
//   subjects: [],
//   subject: null,
//   isLoadingSubjects: false,
//   isLoadingSubjectItem: false,
//   error: null,
//   firstName: "",
//   lastName: "",
//   secondname: "",
//   snils: "",

//   fetchSubjects: async () => {
//     try {
//       set({ isLoadingSubjects: true });
//       const token = localStorage.getItem("jwt");
//       const response = await axios.get(
//         `${config.backServer}/api/cabinet/subjects`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       set({ subjects: response.data, isLoadingSubjects: false });
//     } catch (error) {
//       console.log(error);
//       set({
//         error: error.response?.data?.message || error.message,
//         isLoading: false,
//       });
//     }
//   },

//   fetchSubjectItem: async (id) => {
//     try {
//       set({ isLoadingSubjectItem: true });
//       const token = localStorage.getItem("jwt");
//       const response = await axios.get(
//         `${config.backServer}/api/cabinet/subjects/${id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log(response.data);
//       set({ subject: response.data, isLoadingSubjectItem: false });
//     } catch (error) {
//       console.log(error);
//       set({
//         error: error.response?.data?.message || error.message,
//         isLoading: false,
//       });
//     }
//   },

//   submitNewSubject: async (formData) => {
//     try {
//       const response = await axios.post(
//         `${config.backServer}/api/cabinet/subjects`,
//         formData,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//           },
//           withCredentials: true,
//         }
//       );

//       if (response.status === 201) {
//         console.log(response.data)
//         set((state) => ({
//           subjects: [...state.subjects, response.data],
//         }));
//         return response.data.subject;
//       } else {
//       }
//     } catch (error) {
//       throw error;
//     }
//   },

// }));

// export default useSubjects;
