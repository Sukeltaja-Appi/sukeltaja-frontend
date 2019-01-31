import axios from 'axios'
import { API_URL } from 'react-native-dotenv'

const url = `${API_URL}/login`

const login = async (credentials) => {
  const response = await axios.post(url, credentials)
  return response.data
}

export default { login }