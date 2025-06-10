import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ProtectedRoute from './service/ProtectedRoute';

// Authentication Import
import LoginUser from './pages/authentication/authenuser/LoginUser';
import SignupUser from './pages/authentication/authenuser/SignupUser';
import ResetPasswordPage from './pages/authentication/authenuser/ResetPassword';
import EmailVerificationPage from './pages/authentication/authenuser/EmailVerify';

// Customer Import
import Homepage from './pages/customer/MainPages/Homepage';
import BlogUser from './pages/customer/MainPages/BlogUser';
import BlogDetailUser from './pages/customer/MainPages/BlogDetailUser';
import WorkshopDetail from './pages/customer/MainPages/WorkshopDetail';
import UserProfile from './pages/customer/MainPages/UserProfile';

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

// Organizer Import
import OrganizerDashboard from './pages/organizer/OrganizerDashboard';
import MyWorkshop from './pages/organizer/MyWorkshop';
import OrganizerProfile from './pages/organizer/OrganizerProfile';
import CreateWorkshop from './pages/organizer/CreateWorkshop';
import EditWorkshop from './pages/organizer/EditWorkshop';
import ViewWsDetail from './pages/organizer/ViewWsDetail';

// Admin Import
import UserList from './pages/admin/UserList';
import BlogList from './pages/admin/BlogList';
import RequestList from './pages/admin/RequestList';
import AdminDashboard from './pages/admin/AdminDashboard';
import BlogCreate from './pages/admin/BlogCreate';
import BlogEdit from './pages/admin/BlogEdit';
import RequestDetail from './pages/admin/RequestDetail';
import BadgeCreate from './pages/admin/BadgeCreate';
import BadgeList from './pages/admin/BadgeList';
import BadgeEdit from './pages/admin/BadgeEdit';
import CategoryList from './pages/admin/CategoryList';
import CategoryCreate from './pages/admin/CategoryCreate';
import CategoryEdit from './pages/admin/CategoryEdit';

const RestrictedRoute = ({ element, allowedRoles }) => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  if (!isLoggedIn) {
    Swal.fire({
      title: 'Yêu cầu đăng nhập',
      text: 'Bạn cần đăng nhập để truy cập trang này.',
      icon: 'warning',
      confirmButtonText: 'Đăng nhập',
      showCancelButton: true,
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/loginuser');
      } else {
        navigate('/');
      }
    });
    return null;
  }

  return <ProtectedRoute element={element} allowedRoles={allowedRoles} />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication Routes - Accessible to all (no authentication required) */}
        <Route path='/loginuser' element={<LoginUser />} />
        <Route path='/signupuser' element={<SignupUser />} />
        <Route path='/resetpassword' element={<ResetPasswordPage />} />
        <Route path='/emailverify' element={<EmailVerificationPage />} />
        <Route path='/questions' element={<Questions />} />

        {/* Customer Routes - Accessible to guests and authenticated users */}
        <Route path='/' element={<ProtectedRoute element={<Homepage />} allowedRoles={['USER']} allowGuest={true} />} />
        <Route path='/blog' element={<ProtectedRoute element={<BlogUser />} allowedRoles={['USER']} allowGuest={true} />} />
        <Route path="/blog/:id" element={<ProtectedRoute element={<BlogDetailUser />} allowedRoles={['USER']} allowGuest={true} />} />
        <Route path='/workshopdetail/:workshopId' element={<RestrictedRoute element={<WorkshopDetail />} allowedRoles={['USER']} />} />
        <Route path='/userprofile' element={<RestrictedRoute element={<UserProfile />} allowedRoles={['USER']} />} />
        <Route path='/aboutus' element={<ProtectedRoute element={<AboutUs />} allowedRoles={['USER']} allowGuest={true} />} />
        <Route path='/legalterms' element={<ProtectedRoute element={<LegalTerms />} allowedRoles={['USER']} allowGuest={true} />} />
        <Route path='/termsofservice' element={<ProtectedRoute element={<TermsOfService />} allowedRoles={['USER']} allowGuest={true} />} />
        <Route path='/faq' element={<ProtectedRoute element={<FAQ />} allowedRoles={['USER']} allowGuest={true} />} />
        <Route path='/communitystd' element={<ProtectedRoute element={<CommunityStd />} allowedRoles={['USER']} allowGuest={true} />} />
        <Route path='/privacypolicy' element={<ProtectedRoute element={<PrivacyPolicy />} allowedRoles={['USER']} allowGuest={true} />} />
        <Route path='/cookiestm' element={<ProtectedRoute element={<CookieStm />} allowedRoles={['USER']} allowGuest={true} />} />
        <Route path='/selleragreement' element={<ProtectedRoute element={<SellerAgreement />} allowedRoles={['USER']} allowGuest={true} />} />
        <Route path='/organizerrefundpolicy' element={<ProtectedRoute element={<OrganizerRefundPolicy />} allowedRoles={['USER']} allowGuest={true} />} />

        {/* Organizer Routes - Organizer role only */}
        <Route path='/organizerdashboard' element={<ProtectedRoute element={<OrganizerDashboard />} allowedRoles={['ORGANIZER']} />} />
        <Route path='/myworkshop' element={<ProtectedRoute element={<MyWorkshop />} allowedRoles={['ORGANIZER']} />} />
        <Route path='/organizerprofile' element={<ProtectedRoute element={<OrganizerProfile />} allowedRoles={['ORGANIZER']} />} />
        <Route path='/createworkshop' element={<ProtectedRoute element={<CreateWorkshop />} allowedRoles={['ORGANIZER']} />} />
        <Route path='/editworkshop/:id' element={<ProtectedRoute element={<EditWorkshop />} allowedRoles={['ORGANIZER']} />} />
        <Route path='/workshopdetail/:id' element={<ProtectedRoute element={<ViewWsDetail />} allowedRoles={['ORGANIZER']} />} />

        {/* Admin Routes - Admin role only */}
        <Route path='/userlist' element={<ProtectedRoute element={<UserList />} allowedRoles={['ADMIN']} />} />
        <Route path='/bloglist' element={<ProtectedRoute element={<BlogList />} allowedRoles={['ADMIN']} />} />
        <Route path='/requestlist' element={<ProtectedRoute element={<RequestList />} allowedRoles={['ADMIN']} />} />
        <Route path='/requestdetail/:workshopId' element={<ProtectedRoute element={<RequestDetail />} allowedRoles={['ADMIN']} />} />
        <Route path='/admindashboard' element={<ProtectedRoute element={<AdminDashboard />} allowedRoles={['ADMIN']} />} />
        <Route path='/blogcreate' element={<ProtectedRoute element={<BlogCreate />} allowedRoles={['ADMIN']} />} />
        <Route path='/blogedit/:id' element={<ProtectedRoute element={<BlogEdit />} allowedRoles={['ADMIN']} />} />
        <Route path='/badgelist' element={<ProtectedRoute element={<BadgeList />} allowedRoles={['ADMIN']} />} />
        <Route path='/badgecreate' element={<ProtectedRoute element={<BadgeCreate />} allowedRoles={['ADMIN']} />} />
        <Route path='/badgeedit/:id' element={<ProtectedRoute element={<BadgeEdit />} allowedRoles={['ADMIN']} />} />
        <Route path='/categorylist' element={<ProtectedRoute element={<CategoryList />} allowedRoles={['ADMIN']} />} />
        <Route path='/categorycreate' element={<ProtectedRoute element={<CategoryCreate />} allowedRoles={['ADMIN']} />} />
        <Route path='/categoryedit/:id' element={<ProtectedRoute element={<CategoryEdit />} allowedRoles={['ADMIN']} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;