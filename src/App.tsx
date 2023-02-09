import React, { useEffect } from 'react'
// import logo from './logo.svg'
// import Login from './pages/Login'
import View from './components/View'
import AppLayout from './components/AppLayout'
import { BrowserRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from './store/modules/user'
import { getUser } from './api'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    getUser().then(response => {
      const { data } = response

      dispatch(setUser(data))
    })
    // eslint-disable-next-line
  }, [])

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
