import axios from 'axios'
import { config } from './users'
import { apiUrl } from '../config'

const url = `${apiUrl}/targets`

const getAll = async () => {
  console.log('TARGETS trying to connect to:', url)

  const response = await axios.get(url, config())

  console.log('got all targets!')

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

export default { getAll, create, update }
