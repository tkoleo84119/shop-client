import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { forgetPassword } from '../actions/Auth'
import AuthForm from '../components/AuthForm'

const ForgetPassword = () => {
  const status = useSelector(state => state.status.status)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onSubmit = formValues => {
    dispatch(forgetPassword(formValues))
  }

  useEffect(() => {
    if (status === 'success') {
      setTimeout(() => {
        navigate('/login')
      }, 1500)
    }
  }, [status])

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-5 font-sans antialiased">
      <div className="mx-5 mb-5 flex flex-col justify-center space-y-8 sm:m-auto sm:w-96">
        <h1 className="text-center text-4xl font-bold text-red-800">
          E<span className="text-white">Shop</span>
        </h1>
        <AuthForm
          onSubmit={onSubmit}
          title={'Send password reset email'}
          button={'Submit'}
          upperString={'Enter your email'}
          lowerString={'login your account'}
          lowerURL={'/login'}
          inputArr={['email']}
        />
      </div>
    </div>
  )
}

export default ForgetPassword
