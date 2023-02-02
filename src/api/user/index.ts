import { request } from '../../utils/request'
import { fakeData, fakeDataType } from './fakeData'

export const getUser = (current: number, pageSize: number) => {
  return request<fakeDataType[]>({
    url: '/getUser',
    method: 'post',
    data: { current, pageSize }
  }, fakeData)
}