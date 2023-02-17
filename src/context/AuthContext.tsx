import React, { ReactNode, useState } from 'react'

import { message } from 'antd'
import { login as loginApi } from '../api/login'
import { set, rm } from '../utils/storage'
import { responseType } from '../utils/request'
import type { UserType } from '../interface/auth'

export const AuthContext = React.createContext<{
  user: UserType | null,
  login: (account: string, password: string) => void,
  logout: () => void
} | null>(null)

AuthContext.displayName = 'AuthContext'

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null)
  
  const login = (account: string, password: string) => {
    loginApi(account, password).then(async response => {
      const { code, msg, data } = (response as responseType)
      if (code === 200) {
        await set('token', data.token)
        const { 
          // account, 
          username, 
          token 
        } = data
        setUser({ account, username, token })

        message.success(msg)
      }
      // console.log(response)
      console.log('env => ', process.env.NODE_ENV)
    })
  }

  const logout = () => {
    rm('token')
    setUser(null)
  }

  return <AuthContext.Provider children={children} value={{ user, login, logout }} />
}