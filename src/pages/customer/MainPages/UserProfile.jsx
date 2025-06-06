import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Eye, 
  Star, 
  Phone, 
  Mail, 
  ArrowLeft,
  Edit,
  User,
  Trophy,
  Music,
  Target,
  Zap,
  Award,
  BookOpen
} from 'lucide-react';
import CustomerHeader from '../../../components/customer/CustomerHeader';
import CustomeFooter from '../../../components/customer/CustomeFooter';

const UserProfile = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'Nguyễn Văn An',
    email: 'nguyenvanan@gmail.com',
    phone: '0987654321',
    bio: 'Yêu thích tham gia các workshop về sức khỏe và phát triển bản thân',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
  });

  // Recent activities data (workshops attended)
  const recentActivities = [
    {
      id: 1,
      name: "LUYỆN TẬP THÂN KHỎE VỚI YOGA",
      description: "Cung cấp các liệu pháp khỏe Yoga cho mọi người.",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      price: "500,000 VNĐ",
      originalPrice: "600,000 VNĐ",
      date: "Thứ 2, 04/03",
      location: "128/37A Lê Văn Duyệt, Bình Thạnh",
      status: "Đã tham gia"
    },
    {
      id: 2,
      name: "TRỊ LIỆU CHUỖNG XOAY",
      description: "Sức nóng lướp nướng con tốn số nừng dong pain thú",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      price: "500,000 VNĐ",
      date: "Thứ 2, 09/03",
      location: "128/37A Lê Văn Duyệt, Bình Thạnh",
      status: "Đã đăng ký"
    },
    {
      id: 3,
      name: "HUMAN DESIGN READING",
      description: "Hiểu mình - cảm joy jini",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      price: "500,000 VNĐ",
      date: "Thứ 4, 04/03",
      location: "128/37A Lê Văn Duyệt, Bình Thạnh",
      status: "Đã tham gia"
    }
  ];

  // Achievement badges data
  const achievements = [
    {
      id: 1,
      title: "Chúa tể của những Workshop",
      description: "Tham gia 20+ workshop",
      icon: Trophy,
      color: "bg-yellow-500",
      earned: true
    },
    {
      id: 2,
      title: "Dân chơi thể hệ mới",
      description: "Tham gia 5+ workshop",
      icon: Star,
      color: "bg-purple-500",
      earned: true
    },
    {
      id: 3,
      title: "Ông Tổ Ngành Thể Thao",
      description: "Tham gia 30+ workshop về thể thao",
      icon: Target,
      color: "bg-green-500",
      earned: false
    },
    {
      id: 4,
      title: "Chiến thần Truyền thống",
      description: "Tham gia 10+ workshop về marketing, truyền thống",
      icon: BookOpen,
      color: "bg-blue-500",
      earned: true
    },
    {
      id: 5,
      title: "Ông 'zưa' Âm nhạc",
      description: "Tham gia 20+ workshop về âm nhạc",
      icon: Music,
      color: "bg-pink-500",
      earned: false
    },
    {
      id: 6,
      title: "Cao Thủ Điện Tử",
      description: "Tham gia 20+ workshop về công nghệ, tỉa thuật",
      icon: Zap,
      color: "bg-orange-500",
      earned: true
    }
  ];

  const handleEditToggle = () => {
    setIsEditMode(!isEditMode);
  };

  const handleSave = () => {
    setIsEditMode(false);
    // Here you would typically save to backend
  };

  const handleInputChange = (field, value) => {
    setUserInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen">
      <CustomerHeader />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <img
                src={userInfo.avatar}
                alt={userInfo.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              {isEditMode && (
                <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full">
                  <Edit size={12} />
                </button>
              )}
            </div>
            
            <div className="flex-1">
              {isEditMode ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={userInfo.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="text-2xl font-bold border-b-2 border-blue-500 bg-transparent outline-none"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={userInfo.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                      <input
                        type="tel"
                        value={userInfo.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Giới thiệu</label>
                    <textarea
                      value={userInfo.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{userInfo.name}</h1>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <Mail size={16} className="mr-2" />
                      <span>{userInfo.email}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Phone size={16} className="mr-2" />
                      <span>{userInfo.phone}</span>
                    </div>
                  </div>
                  <p className="text-gray-600">{userInfo.bio}</p>
                </div>
              )}
            </div>

            <div className="flex space-x-2">
              {isEditMode ? (
                <>
                  <button
                    onClick={handleSave}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Lưu
                  </button>
                  <button
                    onClick={handleEditToggle}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Hủy
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEditToggle}
                  className="bg-[#091238] hover:bg-opacity-90 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <Edit size={16} />
                  Chỉnh sửa
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Recent Activities Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Những Hoạt Động Gần Đây</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                {/* Workshop Image */}
                <div className="relative">
                  <img
                    src={activity.image}
                    alt={activity.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      activity.status === 'Đã tham gia' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                </div>

                {/* Workshop Content */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {activity.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {activity.description}
                  </p>

                  {/* Workshop Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar size={16} className="mr-2 text-gray-400" />
                      <span>{activity.date}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin size={16} className="mr-2 text-gray-400" />
                      <span className="line-clamp-1">{activity.location}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-[#091238]">{activity.price}</span>
                      {activity.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">{activity.originalPrice}</span>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link
                    to={`/workshopdetail`}
                    className="w-full bg-[#091238] hover:bg-opacity-90 text-white py-3 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 no-underline"
                  >
                    <Eye size={16} />
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Danh Hiệu Của Bạn</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement) => {
                const IconComponent = achievement.icon;
                return (
                  <div 
                    key={achievement.id} 
                    className={`bg-[#091238] text-white rounded-lg p-6 text-center transition-all ${
                      !achievement.earned && 'opacity-60 grayscale'
                    }`}
                  >
                    <div className="flex justify-center mb-4">
                      <div className="bg-white rounded-full p-4">
                        <IconComponent size={32} className="text-[#091238]" />
                      </div>
                    </div>
                    <h3 className="font-bold text-lg mb-2">
                      {achievement.title}
                    </h3>
                    <p className="text-sm opacity-80 leading-relaxed">
                      {achievement.description}
                    </p>
                    {achievement.earned && (
                      <div className="flex items-center justify-center mt-3">
                        <Award size={16} className="text-yellow-400 mr-1" />
                        <span className="text-xs text-yellow-400 font-medium">Đã đạt được</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stats Card */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Thống Kê</h2>
            <div className="bg-[#091238] text-white rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Thành tích của bạn</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">24</div>
                  <div className="text-sm opacity-80">Workshop đã tham gia</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">4/6</div>
                  <div className="text-sm opacity-80">Danh hiệu đạt được</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center">
                    <Star size={18} className="text-yellow-400 fill-current mr-1" />
                    <span className="text-3xl font-bold">4.8</span>
                  </div>
                  <div className="text-sm opacity-80">Đánh giá trung bình</div>
                </div>
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