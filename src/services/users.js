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
  try {
    const response = await axios.post(url, newObject)

    return response.data
  } catch (e) {
    console.log('users create error, response.data: ', e.response.data)

    return e.response.data
  }
}

const getAll = async () => {
  console.log('USERS trying to connect to:', `${url}/names`)

  const response = await axios.get(`${url}/names`, config())

  console.log('got users!')

  return response.data
}

const get = async (id) => {
  const response = await axios.get(`${url}/${id}`, config())

  return response.data
}

export default { setToken, create, get, getAll }
