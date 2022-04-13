import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Field } from 'react-final-form'
import { isEmail } from 'validator'

import { ERROR_STATUS, REMOVE_FROM_CART, CHANGE_PRO_NUM } from '../actions/type'
import { updateUser } from '../actions/Auth'

const Cart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cart = useSelector(state => state.cart)
  const user = useSelector(state => state.auth.user)
  const auth = useSelector(state => state.auth)
  const status = useSelector(state => state.status.status)
  const [payment, setPayment] = useState({})

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
    setPayment({
      subtotal: Object.keys(cart).reduce((acc, id) => acc + cart[id].price * cart[id].num, 0)
    })
  }, [cart])

  useEffect(() => {
    if (status === 'success') {
      navigate('/checkout', { state: { subtotal: payment.subtotal } })
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

    if (!values.address) {
      errors.address = 'Please enter a address'
    } else if (values?.address?.length > 150) {
      errors.address = 'The address must be lower than 150 characters'
    }

    if (!values.phone) {
      errors.phone = 'Please enter a phone'
    } else if (!/^09\d{2}-?\d{3}-?\d{3}$/.test(values?.phone)) {
      errors.phone = 'The phone is not a valid phone number'
    }

    return errors
  }

  const onSettingsSubmit = formValue => {
    if (Object.keys(cart).length < 1) {
      dispatch({
        type: ERROR_STATUS,
        payload: { status: 'fail', message: 'You do not have any product in your cart' }
      })
      return navigate('/')
    }

    const { name, email, phone, address } = formValue
    if (
      name !== user.name ||
      email !== user.email ||
      phone !== user.phone ||
      address !== user.address
    ) {
      return dispatch(updateUser(formValue, auth.token, auth.user._id))
    }

    navigate('/checkout', { state: { subtotal: payment.subtotal } })
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

  const productListTemplate = ({ name, image, _id, price, num, quantity }) => {
    return (
      <tr key={_id}>
        <td className="hidden pb-4 md:table-cell">
          <a href="#">
            <img src={image} className="w-20 rounded" alt="product image" />
          </a>
        </td>
        <td>
          <Link to={`/products/${_id}`}>
            <p className="mb-2">{name}</p>
          </Link>
        </td>
        <td className="mt-6 justify-center md:flex md:justify-end">
          <div className="h-10 w-20">
            <div className="relative flex h-8 w-full flex-row">
              <input
                type="number"
                defaultValue={num}
                min="1"
                max={quantity}
                onChange={e =>
                  dispatch({
                    type: CHANGE_PRO_NUM,
                    id: _id,
                    product: { ...cart[_id], num: +e.target.value }
                  })
                }
                className="w-full bg-gray-200 text-center font-semibold text-gray-700 outline-none hover:text-black focus:text-black focus:outline-none"
              />
            </div>
          </div>
        </td>
        <td className="hidden text-right md:table-cell">
          <span className="text-sm font-medium lg:text-base">${price}</span>
        </td>
        <td className="text-right">
          <span className="text-sm font-medium lg:text-base">
            ${cart[_id].price * cart[_id].num}
          </span>
        </td>
        <td className="text-right">
          <a
            className="cursor-pointer text-lg text-red-500 transition duration-200 ease-in hover:text-red-700 focus:outline-none"
            onClick={() => dispatch({ type: REMOVE_FROM_CART, id: _id })}>
            <i className="mdi mdi-trash-can-outline"></i>
          </a>
        </td>
      </tr>
    )
  }

  const renderProducts = () => {
    return Object.keys(cart).map(id => {
      return productListTemplate(cart[id])
    })
  }

  return (
    <div className="my-6 flex justify-center">
      <div className="pin-r pin-y flex w-full flex-col rounded-lg bg-white p-8 text-gray-800 shadow-lg md:w-4/5 lg:w-4/5">
        <div className="px-4">
          <div className="w-1/ mb-2 rounded-full bg-gray-100 p-4">
            <h1 className="ml-2 font-bold uppercase">Cart Details</h1>
          </div>
          <table className="w-full text-sm lg:text-base" cellSpacing={0}>
            <thead>
              <tr className="h-12 uppercase">
                <th className="hidden md:table-cell" />
                <th className="text-left">Product</th>
                <th className="pl-5 text-left lg:pl-0 lg:text-right">
                  <span className="lg:hidden" title="Quantity">
                    Qtd
                  </span>
                  <span className="hidden lg:inline">Quantity</span>
                </th>
                <th className="hidden text-right md:table-cell">Unit price</th>
                <th className="text-right">Total price</th>
              </tr>
            </thead>
            <tbody>{renderProducts()}</tbody>
          </table>
        </div>

        <hr className="mt-6 pb-6"></hr>

        <div className="px-4">
          <div className="rounded-full bg-gray-100 p-4">
            <h1 className="ml-2 font-bold uppercase">Payment Details</h1>
          </div>
          <div className="p-4">
            <p className="mb-6 italic text-red-600">
              If you spend over $1500, you can get free delivery.
            </p>
            <div className="flex justify-between">
              <div className="m-2 text-center text-lg font-bold text-gray-800 lg:px-4 lg:py-2 lg:text-xl">
                Subtotal
              </div>
              <div className="m-2 text-center font-bold text-gray-900 lg:px-4 lg:py-2 lg:text-lg">
                ${payment.subtotal}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="m-2 text-center text-lg font-bold text-gray-800 lg:px-4 lg:py-2 lg:text-xl">
                Delivery Fee
              </div>
              <div className="m-2 text-center font-bold text-gray-900 lg:px-4 lg:py-2 lg:text-lg">
                ${payment.subtotal >= 1200 ? 0 : 200}
              </div>
            </div>
            <div className="flex justify-between border-t-2 border-black pt-3">
              <div className="m-2 text-center text-lg font-bold text-gray-800 lg:px-4 lg:py-2 lg:text-xl">
                Total
              </div>
              <div className="m-2 text-center font-bold text-gray-900 lg:px-4 lg:py-2 lg:text-lg">
                ${payment.subtotal + (payment.subtotal >= 1200 ? 0 : 200)}
              </div>
            </div>
          </div>
        </div>

        <hr className="mt-2 pb-6"></hr>

        <div className="px-4">
          <div className="rounded-full bg-gray-100 p-4">
            <h1 className="ml-2 font-bold uppercase">Shipping Details</h1>
          </div>
          <Form
            onSubmit={values => onSettingsSubmit(values)}
            validate={values => validateSettings(values)}
            render={({ handleSubmit }) => (
              <form className="grid grid-cols-2 gap-6" onSubmit={handleSubmit}>
                <div className="px-5">
                  <label
                    htmlFor="name"
                    className="mt-5 block text-sm font-semibold uppercase text-gray-600">
                    Name<sup className="text-red-500">＊</sup>
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
                </div>
                <div className="px-5">
                  <label
                    htmlFor="email"
                    className="mt-5 block text-sm font-semibold uppercase text-gray-600">
                    Email<sup className="text-red-500">＊</sup>
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
                </div>
                <div className="px-5">
                  <label
                    htmlFor="phone"
                    className="mt-1 block text-sm font-semibold uppercase text-gray-600">
                    Phone<sup className="text-red-500">＊</sup>
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
                </div>
                <div className="px-5">
                  <label
                    htmlFor="address"
                    className="mt-1 block text-sm font-semibold uppercase text-gray-600">
                    Address<sup className="text-red-500">＊</sup>
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
                  <button className="item-center focus:shadow-outline mt-8 flex w-full justify-center rounded-full bg-gray-800 px-10 py-3 font-medium uppercase text-white shadow hover:bg-gray-700 focus:outline-none">
                    <span className="mt-5px ml-2">Next Step</span>
                  </button>
                </div>
              </form>
            )}
          />
        </div>
      </div>
    </div>
  )
}

export default Cart
