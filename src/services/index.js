import axios from 'axios'
import router from '../router'
import { setGlobalLoading } from '../store/global'
import AuthService from './auth'
import UsersService from './users'

const API_ENVS = {
  production: 'https://backend-treinamento-vue3.vercel.app/'
}

const httpClient = axios.create({
  baseURL: API_ENVS.production
})

httpClient.interceptors.request.use(config => {
  setGlobalLoading(true)
  const token = window.localStorage.getItem('token')

  if (token) {
    config.headers.common.Authorization = `Bearer ${token}`
  }

  return config
})

httpClient.interceptors.response.use(
  response => {
    setGlobalLoading(false)
    return response
  },
  error => {
    const canThrowAnError = [0, 500].includes(error.request.status)

    if (canThrowAnError) {
      setGlobalLoading(false)
      throw new Error(error.message)
    }

    if (error.response.status === 401) {
      router.push({ name: 'Home' })
    }

    setGlobalLoading(false)
    return error
  }
)

export default {
  auth: AuthService(httpClient),
  users: UsersService(httpClient)
}
