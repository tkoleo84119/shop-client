import { configureStore } from '@reduxjs/toolkit'

import { authReducer as auth } from './reducers/authReducer'
import { statusReducer as status } from './reducers/statusReducer'
import { productReducer as products } from './reducers/productReducer'

const preloadedAuthState = () => {
  const auth = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {}
  return auth
}

export default configureStore({
  reducer: { auth, status, products },
  preloadedState: {
    auth: preloadedAuthState()
  }
})
