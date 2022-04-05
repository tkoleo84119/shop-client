import { shop } from '../apis/shopApi'
import { LOGIN } from './type'

export const logIn = formValues => async dispatch => {
  let res
  try {
    res = await shop.post('/users/signin', { ...formValues })
    dispatch({ type: LOGIN, payload: res.data })
  } catch (err) {
    console.log(err)
  }
}
