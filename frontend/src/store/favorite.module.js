import FavoriteService from '../services/favorite-service'

const initialState = [
    {
        name: "Airpod",
        selected: true,
    },
    {
        name: "iMac",
        selected: false,
    },
    {
        name: "iPad",
        selected: false,
    },
    {
        name: "iPhone",
        selected: false,
    },
    {
        name: "Macbook",
        selected: false,
    },
    {
        name: "MacPro",
        selected: false,
    },
    {
        name: "Watch",
        selected: false,
    },
]

export const favorite = {
    namespaced: true,
    state: initialState,
    actions: {
        getItems ({ commit }) {
            return FavoriteService.getItems().then(
                (favorites) => {
                    commit('getItemSuccess', favorites.favorites)
                    return Promise.resolve(favorites.favorites)
                },
                error => {
                    return Promise.reject(error.response.data)
                }
            )
        },
        setItems ({ commit }, items) {
            return FavoriteService.setItems(items).then(
                (favorites) => {
                    commit('setItemSuccess', favorites.favorites)
                    return Promise.resolve(favorites.favorites)
                },
                error => {
                    return Promise.reject(error.response.data)
                }
            )
        }
    },
    mutations: {
        getItemSuccess (state, favorites) {
            state = favorites
        },
        setItemSuccess (state, favorites) {
            state = favorites
        },
    },
}