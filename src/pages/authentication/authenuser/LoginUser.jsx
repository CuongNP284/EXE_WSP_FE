import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../../service/ApiService';
import Swal from 'sweetalert2';

const LoginUser = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Login attempt with:', formData);
      const response = await ApiService.loginUser(formData);
      console.log('API Response:', response);

      if (response.status === 200 && response.data && response.data.accessToken) {
        const userInfoResponse = await ApiService.getLoggedInUserInfo();
        if (userInfoResponse.status === 200 && userInfoResponse.data) {
          localStorage.setItem('userId', userInfoResponse.data.id);
        } else {
          throw new Error('Failed to fetch user info after login');
        }

        await Swal.fire({
          title: 'Success',
          text: 'Login successful!',
          icon: 'success'
        });

        const role = userInfoResponse?.data?.role || "USER";
        switch (role) {
          case 'ADMIN':
            navigate('/admindashboard');
            break;
          case 'ORGANIZER':
            navigate('/organizerdashboard');
            break;
          case 'USER':
            navigate('/');
            break;
          default:
            navigate('/');
        }
      } else {
        Swal.fire('Error', response.message || 'Login failed', 'error');
      }
    } catch (error) {
      console.error('Login error:', error);
      Swal.fire('Error', error.message || 'Unable to log in user', 'error');
    }
  };

  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    const clientId = '1098549759457-50jvav67ctpd88frui4bqh6qhged86kh.apps.googleusercontent.com';
    const redirectUri = encodeURIComponent(window.location.origin + '/login');
    const scope = encodeURIComponent('openid email profile');

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline`;

    window.location.href = authUrl;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundImage: `url('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjfeU49APx-oCOoGEw3u3P3M5ccF4jpufV82pwgMcsfPfsl4jaK54zeU-G0UjxTBGaWMi5rOcQ1NozXp5wZz2fyH_D3oO8lpras5n3mUjLMrQzmtJYw75buWGIFcB2czx93OsVq5hZecHE/s1600/work-shop-la-gi.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden bg-opacity-90">
          <div className="px-8 pt-8 pb-4">
            <h1 className="text-3xl font-bold text-gray-800 text-center">Đăng Nhập</h1>
            <p className="text-center text-gray-600 mt-2">Đăng nhập vào tài khoản của bạn</p>
          </div>

          <div className="px-8 py-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-gray-600 font-medium mb-2">Địa Chỉ Email</label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none transition-colors duration-300"
                    placeholder="Nhập email của bạn"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <div className="flex mb-2">
                  <label className="text-gray-600 font-medium">Mật Khẩu</label>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none transition-colors duration-300"
                    placeholder="Nhập mật khẩu của bạn"
                    required
                  />
                </div>
              </div>

              <div className='flex justify-between mb-2'>
                <div className="mb-6 flex items-center">
                </div>
                <a href="/resetpassword" className="text-sm text-blue-900 hover:underline">
                  Bạn quên mật khẩu của mình?
                </a>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 text-white font-bold rounded-lg shadow-md transition-colors duration-300 transform hover:scale-105"
                style={{ backgroundColor: '#0A1338' }}
              >
                Đăng Nhập
              </button>
            </form>

            {/* <div className="mt-8">
              <div className="flex items-center mb-6">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-gray-500">hoặc tiếp tục với</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              <div className="grid gap-4">
                <button
                  onClick={handleGoogleLogin}
                  className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                </button>
              </div>
            </div> */}

            <div className="text-center mt-8">
              <p className="text-gray-600">
                Chưa có tài khoản?{' '}
                <a href="/signupuser" className="text-blue-900 font-semibold hover:underline">
                  Đăng Ký Ngay
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginUser;