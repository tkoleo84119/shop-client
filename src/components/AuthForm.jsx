import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Field } from 'react-final-form'
import { isEmail } from 'validator'

const AuthForm = ({
  onSubmit,
  button,
  title,
  upperString,
  lowerString,
  lowerURL,
  inputArr,
  forgetPassword = false
}) => {
  const validate = values => {
    const errors = {}

    if (inputArr.includes('name') && !values.name) {
      errors.name = 'Please enter a name'
    } else if (values?.name?.length > 30) {
      errors.name = 'The name must be lower than 30 characters'
    }

    if (inputArr.includes('email') && !values.email) {
      errors.email = 'Please enter a email'
    } else if (!isEmail(values?.email)) {
      errors.email = 'Invalid email, please enter a valid email'
    }

    if (inputArr.includes('password') && !values.password) {
      errors.password = 'Please enter a password'
    } else if (values?.password?.length < 8) {
      errors.password = 'Your password must be at least 8 characters'
    }

    if (inputArr.includes('passwordConfirm') && !values.passwordConfirm) {
      errors.passwordConfirm = 'Please enter a passwordConfirm'
    } else if (values?.passwordConfirm?.length < 8) {
      errors.passwordConfirm = 'Your passwordConfirm must be at least 8 characters'
    }

    return errors
  }

  const inputTemplate = ({ input, placeholder, meta }) => {
    const className = `w-full rounded border-2 px-3 py-2 ${
      meta.error && meta.touched ? 'border-red-400' : 'focus:border-blue-400'
    } focus:shadow focus:outline-none`

    return (
      <div>
        <input {...input} className={className} placeholder={placeholder} autoComplete="off" />
        {renderError(meta)}
      </div>
    )
  }

  const inputType = {
    email: 'email',
    password: 'password',
    passwordConfirm: 'password'
  }

  const renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div>
          <span className="text-xs text-red-500">{error}</span>
        </div>
      )
    }
  }

  const renderInput = inputArr => {
    return inputArr.map(input => {
      return (
        <div className="flex flex-col space-y-1" key={input}>
          <Field
            type={inputType[input] ? inputType[input] : 'text'}
            name={input}
            component={inputTemplate}
            placeholder={`${input[0].toUpperCase()}${input.substring(1)}`}
          />
        </div>
      )
    })
  }

  const renderForget = () => {
    if (forgetPassword) {
      return (
        <div className="items-center text-xs">
          <Link
            to="/forgetPassword"
            className="inline-block text-blue-500 hover:text-blue-800 hover:underline">
            Forgot your password?
          </Link>
        </div>
      )
    }

    return null
  }

  return (
    <Form
      onSubmit={values => onSubmit(values)}
      validate={values => validate(values)}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-6 rounded-lg bg-white p-10 shadow">
            <h1 className="text-center text-xl font-bold">{title}</h1>
            <div className="mt-4 flex items-center justify-between">
              <span className="w-1/5 border-b md:w-1/4"></span>
              <span className="text-xs uppercase text-gray-500">{upperString}</span>
              <span className="w-1/5 border-b md:w-1/4"></span>
            </div>
            {renderInput(inputArr)}
            {renderForget()}
            <button
              type="submit"
              className="rounded bg-blue-500 px-5 py-2 font-bold text-white shadow transition-colors hover:bg-blue-700 focus:outline-none">
              {button}
            </button>
            <div className="mt-4 flex items-center justify-between">
              <span className="w-1/5 border-b md:w-1/4"></span>
              <Link to={lowerURL} className="text-xs uppercase text-gray-500 hover:text-gray-800">
                {lowerString}
              </Link>
              <span className="w-1/5 border-b md:w-1/4"></span>
            </div>
          </div>
        </form>
      )}
    />
  )
}

export default AuthForm
