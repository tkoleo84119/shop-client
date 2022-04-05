import { configureStore } from '@reduxjs/toolkit'

import { authReducer as auth } from './reducers/authReducer'

export default configureStore({
  reducer: { auth }
})
