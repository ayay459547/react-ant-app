import React, { Component, Suspense, ReactNode } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import routes from '../router'
import type { IRouter } from '../router'
import Loading from './Loading'

const baseUrl = `${process.env?.REACT_APP_PROJECT_NAME}`
export default class View extends Component {

  getRoute (routes:IRouter[]): ReactNode[] {
    return routes.map(router => {
      const { path, key, component, children = [] } = router

      if (children.length > 0) {
        return this.getRoute(children).flat()
      } else {
        return <Route 
          path={`/${baseUrl}${path}`}
          key={key} 
          element={component}
        />
      }
    })
  }

  render () {
    return (
      <Suspense fallback={<Loading/>}>
        <Routes>
          <Route 
            path={`/${baseUrl}`} 
            element={<Navigate to={`/${baseUrl}/dashboard`}/>}
          />
          { this.getRoute(routes) }
        </Routes>
      </Suspense>
    )
  }
}