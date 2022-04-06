import { shop } from '../apis/shopApi'
import { LOGIN, LOGOUT, GET_CURRENT_USER, ERROR_STATUS, SUCCESS_STATUS } from './type'

export const signUp = formValues => async dispatch => {
  let res
  try {
    res = await shop.post('/users/signup', { ...formValues })
    dispatch({ type: SUCCESS_STATUS, payload: res.data })
  } catch (err) {
    dispatch({ type: ERROR_STATUS, payload: err.response.data })
  }
}

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

export const getCurrentUser = token => async dispatch => {
  let res
  try {
    res = await shop.get('/users/currentUser', { headers: { Authorization: `Bearer ${token}` } })
    dispatch({ type: GET_CURRENT_USER, payload: res.data })
  } catch (err) {
    dispatch({
      type: ERROR_STATUS,
      payload: { status: 'error', message: 'Something wrong, please login again' }
    })
    dispatch({ type: LOGOUT })
    localStorage.removeItem('auth')
  }
}
