import { create } from "zustand";
import axios from "axios";
import config from "../../config";

const useSubjects = create((set, get) => ({
  subjects: [],
  subject: null,
  isLoadingSubjects: false,
  isLoadingSubjectItem: false,
  error: null,
  showModalView: false,
  showModalAdd: false,

  showSubject: async (id = false) => {
    if (id !== false) {
      console.log(id)
      await get().fetchSubjectItem(id)
      set({ showModalView: true });
    }else{

      set({ showModalView: false, subject: null });
    }
  },

  setShowModalView: (show) => {
    set({ showModalView: show });
  },

  setShowModalAdd: (show) => {
    set({ showModalAdd: show });
  },

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
    return new Promise(async function (resolve, reject) {
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
        set({ subject: response.data, isLoadingSubjectItem: false });
        resolve()
      } catch (error) {
        console.log(error);
        set({
          error: error.response?.data?.message || error.message,
          isLoading: false,
        });
        reject()
      }
    })
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
        //console.log(response.data);
        set((state) => ({
          subjects: [...state.subjects, response.data],
        }));
        return response.data.subject;
      }
    } catch (error) {
      console.log(error)
      throw error;
    }
  },


  deleteSubjectItem: async (id) => {
    try {
      set({ isLoadingSubjectItem: true });
      const token = localStorage.getItem("jwt");
      const response = await axios.delete(
        `${config.backServer}/api/cabinet/subjects/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set((state) => ({ subjects: state.subjects.filter(item => item.id !== id) }));
    } catch (error) {
      console.log(error);
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
    }
  },
}));

export default useSubjects;

