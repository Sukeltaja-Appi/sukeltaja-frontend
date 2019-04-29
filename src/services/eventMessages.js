import axios from 'axios'
import axiosRetry from 'axios-retry'
import { config } from './users'
import { apiUrl } from '../config'

axiosRetry(axios, {
  retries: 5,
  retryDelay: axiosRetry.exponentialDelay
})

const url = `${apiUrl}/eventMessages`

const create = async (newObject) => {
  const response = await axios.post(url, newObject, config())

  return response.data
}

const update = async (id, updatedObject) => {
  const response = await axios.put(`${url}/${id}`, updatedObject, config())

  return response.data
}

export default { create, update }
