import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Pagination, Empty } from 'antd';
import OrganizerSidebar from '../../components/organizer/OrganizerSidebar';
import OrganizerHeader from '../../components/organizer/OrganizerHeader';
import { Calendar, Clock, MapPin, Users, Search, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const MyRequest = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // Mock workshop request data
    const workshopRequests = [
        {
            id: 1,
            name: "Workshop Thiết kế UX/UI cho người mới bắt đầu",
            description: "Khóa học thiết kế giao diện người dùng từ cơ bản đến nâng cao, sử dụng Figma và các công cụ thiết kế hiện đại.",
            image: "https://caodangquoctehanoi.edu.vn/wp-content/uploads/2023/10/huong-nghiep-40-thiet-ke-do-hoa-7-1385x800-1.jpg",
            submittedDate: "2024-06-01",
            reviewDate: "2024-06-03",
            date: "2024-07-15",
            time: "09:00 - 17:00",
            location: "Trung tâm Đào tạo Digital, Quận 1",
            maxParticipants: 25,
            status: "pending",
            price: "1,500,000 VNĐ",
            organizer: "Nguyễn Văn A",
            category: "Thiết kế",
            reviewNotes: ""
        },
        {
            id: 2,
            name: "Khóa học Yoga trị liệu cho dân văn phòng",
            description: "Các bài tập yoga giúp giảm đau lưng, căng thẳng và cải thiện tư thế cho người làm việc văn phòng.",
            image: "https://tokyo-human.edu.vn/wp-content/uploads/2023/05/d0ae430981ec5fb206fd.jpg",
            submittedDate: "2024-05-28",
            reviewDate: "2024-05-30",
            date: "2024-06-20",
            time: "18:00 - 20:00",
            location: "Studio Yoga Harmony, Quận 3",
            maxParticipants: 20,
            status: "approved",
            price: "800,000 VNĐ",
            organizer: "Trần Thị B",
            category: "Sức khỏe",
            reviewNotes: "Workshop được phê duyệt. Nội dung chất lượng và phù hợp với nhu cầu."
        },
        {
            id: 3,
            name: "Workshop Marketing Content cho SME",
            description: "Chiến lược xây dựng nội dung marketing hiệu quả cho doanh nghiệp vừa và nhỏ trên các nền tảng số.",
            image: "https://vioagency.vn/wp-content/uploads/2022/05/digital-marketing-la-gi-5.jpg",
            submittedDate: "2024-05-25",
            reviewDate: "2024-05-27",
            date: "2024-06-30",
            time: "13:00 - 17:00",
            location: "Coworking Space Innovation, Quận 7",
            maxParticipants: 30,
            status: "rejected",
            price: "1,200,000 VNĐ",
            organizer: "Lê Minh C",
            category: "Marketing",
            reviewNotes: "Nội dung workshop cần được bổ sung thêm phần thực hành. Vui lòng chỉnh sửa và gửi lại."
        },
        {
            id: 4,
            name: "Khóa học Nhiếp ảnh Street Photography",
            description: "Kỹ thuật chụp ảnh đường phố, bắt bóng và ánh sáng tự nhiên để tạo ra những bức ảnh nghệ thuật.",
            image: "https://gobranding.com.vn/wp-content/uploads/2023/06/5-photographer-la-gi.jpg",
            submittedDate: "2024-06-05",
            reviewDate: "",
            date: "2024-07-20",
            time: "06:00 - 10:00",
            location: "Phố đi bộ Nguyễn Huệ, Quận 1",
            maxParticipants: 15,
            status: "pending",
            price: "900,000 VNĐ",
            organizer: "Phạm Văn D",
            category: "Nghệ thuật",
            reviewNotes: ""
        },
        {
            id: 5,
            name: "Workshop Nấu ăn Chay sáng tạo",
            description: "Khám phá những món ăn chay độc đáo, bổ dưỡng và hấp dẫn với nguyên liệu tự nhiên.",
            image: "https://ik.imagekit.io/tvlk/blog/2023/06/do-an-y-2.jpg?tr=q-70,c-at_max,w-500,h-300,dpr-2",
            submittedDate: "2024-05-20",
            reviewDate: "2024-05-22",
            date: "2024-06-25",
            time: "10:00 - 14:00",
            location: "Kitchen Studio Green, Quận 2",
            maxParticipants: 12,
            status: "approved",
            price: "700,000 VNĐ",
            organizer: "Ngô Thị E",
            category: "Ẩm thực",
            reviewNotes: "Workshop có nội dung hay và giảng viên có kinh nghiệm. Được phê duyệt."
        },
        {
            id: 6,
            name: "Khóa học Đầu tư Chứng khoán cơ bản",
            description: "Hướng dẫn đầu tư chứng khoán an toàn và hiệu quả cho người mới bắt đầu.",
            image: "https://vioagency.vn/wp-content/uploads/2022/05/digital-marketing-la-gi-5.jpg",
            submittedDate: "2024-06-08",
            reviewDate: "",
            date: "2024-08-01",
            time: "14:00 - 18:00",
            location: "Trung tâm Tài chính, Quận 1",
            maxParticipants: 40,
            status: "pending",
            price: "2,000,000 VNĐ",
            organizer: "Hoàng Văn F",
            category: "Tài chính",
            reviewNotes: ""
        }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'approved':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'rejected':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'approved':
                return 'Đã phê duyệt';
            case 'pending':
                return 'Đang chờ duyệt';
            case 'rejected':
                return 'Bị từ chối';
            default:
                return 'Không xác định';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'approved':
                return <CheckCircle size={16} className="text-green-600" />;
            case 'pending':
                return <AlertCircle size={16} className="text-yellow-600" />;
            case 'rejected':
                return <XCircle size={16} className="text-red-600" />;
            default:
                return <AlertCircle size={16} className="text-gray-600" />;
        }
    };

    // Filter and search logic
    const filteredRequests = workshopRequests.filter(workshop => {
        const matchesFilter = activeFilter === 'all' || workshop.status === activeFilter;
        const matchesSearch = workshop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            workshop.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            workshop.category.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    // Sort logic
    const sortedRequests = [...filteredRequests].sort((a, b) => {
        switch (sortBy) {
            case 'newest':
                return new Date(b.submittedDate) - new Date(a.submittedDate);
            case 'oldest':
                return new Date(a.submittedDate) - new Date(b.submittedDate);
            case 'name':
                return a.name.localeCompare(b.name);
            default:
                return 0;
        }
    });

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentRequests = sortedRequests.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const filterOptions = [
        { value: 'all', label: 'Tất cả', count: workshopRequests.length },
        { value: 'pending', label: 'Chờ duyệt', count: workshopRequests.filter(w => w.status === 'pending').length },
        { value: 'approved', label: 'Đã duyệt', count: workshopRequests.filter(w => w.status === 'approved').length },
        { value: 'rejected', label: 'Bị từ chối', count: workshopRequests.filter(w => w.status === 'rejected').length }
    ];

    return (
        <div className="flex h-screen">
            <OrganizerSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

            <div className="flex flex-col flex-1 overflow-hidden">
                <OrganizerHeader />
                <main className="flex-1 overflow-y-auto p-6">
                    {/* Header */}
                    <div className="mb-6">
                        <h2 className="text-3xl font-bold text-gray-900">Yêu cầu Workshop</h2>
                        <p className="text-gray-600 mt-1">Quản lý và theo dõi trạng thái các yêu cầu workshop</p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        {filterOptions.map((option) => (
                            <div key={option.value} className="bg-[#091238] p-6 rounded-lg shadow-sm border">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-white">{option.label}</p>
                                        <p className="text-2xl font-bold text-white">{option.count}</p>
                                    </div>
                                    <div className="p-3 bg-white rounded-full">
                                        {option.value === 'pending' && <AlertCircle className="h-6 w-6 text-yellow-600" />}
                                        {option.value === 'approved' && <CheckCircle className="h-6 w-6 text-green-600" />}
                                        {option.value === 'rejected' && <XCircle className="h-6 w-6 text-red-600" />}
                                        {option.value === 'all' && <Calendar className="h-6 w-6 text-blue-600" />}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Filters and Search */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
                        <div className="flex flex-col lg:flex-row gap-4">
                            {/* Status Filter */}
                            <div className="flex flex-wrap gap-2">
                                {filterOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => setActiveFilter(option.value)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeFilter === option.value
                                                ? 'bg-[#091238] text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {option.label} ({option.count})
                                    </button>
                                ))}
                            </div>

                            {/* Search and Sort */}
                            <div className="flex gap-4 lg:ml-auto">
                                <div className="relative">
                                    <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm workshop..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="newest">Mới nhất</option>
                                    <option value="oldest">Cũ nhất</option>
                                    <option value="name">Theo tên</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Workshop Request Cards or Empty State */}
                    {currentRequests.length === 0 ? (
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description={
                                <span>
                                    Không tìm thấy yêu cầu nào. Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.
                                </span>
                            }
                            className="py-12"
                        />
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {currentRequests.map((request) => (
                                    <div key={request.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                                        {/* Workshop Image */}
                                        <div className="relative">
                                            <img
                                                src={request.image}
                                                alt={request.name}
                                                className="w-full h-48 object-cover rounded-t-lg"
                                            />
                                            <div className="absolute top-3 right-3">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(request.status)} flex items-center gap-1`}>
                                                    {getStatusIcon(request.status)}
                                                    {getStatusText(request.status)}
                                                </span>
                                            </div>
                                            <div className="absolute top-3 left-3">
                                                <span className="px-2 py-1 bg-black bg-opacity-60 text-white text-xs rounded">
                                                    {request.category}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Workshop Content */}
                                        <div className="p-6">
                                            <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                                                {request.name}
                                            </h3>
                                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                                {request.description}
                                            </p>

                                            {/* Workshop Details */}
                                            <div className="space-y-2 mb-4">
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <Users size={16} className="mr-2 text-gray-400" />
                                                    <span>Tổ chức: {request.organizer}</span>
                                                </div>
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <Calendar size={16} className="mr-2 text-gray-400" />
                                                    <span>Ngày: {new Date(request.date).toLocaleDateString('vi-VN')}</span>
                                                </div>
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <Clock size={16} className="mr-2 text-gray-400" />
                                                    <span>{request.time}</span>
                                                </div>
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <MapPin size={16} className="mr-2 text-gray-400" />
                                                    <span className="line-clamp-1">{request.location}</span>
                                                </div>
                                            </div>

                                            {/* Submission Info */}
                                            <div className="border-t pt-4 mb-4">
                                                <div className="text-sm text-gray-600 space-y-1">
                                                    <div>Ngày gửi: {new Date(request.submittedDate).toLocaleDateString('vi-VN')}</div>
                                                    {request.reviewDate && (
                                                        <div>Ngày duyệt: {new Date(request.reviewDate).toLocaleDateString('vi-VN')}</div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Review Notes */}
                                            {request.reviewNotes && (
                                                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                                                    <p className="text-sm text-gray-700">
                                                        <strong>Ghi chú:</strong> {request.reviewNotes}
                                                    </p>
                                                </div>
                                            )}

                                            {/* Price */}
                                            <div className="mb-4">
                                                <span className="text-lg font-bold text-blue-600">{request.price}</span>
                                                <span className="text-sm text-gray-600 ml-2">({request.maxParticipants} người tối đa)</span>
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
                                    total={sortedRequests.length}
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

export default MyRequest;