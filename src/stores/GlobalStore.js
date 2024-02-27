// import { create } from 'zustand'
// import axios from "axios";
// import config from '../config';

// const useStore = create((set) => ({
//     global: {
//         auth: false,
//         darkMode: false,
//         isAuthModalOpen: false,
//         isCodeModalOpen: false,
//         loginError: "",
//         email: "",  
//         password: "",
//     },
//     toggleAuth: (value) => {
//         set((state) => ({
//             global: {
//                 ...state.global,
//                 auth: typeof value === 'undefined' ? !state.global.auth : value
//             }
//         }))
//     },
//     toggleDarkMode: () => {
//         set((state) => ({
//             global: {
//                 ...state.global,
//                 darkMode: !state.global.darkMode
//             }
//         }))
//     },
//     toggleModal: (modalName, value) => {
//         set((state) => ({
//             global: {
//                 ...state.global,
//                 [modalName]: typeof value === 'undefined' ? !state.global[modalName] : value,
//             }
//         }));
//     },
//     login: async (email, password) => {
//         try {
//             const response = await axios.post(`${config.backServer}/api/auth/login`, { email, password });
//             if (response.data && response.status === 200) {
//                 set((state) => ({
//                     global: {
//                         ...state.global,
//                         email,
//                         password,
//                         isCodeModalOpen: true,
//                         loginError: "",
//                     }
//                 }));
//             }
//         } catch (error) {
//             set((state) => ({
//                 global: {
//                     ...state.global,
//                     loginError: error.response?.data?.message || "Ошибка авторизации.",
//                 }
//             }));
//         }
//     },
//     verifyPincode: async (pincode) => {
//         try {
//             const response = await axios.post(`${config.backServer}/api/auth/logincode`, { pincode });
//             if (response.data && response.status === 200) {
//                 localStorage.setItem('jwt', response.data.jwt);
//                 set((state) => ({
//                     global: {
//                         ...state.global,
//                         auth: true,
//                         isCodeModalOpen: false,
//                         isAuthModalOpen: false,
//                         loginError: "",
//                     }
//                 }));
//             } else {
//                 set((state) => ({
//                     global: {
//                         ...state.global,
//                         loginError: "Неверный пинкод.",
//                     }
//                 }));
//             }
//         } catch (error) {
//             set((state) => ({
//                 global: {
//                     ...state.global,
//                     loginError: error.response?.data?.message || "Ошибка при подтверждении пинкода.",
//                 }
//             }));
//         }
//     },
    
//     logout: () => {
//         localStorage.removeItem('jwt');
//         set((state) => ({
//           global: {
//             ...state.global,
//             auth: false,
//             email: '',
//             password: '',
//           }
//         }));
//       },
// }));

// export default useStore;


import { create } from 'zustand'
import axios from "axios";
import config from '../config';

const useStore = create((set) => ({
    global: {
        auth: false,
        darkMode: false,
        isAuthModalOpen: false,
        isCodeModalOpen: false,
        loginError: "",
        email: "",  
        password: "",
        registrationStep: 0,
        phone: '', 
    },
    toggleAuth: (value) => {
        set((state) => ({
            global: {
                ...state.global,
                auth: typeof value === 'undefined' ? !state.global.auth : value
            }
        }))
    },
    toggleDarkMode: () => {
        set((state) => ({
            global: {
                ...state.global,
                darkMode: !state.global.darkMode
            }
        }))
    },
    toggleModal: (modalName, value) => {
        set((state) => ({
            global: {
                ...state.global,
                [modalName]: typeof value === 'undefined' ? !state.global[modalName] : value,
            }
        }));
    },
    login: async (email, password) => {
        try {
            const response = await axios.post(`${config.backServer}/api/auth/login`, { email, password }, {withCredentials: true});
            if (response.data && response.status === 200) {
                set((state) => ({
                    global: {
                        ...state.global,
                        email,
                        password,
                        isCodeModalOpen: true,
                        loginError: "",
                    }
                }));
            }
        } catch (error) {
            set((state) => ({
                global: {
                    ...state.global,
                    loginError: error.response?.data?.message || "Ошибка авторизации.",
                }
            }));
        }
    },
    verifyPincode: async (pincode) => {
        try {
            const response = await axios.post(`${config.backServer}/api/auth/logincode`, { pincode }, {withCredentials: true});
            if (response.data && response.status === 200) {
                localStorage.setItem('jwt', response.data.jwt);
                set((state) => ({
                    global: {
                        ...state.global,
                        auth: true,
                        isCodeModalOpen: false,
                        isAuthModalOpen: false,
                        loginError: "",
                    }
                }));
            } else {
                set((state) => ({
                    global: {
                        ...state.global,
                        loginError: "Неверный пинкод.",
                    }
                }));
            }
        } catch (error) {
            set((state) => ({
                global: {
                    ...state.global,
                    loginError: error.response?.data?.message || "Ошибка при подтверждении пинкода.",
                }
            }));
        }
    },
    
    logout: () => {
        localStorage.removeItem('jwt');
        set((state) => ({
          global: {
            ...state.global,
            auth: false,
            email: '',
            password: '',
          }
        }));
      },
}));

export default useStore;
