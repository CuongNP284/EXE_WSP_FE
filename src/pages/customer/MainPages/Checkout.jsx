import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerHeader from '../../../components/customer/CustomerHeader';
import CustomeFooter from '../../../components/customer/CustomeFooter';
import ApiService from '../../../service/ApiService';
import { Users, Calendar, Clock, MapPin } from 'lucide-react';
import { message } from 'antd';

const Checkout = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [workshop, setWorkshop] = useState(null);

  useEffect(() => {
    const savedWorkshop = localStorage.getItem('selectedWorkshop');
    if (savedWorkshop) {
      setWorkshop(JSON.parse(savedWorkshop));
    } else {
      message.error('Không tìm thấy thông tin workshop.');
      navigate('/');
    }
  }, [navigate]);

  const total = workshop ? workshop.originalPrice * quantity : 0;

  const handleBookingAndPayment = async () => {
    if (!workshop || !localStorage.getItem('userId')) {
      message.error('Vui lòng đăng nhập để đặt vé.');
      return;
    }

    const bookingData = {
      userId: localStorage.getItem('userId'),
      workshopId: workshop.workshopId,
      quantity: quantity
    };

    try {
      const bookingResponse = await ApiService.createBooking(bookingData);
      if (bookingResponse.status === 200) {
        message.success('Đặt vé thành công!');

        const paymentData = {
          code: `PAY_${new Date().getTime()}`,
          desc: `Payment for workshop ${workshop.title}`,
          success: true,
          data: {
            orderCode: bookingResponse.data.id, // Hoặc một số định danh tương ứng
            amount: total,
            description: `Payment for ${quantity} ticket(s) of ${workshop.title}`,
            accountNumber: '123456789',
            reference: `REF_${bookingResponse.data.id}`,
            transactionDateTime: new Date().toISOString(),
            currency: 'VND',
            paymentLinkId: 'cc7aebbc-f982-4914-bde3-bb73cdf86cca',
            code: `PAY_${new Date().getTime()}`,
            desc: `Payment for workshop ${workshop.title}`,
            counterAccountBankId: 'PAYOS_BANK',
            counterAccountBankName: 'PAYOS_BANK',
            counterAccountName: 'WorkshopHub',
            counterAccountNumber: '123456789',
            virtualAccountName: localStorage.getItem('userId'),
            virtualAccountNumber: `VA_${localStorage.getItem('userId')}_${new Date().getTime()}`
          },
          signature: generateSignature(total, 'cc7aebbc-f982-4914-bde3-bb73cdf86cca', 'YOUR_SECRET_KEY')
        };


        const paymentResponse = await ApiService.createPayment(paymentData);
        if (paymentResponse.status === 200 && typeof paymentResponse.data === 'string') {
          window.location.href = paymentResponse.data;
        } else {
          message.error(paymentResponse.message || 'Thanh toán thất bại.');
        }
      } else {
        message.error(bookingResponse.message || 'Đặt vé thất bại.');
      }
    } catch (error) {
      message.error('Đã xảy ra lỗi khi đặt vé hoặc thanh toán.');
      console.error(error);
    }
  };

  // Simple signature generation (replace with actual HMAC-SHA256 implementation)
  const generateSignature = (amount, clientId, checksumKey) => {
    const data = `${amount}${clientId}${checksumKey}`;
    // Note: This is a placeholder. Use a proper HMAC-SHA256 library in production
    return btoa(data); // Base64 encode for simplicity
  };

  if (!workshop) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Đang tải...</div>
      </div>
    );
  }

  return (
    <div>
      <CustomerHeader />

      {/* Checkout Content */}
      <div className="min-h-screen py-5">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-5">
            <h1 className="text-4xl font-bold text-[#091238] mb-4">Thanh Toán Workshop</h1>
            <p className="text-gray-600 text-lg">Hoàn tất đăng ký workshop của bạn</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left - Workshop Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Workshop Card */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="p-8">
                  <div className="flex gap-6">
                    <div className="w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={workshop.image}
                        alt="Workshop"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-[#091238] mb-3">{workshop.title}</h2>
                      <div className="space-y-2 text-gray-600">
                        <p className="flex items-center gap-2">
                          <Users size={20} className="text-[#091238]" />
                          <strong>Nhà tổ chức:</strong> {workshop.instructor}
                        </p>
                        <p className="flex items-center gap-2">
                          <Calendar size={20} className="text-[#091238]" />
                          <strong>Ngày:</strong> {workshop.date}
                        </p>
                        <p className="flex items-center gap-2">
                          <Clock size={20} className="text-[#091238]" />
                          <strong>Thời gian:</strong> {workshop.time}
                        </p>
                        <p className="flex items-center gap-2">
                          <MapPin size={20} className="text-[#091238]" />
                          <strong>Địa điểm:</strong> {workshop.location}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Quantity Selector */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-[#091238]">Số lượng vé:</span>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#091238] hover:text-white transition-all duration-200 flex items-center justify-center font-bold"
                        >
                          -
                        </button>
                        <span className="w-12 text-center font-bold text-xl text-[#091238]">{quantity}</span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#091238] hover:text-white transition-all duration-200 flex items-center justify-center font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sticky top-8">
                <h3 className="text-xl font-bold text-[#091238] mb-6">Tóm tắt đơn hàng</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Giá gốc:</span>
                    <span className="text-gray-400">{workshop.originalPrice.toLocaleString('vi-VN')}đ</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Số lượng:</span>
                    <span className="font-semibold">x{quantity}</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-[#091238]">Tổng cộng:</span>
                    <span className="text-2xl font-bold text-[#091238]">{total.toLocaleString('vi-VN')}đ</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleBookingAndPayment}
                  className="w-full bg-gradient-to-r from-[#091238] to-blue-800 hover:from-blue-800 hover:to-[#091238] text-white font-bold py-4 px-6 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <span className="flex items-center justify-center gap-2">
                    Thanh toán ngay
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CustomeFooter />
    </div>
  );
};

export default Checkout;