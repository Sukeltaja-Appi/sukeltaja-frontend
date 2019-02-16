import axios from 'axios'
import axiosRetry from 'axios-retry'

axiosRetry(axios, {
  retries: 5,
  retryDelay: axiosRetry.exponentialDelay
})

let url = null

const setUrl = (newUrl) => {
  url = `${newUrl}/login`
}

const login = async (credentials) => {
  console.log(' LOGIN trying to connect to:', url)

  const response = await axios.post(url, credentials)

  console.log('login done!')

  return response.data
}

export default { login, setUrl }