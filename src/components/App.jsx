import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './Header'

import Home from '../page/Home'
import Login from '../page/Login'
import SignUp from '../page/SignUp'
import ForgetPassword from '../page/ForgetPassword'

const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signUp" element={<SignUp />} />
          <Route path="forgetPassword" element={<ForgetPassword />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
