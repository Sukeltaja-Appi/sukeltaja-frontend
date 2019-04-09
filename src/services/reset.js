import axios from 'axios'
import axiosRetry from 'axios-retry'
import { apiUrl } from '../config'

axiosRetry(axios, {
  retries: 5,
  retryDelay: axiosRetry.exponentialDelay
})

const reset = async (user) => {
  console.log('Reset service: ', user)
  const response = await axios.post(`${apiUrl}/reset`, user)

  console.log('reset service called : ' + response.data )

  return response.data
}

export default { reset }