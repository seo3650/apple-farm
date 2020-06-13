import axios from 'axios'

const API_URL = 'http://localhost:8080/api/auth/'

class AuthService {
    login(user) {
        return axios
            .post(API_URL + '/login/local', {
                user: {
                id: user.id,
                password: user.password
            }})
            .then(this.handleResponse)
            .then(res => {
                if (res.data.access_token) {
                    localStorage.setItem('user', JSON.stringify(res.data))
                }
                return res.data
            })
    }
    
    logout() {
        axios.post(API_URL + 'logout')
        localStorage.removeItem('user')
    }

    register(user) {
        return axios.post(API_URL + 'register/local', {
            user: {
                id: user.id,
                password: user.password,
                name: user.name,
            }
        })
        .then(this.handleResponse)
        .then(res => {
            if (res.data.access_token) {
                localStorage.setItem('user', JSON.stringify(res.data))
            }
            return res.data
        })
    }

    handleResponse(res) {
        if (res.status === 401) {
            this.logout()
            location.reload(true)

            const error = res.data && res.data.message
            return Promise.reject(error)
        }

        return Promise.resolve(res)
    }
}

export default new AuthService()