import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Provider as AlertProvider } from 'react-alert'

import './index.css'
import App from './components/App'
import store from './store'
import AlertTemplate from './components/AlertTemplate'

ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate}>
      <App />
    </AlertProvider>
  </Provider>,
  document.getElementById('root')
)
