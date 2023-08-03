import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from 'react'
import './Registration.scss'
import { Link } from 'react-router-dom'
import { auth, storage, db } from '../../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";


const Register = () => {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const halndleSubmit = async (e) => {
    e.preventDefault()
    const name = e.target[0].value
    const secondName = e.target[1].value
    const email = e.target[2].value
    const password = e.target[3].value
    const confirmPassword = e.target[4].value
    const avatar = e.target[5].files[0]

    setLoading(true)
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)

      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, avatar);

      uploadTask.on('state_changed',
        (snapshot) => {
        },
        (error) => {
          setError(true)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log('File available at', downloadURL);
            await updateProfile(res.user, {
              displayName: name,
              photoURL: downloadURL
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName: `${name} ${secondName}`,
              email,
              photoURL: downloadURL
            });
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate('/');
            setLoading(false)
          });
        }
      );
    } catch (error) {
      setError(true)
      setLoading(false)
    }

  }
  return (
    <div className='registration'>
      {loading ? <ClipLoader />
        :

        <form className="registration-form" onSubmit={halndleSubmit}>
          <h1>Registration</h1>
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="Second Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input type="password" placeholder="Confirm Password" />
          <div className="photo">
            <span>Add your photo</span>
            <input type="file" placeholder="Confirm Password" />
          </div>
          <div className="loginback">
            <Link to={'/login'}>
              <p>Already have an account?</p>
            </Link>
          </div>
          <div className="btn">
            <button>Sign up</button>
            {error && <span>Something went wrong</span>}
          </div>
        </form>
      }
    </div>
  )
}

export default Register