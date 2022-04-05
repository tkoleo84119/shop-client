import { shop } from '../apis/shopApi'
import { LOGIN, ERROR_STATUS, SUCCESS_STATUS } from './type'

export const logIn = formValues => async dispatch => {
  let res
  try {
    res = await shop.post('/users/signin', { ...formValues })
    dispatch({ type: LOGIN, payload: res.data })
    dispatch({ type: SUCCESS_STATUS, payload: res.data })
  } catch (err) {
    dispatch({ type: ERROR_STATUS, payload: err.response.data })
  }
}
