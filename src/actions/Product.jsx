import { shop } from '../apis/shopApi'
import { GET_ALL_PRODUCTS, ERROR_STATUS } from './type'

export const getAllProducts = () => async dispatch => {
  let res
  try {
    res = await shop.get('/products')
    dispatch({ type: GET_ALL_PRODUCTS, payload: res.data })
  } catch (err) {
    dispatch({ type: ERROR_STATUS, payload: err.response.data })
  }
}
