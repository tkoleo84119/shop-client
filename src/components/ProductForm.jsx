import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Field } from 'react-final-form'

import { getProduct, createProduct, updateProduct } from '../actions/Product'

const ProductForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const product = useSelector(state => state.products[params.id])
  const auth = useSelector(state => state.auth)
  const [image, setImage] = useState('')

  useEffect(() => {
    if (params.id) return dispatch(getProduct(params.id))
  }, [])

  const onSubmit = async formValues => {
    if (params.id) {
      await dispatch(updateProduct(params.id, formValues, image, auth.token))
      return navigate('/profile/productList')
    }

    await dispatch(createProduct(formValues, image, auth.token))
    navigate('/profile/productList')
  }

  const renderImage = () => {
    if (image)
      return (
        <div className="mb-2 font-semibold">
          Current Image: <span className="font-normal">{image.name}</span>
        </div>
      )
  }

  const validate = values => {
    if (values.image) setImage(values.image)

    const errors = {}

    if (!values.name) {
      errors.name = 'Please enter a name'
    } else if (values?.name?.length > 30) {
      errors.name = 'The name must be lower than 30 characters'
    }

    if (!values.quantity) {
      errors.quantity = 'Please enter quantity of product'
    }

    if (!values.price) {
      errors.price = 'Please enter price of product'
    }

    if (values?.description?.length > 500) {
      errors.description = 'The description must be lower than 500 characters'
    }

    return errors
  }

  const renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div>
          <span className="text-xs text-red-500">{error}</span>
        </div>
      )
    }
  }

  const inputTemplate = ({ input, placeholder, meta }) => {
    const className = `w-full rounded border-2 px-3 py-2 ${
      meta.error && meta.touched ? 'border-red-400' : 'focus:border-blue-400'
    } focus:shadow focus:outline-none`

    return (
      <div>
        <input {...input} className={className} placeholder={placeholder} autoComplete="off" />
        {renderError(meta)}
      </div>
    )
  }

  return (
    <div className="my-10 flex h-full min-h-screen items-center justify-center">
      <Form
        onSubmit={values => onSubmit(values)}
        validate={values => validate(values)}
        render={({ handleSubmit }) => (
          <form className="grid w-1/2 rounded-lg bg-white shadow-xl" onSubmit={handleSubmit}>
            <div className="mt-4">
              <div className="flex justify-center py-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="h-12 w-12 rounded-full border border-red-700 bg-red-800 p-2 text-white"
                  viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <div className="flex justify-center">
                <div className="flex">
                  <h1 className="text-xl font-bold text-gray-600 md:text-2xl">
                    {params.id ? `Edit "${product?.name}"` : 'Create a new product'}
                  </h1>
                </div>
              </div>
            </div>

            <div className="mx-7 mt-5 grid grid-cols-1">
              <label className="text-light text-xs font-semibold uppercase text-gray-500 md:text-sm">
                Product Name
              </label>
              <Field
                className="mt-1 w-full rounded-lg border-2 py-2 px-3 focus:border-transparent focus:outline-none focus:ring-2"
                name="name"
                type="text"
                defaultValue={product?.name}
                component={inputTemplate}
                placeholder="Product Name"
              />
            </div>
            <div className="mx-7 mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8">
              <div>
                <label className="text-light text-xs font-semibold uppercase text-gray-500 md:text-sm">
                  quantity
                </label>
                <Field
                  type="number"
                  name="quantity"
                  defaultValue={product?.quantity}
                  min="0"
                  component={inputTemplate}
                  placeholder="Quantity"
                />
              </div>
              <div>
                <label className="text-light text-xs font-semibold uppercase text-gray-500 md:text-sm">
                  Price
                </label>
                <Field
                  className="mt-1 w-full rounded-lg border-2 py-2 px-3 focus:border-transparent focus:outline-none focus:ring-2 "
                  type="number"
                  name="price"
                  min="1"
                  component="input"
                  placeholder="$Price"
                  defaultValue={product?.price}
                />
              </div>
            </div>
            <div className="mx-7 mt-5 grid grid-cols-1">
              <label className="text-light text-xs font-semibold uppercase text-gray-500 md:text-sm">
                Category
              </label>
              <Field
                name="category"
                className="mt-1 rounded-lg border-2 py-2 px-3 focus:border-transparent focus:outline-none focus:ring-2"
                component="select"
                defaultValue={product?.category}>
                <option />
                <option>Cameras</option>
                <option>Headphones</option>
                <option>Laptops</option>
                <option>Microphone</option>
                <option>Smartphones</option>
                <option>Other</option>
              </Field>
            </div>
            <div className="mx-7 mt-5 grid grid-cols-1">
              <label className="text-light text-xs font-semibold uppercase text-gray-500 md:text-sm">
                Features
              </label>
              <Field
                className="mt-1 rounded-lg border-2 py-2 px-3 focus:border-transparent focus:outline-none focus:ring-2 "
                name="features"
                type="text"
                component="input"
                placeholder="Feature1,Feature2,..."
                defaultValue={product?.features}
              />
            </div>
            <div className="mx-7 mt-5 grid grid-cols-1">
              <label className="text-light text-xs font-semibold uppercase text-gray-500 md:text-sm">
                Description
              </label>
              <Field
                className="mt-1 rounded-lg border-2 py-2 px-3 focus:border-transparent focus:outline-none focus:ring-2 "
                name="description"
                type="text"
                component="textarea"
                placeholder="Description..."
                defaultValue={product?.description}
              />
            </div>
            <div className="mx-7 mt-5 grid grid-cols-1">
              <label className="text-light mb-1 text-xs font-semibold uppercase text-gray-500 md:text-sm">
                Image
              </label>
              {renderImage()}
              <div className="flex w-full items-center justify-center">
                <label className="group flex h-32 w-full flex-col border-4 border-dashed">
                  <div className="flex flex-col items-center justify-center pt-7">
                    <svg
                      className="h-10 w-10"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="pt-1 text-sm lowercase tracking-wider text-gray-400">
                      Select a photo
                    </p>
                  </div>
                  <Field name="image">
                    {({ input: { value, ...input } }) => (
                      <input
                        {...input}
                        type="file"
                        onChange={e => setImage(e.target.files[0])}
                        accept="image/png, image/jpeg"
                        className="hidden"
                      />
                    )}
                  </Field>
                </label>
              </div>
            </div>
            <div className="flex items-center justify-center  gap-4 pt-5 pb-5 md:gap-8">
              <a
                className="w-auto cursor-pointer rounded-lg bg-gray-500 px-4 py-2 font-medium text-white shadow-xl hover:bg-gray-700"
                onClick={() => navigate(-1)}>
                Cancel
              </a>
              <button className="w-auto rounded-lg bg-red-500 px-4 py-2 font-medium text-white shadow-xl hover:bg-red-600">
                {params.id ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        )}
      />
    </div>
  )
}

export default ProductForm
