import React, { useState } from 'react';

const SignupUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Thêm logic đăng ký tại đây
    console.log('Form đăng ký đã gửi:', formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Thẻ */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Tiêu đề */}
          <div className="px-8 pt-8 pb-4">
            <h1 className="text-3xl font-bold text-gray-800 text-center">Tạo Tài Khoản</h1>
            <p className="text-center text-gray-600 mt-2">Tham gia cộng đồng của chúng tôi ngay hôm nay</p>
          </div>

          {/* Container Form */}
          <div className="px-8 py-6">
            <form onSubmit={handleSubmit}>
              {/* Trường Tên */}
              <div className="mb-6">
                <label className="block text-gray-600 font-medium mb-2">Họ Tên Đầy Đủ</label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none transition-colors duration-300"
                    placeholder="Nhập tên của bạn"
                    required
                  />
                </div>
              </div>

              {/* Trường Email */}
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

              {/* Trường Mật Khẩu */}
              <div className="mb-6">
                <label className="block text-gray-600 font-medium mb-2">Mật Khẩu</label>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none transition-colors duration-300"
                    placeholder="Tạo mật khẩu"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Mật khẩu phải dài ít nhất 8 ký tự
                </p>
              </div>

              {/* Xác Nhận Mật Khẩu */}
              <div className="mb-6">
                <label className="block text-gray-600 font-medium mb-2">Xác Nhận Mật Khẩu</label>
                <div className="relative">
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none transition-colors duration-300"
                    placeholder="Xác nhận mật khẩu của bạn"
                    required
                  />
                </div>
              </div>

              {/* Nút Gửi */}
              <button
                type="submit"
                className="w-full py-3 px-4 text-white font-bold rounded-lg shadow-md transition-colors duration-300 transform hover:scale-105"
                style={{ backgroundColor: '#0A1338' }}
              >
                Tạo Tài Khoản
              </button>
            </form>

            {/* Tùy chọn đăng ký mạng xã hội */}
            <div className="mt-8">
              <div className="flex items-center mb-6">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-gray-500">hoặc đăng ký với</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <button className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300">
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
                <button className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path
                      fill="#1877F2"
                      d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                    />
                  </svg>
                </button>
                <button className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Liên kết đăng nhập */}
            <div className="text-center mt-8">
              <p className="text-gray-600">
                Đã có tài khoản?{' '}
                <a href="/loginuser" className="text-blue-900 font-semibold hover:underline">
                  Đăng Nhập
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupUser;