import { signInWithEmailAndPassword } from "firebase/auth";
import React from 'react'
import './Login.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { auth } from "../../firebase";
import { ClipLoader } from "react-spinners";


const Login = () => {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const halndleSubmit = (e) => {
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value
    setLoading(true)

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoading(false)
        navigate('/')
      })
      .catch((error) => {
        setError(true)
        setLoading(false)
      });

  }
  return (
    <div className='login'>
      {loading ? <ClipLoader />
        :
        <form className="login-form" onSubmit={halndleSubmit}>
          <h1>Login</h1>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <div className="registrationform">
            <Link to={'/registration'}>
              <p>Don't have an account?</p>
            </Link>
          </div>
          <div className="btn">
            <button>Login</button>
          </div>
          {error && <p style={{ color: 'red' }}>Wrong email or password</p>}
        </form>
      }
    </div>
  )
}

export default Login