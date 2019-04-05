import axios from 'axios'
import { config } from './users'
import { apiUrl } from '../config'

const url = `${apiUrl}/messages`

const getAll = async () => {
  console.log('MESSAGES trying to connect to:', url)

  const response = await axios.get(url, config())

  console.log('got all messages!')

  return response.data
}

//unncecessary
const get = async (id) => {
  const response = await axios.get(`${url}/${id}`, config())

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

const checkMessage = async (id, status) => {
  const response = await axios.put(`${url}/${id}`, { status }, config())

  return response.data
}

export default { create, update, getAll, get, checkMessage }
