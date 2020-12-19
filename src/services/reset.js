import axios from 'axios'
import axiosRetry from 'axios-retry'
import { apiUrl } from '../config'
import { config } from './users'

axiosRetry(axios, {
  retries: 5,
  retryDelay: axiosRetry.exponentialDelay
})

const reset = async (user) => {

  try {
    console.log('Trying reset service for: ', user)
    const response = await axios.post(`${apiUrl}/reset`, user)

    console.log('Reset succeeded : ' + response.data )

    return response.data
  } catch (exception){
    console.log(exception._message)

    console.log('reset service failed : ' + exception )

    return ({ error: 'Reset failed' })
  }
}

const change = async (user) => {

  try {
    console.log('Trying reset service for: ', user)
    const response = await axios.put(`${apiUrl}/reset/change`, user, config())

    console.log('Reset succeeded : ' + response.data )

    return response.data
  } catch (exception){
    console.log(exception._message)

    console.log('reset service failed : ' + exception )

    return ({ error: 'Reset failed' })
  }
}

export default { reset, change }