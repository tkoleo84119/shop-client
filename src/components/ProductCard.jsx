import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({ products }) => {
  const ratingTemplate = (max, ratings) => {
    return Array.from({ length: max }, (_, i) => i + 1).map(num => (
      <i className={`mdi mdi-star text-sm ${ratings >= num ? 'text-red-500' : 'text-gray-500'}`} />
    ))
  }

  const cardTemplate = ({ category, image, name, price, ratingsAverage, ratingsQuantity, _id }) => {
    return (
      <div
        className="border-grey-500 m-4 w-11/12 rounded-lg border border-solid p-3 shadow-md duration-300 hover:-translate-y-1.5"
        key={_id}>
        <Link
          to={`/products/${_id}`}
          className="relative block h-48 cursor-pointer overflow-hidden rounded">
          <img
            alt="product image"
            className="block h-full w-full object-cover object-center"
            src={image}
          />
        </Link>
        <div className="mt-4">
          <h4 className="title-font mb-1 text-center text-xs tracking-widest text-gray-500">
            <a href={category} className="cursor-pointer duration-200 hover:text-red-500">
              {category}
            </a>
          </h4>
          <h2 className="title-font text-center text-lg font-medium text-gray-900">
            {name.length < 30 ? name : `${name.substring(0, 25)}...`}
          </h2>
          <p className="m-1 text-center text-lg font-bold text-red-700">${price}</p>
          <div className="flex flex-row justify-center">
            {ratingTemplate(5, ratingsAverage)}
            <div className="ml-1 text-sm text-gray-400">({ratingsQuantity})</div>
          </div>
        </div>
        <hr className="m-4" />
        <div className="flex flex-auto flex-row justify-center">
          <Link
            to={`/products/${_id}`}
            className="group mx-2 flex cursor-pointer items-center rounded-full border border-red-600 px-3 py-2 text-xs transition duration-200 ease-in hover:bg-red-600 focus:outline-none">
            <i className="mdi mdi-eye-outline text-red-600 delay-100 group-hover:text-white" />
            <div className="ml-2 text-xs font-medium text-red-600 delay-100 group-hover:text-white">
              Quick view
            </div>
          </Link>
        </div>
      </div>
    )
  }

  return Object.keys(products).map(id => {
    return cardTemplate(products[id])
  })
}

export default ProductCard
