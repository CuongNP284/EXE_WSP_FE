import React, { useState } from 'react';

const EmailVerificationPage = () => {
  const [formData, setFormData] = useState({
    otp: ['', '', '', '', '', ''],
    email: 'user@example.com' // Thông thường sẽ lấy từ ngữ cảnh xác thực hoặc trạng thái
  });

  const handleOtpChange = (index, value) => {
    const newOtp = [...formData.otp];
    newOtp[index] = value;
    
    setFormData({ ...formData, otp: newOtp });
    
    // Chuyển sang ô nhập tiếp theo nếu đã nhập giá trị và không phải ô cuối
    if (value && index < 5) {
      document.getElementById(`verify-otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Chuyển về ô trước đó khi nhấn Backspace nếu ô hiện tại trống
    if (e.key === 'Backspace' && !formData.otp[index] && index > 0) {
      document.getElementById(`verify-otp-${index - 1}`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Thêm logic xác minh tại đây
    console.log('Mã OTP xác minh email đã được gửi:', formData.otp.join(''));
    // Chuyển hướng đến trang thành công hoặc bảng điều khiển
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundImage: `url('https://www.shutterstock.com/image-photo/three-young-asian-people-playing-600nw-2081198857.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="w-full max-w-md">
        {/* Thẻ */}  
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden bg-opacity-90">
          {/* Tiêu đề */}
          <div className="px-8 pt-8 pb-4">
            <h1 className="text-3xl font-bold text-gray-800 text-center">Xác Minh Email Của Bạn</h1>
            <p className="text-center text-gray-600 mt-2">
              Chúng tôi đã gửi mã xác minh đến <span className="font-medium">{formData.email}</span>
            </p>
          </div>

          {/* Container Form */}
          <div className="px-8 py-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-gray-600 font-medium mb-2 text-center">
                  Nhập Mã Xác Minh
                </label>
                <div className="flex justify-center space-x-2">
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <input
                      key={index}
                      id={`verify-otp-${index}`}
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
              </div>

              <div className="space-y-4">
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-white font-bold rounded-lg shadow-md transition-colors duration-300 transform hover:scale-105"
                  style={{ backgroundColor: '#0A1338' }}
                >
                  Xác Minh Email
                </button>
                
                <div className="text-center text-gray-500">
                  <p>Không nhận được mã?</p>
                  <button
                    type="button"
                    className="mt-2 text-blue-900 font-medium hover:underline"
                    onClick={() => console.log('Gửi lại mã xác minh')}
                  >
                    Gửi Lại Mã
                  </button>
                </div>
              </div>
            </form>

            {/* Tùy chọn thay đổi email */}
            <div className="text-center mt-8">
              <p className="text-gray-600">
                Sai email?{' '}
                <a href="/signupuser" className="text-blue-900 font-semibold hover:underline">
                  Thay Đổi Email
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;