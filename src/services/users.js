import axios from 'axios'
import axiosRetry from 'axios-retry'

axiosRetry(axios, {
  retries: 5,
  retryDelay: axiosRetry.exponentialDelay
})

let url = null

let token = null

const config = () => {
  return {
    headers: { 'Authorization': token }
  }
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const setUrl = (newUrl) => {
  url = `${newUrl}/users`
}

const create = async (newObject) => {
  const response = await axios.post(url, newObject)

  console.log(config()) //Koska lint... (config tulee varmasti tarpeen myöhemmin)

  return response.data
}

export default { setToken, setUrl, create }
