import axios from 'axios'

const API_URL = 'http://localhost:8080/api/favorite'

class FavoriteService {
    getItems() {
        return axios
            .post(API_URL + '/getItems')
            .then(this.handleResponse)
            .then(res => {
                return res.data
            })

    }

    setItems(items) {
        return axios
            .post(API_URL + '/setItems', { favorites: items })
            .then(this.handleResponse)
            .then(res => {
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

export default new FavoriteService()