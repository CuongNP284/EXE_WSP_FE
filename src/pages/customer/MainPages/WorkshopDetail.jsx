import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, Eye, Star, Phone, Mail, ArrowLeft } from 'lucide-react';
import CustomerHeader from '../../../components/customer/CustomerHeader';
import CustomeFooter from '../../../components/customer/CustomeFooter';
import ApiService from '../../../service/ApiService';
import { message } from 'antd';

const WorkshopDetail = () => {
    const { workshopId } = useParams();
    const [workshop, setWorkshop] = useState(null);
    const [organizer, setOrganizer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState('2024-03-09');

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

    const similarWorkshops = [
        {
            id: 1,
            name: "LUYỆN TẬP THÂN KHỎE VỚI YOGA",
            description: "Cung cấp các liệu pháp khỏe Yoga cho mọi người.",
            image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            price: "500,000 VNĐ",
            originalPrice: "600,000 VNĐ",
            date: "Thứ 2, 04/03",
            location: "128/37A Lê Văn Duyệt, Bình Thạnh"
        },
        {
            id: 2,
            name: "TRỊ LIỆU CHUỖNG XOAY",
            description: "Sức nóng lướp nướng con tốn số nừng dong pain thú",
            image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            price: "500,000 VNĐ",
            date: "Thứ 2, 09/03",
            location: "128/37A Lê Văn Duyệt, Bình Thạnh"
        },
        {
            id: 3,
            name: "HUMAN DESIGN READING",
            description: "Hiểu mình - cảm joy jini",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            price: "500,000 VNĐ",
            date: "Thứ 4, 04/03",
            location: "128/37A Lê Văn Duyệt, Bình Thạnh"
        }
    ];

    // Hardcoded available dates (no API provided)
    const availableDates = [
        { date: '2024-03-09', time: '14h00 - 16h30', day: 'Thứ 2' },
        { date: '2024-03-12', time: '14h00 - 16h30', day: 'Thứ 4' },
        { date: '2024-03-14', time: '14h00 - 16h30', day: 'Thứ 6' }
    ];

    // Map status code to display text
    const mapStatusToDisplay = (status) => {
        switch (status) {
            case 0: return 'OFFLINE';
            case 1: return 'ONLINE';
            default: return 'UNKNOWN';
        }
    };

    // Fetch workshop and organizer details
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch workshop details
                const res = await ApiService.getWorkshopById(workshopId);
                const workshopData = res?.data?.data;

                if (!res || res.status !== 200 || !workshopData) {
                    message.error('Không thể tải chi tiết workshop.');
                    setLoading(false);
                    return;
                }

                // Map status and add hardcoded available dates
                const mappedWorkshop = {
                    ...workshopData,
                    status: mapStatusToDisplay(workshopData.status),
                    availableDates
                };
                setWorkshop(mappedWorkshop);

                // Optionally fetch organizer (commented out to avoid error)
                /* const organizerId = workshopData.organizerId;
                if (organizerId) {
                    const orgRes = await ApiService.getUserById(organizerId);
                    const organizerData = orgRes?.data?.data;
                    if (orgRes && orgRes.status === 200 && organizerData) {
                        setOrganizer(organizerData);
                    } else {
                        message.warning('Không thể tải thông tin người tổ chức.');
                        setOrganizer(null);
                    }
                } */
                setOrganizer({ firstName: 'Unknown', lastName: 'Organizer', email: 'contact@example.com', phoneNumber: '090-123-4567' }); // Fallback data
            } catch (err) {
                console.error('Lỗi khi tải dữ liệu workshop:', err);
                message.error('Đã xảy ra lỗi trong quá trình tải dữ liệu.');
            } finally {
                setLoading(false);
            }
        };

        if (workshopId) {
            fetchData();
        } else {
            message.error('Không tìm thấy ID workshop.');
            setLoading(false);
        }
    }, [workshopId]);

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('vi-VN');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-gray-600">Đang tải...</div>
            </div>
        );
    }

    if (!workshop) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-gray-600">Không thể tải thông tin workshop.</div>
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
                        {/* Workshop Image */}
                        <div className="relative mb-6">
                            <img
                                src={workshop.image || 'https://thienanagency.com/photos/all/khac/workshop-painting.jpg'}
                                alt={workshop.title}
                                className="w-full h-64 md:h-80 object-cover rounded-lg"
                            />
                            <div className="absolute top-4 right-4">
                                <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-medium">
                                    {workshop.status}
                                </span>
                            </div>
                        </div>

                        {/* Workshop Title */}
                        <div className="mb-6">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{workshop.title}</h1>
                            <p className="text-gray-600 text-lg">{workshop.description}</p>
                            <p className="text-sm text-gray-500 mt-1">Nhà tổ chức: {organizer ? `${organizer.firstName} ${organizer.lastName}` : 'Unknown Organizer'}</p>
                        </div>

                        {/* Workshop Details */}
                        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">THÔNG TIN CHI TIẾT</h2>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <MapPin size={20} className="text-gray-400 mr-3 mt-1" />
                                    <div>
                                        <p className="font-medium text-gray-900">Địa điểm</p>
                                        <p className="text-gray-600">{workshop.location}</p>
                                    </div>
                                </div>
                                {organizer && (
                                    <>
                                        <div className="flex items-start">
                                            <Phone size={20} className="text-gray-400 mr-3 mt-1" />
                                            <div>
                                                <p className="font-medium text-gray-900">Số điện thoại</p>
                                                <p className="text-gray-600">{organizer.phoneNumber}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <Mail size={20} className="text-gray-400 mr-3 mt-1" />
                                            <div>
                                                <p className="font-medium text-gray-900">Email</p>
                                                <p className="text-gray-600">{organizer.email}</p>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">MÔ TẢ</h2>
                            <div className="text-gray-600 whitespace-pre-line">
                                {workshop.description}
                            </div>
                        </div>

                        {/* Schedule Card */}
                        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">LỊCH CHI TIẾT</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {workshop.availableDates.map((schedule, index) => (
                                    <div key={index} className="text-center">
                                        <div className="bg-[#091238] text-white rounded-lg p-4">
                                            <div className="text-sm opacity-80 mb-1">{schedule.day}</div>
                                            <div className="text-xs opacity-60 mb-2">Tháng 3</div>
                                            <div className="text-2xl font-bold mb-2">
                                                {schedule.date.split('-')[2]}
                                            </div>
                                            <div className="text-xs opacity-80">{schedule.time}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Reviews Section */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
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
                        </div>
                    </div>

                    {/* Sidebar - Fixed pricing card */}
                    <div className="lg:col-span-1">
                        <div className="bg-[#091238] text-white rounded-lg p-6 sticky top-4">
                            <h3 className="text-lg font-semibold mb-4">Thông tin vé</h3>
                            <div className="mb-4">
                                <h4 className="text-xl font-bold mb-2">{workshop.title}</h4>
                                <p className="text-sm opacity-80 mb-1">Nhà tổ chức: {organizer ? `${organizer.firstName} ${organizer.lastName}` : 'Unknown Organizer'}</p>
                                <div className="flex items-center text-sm opacity-80 mb-2">
                                    <MapPin size={14} className="mr-1" />
                                    <span>{workshop.location}</span>
                                </div>
                                <div className="flex items-center text-sm opacity-80">
                                    <Calendar size={14} className="mr-1" />
                                    <span>{formatDate(workshop.createdAt)}</span>
                                </div>
                            </div>
                            <div className="mb-6">
                                <div className="text-2xl font-bold mb-2">Giá từ: {workshop.price.toLocaleString('vi-VN')} VNĐ</div>
                                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                                    ĐẶT VÉ NGAY
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Similar Workshops Section */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">WORKSHOP BẠN CÓ THỂ THÍCH</h2>
                    <p className="text-gray-600 mb-6">Dựa trên thể loại workshop bạn đang xem</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {similarWorkshops.map((workshop) => (
                            <div key={workshop.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                                <div className="relative">
                                    <img
                                        src={workshop.image}
                                        alt={workshop.name}
                                        className="w-full h-48 object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        {workshop.name}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4">
                                        {workshop.description}
                                    </p>
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <Calendar size={16} className="mr-2 text-gray-700" />
                                            <span>{workshop.date}</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <MapPin size={16} className="mr-2 text-gray-700" />
                                            <span className="line-clamp-1">{workshop.location}</span>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-lg font-bold text-[#091238]">{workshop.price}</span>
                                            {workshop.originalPrice && (
                                                <span className="text-sm text-gray-500 line-through">{workshop.originalPrice}</span>
                                            )}
                                        </div>
                                    </div>
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
            </div>

            <CustomeFooter />
        </div>
    );
};

export default WorkshopDetail;