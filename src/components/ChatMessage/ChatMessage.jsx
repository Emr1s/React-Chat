import React, { useContext, useEffect, useState } from 'react'
import './ChatMessage.scss'
import { AuthContext } from '../../context/AuthContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase'
import {ChatContext} from '../../context/ChatContext'

const ChatMessage = () => {
    const [chats, setChats] = useState([])
    const { user } = useContext(AuthContext)
    const { dispatch } = useContext(ChatContext)
    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", user.uid), (doc) => {
                setChats(doc.data())
            })

            return () => {
                unsub()
            }
        }
        user.uid && getChats()
    }, [user.uid])

    const hanldeSelect = (u) => {
        dispatch({ type: "CHANGE_USER", payload:u })
    }
    return (
        <div className="message">
            {Object.entries(chats)?.sort((a,b) => a[1].data - b[1].data).map(chat => (

                <div className='chatmessage' key={chat[0]} onClick={() => hanldeSelect(chat[1].userInfo)}>
                    <img src={chat[1].userInfo.photoURL} alt='' />
                    <div className="chatInfo">
                        <span>{chat[1].userInfo.displayName}</span>
                        <span style={{ fontSize: '12px' }}>{chat[1].lastMessage?.text}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ChatMessage