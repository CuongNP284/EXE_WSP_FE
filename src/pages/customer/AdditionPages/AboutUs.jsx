import React, { useState } from 'react'
import CustomerHeader from '../../../components/customer/CustomerHeader'
import CustomeFooter from '../../../components/customer/CustomeFooter'
import { motion } from 'framer-motion';

const AboutUs = () => {
    const [activeGlanceTab, setActiveGlanceTab] = useState(0);

    const features = [
        {
            image: "https://lifevision.vn/wp-content/uploads/2024/07/workshop.jpg",
            title: "Thiết Kế Trải Nghiệm Trực Tiếp",
            description: "Tạo ra những khoảnh khắc sống động kết nối mọi người trên toàn cầu"
        },
        {
            image: "https://thienanagency.com/photos/all/khac/workshop-painting.jpg",
            title: "Sản Xuất Sáng Tạo",
            description: "Biến ý tưởng thành những trải nghiệm trực tiếp khó quên"
        },
        {
            image: "https://in.pito.vn/wp-content/uploads/2024/09/xay-dung-hinh-anh-doanh-nghiep-qua-workshop.webp",
            title: "Xây Dựng Cộng Đồng",
            description: "Kết nối mọi người thông qua đam mê chung"
        }
    ];

    const updates = [
        {
            image: "https://in.pito.vn/wp-content/uploads/2024/09/xay-dung-hinh-anh-doanh-nghiep-qua-workshop.webp",
            date: "Thứ Tư, 3/5, 9:30 sáng - 11:45 sáng",
            title: "Tính Năng Mới",
            description: "Chúng tôi vừa ra mắt hệ thống đăng ký workshop trực tuyến mới, giúp người dùng dễ dàng tham gia và quản lý lịch trình của mình."
        },
        {
            image: "https://lifevision.vn/wp-content/uploads/2024/07/workshop.jpg",
            date: "Thứ Tư, 3/5, 9:30 sáng - 11:45 sáng",
            title: "Cập Nhật Hệ Thống",
            description: "Phiên bản mới của nền tảng mang đến giao diện thân thiện hơn và tốc độ tải nhanh hơn cho trải nghiệm mượt mà."
        },
        {
            image: "https://thienanagency.com/photos/all/khac/workshop-painting.jpg",
            date: "Thứ Tư, 3/5, 9:30 sáng - 11:45 sáng",
            title: "Sự Kiện Đặc Biệt",
            description: "Workshop vẽ tranh sáng tạo vừa được tổ chức thành công, thu hút hơn 200 người tham gia từ khắp nơi."
        }
    ];

    const glanceData = [
        {
            title: "Phạm Vi Toàn Cầu",
            icon: "globe",
            stat: "4,7 triệu sự kiện",
            description: "Được tổ chức tại gần 180 quốc gia trên toàn thế giới"
        },
        {
            title: "Tương Tác Người Dùng",
            icon: "users",
            stat: "89 triệu người dùng trung bình hàng tháng",
            description: "Một cộng đồng sôi động và không ngừng phát triển của các nhà sáng tạo"
        },
        {
            title: "Thành Công Sự Kiện",
            icon: "ticket",
            stat: "83 triệu vé đã bán",
            description: "Kết nối mọi người thông qua những trải nghiệm ý nghĩa"
        }
    ];

    return (
        <div>
            <CustomerHeader />
            <div className="min-h-screen flex flex-col">
                {/* Hero Section with Image */}
                <div className="relative h-[500px] flex items-center justify-center overflow-hidden">
                    <img
                        src="https://cdn.shopify.com/s/files/1/0399/0395/3055/files/CooperateWorkshop_480x480.jpg?v=1652692572"
                        alt="Workshop Experience"
                        className="absolute inset-0 w-full h-full object-cover blur-xs"
                    />
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative z-10 text-center px-8 py-10 bg-opacity-50 rounded-xl backdrop-blur-2xl shadow-lg max-w-3xl mx-4"
                    >
                        <motion.h1
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="text-5xl font-bold mb-4 text-white"
                        >
                            Mang Trải Nghiệm Đến Với Cuộc Sống
                        </motion.h1>
                        <motion.p
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="text-xl max-w-2xl mx-auto text-white"
                        >
                            Chúng tôi tạo ra những trải nghiệm trực tiếp biến đổi, kết nối mọi người trên toàn thế giới
                        </motion.p>
                    </motion.div>
                </div>

                {/* About Us Section */}
                <div className="container mx-auto px-4 py-16 flex justify-center">
                    <div className="max-w-7xl grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            <h2 className="text-4xl font-bold text-[#091238] mb-4">About Us</h2>
                            <p className="text-gray-700 leading-relaxed text-lg">
                                Chúng tôi là những nhà sáng tạo đam mê, chuyên tâm thiết kế những trải nghiệm
                                trực tiếp độc đáo vượt qua mọi ranh giới. Sứ mệnh của chúng tôi là tạo ra những
                                khoảnh khắc truyền cảm hứng, kết nối và thay đổi cách con người tương tác với thế giới xung quanh.
                            </p>
                            <p className="text-gray-600">
                                Với cam kết sâu sắc về đổi mới và kể chuyện, chúng tôi kết hợp công nghệ,
                                sáng tạo và sự kết nối con người để mang đến những trải nghiệm sâu sắc và để
                                lại dấu ấn lâu dài.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <img
                                src="https://gogather.com/hubfs/Conference%20Workshop%20Ideas.png"
                                alt="Về Chúng Tôi"
                                className="w-full h-auto rounded-lg shadow-lg"
                            />
                        </motion.div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="bg-white py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center text-[#091238] mb-12">
                        Tính Năng Trong Workshophy
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.5 }}
                                    className="group relative overflow-hidden"
                                >
                                    <div className="aspect-w-16 aspect-h-9">
                                        <img
                                            src={feature.image}
                                            alt={feature.title}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="mt-4 text-center">
                                        <h3 className="text-xl font-semibold text-[#091238] mb-2">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            {feature.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 2024 at a Glance Section */}
                <div className="bg-gray-50 py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="text-4xl font-bold text-center text-[#091238] mb-12">
                            2024 qua một cái nhìn
                        </h2>
                        <div className="flex justify-center space-x-8">
                            {glanceData.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.2, duration: 0.5 }}
                                    className={`
                                        w-72 p-6 rounded-lg shadow-lg cursor-pointer transition-all duration-300
                                        ${activeGlanceTab === index
                                            ? 'bg-[#091238] text-white'
                                            : 'bg-white text-[#091238] hover:bg-blue-100'
                                        }
                                    `}
                                    onClick={() => setActiveGlanceTab(index)}
                                >
                                    <div className="text-center">
                                        <div className="mb-4 flex justify-center">
                                            {item.icon === 'globe' && (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <circle cx="12" cy="12" r="10"></circle>
                                                    <line x1="2" y1="12" x2="22" y2="12"></line>
                                                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                                                </svg>
                                            )}
                                            {item.icon === 'users' && (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                                    <circle cx="8.5" cy="7" r="4"></circle>
                                                    <path d="M20 8v6"></path>
                                                    <path d="M23 11h-6"></path>
                                                </svg>
                                            )}
                                            {item.icon === 'ticket' && (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M4 6H20V12C20 13.4145 19.4196 14.7625 18.3891 15.7655C17.3585 16.7685 15.9469 17.3334 14.4783 17.3334H9.52174C8.05307 17.3334 6.64148 16.7685 5.61096 15.7655C4.58043 14.7625 4 13.4145 4 12V6Z"></path>
                                                    <path d="M8 4H16"></path>
                                                    <path d="M8 20H16"></path>
                                                </svg>
                                            )}
                                        </div>
                                        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                        <p className="text-2xl font-bold mb-2">{item.stat}</p>
                                        <p className="text-sm opacity-75">{item.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Updates Section */}
                <div className="py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center text-[#091238] mb-12">
                            Các Cập Nhật Trước Đây Của Chúng Tôi
                        </h2>
                        <div className="space-y-12 max-w-5xl mx-auto">
                            {updates.map((update, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className="grid md:grid-cols-2 gap-16 items-center"
                                >
                                    <div>
                                        <img
                                            src={update.image}
                                            alt={update.title}
                                            className="w-4xl h-auto rounded-lg shadow-lg mx-auto"
                                        />
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-500 mb-2 block">
                                            {update.date}
                                        </span>
                                        <h3 className="text-2xl font-semibold text-[#091238] mb-4">
                                            {update.title}
                                        </h3>
                                        <p className="text-gray-700 leading-relaxed">
                                            {update.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <CustomeFooter />
        </div>
    )
}

export default AboutUs
