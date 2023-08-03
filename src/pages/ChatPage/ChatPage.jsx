import React from 'react'
import './ChatPage.scss'
import ChatMessage from '../../components/ChatMessage/ChatMessage'


import Nav from '../../components/Nav/Nav'
import ChatWindow from '../../components/ChatWindow/ChatWindow'
const ChatPage = () => {
  return (
    <div className='chatpage'>
      <div className="chatwindow">
        <div className="left">
          <Nav />
          <hr />
          <div className="chat">
            <ChatMessage />
          </div>
        </div>
       <ChatWindow />
      </div>
    </div>
  )
}

export default ChatPage