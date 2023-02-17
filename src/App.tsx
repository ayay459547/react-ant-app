import React, { useEffect } from 'react'
// import logo from './logo.svg'
// import Login from './pages/Login'
import View from './components/View'
import AppLayout from './components/AppLayout'
import { 
  // BrowserRouter,
  HashRouter 
} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from './store/modules/user'
import { getUser } from './api'

const App: React.FC = () => {
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
      <HashRouter>
        <AppLayout>
          <View></View>
        </AppLayout>
      </HashRouter>
    </div>
  )
}

export default App
