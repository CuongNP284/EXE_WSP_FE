import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CustomerHeader from '../../../components/customer/CustomerHeader';
import CustomeFooter from '../../../components/customer/CustomeFooter';
import ApiService from '../../../service/ApiService';
import { Users, Calendar, Clock, MapPin, Eye } from 'lucide-react';
import { message } from 'antd';

const Checkout = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [workshop, setWorkshop] = useState(null);
  const [recommendedWorkshops, setRecommendedWorkshops] = useState([]);

  useEffect(() => {
    const savedWorkshop = localStorage.getItem('selectedWorkshop');
    if (savedWorkshop) {
      setWorkshop(JSON.parse(savedWorkshop));
    } else {
      message.error('Không tìm thấy thông tin workshop.');
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchRecommendedWorkshops = async () => {
      try {
        const response = await ApiService.getAllWorkshops();
        if (response.status === 200 && response.data) {
          const allWorkshops = response.data.data.items;
          // Prioritize workshops with the same category
          let filtered = allWorkshops.filter(
            (ws) => ws.categoryId === workshop?.categoryId && ws.workshopId !== workshop?.workshopId
          );
          // If fewer than 3, add random workshops
          if (filtered.length < 3) {
            const others = allWorkshops
              .filter((ws) => ws.workshopId !== workshop?.workshopId && !filtered.includes(ws))
              .sort(() => Math.random() - 0.5);
            filtered = [...filtered, ...others].slice(0, 3);
          }
          setRecommendedWorkshops(filtered);
        }
      } catch (error) {
        console.error('Error fetching recommended workshops:', error);
      }
    };

    if (workshop) {
      fetchRecommendedWorkshops();
    }
  }, [workshop]);

  const total = workshop ? workshop.originalPrice * quantity : 0;

  const handleBookingAndPayment = async () => {
    if (!workshop || !localStorage.getItem('userId')) {
      message.error('Vui lòng đăng nhập để đặt vé.');
      return;
    }

    const bookingData = {
      workshopId: workshop.workshopId,
      quantity: quantity
    };

    try {
      const bookingResponse = await ApiService.createBooking(bookingData);

      if (bookingResponse.status === 200 && bookingResponse.data?.success && typeof bookingResponse.data.data === 'string') {
        message.success('Đặt vé thành công!');
        console.log('Redirecting to:', bookingResponse.data.data);
        window.location.href = bookingResponse.data.data; 
      } else {
        message.error(bookingResponse.message || 'Đặt vé thất bại.');
      }
    } catch (error) {
      message.error('Đã xảy ra lỗi khi đặt vé.');
      console.error(error);
    }
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

      <div className="min-h-screen py-5">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-5">
            <h1 className="text-4xl font-bold text-[#091238] mb-4">Thanh Toán Workshop</h1>
            <p className="text-gray-600 text-lg">Hoàn tất đăng ký workshop của bạn</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
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

          <section className="py-8 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-left mb-8">
                <h2 className="text-3xl font-bold text-[#091238] mb-4">Có thể bạn cũng thích</h2>
              </div>
              {recommendedWorkshops.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600">Không có workshop nào để gợi ý.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendedWorkshops.map((ws) => (
                    <div key={ws.workshopId} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                      <div className="relative">
                        <img
                          src={ws.image || 'https://thienanagency.com/photos/all/khac/workshop-painting.jpg'}
                          alt={ws.title}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                          {ws.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {ws.description}
                        </p>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar size={16} className="mr-2 text-gray-400" />
                            <span>{new Date(ws.createdAt).toLocaleDateString('vi-VN')}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock size={16} className="mr-2 text-gray-400" />
                            <span>{ws.durationMinutes} phút</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin size={16} className="mr-2 text-gray-400" />
                            <span className="line-clamp-1">{ws.location}</span>
                          </div>
                        </div>
                        <div className="mb-4">
                          <span className="text-lg font-bold text-[#091238]">{ws.price.toLocaleString('vi-VN')} VNĐ</span>
                        </div>
                        <Link
                          to={`/workshopdetail/${ws.workshopId}`}
                          className="w-full bg-[#091238] hover:bg-opacity-90 text-white py-3 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 no-underline"
                        >
                          <Eye size={16} />
                          Xem chi tiết
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      <CustomeFooter />
    </div>
  );
};

export default Checkout;