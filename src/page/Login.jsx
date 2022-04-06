import _ from 'lodash'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import AuthForm from '../components/AuthForm'
import { logIn } from '../actions/Auth'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth = useSelector(state => state.auth)
  const status = useSelector(state => state.status.status)

  useEffect(() => {
    if (status === 'success') {
      setTimeout(() => {
        localStorage.setItem('auth', JSON.stringify(_.omit(auth, 'user'))) // Not storage user info in localStorage
        navigate('/')
      }, 1500)
    }
  }, [status])

  const onSubmit = formValues => {
    dispatch(logIn(formValues))
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-5 font-sans antialiased">
      <div className="mx-5 mb-5 flex flex-col justify-center space-y-8 sm:m-auto sm:w-96">
        <h1 className="text-center text-4xl font-bold text-red-800">
          E<span className="text-white">Shop</span>
        </h1>
        <AuthForm
          onSubmit={onSubmit}
          title={'LogIn to your account'}
          button={'Login'}
          upperString={'Enter your email'}
          lowerString={'Create new account'}
          lowerURL={'/signUp'}
          inputArr={['email', 'password']}
          forgetPassword={true}
        />
      </div>
    </div>
  )
}

export default Login
