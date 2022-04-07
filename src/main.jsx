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

const stripePromise = loadStripe(
  'pk_test_51KhtKIGw0UfX0jGGm1o0FdcLgLHT8W3uB5GjGPZwVKFo9OewI7IaqNWzmEOuJyCHSEqZkx95btMaVjih53PNxfFs00v9smXsPR'
)

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
