import { request } from '../utils/request'
import { get } from '../utils/storage'

export interface fakeDataType {
  id: number
  username: string
  email: string
  address: string
  age: number
}

export const getUser = async () => {
  const token = await get('token')

  return request<fakeDataType>({
    url: '/getUserList',
    method: 'post',
    data: { token }
  }, {
    id: 1,
    username: 'admin',
    email: 'admin123@gmail.com',
    address: 'New York No. 1 Lake Park',
    age: 21
  })
}