import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, Eye, Star, Phone, Mail, ArrowLeft } from 'lucide-react';
import CustomerHeader from '../../../components/customer/CustomerHeader';
import CustomeFooter from '../../../components/customer/CustomeFooter';
import ApiService from '../../../service/ApiService';
import { message } from 'antd';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hardcoded reviews and similar workshops (no API provided)
  const reviews = [
    {
      id: 1,
      name: "Nguyễn Huyền Châu",
      rating: 4.7,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b789?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      comment: "Khóa đào tạo này rất dễ chịu tương lai chia mentor rất ngá để chương xã chạy cảnh vì tính"
    },
    {
      id: 2,
      name: "Hoàng Minh Khoa",
      rating: 4.7,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      comment: "Khóa thi năng Design kọn tính rất dễy án giúp án và mỗi lý thuyết rất thấy. Mình đã học 5 days, đượt 4 buổi về"
    }
  ];

  // Fetch logged-in user details
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch logged-in user details
        const userResponse = await ApiService.getLoggedInUserInfo();
        if (userResponse.status === 200 && userResponse.data) {
          setUser(userResponse.data);
        } else {
          message.error(userResponse.message || 'Không thể tải thông tin người dùng.');
        }
      } catch (error) {
        message.error('Lỗi khi tải dữ liệu.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Đang tải...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Không thể tải thông tin người dùng.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <CustomerHeader />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* User Image */}
            <div className="relative mb-6">
              <img
                src={user.avatar || 'https://images.stockcake.com/public/5/4/1/5417e74f-10cd-4be6-b128-85492eb59acc_large/creative-team-meeting-stockcake.jpg'}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-full h-64 md:h-80 object-cover rounded-lg"
              />
              <div className="absolute top-4 right-4">
                <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {ApiService.mapRoleIdToName(user.role)}
                </span>
              </div>
            </div>

            {/* User Title */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.firstName} {user.lastName}</h1>
              <p className="text-sm text-gray-500 mt-1">Vai trò: {ApiService.mapRoleIdToName(user.role)}</p>
            </div>

            {/* User Details */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">THÔNG TIN CHI TIẾT</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Phone size={20} className="text-gray-400 mr-3 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Số điện thoại</p>
                    <p className="text-gray-600">{user.phoneNumber || 'Không có thông tin'}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail size={20} className="text-gray-400 mr-3 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            {/* <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                ĐÁNH GIÁ
                <span className="text-sm text-gray-500 ml-2">Đánh giá gần đây</span>
              </h2>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{review.name}</h4>
                        <div className="flex items-center">
                          <Star size={16} className="text-yellow-500 fill-current mr-1" />
                          <span className="text-sm font-medium text-gray-900">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">{review.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div> */}
          </div>

          {/* Sidebar - Fixed user info card */}
          <div className="lg:col-span-1">
            <div className="bg-[#091238] text-white rounded-lg p-6 sticky top-4">
              <h3 className="text-lg font-semibold mb-4">Thông tin người dùng</h3>
              <div className="mb-4">
                <h4 className="text-xl font-bold mb-2">{user.firstName} {user.lastName}</h4>
                <p className="text-sm opacity-80 mb-1">Vai trò: {ApiService.mapRoleIdToName(user.role)}</p>
                <div className="flex items-center text-sm opacity-80 mb-2">
                  <Mail size={14} className="mr-1" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center text-sm opacity-80">
                  <Phone size={14} className="mr-1" />
                  <span>{user.phoneNumber || 'Không có thông tin'}</span>
                </div>
              </div>
              <div className="mb-6">
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                  LIÊN HỆ NGAY
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

export default UserProfile;