import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getAllProducts } from '../actions/Product'
import ProductCard from '../components/ProductCard'
import HomeSideBar from '../components/HomeSideBar'

const Home = () => {
  const dispatch = useDispatch()
  const products = useSelector(state => state.products)

  useEffect(() => {
    dispatch(getAllProducts())
  }, [])

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
    </React.Fragment>
  )
}

export default Home
