import React from 'react'
import './ChatPage.scss'
import ChatMessage from '../../components/Chat/ChatMessage'
import { BsCameraVideo } from 'react-icons/bs'
import { FaUserPlus } from 'react-icons/fa'
import { BsThreeDots } from 'react-icons/bs'
import { CiImageOn } from 'react-icons/ci'
import { IoIosAttach } from 'react-icons/io'
import Message from '../../components/Message/Message'

import Nav from '../../components/Nav/Nav'
const ChatPage = () => {
  return (
    <div className='chatpage'>
      <div className="chatwindow">
        <div className="left">
          <Nav />
          <hr />
          <div className="chat">
            <div className="message">
              <ChatMessage />
              <ChatMessage />
              <ChatMessage />
            </div>
          </div>
        </div>
        <div className="right">
          <div className="navbar">
            <span style={{ fontSize: '18px' }}>Oleg</span>
            <div className="icons">
              <BsCameraVideo style={{ cursor: 'pointer' }} />
              <FaUserPlus style={{ cursor: 'pointer' }} />
              <BsThreeDots style={{ cursor: 'pointer' }} />
            </div>
          </div>
          <div className="messages">
            <Message />
            <Message />
          </div>
          <div className="inputMessage">
            <div className="input">
              <input type="text" placeholder='Type a message...' />
            </div>
            <div className="chatIcons">
              <input type="file" style={{ display: 'none' }} id='file' />
              <IoIosAttach />
              <CiImageOn />
              <button>Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatPage