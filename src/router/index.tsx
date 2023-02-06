import React, { lazy, ReactNode } from 'react'
import { 
  // useRoutes,
  // redirect
} from 'react-router-dom'
import { 
  DashboardOutlined,
  LoginOutlined, 
  NotificationOutlined, 
  UserOutlined
} from '@ant-design/icons'

const Dashboard = lazy(() => import('../pages/Dashboard'))
const User = lazy(() => import('../pages/User'))
const Test1 = lazy(() => import('../pages/ThreeJS/test1'))
const Test2 = lazy(() => import('../pages/ThreeJS/test2'))
const Test3 = lazy(() => import('../pages/ThreeJS/test3'))

const Notice = lazy(() => import('../pages/Notice'))
const Login = lazy(() => import('../pages/Login'))
const Page404 = lazy(() => import('../pages/Page404'))

export interface IRouter {
  path: string
  title: string
  key: string
  component?: ReactNode
  exact?: Boolean
  icon?: ReactNode
  position?: string
  children?: Array<IRouter>
}

const routes: IRouter[] = [
  {
    path: '/dashboard',
    title: '儀錶板',
    key: 'dashboard',
    component: <Dashboard/>,
    exact: true,
    icon: React.createElement(DashboardOutlined),
    position: 'left'
  },
  {
    path: '/user',
    title: '使用者',
    key: 'user',
    component: <User/>,
    exact: true,
    icon: React.createElement(UserOutlined),
    position: 'left'
  },
  {
    path: '/threeJS',
    title: 'ThreeJS',
    key: 'threeJS',
    exact: true,
    icon: React.createElement(UserOutlined),
    position: 'left',
    children: [
      {
        path: '/threeJS/test1',
        title: '測試1',
        key: 'test1',
        component: <Test1 />,
        exact: true
      },
      {
        path: '/threeJS/test2',
        title: '測試2',
        key: 'test2',
        component: <Test2 />,
        exact: true
      },
      {
        path: '/threeJS/test3',
        title: '測試3',
        key: 'test3',
        component: <Test3 />,
        exact: true
      }
    ]
  },
  {
    path: '/notice',
    title: '通知',
    key: 'notice',
    component: <Notice/>,
    icon: React.createElement(NotificationOutlined),
    position: 'top'
  },
  {
    path: '/login',
    title: '登入',
    key: 'login',
    component: <Login/>,
    icon: React.createElement(LoginOutlined),
    position: 'top'
  },
  {
    path: '*',
    title: '404',
    key: 'page404',
    component: <Page404/>,
    position: ''
  }
]

export default routes
// export default () => useRoutes(routes)