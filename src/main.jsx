import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Provider as AlertProvider } from 'react-alert'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import './index.css'
import App from './components/App'
import store from './store'
import AlertTemplate from './components/AlertTemplate'

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY)

ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate}>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </AlertProvider>
  </Provider>,
  document.getElementById('root')
)
