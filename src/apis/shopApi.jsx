import axios from 'axios'

export const shop = axios.create({
  baseUrl: 'http://localhost:3000/api/v1'
})
