import axios from 'axios'

export const shop = axios.create({
  baseURL: 'https://kerwin-eshop.herokuapp.com/api/v1'
})
