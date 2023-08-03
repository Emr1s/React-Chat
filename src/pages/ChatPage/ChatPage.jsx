import React from 'react'
import './ChatPage.scss'
import ChatMessage from '../../components/Chat/ChatMessage'
import {BsCameraVideo} from 'react-icons/bs'
import {FaUserPlus} from 'react-icons/fa'
import {BsThreeDots} from 'react-icons/bs'
import {CiImageOn} from 'react-icons/ci'
import {IoIosAttach} from 'react-icons/io'
import Message from '../../components/Message/Message'
import {RxExit} from 'react-icons/rx'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
const ChatPage = () => {
  return (
    <div className='chatpage'>
      <div className="chatwindow">
        <div className="left">
          <nav>
            <p style={{fontWeight: 'bold', fontSize: '24px'}}>React Chat</p>
            <div className="info">
              <img src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-733872.jpg&fm=jpg" alt="" />
              <p>Oleg</p>
              <RxExit style={{cursor: 'pointer'}} onClick={() => signOut(auth)}/>

            </div>
          </nav>
          <input type="text" placeholder='Find a user...'/>
          <div className="searchUser">
            <img src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-733872.jpg&fm=jpg" alt="" style={{ height: '40px', width: '40px', borderRadius: '50%', objectFit: 'cover' }} />
            <p>Oleg</p>
          </div>
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
            <span style={{fontSize: '18px'}}>Oleg</span>
            <div className="icons">
              <BsCameraVideo style={{cursor: 'pointer'}}/>
              <FaUserPlus style={{cursor: 'pointer'}}/>
              <BsThreeDots style={{cursor: 'pointer'}}/>
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
              <input type="file" style={{display: 'none'}} id='file' />
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