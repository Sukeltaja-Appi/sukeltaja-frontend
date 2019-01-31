import axios from 'axios'
import { API_URL } from 'react-native-dotenv'

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
  const response = await axios.get(url)
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
