import React from 'react'

export interface fakeDataType {
  id: number
  key: React.Key
  userName: string
  email: string
  address: string
  age: number
}

export const fakeData: fakeDataType[] = [
  {
    id: 1,
    key: '1',
    userName: 'admin',
    email: 'admin123@gmail.com',
    address: 'New York No. 1 Lake Park',
    age: 21
  },
  {
    id: 2,
    key: '2',
    userName: 'JimGreen',
    email: 'jimGreen564223@gmail.com',
    address: 'London No. 1 Lake Park',
    age: 30
  },
  {
    id: 3,
    key: '3',
    userName: 'JoeBlack',
    email: 'joeBlack445887@gmail.com',
    address: 'Sydney No. 1 Lake Park',
    age: 27
  }
]