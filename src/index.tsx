import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/g_style'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { store } from './store'
import { Provider } from 'react-redux'
import { AppProviders } from './context/AppProviders'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <AppProviders>
      <App />
    </AppProviders>
  </Provider>
  // <div>test</div>
  // </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
