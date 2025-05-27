import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Pagination, Empty } from 'antd';
import OrganizerSidebar from '../../components/organizer/OrganizerSidebar';
import OrganizerHeader from '../../components/organizer/OrganizerHeader';
import { Calendar, Clock, MapPin, Users, Eye, Edit, Trash2, Plus } from 'lucide-react';

const MyWorkshop = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

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
            status: "active",
            price: "500,000 VNĐ"
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
            status: "active",
            price: "750,000 VNĐ"
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
            status: "active",
            price: "900,000 VNĐ"
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
            status: "upcoming",
            price: "1,200,000 VNĐ"
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
            status: "completed",
            price: "400,000 VNĐ"
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
            status: "active",
            price: "800,000 VNĐ"
        }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800';
            case 'upcoming':
                return 'bg-blue-100 text-blue-800';
            case 'completed':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'active':
                return 'Đang mở';
            case 'upcoming':
                return 'Sắp diễn ra';
            case 'completed':
                return 'Đã kết thúc';
            default:
                return 'Không xác định';
        }
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentWorkshops = workshops.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="flex h-screen">
            <OrganizerSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

            <div className="flex flex-col flex-1 overflow-hidden">
                <OrganizerHeader />
                <main className="flex-1 overflow-y-auto p-6">
                    {/* Header with Add Button */}
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Workshop của tôi</h2>
                            <p className="text-gray-600 mt-1">Quản lý và theo dõi các workshop của bạn</p>
                        </div>
                        <Link to="/createworkshop" className="bg-[#091238] hover:bg-gray-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors no-underline">
                            <Plus size={20} />
                            Tạo Workshop Mới
                        </Link>
                    </div>

                    {/* Workshop Cards Grid or Empty State */}
                    {workshops.length === 0 ? (
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description={
                                <span>
                                    Chưa có workshop nào.{' '}
                                    <Link to="/workshops/create" className="text-[#091238] hover:underline">
                                        Tạo workshop đầu tiên của bạn
                                    </Link>
                                </span>
                            }
                            className="py-12"
                        />
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {currentWorkshops.map((workshop) => (
                                    <div key={workshop.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                                        {/* Workshop Image */}
                                        <div className="relative">
                                            <img
                                                src={workshop.image}
                                                alt={workshop.name}
                                                className="w-full h-48 object-cover rounded-t-lg"
                                            />
                                            <div className="absolute top-3 right-3">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(workshop.status)}`}>
                                                    {getStatusText(workshop.status)}
                                                </span>
                                            </div>
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

                                            {/* Action Buttons */}
                                            <div className="flex space-x-2">
                                                <Link to={`/workshopdetail/${workshop.id}`} className="flex-1 bg-[#091238] hover:bg-gray-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 no-underline">
                                                    <Eye size={16} />
                                                    Xem chi tiết
                                                </Link>
                                                <Link to={`/editworkshop/${workshop.id}`} className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg transition-colors no-underline">
                                                    <Edit size={16} />
                                                </Link>
                                                <button className="bg-red-100 hover:bg-red-200 text-red-600 py-2 px-3 rounded-lg transition-colors">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            <div className="mt-8 flex justify-center">
                                <Pagination
                                    current={currentPage}
                                    pageSize={itemsPerPage}
                                    total={workshops.length}
                                    onChange={handlePageChange}
                                    showSizeChanger={false}
                                    showQuickJumper={false}
                                />
                            </div>
                        </>
                    )}
                </main>
            </div>
        </div>
    );
};

export default MyWorkshop;