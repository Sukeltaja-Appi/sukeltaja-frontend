import axios from 'axios'
import axiosRetry from 'axios-retry'
import { config } from './users'
import { apiUrl } from '../config'

axiosRetry(axios, {
  retries: 5,
  retryDelay: axiosRetry.exponentialDelay
})

const url = `${apiUrl}/events`

const getAll = async () => {
  console.log('EVENTS trying to connect to:', url)

  const response = await axios.get(url, config())

  console.log('got all events!')

  return response.data
}

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

const acceptEventInvite = async (id) => {
  const response = await axios.put(`${url}/${id}/add`, {}, config())

  return response.data
}

export default { getAll, get, create, update, acceptEventInvite }
