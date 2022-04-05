import React from 'react'

import AuthForm from '../components/AuthForm'

const Login = () => {
  const onSubmit = formValues => {
    console.log('hi')
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
