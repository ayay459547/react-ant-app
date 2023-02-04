import { request } from '../../utils/request'
import { fakeData, fakeDataType } from './fakeData'

export const getUserList = (current: number, pageSize: number) => {
  return request<fakeDataType[]>({
    url: '/getUserList',
    method: 'post',
    data: { current, pageSize }
  }, fakeData)
}

export const createUser = (username: string, age: string, email: string, address: string) => {
  return request<number>({
    url: '/createUser',
    method: 'post',
    data: { username, email, age, address }
  }, 4)
}

export const getUser = (userId: number) => {
  return request<fakeDataType>({
    url: '/getUser',
    method: 'post',
    data: { userId }
  }, {
    id: 1,
    username: 'admin',
    email: 'admin123@gmail.com',
    address: 'New York No. 1 Lake Park',
    age: 21
  })
}

export const updateUser = (userId: number, username: string, age: string, email: string, address: string) => {
  return request<number>({
    url: '/updateUser',
    method: 'post',
    data: { userId, username, age, address }
  }, userId)
}

export const deleteUser = (userId: number) => {
  return request<boolean>({
    url: '/deleteUser',
    method: 'post',
    data: { userId }
  }, true)
}