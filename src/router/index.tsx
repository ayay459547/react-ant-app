import React, { lazy, ReactNode } from 'react'
import { 
  // useRoutes,
  // redirect
} from 'react-router-dom'
import { 
  AppstoreOutlined,
  LoginOutlined, 
  AuditOutlined,
  NotificationOutlined, 
  UserOutlined,
  MessageOutlined,
  FormatPainterOutlined,
} from '@ant-design/icons'

// left bar
const Dashboard = lazy(() => import('../pages/Dashboard'))
const Chat = lazy(() => import('../pages/Chat'))
const TodoList = lazy(() => import('../pages/TodoList'))
const User = lazy(() => import('../pages/User'))
const Test1 = lazy(() => import('../pages/Canvas/Test1'))
const Test2 = lazy(() => import('../pages/Canvas/Test2'))
// const Test3 = lazy(() => import('../pages/Canvas/Test3'))
// top bar
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
    title: 'Dashboard',
    key: 'dashboard',
    component: <Dashboard/>,
    exact: true,
    icon: React.createElement(AppstoreOutlined),
    position: 'left'
  },
  {
    path: '/chat',
    title: 'Chat',
    key: 'chat',
    component: <Chat/>,
    exact: true,
    icon: React.createElement(MessageOutlined),
    position: 'left'
  },
  {
    path: '/todoList',
    title: 'TodoList',
    key: 'todoList',
    component: <TodoList/>,
    exact: true,
    icon: React.createElement(AuditOutlined),
    position: 'left'
  },
  {
    path: '/user',
    title: 'User',
    key: 'user',
    component: <User/>,
    exact: true,
    icon: React.createElement(UserOutlined),
    position: 'left'
  },
  {
    path: '/canvas',
    title: 'Canvas',
    key: 'canvas',
    exact: true,
    icon: React.createElement(FormatPainterOutlined),
    position: 'left',
    children: [
      {
        path: '/canvas/test1',
        title: 'Clock',
        key: 'test1',
        component: <Test1 />,
        exact: true
      },
      {
        path: '/canvas/test2',
        title: 'Moon',
        key: 'test2',
        component: <Test2 />,
        exact: true
      }
      // {
      //   path: '/canvas/test3',
      //   title: 'Test3',
      //   key: 'test3',
      //   component: <Test3 />,
      //   exact: true
      // }
    ]
  },
  {
    path: '/notice',
    title: 'Notice',
    key: 'notice',
    component: <Notice/>,
    icon: React.createElement(NotificationOutlined),
    position: 'top'
  },
  {
    path: '/login',
    title: 'Logout',
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