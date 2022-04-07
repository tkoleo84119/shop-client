import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { getAllProducts } from '../actions/Product'

const ProductList = () => {
  const dispatch = useDispatch()
  const products = useSelector(state => state.products)

  useEffect(() => {
    dispatch(getAllProducts())
  }, [])

  const ProductListTemplate = ({ _id, name, image, price, category, quantity }) => {
    return (
      <tr key={_id}>
        <td className="border-b border-gray-200 bg-white py-5 pl-5 text-sm">
          <Link to={`/products/${_id}`}>
            <div className="flex items-center">
              <div className="h-9 w-9 flex-shrink-0">
                <img className="h-full w-full rounded-full" src={image} alt={`${name} image`} />
              </div>
              <div className="ml-3">
                <p className="whitespace-no-wrap text-gray-900">{name}</p>
              </div>
            </div>
          </Link>
        </td>
        <td className="border-b border-gray-200 bg-white px-2 py-5 text-sm">
          <p className="whitespace-no-wrap text-gray-900">${price}</p>
        </td>
        <td className="border-b border-gray-200 bg-white px-2 py-5 text-sm">
          <p className="whitespace-no-wrap text-gray-900">{category}</p>
        </td>
        <td className="border-b border-gray-200 bg-white px-2 py-5 text-sm">
          <p className="whitespace-no-wrap text-gray-900">{quantity}</p>
        </td>
        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
          <div className="flex justify-center py-1 font-semibold leading-tight text-green-900">
            <Link to={`/products/edit/${_id}`}>
              <button
                type="button"
                className="focus:shadow-outline mr-3 rounded bg-blue-500 py-1 px-2 text-sm text-white hover:bg-blue-700 focus:outline-none">
                Edit
              </button>
            </Link>

            <button
              type="button"
              className="focus:shadow-outline mr-3 rounded bg-red-500 py-1 px-2 text-sm text-white hover:bg-red-700 focus:outline-none">
              Delete
            </button>
          </div>
        </td>
      </tr>
    )
  }

  const renderProductList = () => {
    return Object.keys(products).map(id => ProductListTemplate(products[id]))
  }

  return (
    <React.Fragment>
      <div className="h-full min-h-screen w-full rounded-r-3xl bg-white">
        <div className="w-full rounded-md bg-white p-8">
          <div className=" flex items-center justify-between pb-6 ">
            <div className="flex items-center rounded-md bg-gray-100 p-2">
              <i className="mdi mdi-magnify -mb-1 text-lg"></i>
              <input
                className="ml-1 block bg-gray-100 outline-none"
                type="text"
                placeholder="search..."
              />
            </div>
            <div className="ml-10 space-x-8 lg:ml-40">
              <Link to="/products/create">
                <button className="cursor-pointer rounded-md bg-red-700 px-4 py-2 font-semibold tracking-wide text-white hover:bg-red-800">
                  Create
                </button>
              </Link>
            </div>
          </div>
          <div>
            <div className="-mx-4 overflow-x-auto px-4 py-4 sm:-mx-8 sm:px-8">
              <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="border-b-2 border-gray-200 bg-gray-100 py-3 pl-5 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                        Name
                      </th>
                      <th className="border-b-2 border-gray-200 bg-gray-100 px-2 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                        Price
                      </th>
                      <th className="border-b-2 border-gray-200 bg-gray-100 px-2 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                        Category
                      </th>
                      <th className="border-b-2 border-gray-200 bg-gray-100 px-2 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                        QTY
                      </th>
                      <th className="border-b-2 border-gray-200 bg-gray-100 px-2 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600"></th>
                    </tr>
                  </thead>
                  <tbody>{renderProductList()}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ProductList
