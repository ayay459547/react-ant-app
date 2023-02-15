import React, { useState } from 'react'
import { ChatListType } from '../../interface/chat'
import { Button, Modal } from 'antd'
import { 
  EditOutlined, 
  DeleteOutlined, 
  PlusOutlined,
  ExclamationCircleOutlined,
  RightOutlined,
  LeftOutlined,
} from '@ant-design/icons'
import { db } from '../../indexedDB'
import EditList from './EditList'

const { confirm } = Modal

interface PropsType {
  chatList: ChatListType[]
  addList: () => void
  currentChatId: number
  setCurrentChatId: (id: number) => void
}

const Side: React.FC<PropsType> = (props) => {
  const [isOpen, setIsOpen] = useState(true)

  const [isShow, setIsShow] = useState(false)
  const [tempId, setTempId] = useState(0)
  const [tempTitle, setTempTitle] = useState('')
  const { chatList, addList, currentChatId, setCurrentChatId } = props
  
  const resetTemp = () => {
    setIsShow(false)
    setTempId(0)
    setTempTitle('')
  }

  const editList = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent> | React.MouseEvent<HTMLButtonElement, MouseEvent>, 
    options: {
      id: number | undefined
      index: number
      title: string
    }
  ) => {
    event.stopPropagation()
    const { id, title } = options
    setTempId(id ?? 0)
    setTempTitle(title)
    setIsShow(true)
  }

  const deleteList = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent> | React.MouseEvent<HTMLButtonElement, MouseEvent>, 
    options: {
      id: number | undefined
      index: number
      title: string
    }
  ) => {
    event.stopPropagation()
    const { id, title } = options
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: <div>確定刪除 {title}</div>,
      onOk() {
        if (typeof id === 'number') {
          db.chatList.delete(id)
          db.chatItem.where({ id }).delete()
        }
      },
      onCancel() {}
    })
  }

  return (
    <div className={`chat-side ${isOpen ? 'is-open' : ''}`}>
      <Button
        className={`side-collapse ${isOpen ? 'is-open' : ''}`}
        icon={isOpen ? <LeftOutlined /> : <RightOutlined />} 
        onClick={() => { setIsOpen(oddValue => !oddValue) }}
      />

      <Button 
        ghost 
        icon={<PlusOutlined />} 
        className="side-new"
        onClick={addList}
      >
        New Chat
      </Button>

      <EditList
        inputValue={tempTitle}
        updateId={tempId}
        isShow={isShow}
        resetTemp={resetTemp}
      />

      <ul className="side-list">
        {
          chatList.map((chatType, chatTypeIndex) => {
            return (
              <li 
                key={chatType.id} 
                className={`side-item ${chatType.id === currentChatId ? 'active' : ''}`}
                onClick={() => setCurrentChatId(chatType?.id ?? 0)}
              >
                <div className='side-item-title'>{chatType.title}</div>
                <div className='side-item-button'>
                  <Button 
                    type='text'
                    size="small"
                    icon={<EditOutlined style={{color: '#ffffff'}}/>}
                    onClick={(e) => editList(e, {
                      id: chatType.id,
                      index: chatTypeIndex,
                      title: chatType.title
                    })}
                  />
                  <Button 
                    type='text'
                    size="small"
                    icon={<DeleteOutlined style={{color: '#ffffff'}}/>}
                    onClick={(e) => deleteList(e, {
                      id: chatType.id,
                      index: chatTypeIndex,
                      title: chatType.title
                    })}
                  />
                </div>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Side