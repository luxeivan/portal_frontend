import create from "zustand";
import axios from "axios";
import config from "../../config";

const useSubjects = create((set) => ({
  subjects: [],
  subject: null,
  isLoadingSubjects: false,
  isLoadingSubjectItem: false,
  error: null,
  firstName: "",
  lastName: "",
  surname: "",

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

  submitNewSubject: async (firstName, lastName, surname) => {
    try {
      const response = await axios.post(
        `${config.backServer}/api/cabinet/subjects`,
        { firstName, lastName, surname },
        { withCredentials: true }
      );
      if (response.data.status === "ok") {
        set(() => ({
          firstName,
          lastName,
          surname,
          // emailSubmitted: true,
          // codeRequestedEmail: true,
        }));
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Ошибка при создании нового субъекта", error);
    }
  },
}));

export default useSubjects;
