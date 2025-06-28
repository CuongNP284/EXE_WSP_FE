import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../../service/ApiService'; // Adjust the import path as needed
import Swal from 'sweetalert2';

const ResetPasswordPage = () => {
  const [step, setStep] = useState(1); // 1: Enter email, 2: Verify OTP, 3: New password
  const [formData, setFormData] = useState({
    email: '',
    otp: ['', '', '', '', '', ''],
    newPassword: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOtpChange = (index, value) => {
    if (/^[0-9]?$/.test(value)) { // Ensure only single digit
      const newOtp = [...formData.otp];
      newOtp[index] = value;
      setFormData({ ...formData, otp: newOtp });

      // Move to next input if value entered and not last input
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    // Move to previous input on Backspace if current input is empty
    if (e.key === 'Backspace' && !formData.otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      Swal.fire('Error', 'Xin hãy nhập đúng email của bạn', 'error');
      return;
    }
    console.log('Email being sent:', formData.email); // Debug log
    try {
      const response = await ApiService.forgetPassword({ email: formData.email });
      if (response.status === 200) {
        const otpResponse = await ApiService.sendOtpEmail({ email: formData.email });
        if (otpResponse.status === 200) {
          await Swal.fire({
            title: 'Success',
            text: 'Mã OTP đã được gửi đến email của bạn',
            icon: 'success'
          });
          setStep(2);
        } else {
          Swal.fire('Error', otpResponse.message || 'Không thể gửi OPT qua bạn được', 'error');
        }
      } else {
        Swal.fire('Error', response.message || 'Lỗi đổi mật khẩu, xin vui lòng thử lại', 'error');
      }
    } catch (error) {
      console.error('Error during forget password:', error.response?.data || error.message);
      Swal.fire('Error', error.response?.data?.message || 'Không thể gửi OPT qua bạn được', 'error');
    }
  };

  const handleResendOtp = async () => {
    try {
      // Resend OTP using sendOtpEmail API
      const otpResponse = await ApiService.sendOtpEmail({ email: formData.email });
      if (otpResponse.status === 200) {
        await Swal.fire({
          title: 'Success',
          text: 'Mã OTP đã được gửi lại đến email của bạn',
          icon: 'success'
        });
      } else {
        Swal.fire('Error', otpResponse.message || 'Không thể gửi OPT qua bạn được', 'error');
      }
    } catch (error) {
      console.error('Lỗi gửi lại mã OPT:', error);
      Swal.fire('Error', error.message || 'Không thể gửi OPT qua bạn được', 'error');
    }
  };

  const handleSubmitOtp = async (e) => {
    e.preventDefault();
    const otp = formData.otp.join('');
    if (otp.length === 6 && /^[0-9]{6}$/.test(otp)) {
      setStep(3); // Move to password reset step
    } else {
      Swal.fire('Error', 'Xin hãy nhập đúng 6 số của mã OPT', 'error');
    }
  };

  const handleSubmitNewPassword = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      Swal.fire('Error', 'Mật khẩu không trùng khớp', 'error');
      return;
    }
    if (formData.newPassword.length < 8) {
      Swal.fire('Error', 'Mật khẩu phải dài ít nhất 8 kí tự', 'error');
      return;
    }
    try {
      // Call resetPassword API
      const resetData = {
        otp: formData.otp.join(''),
        newPassword: formData.newPassword
      };
      const response = await ApiService.resetPassword(resetData);
      if (response.status === 200) {
        await Swal.fire({
          title: 'Success',
          text: response.message,
          icon: 'success'
        });
        navigate('/loginuser');
      } else {
        Swal.fire('Error', response.message || 'Failed to reset password', 'error');
      }
    } catch (error) {
      console.error('Error during password reset:', error);
      Swal.fire('Error', error.message || 'Unable to reset password', 'error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundImage: `url('https://www.shutterstock.com/image-photo/three-young-asian-people-playing-600nw-2081198857.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden bg-opacity-90">
          {/* Header */}
          <div className="px-8 pt-8 pb-4">
            <h1 className="text-3xl font-bold text-gray-800 text-center">
              {step === 1 && 'Reset Password'}
              {step === 2 && 'Verify OTP'}
              {step === 3 && 'Create New Password'}
            </h1>
            <p className="text-center text-gray-600 mt-2">
              {step === 1 && 'Enter your email to receive a verification code'}
              {step === 2 && 'Enter the 6-digit code sent to your email'}
              {step === 3 && 'Create a new secure password for your account'}
            </p>
          </div>

          {/* Form Container */}
          <div className="px-8 py-6">
            {/* Step 1: Email Form */}
            {step === 1 && (
              <form onSubmit={handleSubmitEmail}>
                <div className="mb-6">
                  <label className="block text-gray-600 font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none transition-colors duration-300"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 text-white font-bold rounded-lg shadow-md transition-colors duration-300 transform hover:scale-105"
                  style={{ backgroundColor: '#0A1338' }}
                >
                  Send Reset Code
                </button>
              </form>
            )}

            {/* Step 2: OTP Verification */}
            {step === 2 && (
              <form onSubmit={handleSubmitOtp}>
                <div className="mb-6">
                  <label className="block text-gray-600 font-medium mb-2 text-center">
                    Verification Code
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
                    Didn't receive the code?{' '}
                    <button
                      type="button"
                      className="text-blue-900 hover:underline"
                      onClick={handleResendOtp}
                    >
                      Resend
                    </button>
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 text-white font-bold rounded-lg shadow-md transition-colors duration-300 transform hover:scale-105"
                  style={{ backgroundColor: '#0A1338' }}
                >
                  Verify Code
                </button>
              </form>
            )}

            {/* Step 3: New Password */}
            {step === 3 && (
              <form onSubmit={handleSubmitNewPassword}>
                <div className="mb-6">
                  <label className="block text-gray-600 font-medium mb-2">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none transition-colors duration-300"
                    placeholder="Create new password"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Password must be at least 8 characters long
                  </p>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-600 font-medium mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none transition-colors duration-300"
                    placeholder="Confirm your new password"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 text-white font-bold rounded-lg shadow-md transition-colors duration-300 transform hover:scale-105"
                  style={{ backgroundColor: '#0A1338' }}
                >
                  Reset Password
                </button>
              </form>
            )}

            {/* Back to Login */}
            <div className="text-center mt-8">
              <p className="text-gray-600">
                Remembered your password?{' '}
                <a href="/loginuser" className="text-blue-900 font-semibold hover:underline">
                  Log In
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