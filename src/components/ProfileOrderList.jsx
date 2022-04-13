import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

import DeleteModal from '../components/DeleteModal'
import { getAllOrders, deleteOrder } from '../actions/Order'

const ProfileOrderList = () => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const orders = useSelector(state => state.orders)
  const [isVisible, setIsVisible] = useState(false)
  const [orderId, setOrderId] = useState('')

  useEffect(() => dispatch(getAllOrders(auth.token)), [])

  const handleToggleModalShowUp = () => {
    setIsVisible(!isVisible)
  }

  const onDeleteConfirm = async id => {
    dispatch(deleteOrder(auth.token, id))
  }

  const renderDetailButton = (id, paid) => {
    if (!paid) return null
    return (
      <Link to={`/orders/${id}`}>
        <button
          type="button"
          className="focus:shadow-outline mr-3 rounded bg-blue-500 py-1 px-2 text-sm text-white hover:bg-blue-700 focus:outline-none">
          Detail
        </button>
      </Link>
    )
  }

  const renderDeleteButton = id => {
    if (auth?.user?.role === 'admin') {
      return (
        <button
          onClick={() => {
            handleToggleModalShowUp()
            setOrderId(id)
          }}
          type="button"
          className="focus:shadow-outline mr-3 rounded bg-red-500 py-1 px-2 text-sm text-white hover:bg-red-700 focus:outline-none">
          Delete
        </button>
      )
    }
  }

  const renderPaidStatus = paid => {
    return (
      <span
        className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
          paid ? 'text-green-900' : 'text-orange-900'
        } `}>
        <span
          className={`absolute inset-0 rounded-full ${
            paid ? 'bg-green-200' : 'bg-orange-200'
          } opacity-50`}
        />
        <span className="relative">{paid ? 'Success' : 'Fail'}</span>
      </span>
    )
  }

  const orderListTemplate = ({ _id, user, products, createdAt, paid, subTotal, deliveryFee }) => {
    return (
      <tr key={_id}>
        <td className="border-b border-gray-200 bg-white px-2 py-5 text-sm text-center">
          <p className="whitespace-no-wrap text-gray-900">{_id}</p>
        </td>
        <td className="border-b border-gray-200 bg-white py-5 pl-5 text-sm">
          <div className="flex items-center">
            <div className="ml-3">
              <p className="whitespace-no-wrap text-gray-900">{user.name}</p>
            </div>
          </div>
        </td>
        <td className="border-b border-gray-200 bg-white px-2 py-5 text-sm">
          <p className="whitespace-no-wrap text-gray-900">{`${`${products.map(
            item => item.name
          )}`.substring(0, 25)}...`}</p>
        </td>
        <td className="border-b border-gray-200 bg-white px-2 py-5 text-sm">
          <p className="whitespace-no-wrap text-gray-900">${subTotal + deliveryFee}</p>
        </td>
        <td className="border-b border-gray-200 bg-white px-2 py-5 text-sm">
          <p className="whitespace-no-wrap text-gray-900">
            {dayjs(createdAt).format('YYYY-MM-DD HH:mm')}
          </p>
        </td>
        <td className="border-b border-gray-200 bg-white px-2 py-5 text-sm">
          <p className="whitespace-no-wrap text-gray-900">{renderPaidStatus(paid)}</p>
        </td>
        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
          <div className="flex justify-center py-1 font-semibold leading-tight text-green-900">
            {renderDetailButton(_id, paid)}
            {renderDeleteButton(_id)}
          </div>
        </td>
      </tr>
    )
  }

  const renderOrderList = () => {
    return Object.keys(orders).map(id => {
      return orderListTemplate(orders[id])
    })
  }

  return (
    <React.Fragment>
      <div className="h-full min-h-screen w-full rounded-r-3xl bg-white">
        <div className="w-full rounded-md bg-white p-8">
          <div>
            <div className="-mx-4 overflow-x-auto px-4 py-4 sm:-mx-8 sm:px-8">
              <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="border-b-2 border-gray-200 bg-gray-100 py-3 pl-5 text-center text-xs font-semibold uppercase tracking-wider text-gray-600">
                        id
                      </th>
                      <th className="border-b-2 border-gray-200 bg-gray-100 py-3 pl-5 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                        User Name
                      </th>
                      <th className="border-b-2 border-gray-200 bg-gray-100 px-2 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                        Product Name
                      </th>
                      <th className="border-b-2 border-gray-200 bg-gray-100 px-2 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                        Total
                      </th>
                      <th className="border-b-2 border-gray-200 bg-gray-100 px-2 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                        Purchased date
                      </th>
                      <th className="border-b-2 border-gray-200 bg-gray-100 px-2 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                        Paid
                      </th>
                      <th className="border-b-2 border-gray-200 bg-gray-100 px-2 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600"></th>
                    </tr>
                  </thead>
                  <tbody>{renderOrderList()}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DeleteModal
        isVisible={isVisible}
        handleToggleModalShowUp={handleToggleModalShowUp}
        onDeleteConfirm={onDeleteConfirm}
        order={orders[orderId]}
      />
    </React.Fragment>
  )
}

export default ProfileOrderList
