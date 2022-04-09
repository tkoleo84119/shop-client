import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProfileLeft = () => {
  const auth = useSelector(state => state.auth)

  const renderAdmin = () => {
    if (auth?.user?.role === 'admin')
      return (
        <React.Fragment>
          <NavLink
            end
            to="/profile/productList"
            className={({ isActive }) => {
              return `${
                isActive
                  ? 'border-r-4 border-red-500 bg-gradient-to-r from-white to-red-100 text-red-500 dark:from-gray-700 dark:to-gray-800'
                  : 'text-gray-500 hover:text-red-500 dark:text-gray-200'
              } my-2 flex w-full items-center justify-start px-8 py-4 font-thin uppercase transition-colors duration-200`
            }}>
            <span className="text-left">
              <i className="mdi mdi-heart text-xl"></i>
            </span>
            <span className="mx-4 text-sm font-normal">Product List</span>
          </NavLink>
          <NavLink
            end
            to="/profile/reviewList"
            className={({ isActive }) => {
              return `${
                isActive
                  ? 'border-r-4 border-red-500 bg-gradient-to-r from-white to-red-100 text-red-500 dark:from-gray-700 dark:to-gray-800'
                  : 'text-gray-500 hover:text-red-500 dark:text-gray-200'
              } my-2 flex w-full items-center justify-start px-8 py-4 font-thin uppercase transition-colors duration-200`
            }}>
            <span className="text-left">
              <i className="mdi mdi-comment-text-multiple text-xl"></i>
            </span>
            <span className="mx-4 text-sm font-normal">Review List</span>
          </NavLink>
        </React.Fragment>
      )
  }

  return (
    <div className="shadow-xs block h-full w-80">
      <div className="h-full rounded-l-3xl bg-gray-900">
        <div className="flex items-center justify-center pt-6"></div>
        <nav className="mt-6">
          <div>
            <NavLink
              end
              to="/profile/userInfo"
              className={({ isActive }) => {
                return `${
                  isActive
                    ? 'border-r-4 border-red-500 bg-gradient-to-r from-white to-red-100 text-red-500 dark:from-gray-700 dark:to-gray-800'
                    : 'text-gray-500 hover:text-red-500 dark:text-gray-200'
                } my-2 flex w-full items-center justify-start px-8 py-4 font-thin uppercase transition-colors duration-200`
              }}>
              <span className="text-left">
                <i className="mdi mdi-tooltip-account text-xl"></i>
              </span>
              <span className="mx-4 text-sm font-normal">User Info</span>
            </NavLink>
            <NavLink
              end
              to="/profile/orderList"
              className={({ isActive }) => {
                return `${
                  isActive
                    ? 'border-r-4 border-red-500 bg-gradient-to-r from-white to-red-100 text-red-500 dark:from-gray-700 dark:to-gray-800'
                    : 'text-gray-500 hover:text-red-500 dark:text-gray-200'
                } my-2 flex w-full items-center justify-start px-8 py-4 font-thin uppercase transition-colors duration-200`
              }}>
              <span className="text-left">
                <i className="mdi mdi-clipboard-check-multiple text-xl"></i>
              </span>
              <span className="mx-4 text-sm font-normal">Order List</span>
            </NavLink>
            {renderAdmin()}
          </div>
        </nav>
      </div>
    </div>
  )
}

export default ProfileLeft
