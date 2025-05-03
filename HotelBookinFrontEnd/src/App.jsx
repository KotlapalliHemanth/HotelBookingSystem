import { useState } from 'react'
import './App.css'
import Home from './components/Home'
import Login from './components/AuthenPages/Login'
import Register from './components/AuthenPages/Register'
import Profile from './components/customerPages/Profile'
import Hotel from './components/Hotel'
import FindHotel from './components/customerPages/Hotel/FindHotel'


import { Route, Routes } from 'react-router-dom'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} >
          <Route index element={<FindHotel />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/hotel/:id" element={<Hotel />} />
          {/* <Route path="/hotel/:id/booking" element={<Hotel />} /> ---------   need to decide based on the payment API setup */}
        </Route>
        
      </Routes>
    </>
  )
}

export default App
