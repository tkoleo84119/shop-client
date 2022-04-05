import { LOGIN } from '../actions/type'

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return { isLoggedIn: true, token: action.payload.token, user: action.payload.data.user }
    default:
      return state
  }
}
