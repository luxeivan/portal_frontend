import create from 'zustand'
import axios from 'axios'
import config from "../../config";

const useSubjects = create((set) => ({
  subjects: [],
  subject: null,
  isLoadingSubjects: false,
  isLoadingSubjectItem: false,
  error: null,

  fetchSubjects: async () => {
    try {
      set({ isLoadingSubjects: true });
      const token = localStorage.getItem('jwt');
      const response = await axios.get(`${config.backServer}/api/cabinet/subjects`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // console.log(response.data);
      set({ subjects: response.data, isLoadingSubjects: false });
    } catch (error) {
      console.log(error); 
      set({ error: error.response?.data?.message || error.message, isLoading: false });
    }
  },
  fetchSubjectItem: async (id) => {
    try {
      set({ isLoadingSubjectItem: true });
      const token = localStorage.getItem('jwt');
      const response = await axios.get(`${config.backServer}/api/cabinet/subjects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // console.log(response.data);
      set({ subject: response.data, isLoadingSubjectItem: false });
    } catch (error) {
      console.log(error); 
      set({ error: error.response?.data?.message || error.message, isLoading: false });
    }
  }
  
}))

export default useSubjects