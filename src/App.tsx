import React from 'react'
// import logo from './logo.svg'
// import Login from './pages/Login'
import View from './components/View'
import AppLayout from './components/AppLayout'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <AppLayout>
          <View></View>
        </AppLayout>
      </BrowserRouter>
    </div>
  )
}

export default App
