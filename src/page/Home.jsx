import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

import { getAllProducts } from '../actions/Product'
import { NEXT_PAGE, PRE_PAGE } from '../actions/type'
import ProductCard from '../components/ProductCard'
import HomeSideBar from '../components/HomeSideBar'

const Home = () => {
  const dispatch = useDispatch()
  const products = useSelector(state => state.products)
  const params = useSelector(state => state.params)
  const page = useSelector(state => state.page)
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    setSearchParams(params)
    dispatch(getAllProducts({ ...params, ...page }))
  }, [params, page])

  const renderPreButton = () => {
    if (page.page === 1) return null

    return (
      <button
        className="mr-20 rounded bg-gray-300 py-4 px-8 text-sm font-semibold text-gray-800 hover:bg-gray-400"
        onClick={() => dispatch({ type: PRE_PAGE, page: page.page - 1 })}>
        Prev
      </button>
    )
  }

  const renderNextButton = () => {
    if (Object.keys(products).length > 10) {
      return (
        <button
          className="rounded bg-gray-300 py-4 px-8 text-sm font-semibold text-gray-800 hover:bg-gray-400"
          onClick={() => dispatch({ type: NEXT_PAGE, page: page.page + 1 })}>
          Next
        </button>
      )
    }

    return null
  }

  return (
    <React.Fragment>
      <section className="body-font flex justify-center text-gray-600">
        <HomeSideBar />
        <div className="container mr-5 px-5 py-10">
          <div className="grid grid-cols-4">
            <ProductCard products={products} />
          </div>
        </div>
      </section>
      <div className="mb-10 flex justify-center">
        {renderPreButton()}
        {renderNextButton()}
      </div>
    </React.Fragment>
  )
}

export default Home
