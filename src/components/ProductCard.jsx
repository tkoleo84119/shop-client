import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/type'

const ProductCard = ({ products }) => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const cart = useSelector(state => state.cart)

  useEffect(() => localStorage.setItem('cart', JSON.stringify(cart)), [cart])

  const ratingTemplate = (max, ratings) => {
    return Array.from({ length: max }, (_, i) => i + 1).map(num => (
      <i key={num} className={`mdi mdi-star text-sm ${ratings >= num ? 'text-red-500' : 'text-gray-500'}`} />
    ))
  }

  const cardTemplate = ({ category, image, name, price, ratingsAverage, ratingsQuantity, _id }) => {
    return (
      <div
        className="border-grey-500 m-4 w-11/12 rounded-lg border border-solid p-3 shadow-md duration-300 hover:-translate-y-1.5"
        key={_id}>
        <Link
          to={`/products/${_id}`}
          className="relative block h-48 cursor-pointer overflow-hidden rounded">
          <img
            alt="product image"
            className="block h-full w-full object-cover object-center"
            src={image}
          />
        </Link>
        <div className="mt-4">
          <h4 className="title-font mb-1 text-center text-xs tracking-widest text-gray-500">
            <a href={category} className="cursor-pointer duration-200 hover:text-red-500">
              {category}
            </a>
          </h4>
          <h2 className="title-font text-center text-lg font-medium text-gray-900">
            {name.length < 30 ? name : `${name.substring(0, 25)}...`}
          </h2>
          <p className="m-1 text-center text-lg font-bold text-red-700">${price}</p>
          <div className="flex flex-row justify-center">
            {ratingTemplate(5, ratingsAverage)}
            <div className="ml-1 text-sm text-gray-400">({ratingsQuantity})</div>
          </div>
        </div>
        <hr className="m-4" />
        <div className="flex flex-auto flex-row justify-center">
          <Link
            to={`/products/${_id}`}
            className="group mx-2 flex cursor-pointer items-center rounded-full border border-red-600 px-3 py-2 text-xs transition duration-200 ease-in hover:bg-red-600 focus:outline-none">
            <i className="mdi mdi-eye-outline text-red-600 delay-100 group-hover:text-white" />
            <div className="ml-2 text-xs font-medium text-red-600 delay-100 group-hover:text-white">
              Quick view
            </div>
          </Link>
          {renderCartButton(_id)}
        </div>
      </div>
    )
  }

  const renderCartButton = id => {
    if (!auth.isLoggedIn || auth?.user?.role == 'admin') return null

    if (!cart[id]) {
      return (
        <button
          className="group mx-2 flex cursor-pointer items-center rounded-full border border-red-600 px-3 py-2 text-xs transition duration-200 ease-in hover:bg-red-600 focus:outline-none"
          onClick={() => {
            dispatch({ type: ADD_TO_CART, product: { ...products[id], num: 1 } })
          }}>
          <i className="mdi mdi-cart-outline text-red-600 delay-100 group-hover:text-white" />
          <div className="text-red-600text-white ml-2 text-xs font-medium uppercase text-red-600 delay-100 group-hover:text-white">
            Add
          </div>
        </button>
      )
    }

    return (
      <button
        className="flex items-center rounded-full bg-red-500 py-2.5 px-5 text-sm text-white hover:bg-red-600 hover:shadow-lg focus:outline-none"
        onClick={() => dispatch({ type: REMOVE_FROM_CART, id })}>
        <i className="mdi mdi-cart-outline text-white delay-100 " />
        <div className="text-red-600text-white ml-2 text-xs font-medium uppercase delay-100 ">
          Remove
        </div>
      </button>
    )
  }

  return Object.keys(products).map(id => {
    return cardTemplate(products[id])
  })
}

export default ProductCard
