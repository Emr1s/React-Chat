import React, { useContext, useEffect, useRef } from 'react'
import './Message.scss'
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';

const Message = ({ message }) => {
    const { data } = useContext(ChatContext);
    const { user } = useContext(AuthContext);
    const ref = useRef();

    useEffect(() => {
        ref.current.scrollIntoView({
            behavior: 'smooth'
        })
    }, [message])
    return (
        <div className='messageChat' >
            <div className="msg">
                <span>{message.text}</span>
                {message.img && <img src={message.img} style={{ height: '300px', width: '300px', objectFit: 'contain' }} alt="" />}
            </div>
            <div className="photo" ref={ref}>
                <img
                    src={message.senderId === user.uid
                        ? user.photoURL
                        : data.user.photoURL
                    }
                    style={{ height: '40px', width: '40px', borderRadius: '50%', objectFit: 'cover' }}
                    alt="" />
                <p>just now</p>
            </div>
        </div>
    )
}

export default Message