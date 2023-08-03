import React from 'react'
import './ChatMessage.scss'

const ChatMessage = () => {
    return (
        <div className='chatmessage'>
            <img src='https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-733872.jpg&fm=jpg' alt='' />
            <div className="chatInfo">
                <span >Oleg</span>
                <span style={{fontSize: '12px'}}>hello</span>
            </div>
        </div>
    )
}

export default ChatMessage