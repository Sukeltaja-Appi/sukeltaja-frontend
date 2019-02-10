import axios from 'axios'
import { API_URL } from 'react-native-dotenv'
import axiosRetry from 'axios-retry'

console.log('TARGETS trying to connect to:', API_URL)

axiosRetry(axios, {
  retries: 5,
  retryDelay: axiosRetry.exponentialDelay
})

const url = `${API_URL}/targets`

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

  console.log('got all targets!')

  return response.data
}

// const create = async (newObject) => {
//   const response = await axios.post(url, newObject, config())
//
//   return response.data
// }
//
// const update = async (id, updatedObject) => {
//   const response = await axios.put(`${url}/${id}`, updatedObject, config())
//
//   return response.data
// }

const testData = [
  {
    id: "j1h24123fds",
    name: "Kohde1",
    type: "Laiva",
    depth: 30,
    latitude: 60.3,
    longitude: 25.3
  },
  {
    id: "f8sg7ajafj",
    name: "Kohde2",
    type: "Sukellusvene",
    depth: 50,
    latitude: 60.02,
    longitude: 25.02
  },
]

const getAllTest = () => {
  console.log('got all test targets!')
  return testData
}

export default { getAll, setToken, getAllTest }
