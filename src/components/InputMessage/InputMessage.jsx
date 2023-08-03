import React, { useContext, useState } from 'react'
import './InputMessage.scss'
import { CiImageOn } from 'react-icons/ci'
import { IoIosAttach } from 'react-icons/io'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db, storage } from '../../firebase'
import { v4 as uuid } from 'uuid'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

const InputMessage = () => {
  const [text, setText] = useState('')
  const [img, setImg] = useState(null)
  const { user } = useContext(AuthContext)
  const { data } = useContext(ChatContext)

  const handleSend = async () => {

    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on('state_changed',
        (snapshot) => {
        },
        (error) => {
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                date: Timestamp.now(),
                senderId: user.uid,
                img: downloadURL
              })
            })
          });
        }
      );

    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          date: Timestamp.now(),
          senderId: user.uid
        })
      });
      await updateDoc(doc(db, "userChats", user.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp()
      })
      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp()
      })
    }

    setText('')
    setImg(null)
  }
  return (
    <div className="inputMessage">
      <div className="input">
        <input type="text" placeholder='Type a message...' onChange={(e) => setText(e.target.value)}
          value={text} />
      </div>
      <div className="chatIcons">
        <input type="file" style={{ display: 'none' }} id='file' onChange={(e) => setImg(e.target.files[0])} />
        <IoIosAttach />
        <label htmlFor='file'>
          <CiImageOn />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}

export default InputMessage