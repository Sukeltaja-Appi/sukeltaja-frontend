import axios from 'axios'
import { API_URL } from 'react-native-dotenv'
import axiosRetry from 'axios-retry'

console.log('LOGIN trying to connect to:', API_URL)

axiosRetry(axios, {
  retries: 5,
  retryDelay: axiosRetry.exponentialDelay
})

const url = `${API_URL}/login`

const login = async (credentials) => {
  const response = await axios.post(url, credentials)

  console.log('login done!')

  return response.data
}

export default { login }