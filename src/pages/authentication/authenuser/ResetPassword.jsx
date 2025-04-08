import React, { useState } from 'react';

const ResetPasswordPage = () => {
  const [step, setStep] = useState(1); // 1: Nhập email, 2: Xác minh OTP, 3: Mật khẩu mới
  const [formData, setFormData] = useState({
    email: '',
    otp: ['', '', '', '', '', ''],
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOtpChange = (index, value) => {
    const newOtp = [...formData.otp];
    newOtp[index] = value;
    
    setFormData({ ...formData, otp: newOtp });
    
    // Chuyển sang ô nhập tiếp theo nếu đã nhập giá trị và không phải ô cuối
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Chuyển về ô trước đó khi nhấn Backspace nếu ô hiện tại trống
    if (e.key === 'Backspace' && !formData.otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    // Thêm logic xác minh email tại đây
    console.log('Email gửi để đặt lại mật khẩu:', formData.email);
    setStep(2);
  };

  const handleSubmitOtp = (e) => {
    e.preventDefault();
    // Thêm logic xác minh OTP tại đây
    console.log('OTP đã gửi:', formData.otp.join(''));
    setStep(3);
  };

  const handleSubmitNewPassword = (e) => {
    e.preventDefault();
    // Thêm logic đặt mật khẩu mới tại đây
    console.log('Mật khẩu mới đã gửi:', formData.newPassword);
    // Chuyển hướng đến trang đăng nhập hoặc hiển thị thông báo thành công
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Thẻ */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Tiêu đề */}
          <div className="px-8 pt-8 pb-4">
            <h1 className="text-3xl font-bold text-gray-800 text-center">
              {step === 1 && 'Đặt Lại Mật Khẩu'}
              {step === 2 && 'Xác Minh OTP'}
              {step === 3 && 'Tạo Mật Khẩu Mới'}
            </h1>
            <p className="text-center text-gray-600 mt-2">
              {step === 1 && 'Nhập email của bạn để nhận mã xác minh'}
              {step === 2 && 'Nhập mã 6 chữ số được gửi đến email của bạn'}
              {step === 3 && 'Tạo mật khẩu mới an toàn cho tài khoản của bạn'}
            </p>
          </div>

          {/* Container Form */}
          <div className="px-8 py-6">
            {/* Bước 1: Form Email */}
            {step === 1 && (
              <form onSubmit={handleSubmitEmail}>
                <div className="mb-6">
                  <label className="block text-gray-600 font-medium mb-2">Địa Chỉ Email</label>
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

                <button
                  type="submit"
                  className="w-full py-3 px-4 text-white font-bold rounded-lg shadow-md transition-colors duration-300 transform hover:scale-105"
                  style={{ backgroundColor: '#0A1338' }}
                >
                  Gửi Mã Đặt Lại
                </button>
              </form>
            )}

            {/* Bước 2: Xác Minh OTP */}
            {step === 2 && (
              <form onSubmit={handleSubmitOtp}>
                <div className="mb-6">
                  <label className="block text-gray-600 font-medium mb-2 text-center">
                    Mã Xác Minh
                  </label>
                  <div className="flex justify-center space-x-2">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength="1"
                        value={formData.otp[index]}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none transition-colors duration-300"
                        required
                      />
                    ))}
                  </div>
                  <p className="text-center text-gray-500 text-sm mt-4">
                    Không nhận được mã?{' '}
                    <button
                      type="button"
                      className="text-blue-900 hover:underline"
                      onClick={() => console.log('Gửi lại OTP')}
                    >
                      Gửi Lại
                    </button>
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 text-white font-bold rounded-lg shadow-md transition-colors duration-300 transform hover:scale-105"
                  style={{ backgroundColor: '#0A1338' }}
                >
                  Xác Minh Mã
                </button>
              </form>
            )}

            {/* Bước 3: Mật Khẩu Mới */}
            {step === 3 && (
              <form onSubmit={handleSubmitNewPassword}>
                <div className="mb-6">
                  <label className="block text-gray-600 font-medium mb-2">Mật Khẩu Mới</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none transition-colors duration-300"
                    placeholder="Tạo mật khẩu mới"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Mật khẩu phải dài ít nhất 8 ký tự
                  </p>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-600 font-medium mb-2">Xác Nhận Mật Khẩu Mới</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none transition-colors duration-300"
                    placeholder="Xác nhận mật khẩu mới của bạn"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 text-white font-bold rounded-lg shadow-md transition-colors duration-300 transform hover:scale-105"
                  style={{ backgroundColor: '#0A1338' }}
                >
                  Đặt Lại Mật Khẩu
                </button>
              </form>
            )}

            {/* Quay lại đăng nhập */}
            <div className="text-center mt-8">
              <p className="text-gray-600">
                Nhớ lại mật khẩu của bạn rồi à?{' '}
                <a href="/loginuser" className="text-blue-900 font-semibold hover:underline">
                  Đăng Nhập Lại
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;