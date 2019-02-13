import axios from 'axios'
import { API_URL } from 'react-native-dotenv'
import axiosRetry from 'axios-retry'

console.log('EVENTS trying to connect to:', API_URL)

axiosRetry(axios, {
  retries: 5,
  retryDelay: axiosRetry.exponentialDelay
})

const url = `${API_URL}/events`

let token = null

const config = () => {
  return {
    headers: { 'Authorization': token }
  }
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(url, config())

  console.log('got all events!')

  return response.data
}

const create = async (newObject) => {
  const response = await axios.post(url, newObject, config())

  return response.data
}

const update = async (id, updatedObject) => {
  const response = await axios.put(`${url}/${id}`, updatedObject, config())

  return response.data
}

export default { getAll, create, setToken, update }
