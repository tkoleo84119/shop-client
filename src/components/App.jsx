import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './Header'
import Footer from './Footer'

import Home from '../page/Home'
import Login from '../page/Login'
import SignUp from '../page/SignUp'
import ForgetPassword from '../page/ForgetPassword'
import ProductDetail from '../page/ProductDetail'

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
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App
