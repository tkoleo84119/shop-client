import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'

import { REMOVE_PARAMS_CATEGORY, ADD_PARAMS_CATEGORY } from '../actions/type'

const HomeSideBar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (location.pathname === '/') {
      dispatch({ type: REMOVE_PARAMS_CATEGORY })
      setInputValue('')
    }
  }, [location.pathname])

  useEffect(() => {
    if (!inputValue) return dispatch({ type: REMOVE_PARAMS_CATEGORY })

    dispatch({ type: ADD_PARAMS_CATEGORY, value: inputValue })
    if (location.pathname !== '/products') return navigate('/products')
  }, [inputValue])

  const inputTemplate = name => {
    const radioValue = name === 'All' ? '' : name
    return (
      <div className="mb-4 flex items-center pl-4">
        <input
          id={name}
          type="radio"
          name="category"
          defaultValue={radioValue}
          checked={inputValue === radioValue}
          onClick={e => setInputValue(e.target.value)}
          className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
          readOnly
        />
        <label htmlFor={name} className="ml-2 block text-base font-medium text-gray-900">
          {name}
        </label>
      </div>
    )
  }

  return (
    <div className="my-12 -translate-y-0.5 rounded-xl p-2">
      <div className="flex flex-col sm:flex-row sm:justify-around">
        <div className="h-screen w-64">
          <div className="m-5">
            <div className="mb-4 text-xl font-bold">Category</div>
            {inputTemplate('All')}
            {inputTemplate('Cameras')}
            {inputTemplate('Headphones')}
            {inputTemplate('Laptops')}
            {inputTemplate('Microphone')}
            {inputTemplate('Smartphones')}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeSideBar
