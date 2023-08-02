import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ChatPage from './pages/ChatPage/ChatPage'
import Login from './pages/Login/Login'
import Registration from './pages/Registration/Registration'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/" element={<ChatPage />} />
          <Route path='/*' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
