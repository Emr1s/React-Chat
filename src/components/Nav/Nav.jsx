import { collection, query, where, setDoc, updateDoc, serverTimestamp, getDoc, getDocs, doc } from "firebase/firestore";
import React, { useContext, useState } from 'react'
import './Nav.scss'
import { RxExit } from 'react-icons/rx'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import { db } from "../../firebase";
import { AuthContext } from "../../context/context";

const Nav = () => {
    const [search, setSearch] = useState('')
    const [searchUser, setSearchUser] = useState(null)
    const [err, serErr] = useState(false)
    const { user } = useContext(AuthContext)
    const handleSearch = async () => {
        const q = query(collection(db, "users"), where("displayName", "==", search));
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setSearchUser(doc.data())
            });
        } catch (error) {
            serErr(true)
        }
    }
    const handleKey = (e) => {
        e.code === 'Enter' && handleSearch()
    }
    const handleSignOut = () => {
        signOut(auth)
        setSearchUser(null)
    }
    const handleSelect = async () => {
        const combinedId = user.uid > searchUser.uid ? user.uid + searchUser.uid : searchUser.uid + user.uid
        try {
            const res = await getDoc(doc(db, "chats", combinedId))
            if (!res.exists()) {
                await setDoc(doc(db, "chats", combinedId), { messages: [] })
                await updateDoc(doc(db, "userChats", user.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: searchUser.uid,
                        displayName: searchUser.displayName,
                        photoURL: searchUser.photoURL
                    },
                    [combinedId + ".date"]: serverTimestamp()
                });
                await updateDoc(doc(db, "userChats", searchUser.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL
                    },
                    [combinedId + ".date"]: serverTimestamp()
                })
            }
        } catch (error) {
            serErr(true)
            console.log(error.message)
        }
        setSearchUser(null)
        setSearch('')
    }
    return (
        <div>
            <nav>
                <p style={{ fontWeight: 'bold', fontSize: '24px' }}>React Chat</p>
                <div className="info">
                    <img src={user.photoURL} alt="" />
                    <p>{user.displayName}</p>
                    <RxExit style={{ cursor: 'pointer' }} onClick={handleSignOut} />

                </div>
            </nav>
            <input
                type="text"
                className="search"
                value={search}
                placeholder='Find a user...'
                onChange={e => setSearch(e.target.value)}
                onKeyDown={handleKey}
            />
            {err && <p style={{ color: 'red' }}>User not found</p>}
            {searchUser &&
                <div className="searchUser" onClick={handleSelect}>
                    <img src={searchUser.photoURL} alt="" style={{ height: '40px', width: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                    <p>{searchUser.displayName}</p>
                </div>
            }
        </div>
    )
}

export default Nav