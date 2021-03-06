import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './Header'
import Footer from './Footer'
import PrivateWrapper from './PrivateWrapper'
import ProfileUserInfo from './ProfileUserInfo'
import ProfileOrderList from './ProfileOrderList'
import ProfileProductList from './ProfileProductList'
import ProfileReviewList from './ProfileReviewList'
import ProductForm from './ProductForm'

import Home from '../page/Home'
import Login from '../page/Login'
import SignUp from '../page/SignUp'
import ForgetPassword from '../page/ForgetPassword'
import ProductDetail from '../page/ProductDetail'
import Profile from '../page/Profile'
import OrderDetail from '../page/OrderDetail'
import Cart from '../page/Cart'
import Checkout from '../page/Checkout'
import Success from '../page/Success'
import Cancel from '../page/Cancel'
import Review from '../page/Review'

const App = () => {
  return (
    <div className="bg-gray-100">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signUp" element={<SignUp />} />
          <Route path="forgetPassword" element={<ForgetPassword />} />
          <Route path="products" element={<Home />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route element={<PrivateWrapper />}>
            <Route path="profile" element={<Profile />}>
              <Route path="userInfo" element={<ProfileUserInfo />} />
              <Route path="orderList" element={<ProfileOrderList />} />
              <Route path="productList" element={<ProfileProductList />} />
              <Route path="reviewList" element={<ProfileReviewList />} />
            </Route>
            <Route path="orders/:id" element={<OrderDetail />} />
            <Route path="products/create" element={<ProductForm />} />
            <Route path="products/edit/:id" element={<ProductForm />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="success/:id" element={<Success />} />
            <Route path="cancel" element={<Cancel />} />
            <Route path="reviews/:id" element={<Review />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App
