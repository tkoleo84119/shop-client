import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'

import { ADD_PARAMS_NAME, REMOVE_PARAMS_NAME } from '../actions/type'

const SearchBar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [term, setTerm] = useState('')

  useEffect(() => {
    if (location.pathname === '/') {
      setTerm('')
      dispatch({ type: REMOVE_PARAMS_NAME })
    }
  }, [location.pathname])

  const onKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault()

      if (!term) {
        dispatch({ type: REMOVE_PARAMS_NAME })
        return navigate('/')
      }

      dispatch(dispatch({ type: ADD_PARAMS_NAME, value: term }))
      navigate('/products')
    }
  }

  return (
    <div className="relative text-gray-600">
      <form>
        <input
          type="search"
          placeholder="Product Name"
          value={term}
          onChange={e => setTerm(e.target.value)}
          onKeyDown={e => onKeyDown(e)}
          className="h-10 rounded-full bg-white px-5 pr-10 text-sm focus:outline-none"
        />
        <div
          className="absolute right-0 top-0 mt-2 mr-4 cursor-pointer"
          onClick={() => {
            setTerm('')
            dispatch({ type: REMOVE_PARAMS_NAME })
            navigate('/')
          }}>
          <i className="mdi mdi-close text-base text-gray-400"></i>
        </div>
      </form>
    </div>
  )
}

export default SearchBar
