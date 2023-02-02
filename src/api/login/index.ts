import { request } from '../../utils/request'
import { fakeData, fakeDataType } from './fakeData'

export const login = (account: string, password: string) => {
  return request<fakeDataType>({
    url: '/login',
    method: 'post',
    data: { account, password }
  }, fakeData)
}