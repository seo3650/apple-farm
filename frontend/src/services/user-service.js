import axios from 'axios'
import authHeader from './auth-header'

const API_URL = '/api/auth/'

class UserService {
    getUserContent() {
        return axios.get(API_URL + 'check', { headers: authHeader() })
    }
}

export default new UserService()