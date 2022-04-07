import { configureStore } from '@reduxjs/toolkit'

import { authReducer as auth } from './reducers/authReducer'
import { statusReducer as status } from './reducers/statusReducer'
import { productReducer as products } from './reducers/productReducer'
import { paramsReducer as params } from './reducers/paramsReducer'
import { pageReducer as page } from './reducers/pageReducer'
import { orderReducer as orders } from './reducers/orderReducer'
import { cartReducer as cart } from './reducers/cartReducer'

const preloadedAuthState = () => {
  const auth = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {}
  return auth
}

const preloadedCartState = () => {
  const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {}
  return cart
}

export default configureStore({
  reducer: { auth, status, products, cart, params, page, orders },
  preloadedState: {
    auth: preloadedAuthState(),
    cart: preloadedCartState()
  }
})
