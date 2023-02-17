import React, { useState, useEffect, useMemo } from 'react'
import './s_chat.scss'
import { Button, Input, Tooltip } from 'antd'
import { 
  PlusOutlined,
  RobotOutlined,
  UserOutlined,
  SendOutlined,
} from '@ant-design/icons'
import { db } from '../../indexedDB'
import { useLiveQuery } from 'dexie-react-hooks'
import { getOpenAIResponse } from '../../utils/openAi'
import Side from './Side'

const Chat: React.FC = () => {
  // chatList
  const dbList = useLiveQuery(() => db.chatList.toArray())
  const chatList = useMemo(() => dbList ?? [], [dbList])
  const [currentChatId, setCurrentChatId] = useState(0)
  // chatItem
  const dbItem = useLiveQuery(() => db.chatItem.toArray())
  const chatItem = useMemo(() => dbItem ?? [], [dbItem])
  const [inputValue, setInputValue] = useState('')
  const [canAddItem, setCanAddItem] = useState(false)

  // chatList function
  const addList = () => {
    db.chatList.add({ title: 'This is New Chat' })
  }
  // chatItem function
  const addItem = () => {
    if (isChatEmpty || inputValue === '') return
    setCanAddItem(false)
    const dbUserResponse = db.chatItem.add({
      chatListId: currentChatId,
      from: 'user',
      text: inputValue
    })
    dbUserResponse.then(async () => {
      const openAIResponse = await getOpenAIResponse(inputValue)

      const { data = '' } = openAIResponse
      
      const dbAIResponse = db.chatItem.add({
        chatListId: currentChatId,
        from: 'ai',
        text: data
      })

      dbAIResponse.then(() => {
        setInputValue('')
        setCanAddItem(true)
      })
    })
  }

  // show about
  useEffect(() => {
    let tempId = 0
    if (chatList.length > 0) {
      tempId = chatList[chatList.length - 1].id ?? 0
    }
    setCurrentChatId(tempId)
  }, [chatList])

  const isChatEmpty = useMemo(() => {
    const isEmpty = chatList.length <= 0
    setCanAddItem(!isEmpty)
    return isEmpty
  }, [chatList])

  const showList = useMemo(() => {
    return chatItem.filter(showItem => {
      return showItem.chatListId === currentChatId
    })
  }, [currentChatId, chatItem])

  const scrollToBottom = () => {
    const scrollKey = showList.length
    const lastLiDom = document.querySelector(`li[scroll-key="${scrollKey}"]`)
    lastLiDom?.scrollIntoView({ behavior: "smooth", block: "end" })
  }

  useEffect(() => {
    scrollToBottom()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatItem])
  
  return (
    <div className="chat-container">
      <Side 
        chatList={chatList} 
        addList={addList} 
        currentChatId={currentChatId}
        setCurrentChatId={setCurrentChatId}
      />

      <div className="chat-main">
        { isChatEmpty ? 
          <div className='main-empty'>
            <h3>Chat is Empty</h3>
            <Button
              shape="round" 
              type="primary"
              icon={<PlusOutlined />} 
              onClick={addList}
            >
              New Chat
            </Button>
          </div> :
          <ul className="main-list">
            {
              showList.map((showItem, showItemIndex) => {
                return (
                  <li key={showItem.id} className="main-item" scroll-key={showItemIndex + 1}>
                    <div className='main-icon'>
                      { showItem.from === 'ai' ? <RobotOutlined style={{color: '#52c41a'}}/> : <UserOutlined style={{color: '#faad14'}}/> }
                    </div>
                    <div className='main-text'>{showItem.text}</div>
                  </li>
                )
              })
            }
          </ul>
        }
        <div className="main-submit">
          <Input.Group compact>
            <Input
              value={inputValue}
              style={{ width: 'calc(100% - 40px)' }}
              size="large"
              disabled={!canAddItem}
              onChange={(e) => {setInputValue(e.target.value)}}
              onPressEnter={addItem}
            />
            <Tooltip title="send">
              <Button 
                icon={<SendOutlined />} 
                size="large" 
                disabled={!canAddItem}
                onClick={addItem}
              />
            </Tooltip>
          </Input.Group>
          {
            (!canAddItem && !isChatEmpty)? 
            <div className='main-wait'>waitting for openAi to respond</div> : 
            <div></div>
          }
        </div>
      </div>
    </div>
  )
}

export default Chat