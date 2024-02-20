import create from "zustand";
const useStore = create((set) => ({
    global: {
        auth: false,
        darkMode: false
    },
    toggleAuth: () => {
        set((state) => {
            //console.log('changeAuth',state.global)
            return {
                global: {
                    ...state.global,
                    auth: !state.global.auth
                }
            }
        })
    },
    toggleDarkMode: () => {
        set((state) => {
            //console.log('changeAuth',state.global)
            return {
                global: {
                    ...state.global,
                    darkMode: !state.global.darkMode
                }
            }
        })
    }
    // addPokemons: (pokemon) =>
    //     set((state) => ({
    //         pokemons: [
    //             { name: pokemon.name, id: Math.random() * 100 },
    //             ...state.pokemons,
    //         ]
    //     })),
    // removePokemon: (id) =>
    //     set((state) => ({
    //         pokemons: state.pokemons.filter((pokemon) => pokemon.id !== id),
    // })),
}));
export default useStore;