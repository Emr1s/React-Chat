import React from 'react'
import './Login.scss'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='login'>
      <form className="login-form">
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
      </form>
    </div>
  )
}

export default Login