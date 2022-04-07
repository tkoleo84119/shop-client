import React, { useRef } from 'react'
import ReactDOM from 'react-dom'

const DeleteModal = ({
  isVisible,
  handleToggleModalShowUp,
  onDeleteConfirm,
  order,
  product,
  review
}) => {
  const modalRef = useRef(null)

  const handleBackgroundClick = e => {
    if (!modalRef.current.contains(e.target)) {
      handleToggleModalShowUp()
    }
  }

  const renderName = () => {
    if (order) return 'order'
    if (product) return `"${product.name}"`
    if (review) return 'review'
  }

  const deleteId = () => {
    if (order) return order._id
    if (product) return product._id
    if (review) return review._id
  }

  return isVisible
    ? ReactDOM.createPortal(
        <div
          className="min-w-screen animated fadeIn faster fixed inset-0 left-0 top-0 z-50 flex h-screen flex-col items-center justify-center space-y-4 bg-gray-900 bg-opacity-5 outline-none focus:outline-none"
          onClick={e => handleBackgroundClick(e)}>
          <div>
            <div className="absolute inset-0 z-0 bg-black opacity-80" />
            <div className="relative  mx-auto my-auto w-full max-w-lg rounded-xl bg-white p-5  shadow-lg ">
              <div ref={modalRef}>
                <div className="flex-auto justify-center p-5 text-center">
                  <i className="mdi mdi-trash-can text-6xl text-red-600"></i>
                  <h2 className="py-4 text-xl font-bold ">Are you sure to do this action?</h2>
                  <p className="px-8 text-sm text-gray-500">
                    Do you really want to delete the {renderName()}? This process cannot be undone.
                  </p>
                </div>
                <div className="mt-2  space-x-4 p-3 text-center md:block">
                  <button
                    className="mb-2 rounded-full border bg-white px-5 py-2 text-sm font-medium tracking-wider text-gray-600 shadow-sm hover:bg-gray-100 hover:shadow-lg md:mb-0"
                    onClick={() => handleToggleModalShowUp()}>
                    Cancel
                  </button>
                  <button
                    className="mb-2 rounded-full border border-red-500 bg-red-500 px-5 py-2 text-sm font-medium tracking-wider text-white shadow-sm hover:bg-red-600 hover:shadow-lg md:mb-0"
                    onClick={() => {
                      onDeleteConfirm(deleteId())
                      handleToggleModalShowUp()
                    }}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.querySelector('#modal')
      )
    : null
}

export default DeleteModal