import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Authentication Import
import LoginUser from './pages/authentication/authenuser/LoginUser';
import SignupUser from './pages/authentication/authenuser/SignupUser';
import ResetPasswordPage from './pages/authentication/authenuser/ResetPassword';
import EmailVerificationPage from './pages/authentication/authenuser/EmailVerify';

//Customer Import
import AboutUs from './pages/customer/AboutUs';
import LegalTerms from './pages/customer/LegalTerms';
import TermsOfService from './pages/customer/TermsOfService';
import FAQ from './pages/customer/FAQ';
import Questions from './pages/authentication/authenuser/Questions';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Customer Authentication */}
        <Route path='/loginuser' element={<LoginUser />} />
        <Route path='/signupuser' element={<SignupUser />} />
        <Route path='/resetpassword' element={<ResetPasswordPage />} />
        <Route path='/emailverify' element={<EmailVerificationPage />} />

        {/* Customer Routes */}
        <Route path='/aboutus' element={<AboutUs />} />
        <Route path='/legalterms' element={<LegalTerms />} />
        <Route path='/termsofservice' element={<TermsOfService />} />
        <Route path='/faq' element={<FAQ />} />
        <Route path='/questions' element={<Questions />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
