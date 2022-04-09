import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

import DeleteModal from '../components/DeleteModal'
import { getAllReviews, deleteReview } from '../actions/Review'

const ProfileReviewList = () => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const reviews = useSelector(state => state.reviews)
  const status = useSelector(state => state.status.status)
  const [isVisible, setIsVisible] = useState(false)
  const [reviewId, setReviewId] = useState('')

  useEffect(() => {
    dispatch(getAllReviews(auth.token))
  }, [])

  useEffect(() => {
    if (status === 'success') dispatch(getAllReviews(auth.token))
  }, [status])

  const handleToggleModalShowUp = () => {
    setIsVisible(!isVisible)
  }

  const onDeleteConfirm = async id => {
    dispatch(deleteReview(auth.token, id))
  }

  const reviewListTemplate = ({ _id, user, product, rating, content, createdAt }) => {
    return (
      <tr key={_id}>
        <td className="border-b border-gray-200 bg-white py-5 pl-5 text-sm">
          <div className="flex items-center">
            <div className="ml-3">
              <p className="whitespace-no-wrap text-gray-900">{user.name}</p>
            </div>
          </div>
        </td>
        <td className="border-b border-gray-200 bg-white px-2 py-5 text-sm">
          <Link to={`/products/${product._id}`}>
            <p className="whitespace-no-wrap text-gray-900">{`${product.name.substring(
              0,
              25
            )}...`}</p>
          </Link>
        </td>
        <td className="border-b border-gray-200 bg-white px-2 py-5 text-sm">
          <p className="whitespace-no-wrap text-gray-900">{ratingTemplate(5, rating)}</p>
        </td>
        <td className="border-b border-gray-200 bg-white px-2 py-5 text-sm">
          <p className="whitespace-no-wrap text-gray-900">{content}</p>
        </td>
        <td className="border-b border-gray-200 bg-white px-2 py-5 text-sm">
          <p className="whitespace-no-wrap text-gray-900">
            {dayjs(createdAt).format('YYYY-MM-DD HH:mm')}
          </p>
        </td>
        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
          <div className="flex justify-center py-1 font-semibold leading-tight text-green-900">
            {renderDeleteButton(_id)}
          </div>
        </td>
      </tr>
    )
  }

  const ratingTemplate = (max, ratings) => {
    return Array.from({ length: max }, (_, i) => i + 1).map(num => (
      <i
        key={num}
        className={`mdi mdi-star text-sm ${ratings >= num ? 'text-red-500' : 'text-gray-500'}`}
      />
    ))
  }

  const renderDeleteButton = id => {
    return (
      <button
        type="button"
        onClick={() => {
          handleToggleModalShowUp()
          setReviewId(id)
        }}
        className="focus:shadow-outline mr-3 rounded bg-red-500 py-1 px-2 text-sm text-white hover:bg-red-700 focus:outline-none">
        Delete
      </button>
    )
  }

  const renderReviewList = () => {
    return Object.keys(reviews).map(id => {
      return reviewListTemplate(reviews[id])
    })
  }

  return (
    <React.Fragment>
      <div className="h-full min-h-screen w-full rounded-r-3xl bg-white">
        <div className="w-full rounded-md bg-white p-8">
          <div>
            <div className="-mx-4 overflow-x-auto px-4 py-4 sm:-mx-8 sm:px-8">
              <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="border-b-2 border-gray-200 bg-gray-100 py-3 pl-5 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                        User Name
                      </th>
                      <th className="border-b-2 border-gray-200 bg-gray-100 px-2 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                        Product Name
                      </th>
                      <th className="border-b-2 border-gray-200 bg-gray-100 px-2 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                        rating
                      </th>
                      <th className="border-b-2 border-gray-200 bg-gray-100 px-2 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                        content
                      </th>
                      <th className="border-b-2 border-gray-200 bg-gray-100 px-2 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                        Create date
                      </th>
                      <th className="border-b-2 border-gray-200 bg-gray-100 px-2 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600"></th>
                    </tr>
                  </thead>
                  <tbody>{renderReviewList()}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DeleteModal
        isVisible={isVisible}
        handleToggleModalShowUp={handleToggleModalShowUp}
        onDeleteConfirm={onDeleteConfirm}
        review={reviews[reviewId]}
      />
    </React.Fragment>
  )
}

export default ProfileReviewList
