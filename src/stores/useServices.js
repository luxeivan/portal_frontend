import { create } from 'zustand'
import config from "../config";
import axios from "axios";

const useServices = create((set, get) => ({
    services: [],
    filteredServices: [],
    chain: [],
    serviceItem: null,
    isLoading: false,

    fetchServices: async (key = "00000000-0000-0000-0000-000000000000") => {
        set({ services: [], isLoading: true });
        try {
            const res = await Promise.all([
                axios.get(`${config.backServer}/api/services/${key}`),
                axios.get(`${config.backServer}/api/services/item/${key}`)
            ]);
            set({
                services: res[0].data.value,
                serviceItem: res[1].data.value[0],
                isLoading: false
            });
            get().filterServices();
        } catch (error) {
            console.error(error);
            set({ isLoading: false });
        }
    },
    
    filterServices: () => {
        const services = get().services;
        const savedValues = JSON.parse(localStorage.getItem("userCategories")) || ['Физические лица', 'Юридические лица', 'Индивидуальные предприниматели'];

        const filtered = services.filter((service) => {
            return savedValues.some((category) => {
                if (
                    category === "Физические лица" &&
                    service.Description.includes("Для физических лиц")
                ) {
                    return true;
                }
                if (
                    category === "Юридические лица" &&
                    service.Description.includes("Для юридических лиц")
                ) {
                    return true;
                }
                if (
                    category === "Индивидуальные предприниматели" &&
                    service.Description.includes("Для индивидуальных предпринимателей")
                ) {
                    return true;
                }
                return false;
            });
        });

        set({ filteredServices: filtered });
    },

    fetchServiceChain: async (key) => {
        let chain = [];
        async function getService(key) {
            const res = await axios.get(`${config.backServer}/api/services/item/${key}`);
            chain.push({ Description: res.data.value[0]?.Description, Ref_Key: res.data.value[0]?.Ref_Key });
            if (res.data.value[0]?.Parent_Key && res.data.value[0].Parent_Key !== "00000000-0000-0000-0000-000000000000") {
                await getService(res.data.value[0].Parent_Key);
            }
        }
        try {
            await getService(key);
            chain.push({ Description: "Каталог услуг", Ref_Key: "" });
            chain.reverse().pop();
            set({ chain });
        } catch (error) {
            console.error(error);
        }
    },
}));

export default useServices;



// import { create } from 'zustand'
// import config from "../config";
// import axios from "axios";

// const useServices = create((set) => ({
//     services: [],
//     chain: [],
//     serviceItem: null,
//     isLoading: false,

//     // fetchServices: async (url, type) => {
//     //     set((state) => ({ services: [] }))
//     //     const res = await axios.get(`${config.apiServer}/api/${url}?populate[0]=icon&populate[1]=filters&pagination[pageSize]=100&sort=sort`)
//     //     set((state) => {
//     //         return {
//     //             services: res.data.data
//     //         }
//     //     })
//     // },
//     // fetchServiceItem: async (url, id) => {
//     //     set((state) => ({ serviceItem: null }))
//     //     const res = await axios.get(`${config.apiServer}/api/${url}/${id}?populate[0]=fields&populate[1]=icon&populate[2]=fields.common&populate[3]=steps&populate[4]=filters`)
//     //     set((state) => {
//     //         return {
//     //             serviceItem: res.data.data
//     //         }
//     //     })
//     // },

//     fetchServices: async (key = "00000000-0000-0000-0000-000000000000") => {
//         set((state) => ({ services: [], isLoading: true }))
//         try {
//             const res = await Promise.all([axios.get(`${config.backServer}/api/services/${key}`), axios.get(`${config.backServer}/api/services/item/${key}`)])
//             // const res = await axios.get(`${config.backServer}/api/services/${key}`)
//             // console.log(res)
//             set((state) => {
//                 return {
//                     services: res[0].data.value,
//                     serviceItem: res[1].data.value[0],
//                     isLoading: false
//                 }
//             })
//         } catch (error) {
//             console.log(error)
//         }
//     },
//     fetchServiceItem: async (key) => {
//         set((state) => ({ serviceItem: null, isLoading: true }))
//         try {
//             const res = await axios.get(`${config.backServer}/api/services/item/${key}`)
//             // console.log(res)
//             set((state) => {
//                 return {
//                     serviceItem: res.data.value[0],
//                     isLoading: false
//                 }
//             })
//         } catch (error) {
//             console.log(error)
//         }
//     },
//     fetchServiceChain: async (key) => {
//         // set((state) => ({ serviceItem: null, isLoading: true }))
//         let chain = []
//         async function getService(key) {
//             const res = await axios.get(`${config.backServer}/api/services/item/${key}`)
//             // console.log(res.data)
//             chain.push({ Description: res.data.value[0]?.Description, Ref_Key: res.data.value[0]?.Ref_Key })
//             if (res.data.value[0]?.Parent_Key && res.data.value[0].Parent_Key !== "00000000-0000-0000-0000-000000000000") {
//                 await getService(res.data.value[0].Parent_Key)
//             }
//         }
//         try {
//             await getService(key)
//             chain.push({ Description: "Каталог услуг", Ref_Key: "" })
//             chain.reverse().pop()
//             set((state) => {
//                 return {
//                     chain
//                 }
//             })
//         } catch (error) {
//             console.log(error)
//         }
//     },

// }));
// export default useServices;
