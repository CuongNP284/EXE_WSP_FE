import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Authentication Import
import LoginUser from './pages/authentication/authenuser/LoginUser';
import SignupUser from './pages/authentication/authenuser/SignupUser';
import ResetPasswordPage from './pages/authentication/authenuser/ResetPassword';
import EmailVerificationPage from './pages/authentication/authenuser/EmailVerify';

//Customer Import
import AboutUs from './pages/customer/AdditionPages/AboutUs';
import LegalTerms from './pages/customer/AdditionPages/LegalTerms';
import TermsOfService from './pages/customer/AdditionPages/TermsOfService';
import FAQ from './pages/customer/AdditionPages/FAQ';
import Questions from './pages/authentication/authenuser/Questions';
import CommunityStd from './pages/customer/AdditionPages/CommunityStd';
import PrivacyPolicy from './pages/customer/AdditionPages/PrivacyPolicy';
import CookieStm from './pages/customer/AdditionPages/CookieStm';
import SellerAgreement from './pages/customer/AdditionPages/SellerAgreement';
import OrganizerRefundPolicy from './pages/customer/AdditionPages/OrganizerRefundPolicy';

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
        <Route path='/communitystd' element={<CommunityStd />} />
        <Route path='/privacypolicy' element={<PrivacyPolicy />} />
        <Route path='/cookiestm' element={<CookieStm />} />
        <Route path='/selleragreement' element={<SellerAgreement />} />
        <Route path='/organizerrefundpolicy' element={<OrganizerRefundPolicy />} />

        {/* Default Route */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
