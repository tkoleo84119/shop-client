import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './Header'
import Footer from './Footer'
import PrivateWrapper from './PrivateWrapper'
import ProfileUserInfo from './ProfileUserInfo'
import ProfileOrderList from './ProfileOrderList'
import ProfileProductList from './ProfileProductList'

import Home from '../page/Home'
import Login from '../page/Login'
import SignUp from '../page/SignUp'
import ForgetPassword from '../page/ForgetPassword'
import ProductDetail from '../page/ProductDetail'
import Profile from '../page/Profile'

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
            </Route>
          </Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App
