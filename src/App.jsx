import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginSignup from './pages/login/LoginSignup';

//Customer Import
import AboutUs from './pages/customer/AboutUs';
import LegalTerms from './pages/customer/LegalTerms';
import TermsOfService from './pages/customer/TermsOfService';
import FAQ from './pages/customer/FAQ';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginSignup />} />

        {/* Customer Routes */}
        <Route path='/aboutus' element={<AboutUs />} />
        <Route path='/legalterms' element={<LegalTerms />} />
        <Route path='/termsofservice' element={<TermsOfService />} />
        <Route path='/faq' element={<FAQ />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
