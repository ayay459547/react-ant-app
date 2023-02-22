import React, { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { Button, Input } from 'antd'
import './s_notice.scss'

const Notice: React.FC = () => {
  const [ws, setWs] = useState<Socket | null>(null)
  const [messageList, setMessageList] = useState<{ name: string, message: string }[]>([])
  const [message, setMessage] = useState('')
  const [user, setUser] = useState('')

  useEffect(() => {
    setWs(io('http://localhost:3050'))
  }, [])

  const initWebSocket = () => {
    ws?.on('newMessage', messageList => {
      setMessageList(messageList)
    })
  }

  useEffect(() => {
    if (ws) {
      console.log('initWebSocket !')

      initWebSocket()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ws])

  const sendMessage = () => {
    ws?.emit('sendMessage', {
      name: user,
      message
    })
  }

  return (
    <div className='notice-container flex-column'>
      <ul style={{ flex: 1 }} className="notice-list">
        {
          messageList.map((messageItem, messageIndex) => {
            return <li key={messageIndex} className="notice-item">
              <div className='item-img'>{ messageItem.name[0] ?? '?' }</div>
              <div className='item-user'>
                <div className='item-name'>{ messageItem.name }</div>
                <div className='item-msg'>{ messageItem.message }</div>
              </div>
            </li>
          })
        }
      </ul>

      <Input.Group compact>
        <Input 
          style={{ width: 'calc(50% - 100px)' }} 
          defaultValue="" 
          value={message}
          placeholder="輸入訊息"
          onChange={(e) => setMessage(e.target.value)}
        />
        <Input 
          style={{ width: 'calc(50% - 100px)' }} 
          defaultValue="" 
          value={user}
          placeholder="輸入使用者"
          onChange={(e) => setUser(e.target.value)}
        />
        <Button type="primary" onClick={sendMessage}>Submit</Button>
      </Input.Group>      
    </div>
  )
}

export default Notice
