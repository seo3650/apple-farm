import AuthService from '../services/auth-service'

const user = JSON.parse(localStorage.getItem('user'))
const initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: { loggedIn: false }, user: null }

export const auth = {
    namespaced: true,
    state: initialState,
    actions: {
        login ({ commit }, user) {
            return AuthService.login(user).then(
                user => {
                    commit('loginSuccess', user)
                    return Promise.resolve(user)
                },
                error => {
                    commit('loginFailure')
                    return Promise.reject(error.response.data)
                }
            )
        }, logout({ commit }) {
            AuthService.logout()
            commit('logout')
        }, signUp({ commit }, user) {
            return AuthService.register(user).then(
                res => {
                    commit('signUpSuccess', user)
                    return Promise.resolve(res.data)
                }, 
                error => {
                    commit('signUpFailure')
                    return Promise.reject(error.response.data)
                }
            )
        }, changePW({ commit }, user) {
            return AuthService.changePW(user).then(
                () => {
                    commit("logout")
                },
                error => {
                    return Promise.reject(error.response.data)
                }
            )
        }, withdrawal({ commit }, user) {
            return AuthService.withdrawal(user).then(
                () => {
                    commit('logout')
                },
                error => {
                    return Promise.reject(error.response.data)
                }
            )
        }
    },
    mutations: {
        loginSuccess(state, user) {
            state.status = { loggedIn: true }
            state.user = user
        },
        loginFailure(state) {
            state.status = {}
            state.user = null
        },
        logout(state) {
            state.status = {}
            state.user = null
        },
        signUpSuccess(state, user) {
            state.status = { loggedIn: true }
            state.user = user
        },
        signUpFailure(state) {
            state.status = {}
        }
    }
}