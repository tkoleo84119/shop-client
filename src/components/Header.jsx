import React from 'react'
import { Link } from 'react-router-dom'

import SearchBar from './SearchBar'

const Header = () => {
  const renderAuthButton = () => {
    return (
      <Link
        to="/login"
        className="mr-6 rounded-lg bg-red-700 px-4 py-3 text-center font-bold text-white transition duration-200 ease-in-out hover:bg-red-600">
        Login In
      </Link>
    )
  }

  const renderUserButton = () => {
    return (
      <React.Fragment>
        <Link to="/profile/userInfo">
          <button className="mx-2 h-10 w-10 rounded-full border border-white text-center transition duration-150 ease-in hover:bg-red-800 hover:text-white focus:outline-none">
            <i className="mdi mdi-account"></i>
          </button>
        </Link>
        <Link to="/cart">
          <button className="relative mx-2 h-10 w-10 rounded-full border border-white text-center transition duration-150 ease-in hover:bg-red-800 hover:text-white focus:outline-none">
            <i className="mdi mdi-cart"></i>
          </button>
        </Link>
      </React.Fragment>
    )
  }

  return (
    <header className="body-font bg-gray-900 text-gray-400">
      <div className="flex flex-row flex-wrap items-center py-5 px-5">
        <Link to="/" className="title-font mb-4 flex items-center font-medium text-white md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            className="h-10 w-10 rounded-full border border-red-700 bg-red-800 p-2 text-white"
            viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span className="ml-3 text-xl">EShop</span>
        </Link>
        <nav className="flex flex-wrap items-center justify-center text-base md:mr-auto	md:ml-4 md:border-l md:border-gray-700 md:py-1 md:pl-4">
          <Link to="/" className="mr-5 hover:text-red-600 hover:underline">
            Home
          </Link>
        </nav>
        <div className="search-bar">
          <SearchBar />
        </div>
        <div className="mx-5">{renderUserButton()}</div>
        {renderAuthButton()}
      </div>
    </header>
  )
}

export default Header
