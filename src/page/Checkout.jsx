import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { useStripe } from '@stripe/react-stripe-js'

import { checkout } from '../actions/Order'

const Checkout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const stripe = useStripe()
  const { state } = useLocation()
  const auth = useSelector(state => state.auth)
  const cart = useSelector(state => state.cart)
  const user = useSelector(state => state.auth.user)

  useEffect(() => {
    if (!state) navigate('/')
  }, [])

  const submitOrder = async () => {
    const total = state.subtotal + (state.subtotal >= 1200 ? 0 : 200)
    const res = await dispatch(checkout(total, auth.token, cart))
    if (res?.data?.status == 'success') {
      await stripe.redirectToCheckout({ sessionId: res.data.session.id })
    }
  }

  return (
    <div className="my-6 flex min-h-screen items-center justify-center">
      <div className="pin-r pin-y flex w-full flex-col rounded-lg bg-white p-8 text-gray-800 shadow-lg md:w-4/5 lg:w-4/5">
        <div className="px-4">
          <div className="border-b p-4">
            <h2 className="text-2xl ">Confirm Information</h2>
            <p className="text-sm text-gray-500">Personal details and payment.</p>
          </div>
          <div className="space-y-1 border-b p-4 hover:bg-gray-50 md:grid md:grid-cols-7 md:space-y-0">
            <p className="uppercase text-gray-600">name</p>
            <p>{user?.name}</p>
          </div>
          <div className="space-y-1 border-b p-4 hover:bg-gray-50 md:grid md:grid-cols-7 md:space-y-0">
            <p className="uppercase text-gray-600">Email</p>
            <p>{user?.email}</p>
          </div>
          <div className="space-y-1 border-b p-4 hover:bg-gray-50 md:grid md:grid-cols-7 md:space-y-0">
            <p className="uppercase text-gray-600">Phone</p>
            <p>{user?.phone}</p>
          </div>
          <div className="space-y-1 border-b p-4 hover:bg-gray-50 md:grid md:grid-cols-7 md:space-y-0">
            <p className="uppercase text-gray-600">Address</p>
            <p>{user?.address}</p>
          </div>
          <div className="space-y-1 p-4 hover:bg-gray-50 md:grid md:grid-cols-7 md:space-y-0">
            <p className="uppercase text-red-600">Total price</p>
            <p>${state?.subtotal + (state?.subtotal >= 1200 ? 0 : 200)}</p>
          </div>
          <a>
            <button
              className="item-center focus:shadow-outline mt-8 flex w-full justify-center rounded-full bg-gray-800 px-10 py-3 font-medium uppercase text-white shadow hover:bg-gray-700 focus:outline-none"
              onClick={submitOrder}>
              <i className="mdi mdi-credit-card-multiple-outline text-xl"></i>
              <span className="mt-5px ml-2">Proceed to checkout</span>
            </button>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Checkout
