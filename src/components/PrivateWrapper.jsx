import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateWrapper = () => {
  const auth = useSelector(state => state.auth)
  return auth.isLoggedIn ? <Outlet /> : <Navigate to="login" />
}

export default PrivateWrapper
