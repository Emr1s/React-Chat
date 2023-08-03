import React, { useContext, useEffect, useState } from 'react'
import Message from '../Message/Message'
import './Messages.scss'
import {ChatContext} from '../../context/ChatContext'
import { db } from '../../firebase'
import { doc, onSnapshot } from 'firebase/firestore'


const Messages = () => {
    const [message, setMessage] = useState([])
    const { data } = useContext(ChatContext)
    console.log(data)

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            doc.exists() && setMessage(doc.data().messages)
        })
    
      return () => {
        unsub()
      }
    }, [data.chatId])
    
    return (
        <div className="messages">
            {message.map((m) => (
                <Message key={m.id} message={m} />
            ))}
        </div>
    )
}

export default Messages