import React, { useMemo, useState, useEffect } from 'react'
import { useArray } from '../../utils/hook'
import './s_todoList.scss'
import { Card, Input, Button, Space, Empty } from 'antd'
import { PlusOutlined, EditOutlined, CheckOutlined, DeleteOutlined, ReloadOutlined, ArrowUpOutlined } from '@ant-design/icons'

interface CardDataType {
  id: number
  context: string
  isCompleted: boolean
  isEdit?: boolean
}

type TextAreaChangeType = (dataIndex: number, value: string) => void

function getData () {
  return Promise.resolve([])
}

function getLastId(array: Array<CardDataType>): number {
  if (array.length === 0) return 0
  return Math.max(...array.map(item => item?.id ?? 0))
}

const TodoList: React.FC = () => {
  const [ inputValue, setInputValue ] = useState('')

  const [ showStatus, setShowStatus ] = useState('All')

  const { value: list, setValue: setList, add, remove, change } = useArray<CardDataType>([])

  useEffect(() => {
    console.log('init')
    getData().then(data => {
      setList(data)
    })
  }, [])

  const undoneList = useMemo(() => {
    return list.filter(item => !item.isCompleted)
  }, [list])

  const completedList = useMemo(() => {
    return list.filter(item => item.isCompleted)
  }, [list])

  const showList = useMemo(() => {
    switch(showStatus) {
      case 'Active':
        return undoneList
      case 'Completed':
        return completedList
      case 'All':
      default:
        return list
    }
  }, [list, showStatus])

  const addData = () => {
    const newId = getLastId(list) + 1
    add({
      id: newId,
      isCompleted: false,
      context: inputValue
    })
    setInputValue('')
  }
  const editData = (dataIndex: number) => {
    const curr = list[dataIndex]
    change({
      ...curr,
      isEdit: !curr.isEdit
    }, dataIndex)
  }
  const textAreaChange:TextAreaChangeType = (dataIndex, value) => {
    const curr = list[dataIndex]
    change({
      ...curr,
      context: value
    }, dataIndex)
  }
  const checkData = (dataIndex: number) => {
    const curr = list[dataIndex]
    change({
      ...curr,
      isCompleted: !curr.isCompleted
    }, dataIndex)
  }
  const deleteData = (dataIndex: number) => {
    remove(dataIndex)
  }

  return (
    <div className='todo-container'>
      <Space className="todo-input">
        <Input
          value={inputValue}
          size="large" style={{ width: '300px' }}
          onChange={(e) => {setInputValue(e.target.value)}}
        />
        <Button 
          type="primary" 
          shape="circle" 
          icon={<PlusOutlined />}
          onClick={addData}
        />
      </Space>

      <Space className="todo-filter">
        {
          ['Active', 'Completed', 'All'].map(status => {
            const type = showStatus === status ? 'primary' : 'default'
            return (
              <Button 
                key={status}
                shape="round" 
                type={type}
                onClick={() => {setShowStatus(status)}}
              >
                {status}
              </Button>
            )
          })
        }
      </Space>

      <div className="todo-list">
        { 
          showList.length > 0 ?
          showList.map((item, itemIndex) => {
            const { id, context, isCompleted, isEdit } = item
            return (<Card key={id}>
              <Card.Grid style={{ width: '300px', background: isCompleted ? '#cde9cd' : '' }}>
                <div style={{ height: '60px' }}>
                {
                  isEdit ? 
                  <Input.TextArea
                    value={context}
                    onChange={(e) => textAreaChange(itemIndex, e.target.value)}
                    autoSize={{ minRows: 2, maxRows: 2 }}
                  /> : <div className='card-text'>{context}</div>
                }
                </div>
                <Space className="card-btn">
                  <Button 
                    type='text' 
                    shape="circle"
                    size="large"
                    icon={ isEdit ?
                      <ArrowUpOutlined style={{color: '#000000e0'}}/>:
                      <EditOutlined style={{color: '#000000e0'}}/>
                    }
                    onClick={() => editData(itemIndex)}
                  />
                  <Button 
                    type='text' 
                    shape="circle"
                    size="large"
                    icon={ isCompleted ?
                      <ReloadOutlined style={{color: '#faad14'}}/>:
                      <CheckOutlined style={{color: '#52c41a'}}/>
                    }
                    onClick={() => checkData(itemIndex)}
                  />
                  <Button 
                    type='text' 
                    shape="circle"
                    size="large"
                    icon={<DeleteOutlined style={{color: '#f56c6c'}}/>}
                    onClick={() => deleteData(itemIndex)}
                  />
                </Space>
              </Card.Grid>
            </Card>)
          }) :
          <Empty description={false} className="todo-empty"/>
        }
      </div>
    </div>
  )
}

export default TodoList