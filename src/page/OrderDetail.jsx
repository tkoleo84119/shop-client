import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getOrder } from '../actions/Order'

const OrderDetail = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const order = useSelector(state => state.orders[params.id])
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(getOrder(auth.token, params.id))
  }, [params])

  const productListTemplate = ({ product, quantity }) => {
    return (
      <tr key={product._id}>
        <td className="hidden pb-4 md:table-cell">
          <a href="#">
            <img src={product.image} className="w-20 rounded" alt="product image" />
          </a>
        </td>
        <td>
          <Link to={`/products/${product._id}`}>
            <p className="mb-2">{product.name}</p>
          </Link>
        </td>
        <td className="text-right">{quantity}</td>
        <td className="hidden text-right md:table-cell">
          <span className="text-sm font-medium lg:text-base">${product.price}</span>
        </td>
        <td className="text-right">
          <span className="text-sm font-medium lg:text-base">${product.price * quantity}</span>
        </td>
        <td className="text-right">
          <Link to={`/reviews/${product._id}`} state={{ order }}>
            <button>
              <div className="h-auto w-auto">
                <div className="h-full flex-1">
                  <div className="flex h-full flex-1 items-center justify-center rounded-lg bg-red-500 p-2 text-white shadow">
                    <div className="relative">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          </Link>
        </td>
      </tr>
    )
  }

  const productListRender = () => {
    if (!order?.orderDetails[0]?.product) return null
    return order.orderDetails.map(product => productListTemplate(product))
  }

  return (
    <div className="my-6 flex justify-center">
      <div className="pin-r pin-y flex w-full flex-col rounded-lg bg-white p-8 text-gray-800 shadow-lg md:w-4/5 lg:w-4/5">
        <div className="px-4">
          <div className="w-1/ mb-2 rounded-full bg-gray-100 p-4">
            <h1 className="ml-2 font-bold uppercase">Order Details</h1>
          </div>
          <table className="w-full text-sm lg:text-base" cellSpacing={0}>
            <thead>
              <tr className="h-12 uppercase">
                <th className="hidden md:table-cell" />
                <th className="text-left">Product</th>
                <th className="pl-5 text-left lg:pl-0 lg:text-right">
                  <span className="hidden lg:inline">Quantity</span>
                </th>
                <th className="hidden text-right md:table-cell">Unit price</th>
                <th className="text-right md:table-cell">Total price</th>
              </tr>
            </thead>
            <tbody>{productListRender()}</tbody>
          </table>
        </div>

        <div className="mt-4 px-4">
          <div className="rounded-full bg-gray-100 p-4">
            <h1 className="ml-2 font-bold uppercase">Payment Details</h1>
          </div>
          <div className="p-4">
            <p className="mb-6 italic text-red-600">
              If you spend over $1500, you can get free delivery.
            </p>
            <div className="flex justify-between">
              <div className="m-2 text-center text-lg font-bold text-gray-800 lg:px-4 lg:py-2 lg:text-xl">
                Subtotal
              </div>
              <div className="m-2 text-center font-bold text-gray-900 lg:px-4 lg:py-2 lg:text-lg">
                ${order?.subTotal}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="m-2 text-center text-lg font-bold text-gray-800 lg:px-4 lg:py-2 lg:text-xl">
                Delivery Fee
              </div>
              <div className="m-2 text-center font-bold text-gray-900 lg:px-4 lg:py-2 lg:text-lg">
                ${order?.deliveryFee}
              </div>
            </div>
            <div className="flex justify-between border-t-2 border-black pt-3">
              <div className="m-2 text-center text-lg font-bold text-gray-800 lg:px-4 lg:py-2 lg:text-xl">
                Total
              </div>
              <div className="mt-2 text-center font-bold text-gray-900 lg:px-4 lg:py-2 lg:text-lg">
                ${order?.subTotal + order?.deliveryFee}
              </div>
            </div>
          </div>
        </div>

        <div className="px-4">
          <div className="w-1/ mb-2 rounded-full bg-gray-100 p-4">
            <h1 className="ml-2 font-bold uppercase">Order Details</h1>
          </div>
          <div className="gap- grid grid-cols-4 px-4">
            <div className="p-4">
              <p className="font-semibold uppercase">name</p>
              <p>{order?.user.name}</p>
            </div>
            <div className="p-4">
              <p className="font-semibold uppercase">Email</p>
              <p>{order?.user.email}</p>
            </div>
            <div className="p-4">
              <p className="font-semibold uppercase">Phone</p>
              <p>{order?.user.phone}</p>
            </div>
            <div className="p-4">
              <p className="font-semibold uppercase">Address</p>
              <p>{order?.user.address}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetail
