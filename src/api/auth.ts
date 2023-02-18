import axios, { AxiosError } from 'axios'
import { LoginData, Response } from '../types/response'

const api = axios.create({
  baseURL: 'http://localhost:3000',
})

const login = async (username: string, password: string) => {
  const { data } = await api.post('/auth/login', {
    username,
    password,
  })
  return data

}

export default {
  login,
}