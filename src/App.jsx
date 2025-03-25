import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginSignup from './pages/login/LoginSignup';

//Customer Import
import AboutUs from './pages/customer/AboutUs';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginSignup />} />

        {/* Customer Routes */}
        <Route path='/aboutus' element={<AboutUs />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
