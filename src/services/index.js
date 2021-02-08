import axios from 'axios'
import AuthService from './auth'

const API_ENVS = {
  production: 'https://backend-treinamento-vue3-mauve.vercel.app/'
}

const httpClient = axios.create({
  baseURL: API_ENVS.production
})

export default {
  auth: AuthService(httpClient)
}
