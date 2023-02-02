import React, { useState } from 'react'
import { Space, Table } from 'antd'

import { useMount } from '../../utils/hook'
import { getUser } from '../../api/user'
import { responseType } from '../../utils/request'

const { Column } = Table

interface DataType {
  key: React.Key
  id: number
  userName: string
  email: string
  address: string
  age: number
}

const User: React.FC = () => {

  const [current, setCurrent] = useState(1)
  const pageSize = 10

  const [tableData, setTableData] = useState<DataType[]>([])

  useMount(() => {
    getUser(current, pageSize).then(async response => {
      const { code, data } = (response as responseType)
      if (code === 200) {
        setTableData(oldValue => [...oldValue, ...data])
      }
    })
  })

  return (
    <Table 
      dataSource={tableData}
    >
      <Column title="UserName" dataIndex="userName" key="userName" />
      <Column title="Age" dataIndex="age" key="age" />
      <Column title="Address" dataIndex="address" key="address" />
      <Column
        title="Action"
        key="action"
        render={(_: any, record: DataType) => (
          <Space size="middle">
            <a>Invite {record.userName}</a>
            <a>Delete</a>
          </Space>
        )}
      />
    </Table>
  )
}

export default User