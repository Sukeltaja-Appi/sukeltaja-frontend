import axios from 'axios'
import axiosRetry from 'axios-retry'
import { apiUrl } from '../config'

axiosRetry(axios, {
  retries: 5,
  retryDelay: axiosRetry.exponentialDelay
})

const url = `${apiUrl}/users`
let token = null

export const config = () => {
  return {
    headers: { 'Authorization': token }
  }
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newObject) => {
  const response = await axios.post(url, newObject)

  return response.data
}

const getAll = async () => {
  console.log('USERS trying to connect to:', url)

  const response = await axios.get(url, config())

  console.log('got users!')

  return response.data
}

const get = async (id) => {
  const response = await axios.get(`${url}/${id}`, config())

  return response.data
}

export default { setToken, create, get, getAll }
