import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, Eye, ChevronLeft, ChevronRight, Target, Music, Moon, VenetianMask, Gift, Heart, Gamepad, Briefcase, Utensils } from 'lucide-react';
import CustomerHeader from '../../../components/customer/CustomerHeader';
import CustomeFooter from '../../../components/customer/CustomeFooter';

const Homepage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Carousel images
  const carouselImages = [
    {
      id: 1,
      image: "https://tastytablecatering.com/wp-content/uploads/2020/05/summer-bbq-party-ideas.jpg",
      title: "THAM GIA NGAY",
      subtitle: "TỪ MÓN NƯỚNG ĐẬM VỊ ĐẾN TRÁNG MIỆNG NGỌT NGÀO",
      buttonText: "Khám phá workshop về ẩm thực"
    },
    {
      id: 2,
      image: "https://gobranding.com.vn/wp-content/uploads/2023/06/5-photographer-la-gi.jpg",
      title: "LƯU GIỮ KHOẢNH KHẮC",
      subtitle: "HỌC NHIẾP ẢNH CÙNG CHUYÊN GIA",
      buttonText: "Tham gia workshop nhiếp ảnh"
    },
    {
      id: 3,
      image: "https://caodangquoctehanoi.edu.vn/wp-content/uploads/2023/10/huong-nghiep-40-thiet-ke-do-hoa-7-1385x800-1.jpg",
      title: "SÁNG TẠO & THIẾT KẾ",
      subtitle: "THÀNH THẠO KỸ NĂNG THIẾT KẾ ĐỒ HỌA",
      buttonText: "Bắt đầu khám phá hôm nay"
    }
  ];

  // Workshop categories with Lucide icons
  const categories = [
    { id: 'all', name: 'Tất cả', icon: Target },
    { id: 'music', name: 'Âm nhạc', icon: Music },
    { id: 'performing', name: 'Nghệ thuật', icon: VenetianMask },
    { id: 'holidays', name: 'Ngày lễ', icon: Gift },
    { id: 'dating', name: 'Hẹn hò', icon: Heart },
    { id: 'hobbies', name: 'Sở thích', icon: Gamepad },
    { id: 'business', name: 'Kinh doanh', icon: Briefcase },
    { id: 'food', name: 'Ẩm thực', icon: Utensils }
  ];

  // Sample workshops
  const workshops = [
    {
      id: 1,
      name: "Luyện tập thân khỏe với Yoga",
      description: "Khóa học yoga cơ bản dành cho người mới bắt đầu, giúp bạn thư giãn và tăng cường sức khỏe.",
      image: "https://tokyo-human.edu.vn/wp-content/uploads/2023/05/d0ae430981ec5fb206fd.jpg",
      date: "2024-06-15",
      time: "09:00 - 11:00",
      location: "Phòng tập Yoga Center, Quận 1",
      participants: 25,
      maxParticipants: 30,
      price: "500,000 VNĐ",
      category: "hobbies"
    },
    {
      id: 2,
      name: "Workshop Nhiếp ảnh cơ bản",
      description: "Học cách chụp ảnh đẹp với các kỹ thuật cơ bản và nâng cao từ các chuyên gia nhiếp ảnh.",
      image: "https://gobranding.com.vn/wp-content/uploads/2023/06/5-photographer-la-gi.jpg",
      date: "2024-06-20",
      time: "14:00 - 17:00",
      location: "Studio ABC, Quận 3",
      participants: 15,
      maxParticipants: 20,
      price: "750,000 VNĐ",
      category: "performing"
    },
    {
      id: 3,
      name: "Khóa học nấu ăn Ý",
      description: "Khám phá văn hóa ẩm thực Ý với các món pasta, pizza và dessert truyền thống.",
      image: "https://ik.imagekit.io/tvlk/blog/2023/06/do-an-y-2.jpg?tr=q-70,c-at_max,w-500,h-300,dpr-2",
      date: "2024-06-25",
      time: "10:00 - 13:00",
      location: "Kitchen Studio, Quận 2",
      participants: 12,
      maxParticipants: 16,
      price: "900,000 VNĐ",
      category: "food"
    },
    {
      id: 4,
      name: "Workshop Thiết kế Đồ họa",
      description: "Học cách sử dụng Photoshop và Illustrator để tạo ra những thiết kế chuyên nghiệp.",
      image: "https://caodangquoctehanoi.edu.vn/wp-content/uploads/2023/10/huong-nghiep-40-thiet-ke-do-hoa-7-1385x800-1.jpg",
      date: "2024-07-01",
      time: "09:00 - 16:00",
      location: "Trung tâm Đào tạo IT, Quận 7",
      participants: 8,
      maxParticipants: 15,
      price: "1,200,000 VNĐ",
      category: "business"
    },
    {
      id: 5,
      name: "Meditation & Mindfulness",
      description: "Tìm hiểu về thiền định và chánh niệm để cải thiện sức khỏe tinh thần và giảm stress.",
      image: "https://myvega.com/cdn/shop/articles/Jan-30-03-620x315_fda1b7c5-7350-4e1e-b2e6-496680656a57.png?v=1597207341",
      date: "2024-05-30",
      time: "18:00 - 20:00",
      location: "Zen Center, Quận 1",
      participants: 20,
      maxParticipants: 25,
      price: "400,000 VNĐ",
      category: "hobbies"
    },
    {
      id: 6,
      name: "Workshop Marketing Digital",
      description: "Chiến lược marketing online hiệu quả cho doanh nghiệp nhỏ và vừa trong thời đại số.",
      image: "https://vioagency.vn/wp-content/uploads/2022/05/digital-marketing-la-gi-5.jpg",
      date: "2024-07-10",
      time: "13:00 - 17:00",
      location: "Coworking Space Hub, Quận Bình Thạnh",
      participants: 30,
      maxParticipants: 40,
      price: "800,000 VNĐ",
      category: "business"
    },
    {
      id: 7,
      name: "Live Music Performance Training",
      description: "Learn to perform live music with professional guidance and stage techniques.",
      image: "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      date: "2024-07-15",
      time: "19:00 - 21:00",
      location: "Music Hall, Quận 4",
      participants: 10,
      maxParticipants: 20,
      price: "600,000 VNĐ",
      category: "music"
    },
    {
      id: 8,
      name: "Holiday Decoration Workshop",
      description: "Create stunning decorations for festive holidays with expert tips.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      date: "2024-12-01",
      time: "10:00 - 14:00",
      location: "Craft Center, Quận 6",
      participants: 14,
      maxParticipants: 20,
      price: "550,000 VNĐ",
      category: "holidays"
    }
  ];

  // Filter workshops based on selected category
  const filteredWorkshops = selectedCategory === 'all'
    ? workshops
    : workshops.filter(workshop => workshop.category === selectedCategory);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  // Top Trending Fields
  const topTrendingFields = [
    { id: 1, name: "Digital Marketing", icon: Briefcase, description: "Learn modern marketing strategies." },
    { id: 2, name: "Photography", icon: Eye, description: "Master the art of capturing moments." },
    { id: 3, name: "Graphic Design", icon: Utensils, description: "Create stunning visual designs." },
    { id: 4, name: "Cooking Classes", icon: Utensils, description: "Explore global cuisines." }
  ];

  return (
    <div className="min-h-screen">
      <CustomerHeader />

      {/* Hero Carousel - Extended to screen edges */}
      <section className="py-8 px-4">
        <div className="relative w-full max-w-6xl mx-auto h-80 md:h-96 overflow-hidden rounded-xl shadow-lg">
          {carouselImages.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-transform duration-500 ease-in-out ${index === currentSlide ? 'translate-x-0' :
                index < currentSlide ? '-translate-x-full' : 'translate-x-full'
                }`}
            >
              <div className="relative w-full h-full">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white px-8 py-10 bg-opacity-30 rounded-xl backdrop-blur-sm shadow-lg max-w-2xl mx-4">
                    <h3 className="text-sm md:text-base font-medium mb-2 bg-orange-500 px-4 py-2 rounded inline-block">
                      {slide.title}
                    </h3>
                    <h1 className="text-2xl md:text-4xl font-bold mb-6 leading-tight">
                      {slide.subtitle}
                    </h1>
                    <button className="bg-white text-gray-800 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
                      {slide.buttonText}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Arrows - Positioned inside carousel */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-3 rounded-full transition-all shadow-lg z-10"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-3 rounded-full transition-all shadow-lg z-10"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
                  }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <div key={category.id} className="flex flex-col items-center">
                <button
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center justify-center w-16 h-16 rounded-full transition-all ${selectedCategory === category.id
                    ? 'bg-[#091238] text-white shadow-lg'
                    : 'bg-[#091238] bg-opacity-10 text-white hover:bg-opacity-20'
                    }`}
                >
                  <category.icon size={24} />
                </button>
                <span className="mt-2 text-sm text-black text-center">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshops Section */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-left mb-8">
            <h2 className="text-3xl font-bold text-black mb-4">Workshop Nổi Bật</h2>
          </div>

          {filteredWorkshops.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Không có workshop nào trong danh mục này.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredWorkshops.map((workshop) => (
                <div key={workshop.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                  {/* Workshop Image */}
                  <div className="relative">
                    <img
                      src={workshop.image}
                      alt={workshop.name}
                      className="w-full h-48 object-cover"
                    />
                  </div>

                  {/* Workshop Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                      {workshop.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {workshop.description}
                    </p>

                    {/* Workshop Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar size={16} className="mr-2 text-gray-400" />
                        <span>{new Date(workshop.date).toLocaleDateString('vi-VN')}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock size={16} className="mr-2 text-gray-400" />
                        <span>{workshop.time}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin size={16} className="mr-2 text-gray-400" />
                        <span className="line-clamp-1">{workshop.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users size={16} className="mr-2 text-gray-400" />
                        <span>{workshop.participants}/{workshop.maxParticipants} người tham gia</span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                      <span className="text-lg font-bold text-[#091238]">{workshop.price}</span>
                    </div>

                    {/* Action Button */}
                    <Link
                      to={`/workshopdetail/${workshop.id}`}
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

      {/* Top Workshops Section */}
      <section className="py-8 px-4 bg-amber-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-left mb-8">
            <h2 className="text-3xl font-bold text-black mb-4">Top Trending Workshop</h2>
          </div>

          {filteredWorkshops.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Không có workshop nào trong danh mục này.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredWorkshops.map((workshop) => (
                <div key={workshop.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                  {/* Workshop Image */}
                  <div className="relative">
                    <img
                      src={workshop.image}
                      alt={workshop.name}
                      className="w-full h-48 object-cover"
                    />
                  </div>

                  {/* Workshop Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                      {workshop.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {workshop.description}
                    </p>

                    {/* Workshop Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar size={16} className="mr-2 text-gray-400" />
                        <span>{new Date(workshop.date).toLocaleDateString('vi-VN')}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock size={16} className="mr-2 text-gray-400" />
                        <span>{workshop.time}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin size={16} className="mr-2 text-gray-400" />
                        <span className="line-clamp-1">{workshop.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users size={16} className="mr-2 text-gray-400" />
                        <span>{workshop.participants}/{workshop.maxParticipants} người tham gia</span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                      <span className="text-lg font-bold text-[#091238]">{workshop.price}</span>
                    </div>

                    {/* Action Button */}
                    <Link
                      to={`/workshopdetail/${workshop.id}`}
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

      {/* FAQ Section */}
      <section className="py-8 px-4 bg-[#F5F2EA]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* FAQ Content */}
            <div className="flex flex-col justify-center items-center text-center">
              <h2 className="text-3xl font-bold text-black mb-4">NHỮNG CÂU HỎI THƯỜNG GẶP</h2>
              <p className="text-gray-600 mb-6">
                Chúng tôi đã kết nối nhiều cuộc hội thoại giữa các bạn thực mực. Dưới đây là tóm lược của chúng tôi.
              </p>
              <Link
                to="/faq"
                className="bg-[#091238] hover:bg-opacity-90 text-white py-3 px-6 w-32 rounded-lg font-medium transition-colors text-center"
              >
                FAQs
              </Link>
            </div>
            {/* FAQ Image */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                alt="FAQ"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-8 px-4 bg-[#A9C1A6]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* About Us Image */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                alt="About Us"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            {/* About Us Content */}
            <div className="flex flex-col justify-center items-center text-center">
              <h2 className="text-3xl font-bold text-white mb-4">VỀ CHÚNG TÔI</h2>
              <p className="text-white mb-6">
                Chúng tôi đã, đang và sẽ tiếp tục bất lực nhiệt đới để mang đến cho bạn những thông tin chính xác nhất có thể. Thêm vào đó, chúng tôi luôn sẵn sàng để mọi dự án đều có thể xem.
              </p>
              <Link
                to="/aboutus"
                className="bg-[#091238] hover:bg-opacity-90 text-white py-3 px-6 rounded-lg font-medium transition-colors text-center"
              >
                Xem chi tiết
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CustomeFooter />
    </div>
  );
};

export default Homepage;