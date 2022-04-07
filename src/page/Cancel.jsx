import React from 'react'
import { Link } from 'react-router-dom'

const Cancel = () => {
  return (
    <div className=" bg-gray-100">
      <div className="bg-white p-6  md:mx-auto">
        <div className="text-center">
          <i className="mdi mdi-alert-circle text-6xl text-orange-400"></i>
          <h3 className="text-center text-base font-semibold text-gray-900 md:text-2xl">
            Payment failed!
          </h3>
          <p className="my-2 text-gray-600">The online payment has been canceled.</p>
          <p>Please try again later!</p>
          <div className="py-10 text-center">
            <Link
              to="/"
              className="bg-red-600 px-12 py-3 font-semibold text-white hover:bg-red-500">
              Go to Home Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cancel
