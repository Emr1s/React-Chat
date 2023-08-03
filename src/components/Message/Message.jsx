import React from 'react'
import './Message.scss'

const Message = () => {
    return (
        <div className='messageChat'>
            <div className="msg">
                {/* <img src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-733872.jpg&fm=jpg" alt="" style={{ height: '200px', width: '200px',  objectFit: 'cover' }}/> */}
                <span>Hello</span>
            </div>
            <div className="photo">
                <img src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-733872.jpg&fm=jpg" style={{ height: '40px', width: '40px', borderRadius: '50%', objectFit: 'cover' }} alt="" />
                <p>just now</p>
            </div>
        </div>
    )
}

export default Message