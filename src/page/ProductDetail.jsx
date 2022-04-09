import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import DeleteModal from '../components/DeleteModal'
import { getProduct } from '../actions/Product'
import { deleteReview } from '../actions/Review'
import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/type'

const ProductDetail = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const product = useSelector(state => state.products[params.id])
  const auth = useSelector(state => state.auth)
  const cart = useSelector(state => state.cart)
  const status = useSelector(state => state.status.status)
  const [isVisible, setIsVisible] = useState(false)
  const [reviewId, setReviewId] = useState('')

  useEffect(() => dispatch(getProduct(params.id)), [params])

  useEffect(() => localStorage.setItem('cart', JSON.stringify(cart)), [cart])

  useEffect(() => {
    if (status === 'success') dispatch(getProduct(params.id))
  }, [status])

  const handleToggleModalShowUp = () => {
    setIsVisible(!isVisible)
  }

  const onDeleteConfirm = async id => {
    dispatch(deleteReview(auth.token, id))
  }

  const ratingTemplate = (max, ratings) => {
    return Array.from({ length: max }, (_, i) => i + 1).map(num => (
      <i
        key={num}
        className={`mdi mdi-star text-lg ${ratings >= num ? 'text-red-500' : 'text-gray-500'}`}
      />
    ))
  }

  const reviewTemplate = () => {
    return product?.reviews.map(review => {
      return (
        <div
          className="shadow-xs relative mb-10 flex w-2/3 items-start rounded-2xl bg-white p-6"
          key={review._id}>
          {renderDelete(review._id, review.user._id)}
          <div className="ml-6">
            <div className="flex items-baseline">
              <span className="mr-3 font-bold text-gray-600">{review.user.name}</span>
              <div className="mt-2 flex items-center">
                <span className="flex items-center">{ratingTemplate(5, review.rating)}</span>
              </div>
            </div>
            <div className="mt-3">
              <p className="mt-1">{review.content}</p>
            </div>
          </div>
        </div>
      )
    })
  }

  const renderFeature = () => {
    return product?.features.map(feature => {
      return (
        <div key={feature}>
          <span className="mr-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-100 text-red-500">
            <i className="mdi mdi-check text-sm"></i>
          </span>
          {feature}
        </div>
      )
    })
  }

  const renderRating = () => {
    if (!product?.reviews || product?.reviews.length === 0) return null

    return (
      <div className="flex flex-col items-center justify-center bg-gray-100 py-20">
        {reviewTemplate()}
      </div>
    )
  }

  const renderCartButton = id => {
    if (auth?.user?.role === 'admin') return null

    if (!cart[id]) {
      return (
        <button
          className="ml-auto flex rounded border-0 bg-red-500 py-2 px-6 text-white hover:bg-red-600 focus:outline-none"
          onClick={() => {
            dispatch({ type: ADD_TO_CART, product: { ...product, num: 1 } })
          }}>
          Add to cart
        </button>
      )
    }

    return (
      <button
        className="ml-auto flex rounded border-0 bg-red-500 py-2 px-6 text-white hover:bg-red-600 focus:outline-none"
        onClick={() => dispatch({ type: REMOVE_FROM_CART, id })}>
        Remove from cart
      </button>
    )
  }

  const renderDelete = (id, userId) => {
    if (auth.user.role === 'admin' || auth.user._id === userId)
      return (
        <div
          className="absolute right-6 top-3 cursor-pointer text-xl text-gray-500 hover:text-red-500"
          onClick={() => {
            handleToggleModalShowUp()
            setReviewId(id)
          }}>
          x
        </div>
      )
  }

  return (
    <React.Fragment>
      <section className="body-font overflow-hidden text-gray-600">
        <div className="container mx-auto px-5 py-24">
          <div className="mx-auto flex flex-wrap lg:w-4/5">
            <img
              alt="product image"
              className="h-64 max-w-lg rounded object-contain object-center lg:h-auto lg:w-1/2"
              src={product?.image}
            />
            <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:py-6 lg:pl-10">
              <h2 className="title-font text-sm tracking-widest text-gray-500">
                {product?.category}
              </h2>
              <h1 className="title-font mb-1 text-3xl font-medium text-gray-900">
                {product?.name}
              </h1>
              <div className="my-3">
                <span className="flex items-center">
                  {ratingTemplate(5, product?.ratingsAverage)}
                  <span className="ml-3 text-gray-600">{product?.ratingsQuantity} Reviews</span>
                </span>
              </div>
              <hr className="mt-5 mb-5 border-gray-100" />
              <div className="-m-4 flex flex-wrap">
                <div className="mb-5 w-full p-4">
                  <nav className="-mb-1 flex flex-col items-center space-y-2.5 text-center sm:items-start sm:text-left">
                    {renderFeature()}
                  </nav>
                </div>
              </div>
              <p className="leading-relaxed">{product?.description}</p>
              <hr className="mt-5 mb-5 border-gray-300" />
              <div className="flex py-2">
                <span className="text-gray-500">Quantity</span>
                <span className="ml-auto text-gray-900">{product?.quantity}</span>
              </div>
              <hr className="mt-5 mb-5 border-gray-300" />
              <div className="flex">
                <span className="title-font text-2xl font-medium text-gray-900">
                  ${product?.price}
                </span>
                {renderCartButton(product?._id)}
              </div>
            </div>
          </div>
        </div>
        {renderRating()}
      </section>
      <DeleteModal
        isVisible={isVisible}
        handleToggleModalShowUp={handleToggleModalShowUp}
        onDeleteConfirm={onDeleteConfirm}
        review={product?.reviews?.find(review => review._id === reviewId)}
      />
    </React.Fragment>
  )
}

export default ProductDetail
