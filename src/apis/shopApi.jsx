import axios from 'axios'

export const shop = axios.create({
  baseURL: 'http://localhost:3000/api/v1'
})
