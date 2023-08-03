import React, { useContext } from 'react'
import './ChatWindow.scss'
import { BsCameraVideo } from 'react-icons/bs'
import { FaUserPlus } from 'react-icons/fa'
import { BsThreeDots } from 'react-icons/bs'
import Message from '../../components/Message/Message'
import InputMessage from '../InputMessage/InputMessage'
import { ChatContext } from '../../context/ChatContext'
import Messages from '../Messages/Messages'
const ChatWindow = () => {
    const {data} = useContext(ChatContext)
    return (
        <div className="right">
            <div className="navbar">
                <span style={{ fontSize: '18px' }}>{data.user?.displayName}</span>
                <div className="icons">
                    <BsCameraVideo style={{ cursor: 'pointer' }} />
                    <FaUserPlus style={{ cursor: 'pointer' }} />
                    <BsThreeDots style={{ cursor: 'pointer' }} />
                </div>
            </div>
           <Messages />
            <InputMessage />
        </div>
    )
}

export default ChatWindow