import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { createReview } from '../actions/Review'

const Review = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const { state } = useLocation()
  const auth = useSelector(state => state.auth)
  const status = useSelector(state => state.status.status)
  const [rating, setRating] = useState(1)
  const [content, setContent] = useState('Good shopping experience!')

  const onSubmit = e => {
    e.preventDefault()
    dispatch(createReview(auth.token, params.id, content, rating))
  }

  useEffect(() => {
    if (status === 'success' || status === 'fail') {
      setTimeout(() => {
        navigate(-1)
      }, 1000)
    }
  }, [status])

  return ReactDOM.createPortal(
    <div className="min-w-screen animated fadeIn faster fixed inset-0 left-0 top-0  z-50 flex h-screen flex-col items-center justify-center space-y-4 bg-gray-900 outline-none focus:outline-none">
      <div className="py-3 sm:mx-auto sm:max-w-xl">
        <div className="min-w-1xl flex flex-col rounded-xl bg-white shadow-lg">
          <div className="px-12 py-5">
            <h2 className="text-3xl font-semibold text-gray-800">Your opinion matters to us!</h2>
          </div>
          <form className="flex w-full flex-col items-center bg-gray-200">
            <div className="flex flex-col items-center space-y-3 py-6">
              <span className="text-md text-gray-800">How was quality of the</span>
              <span className="text-lg font-semibold text-gray-800">
                {
                  state.order.products.filter(product => {
                    if (product._id === params.id) return product.name
                  })[0].name
                }
              </span>
              <div className="flex space-x-3">
                <input
                  type="radio"
                  id="rating1"
                  name="rating"
                  value="1"
                  onClick={() => setRating(1)}
                  hidden
                />
                <label htmlFor="rating1" className="cursor-pointer">
                  <i
                    className={`mdi mdi-star text-3xl ${
                      rating >= 1 ? 'text-red-500' : 'text-gray-500'
                    }`}
                  />
                </label>
                <input
                  type="radio"
                  id="rating2"
                  name="rating"
                  value="2"
                  onClick={() => setRating(2)}
                  hidden
                />
                <label htmlFor="rating2" className="cursor-pointer">
                  <i
                    className={`mdi mdi-star text-3xl ${
                      rating >= 2 ? 'text-red-500' : 'text-gray-500'
                    }`}
                  />
                </label>
                <input
                  type="radio"
                  id="rating3"
                  name="rating"
                  value="3"
                  onClick={() => setRating(3)}
                  hidden
                />
                <label htmlFor="rating3" className="cursor-pointer">
                  <i
                    className={`mdi mdi-star text-3xl ${
                      rating >= 3 ? 'text-red-500' : 'text-gray-500'
                    }`}
                  />
                </label>
                <input
                  type="radio"
                  id="rating4"
                  name="rating"
                  value="4"
                  onClick={() => setRating(4)}
                  hidden
                />
                <label htmlFor="rating4" className="cursor-pointer">
                  <i
                    className={`mdi mdi-star text-3xl ${
                      rating >= 4 ? 'text-red-500' : 'text-gray-500'
                    }`}
                  />
                </label>
                <input
                  type="radio"
                  id="rating5"
                  name="rating"
                  value="5"
                  onClick={() => setRating(5)}
                  hidden
                />
                <label htmlFor="rating5" className="cursor-pointer">
                  <i
                    className={`mdi mdi-star text-3xl ${
                      rating >= 5 ? 'text-red-500' : 'text-gray-500'
                    }`}
                  />
                </label>
              </div>
            </div>
            <div className="flex w-3/4 flex-col">
              <textarea
                name="content"
                rows={3}
                className="resize-none rounded-xl p-4 text-gray-500"
                onChange={e => setContent(e.target.value)}
                value={content}
              />
              <button
                type="submit"
                onClick={e => onSubmit(e)}
                className="my-8 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 py-3 text-lg text-white">
                Rate now
              </button>
            </div>
          </form>
          <div
            className="flex h-20 cursor-pointer items-center justify-center"
            onClick={() => navigate(-1)}>
            <a className="text-gray-600">Maybe later</a>
          </div>
        </div>
      </div>
    </div>,
    document.querySelector('#modal')
  )
}

export default Review
