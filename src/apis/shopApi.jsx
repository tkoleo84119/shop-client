import axios from 'axios'

export const shop = axios.create({
  baseURL: process.env.BACKEND_URL
})
