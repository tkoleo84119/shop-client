import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Field } from 'react-final-form'
import { useNavigate } from 'react-router-dom'
import { isEmail } from 'validator'

import { updatePassword, updateUser } from '../actions/Auth'

const ProfileRight = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const status = useSelector(state => state.status.status)
  const user = useSelector(state => state.auth.user)
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    if (status === 'success') {
      setTimeout(() => {
        navigate('/')
      }, 1500)
    }
  }, [status])

  const validateSettings = values => {
    const errors = {}

    if (!user?.name && !values.name) {
      errors.name = 'Please enter a name'
    } else if (values?.name?.length > 30) {
      errors.name = 'The name must be lower than 30 characters'
    }

    if (!user?.email && !values.email) {
      errors.email = 'Please enter a email'
    } else if (values?.email && !isEmail(values?.email)) {
      errors.email = 'Invalid email, please enter a valid email'
    }

    if (values?.address?.length > 150) {
      errors.address = 'The address must be lower than 150 characters'
    }

    if (values.phone && !/^09\d{2}-?\d{3}-?\d{3}$/.test(values?.phone)) {
      errors.phone = 'The phone is not a valid number'
    }

    return errors
  }

  const validatePassword = values => {
    const errors = {}

    if (!values.passwordCurrent) {
      errors.passwordCurrent = 'Please enter a current password'
    } else if (values?.password?.length < 8) {
      errors.passwordCurrent = 'Your current password must be at least 8 characters'
    }

    if (!values.password) {
      errors.password = 'Please enter a password'
    } else if (values?.password?.length < 8) {
      errors.password = 'Your password must be at least 8 characters'
    }

    if (!values.passwordConfirm) {
      errors.passwordConfirm = 'Please enter a passwordConfirm'
    } else if (values?.passwordConfirm?.length < 8) {
      errors.passwordConfirm = 'Your passwordConfirm must be at least 8 characters'
    }

    return errors
  }

  const onSettingsSubmit = formValue => {
    dispatch(updateUser(formValue, auth.token, auth.user._id))
  }

  const onPasswordSubmit = formValue => {
    dispatch(updatePassword(formValue, auth.token))
  }

  const inputTemplate = ({ input, placeholder, id, meta }) => {
    const className = `mt-2 w-full rounded border-2 px-3 py-2 ${
      meta.error && meta.touched ? 'border-red-400' : 'focus:border-blue-400'
    } focus:shadow focus:outline-none`

    return (
      <div>
        <input
          {...input}
          id={id}
          className={className}
          placeholder={placeholder}
          autoComplete="off"
        />
        {renderError(meta)}
      </div>
    )
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

  return (
    <div className="h-full min-h-screen w-full rounded-r-3xl bg-white">
      <Form
        onSubmit={values => onSettingsSubmit(values)}
        validate={values => validateSettings(values)}
        render={({ handleSubmit }) => (
          <form className="mx-auto w-2/3" onSubmit={handleSubmit}>
            <h2 className="pb-5 pt-10 text-xl font-semibold uppercase text-red-500">
              Your Account Setting
            </h2>
            <div>
              <label
                htmlFor="name"
                className="mt-2 block text-sm font-semibold uppercase text-gray-600">
                Name
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                defaultValue={user?.name}
                component={inputTemplate}
                required
              />
              <label
                htmlFor="email"
                className="mt-2 block text-sm font-semibold uppercase text-gray-600">
                Email
              </label>
              <Field
                id="email"
                type="email"
                name="email"
                defaultValue={user?.email}
                placeholder="E-mail"
                component={inputTemplate}
                required
              />
              <label
                htmlFor="phone"
                className="mt-2 block text-sm font-semibold uppercase text-gray-600">
                Phone
              </label>
              <Field
                id="phone"
                type="text"
                name="phone"
                placeholder="0912345678"
                defaultValue={user?.phone}
                component={inputTemplate}
                required
              />
              <label
                htmlFor="address"
                className="mt-2 block text-sm font-semibold uppercase text-gray-600">
                Address
              </label>
              <Field
                id="address"
                type="text"
                name="address"
                placeholder="Address"
                defaultValue={user?.address}
                component={inputTemplate}
                required
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="mt-6 rounded-xl bg-gray-900 p-3 font-medium uppercase tracking-widest text-white shadow-lg hover:bg-red-700 hover:shadow-none focus:outline-none">
                  Change settings
                </button>
              </div>
            </div>
          </form>
        )}
      />

      <hr className="mx-auto mt-7 mb-4 w-11/12 border-gray-300" />

      <Form
        onSubmit={values => onPasswordSubmit(values)}
        validate={values => validatePassword(values)}
        render={({ handleSubmit }) => (
          <form className="mx-auto w-2/3" onSubmit={handleSubmit}>
            <h2 className="pb-5 pt-10 text-xl font-semibold uppercase text-red-500">
              Your Password Setting
            </h2>
            <div>
              <label
                htmlFor="passwordCurrent"
                className="mt-2 block text-sm font-semibold uppercase text-gray-600">
                Current Password
              </label>
              <Field
                id="passwordCurrent"
                type="password"
                name="passwordCurrent"
                placeholder="Current Password"
                component={inputTemplate}
                required
              />
              <label
                htmlFor="password"
                className="mt-2 block text-sm font-semibold uppercase text-gray-600">
                Password
              </label>
              <Field
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                component={inputTemplate}
                required
              />
              <label
                htmlFor="passwordConfirm"
                className="mt-2 block text-sm font-semibold uppercase text-gray-600">
                Password Confirm
              </label>
              <Field
                id="passwordConfirm"
                type="password"
                name="passwordConfirm"
                placeholder="PasswordConfirm"
                component={inputTemplate}
                required
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="my-6 rounded-xl bg-gray-900 p-3 font-medium uppercase tracking-widest text-white shadow-lg hover:bg-red-700 hover:shadow-none focus:outline-none">
                  Change password
                </button>
              </div>
            </div>
          </form>
        )}
      />
    </div>
  )
}

export default ProfileRight
