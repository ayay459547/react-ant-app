import React, { useEffect, useState } from 'react'
import { Space, Table, Button, Modal, message } from 'antd'
import { EditOutlined, DeleteOutlined, UserAddOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import Create from './Create'
import Update from './Update'

import './s_user.scss'
import { getUserList, deleteUser } from '../../api/user'
import { responseType } from '../../utils/request'

interface DataType {
  key?: React.Key
  id: number
  username: string
  email: string
  address: string
  age: number
}

const { confirm } = Modal

const User: React.FC = () => {

  const [ current ] = useState(1)
  const pageSize = 10

  const [getDataCount, setGetDataCount] = useState(1)

  const [tableData, setTableData] = useState<DataType[]>([])

  useEffect(() => {
    getUserList(current, pageSize).then(async response => {
      const { code, data } = (response as responseType)
      if (code === 200) {
        const newValue = data.map((item: DataType) => {
          return {
            ...item,
            key: item.id
          }
        })
        setTableData(()=> [...newValue])
      }
    })
  }, [getDataCount])

  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isUpdateOpen, setIsUpdateOpen] = useState(false)

  const [tempId, setTempId] = useState(0)

  const createData = () => {
    setIsCreateOpen(true)
  }

  const updateData = (record: DataType) => {
    setTempId(record.id)
    setIsUpdateOpen(true)
  }
  const deleteData = (record: DataType) => {
    const { id: userId, username } = record
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: <div>確定刪除 {username}</div>,
      onOk() {
        deleteUser(userId).then(response => {
          const { code, msg } = (response as responseType)
          if (code === 200) {
            message.success(msg)
          }
          console.log(response)
        })
      },
      onCancel() {}
    })
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'UserName',
      width: 40,
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: 'Age',
      width: 30,
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: 'E-mail',
      width: 80,
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Address',
      width: 100,
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Action',
      width: 80,
      dataIndex: 'action',
      key: 'action',
      fixed: 'right',
      render: (_: any, record: DataType) => (
        <Space size="middle">
          <Button 
            type="primary"
            icon={<EditOutlined />}
            onClick={() => updateData(record)}
          >
            Update
          </Button>
          <Button 
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => deleteData(record)}
          >
            Delete
          </Button>
        </Space>
      )
    }
  ]

  return (
    <div className='user-container'>

      <div className="user-new">
        <Button 
          type="primary"
          icon={<UserAddOutlined />}
          onClick={createData}
        >
          Create
        </Button>
      </div>
      <Create 
        isShow={isCreateOpen} 
        setIsShow={setIsCreateOpen}
        setGetDataCount={setGetDataCount}
      />
      <Update
        userId={tempId}
        setTempId={setTempId}
        isShow={isUpdateOpen} 
        setIsShow={setIsUpdateOpen}
        setGetDataCount={setGetDataCount}
      />
    
      <Table 
        dataSource={tableData} 
        className="user-table" 
        columns={columns}
        scroll={{ x: 1000 }}
        pagination={{ pageSize }}
      />
    </div>
  )
}

export default User