import axios from 'axios'
import axiosRetry from 'axios-retry'
import { apiUrl } from '../config'

axiosRetry(axios, {
  retries: 5,
  retryDelay: axiosRetry.exponentialDelay
})

const url = `${apiUrl}/login`

const login = async (credentials) => {
  console.log('LOGIN trying to connect to:', url)

  const response = await axios.post(url, credentials)

  return response.data
}

export default { login }
