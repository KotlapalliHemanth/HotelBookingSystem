import { useState } from 'react'
import './App.css'
import Header from './components/header'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import Hotel from './components/Hotel'
import { Route, Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} >
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/hotel" element={<Hotel />} />
      </Routes>
    </>
  )
}

export default App
