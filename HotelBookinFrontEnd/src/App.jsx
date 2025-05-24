import { useState } from 'react'
import './App.css'
import Home from './components/Home'
import Login from './components/AuthenPages/Login'
import Register from './components/AuthenPages/Register'
import Profile from './components/customerPages/profile/Profile'
import Hotel from './components/customerPages/Hotel/Hotel'
import FindHotel from './components/customerPages/Hotel/FindHotel'
import PaymentPage from './components/customerPages/Hotel/payments/PaymentPage';


import { Route, Routes, useLocation } from 'react-router-dom'


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
          <Route path="/hotel/:id" element={<Hotel  />} />
          <Route path="/payment" element={<PaymentPageWrapper />} />
          {/* <Route path="/hotel/:id/booking" element={<Hotel />} /> ---------   need to decide based on the payment API setup */}
        </Route>
        
      </Routes>
    </>


  )
}

// Wrapper to pass location.state as props
function PaymentPageWrapper() {
    const location = useLocation();
    const { amount, bookingDetails } = location.state || {};
    return <PaymentPage amount={amount} bookingDetails={bookingDetails} />;
}

export default App
