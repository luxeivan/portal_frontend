import create from 'zustand'
import axios from 'axios'
import config from "../../config";

const useSubjects = create((set) => ({
  subjects: [],
  isLoading: false,
  error: null,

  fetchSubjects: async () => {
    try {
      set({ isLoading: true });
      const token = localStorage.getItem('jwt');
      const response = await axios.get(`${config.backServer}/api/cabinet/subjects`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
      set({ subjects: response.data, isLoading: false });
    } catch (error) {
      console.log(error); 
      set({ error: error.response?.data?.message || error.message, isLoading: false });
    }
  }
  
}))

export default useSubjects