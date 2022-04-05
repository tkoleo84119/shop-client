import React from 'react'

const AlertTemplate = ({ options, message }) => {
  const classType = {
    success:
      'flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-md text-green-100 bg-green-700 border border-green-700',
    fail: 'flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-md text-yellow-100 bg-yellow-700 border border-yellow-700',
    error:
      'flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-md text-red-100 bg-red-700 border border-red-700'
  }

  const iconType = {
    success: 'mdi mdi-checkbox-marked-circle text-green-100',
    fail: 'mdi mdi-alert-circle text-yellow-100',
    error: 'mdi mdi-close-circle text-red-100'
  }

  return (
    <div className={classType[options.type]}>
      <div slot="avatar">
        <i className={`${iconType[options.type]} mr-1 text-xl`}></i>
      </div>
      <div className="max-w-full flex-initial text-xl font-normal">{message}</div>
    </div>
  )
}

export default AlertTemplate
