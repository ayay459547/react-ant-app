import React, { useMemo, useState, useEffect } from 'react'
import { useArray } from '../../utils/hook'
import './s_todoList.scss'
import { Card, Input, Button, Space, Empty } from 'antd'
import { 
  PlusOutlined, 
  EditOutlined, 
  CheckOutlined, 
  DeleteOutlined, 
  ReloadOutlined, 
  ArrowUpOutlined
} from '@ant-design/icons'
import { TodoListType } from '../../interface/todoList'
import { db } from '../../indexedDB'
import { useLiveQuery } from 'dexie-react-hooks'

type TextAreaChangeType = (dataIndex: number, value: string) => void

const TodoList: React.FC = () => {
  const [ isSet, setIsSet ] = useState(false)
  const dbList = useLiveQuery(() => db.todoList.toArray())

  const [ inputValue, setInputValue ] = useState('')
  
  const [ showStatus, setShowStatus ] = useState('All')
  
  const { list, setList, add, remove, change } = useArray<TodoListType>([])

  useEffect(() => {
    if (typeof dbList === 'object' && !isSet) {
      setList(dbList)
      setIsSet(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dbList, isSet])

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list, showStatus])

  const addData = () => {
    const newData = {
      isCompleted: false,
      context: inputValue
    }

    const dbResponse = db.todoList.add(newData)
    dbResponse.then(newId => {
      add({
        ...newData,
        id: newId
      })
    })
    
    setInputValue('')
  }
  const editData = (dataIndex: number, dataId: number | undefined) => {
    const curr = list[dataIndex]
    if (curr.isEdit && typeof dataId === 'number') {
      db.todoList.update(dataId, {
        context: curr.context
      })
    }
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
  const checkData = (dataIndex: number, dataId: number | undefined) => {
    const curr = list[dataIndex]
    change({
      ...curr,
      isCompleted: !curr.isCompleted
    }, dataIndex)

    if (typeof dataId === 'number') {
      db.todoList.update(dataId, {
        isCompleted: !curr.isCompleted
      })
    }
  }
  const deleteData = (dataIndex: number, dataId: number | undefined) => {
    if (typeof dataId === 'number') db.todoList.delete(dataId)
    
    remove(dataIndex)
  }

  return (
    <div className='todo-container'>
      <Space className="todo-input">
        <Input
          value={inputValue}
          size="large" 
          style={{ minWidth: '150px' }}
          onChange={(e) => {setInputValue(e.target.value)}}
          onKeyUp={e => {
            if (e.key === 'Enter') addData()
          }}
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
              <Card.Grid style={{ minWidth: '250px', background: isCompleted ? '#cde9cd' : '' }}>
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
                    onClick={() => editData(itemIndex, id)}
                  />
                  <Button 
                    type='text' 
                    shape="circle"
                    size="large"
                    icon={ isCompleted ?
                      <ReloadOutlined style={{color: '#faad14'}}/>:
                      <CheckOutlined style={{color: '#52c41a'}}/>
                    }
                    onClick={() => checkData(itemIndex, id)}
                  />
                  <Button 
                    type='text' 
                    shape="circle"
                    size="large"
                    icon={<DeleteOutlined style={{color: '#f56c6c'}}/>}
                    onClick={() => deleteData(itemIndex, id)}
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