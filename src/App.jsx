import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ChatPage from './pages/ChatPage/ChatPage'
import Login from './pages/Login/Login'
import Registration from './pages/Registration/Registration'
import { useContext } from 'react'
import { AuthContext } from './context/context'
function App() {

  const { user } = useContext(AuthContext)
  const ProtectedAuth = ({ children }) => {
    if(!user){
      return <Navigate to={'/login'} />
    }
    return children;
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/" element={
            <ProtectedAuth>
              <ChatPage />
            </ProtectedAuth>} />
          <Route path='/*' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
