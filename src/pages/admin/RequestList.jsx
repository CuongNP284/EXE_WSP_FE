import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Pagination, Empty } from 'antd';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import ApiService from '../../service/ApiService';
import { Calendar, Clock, MapPin, Users, Search, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const RequestList = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [currentPage, setCurrentPage] = useState(1);
    const [workshopRequests, setWorkshopRequests] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 6;

    useEffect(() => {
        fetchWorkshopRequests();
    }, [currentPage]);

    const fetchWorkshopRequests = async () => {
        try {
            const params = {
                pageSize: itemsPerPage,
                page: currentPage,
                includeDeleted: false
            };
            const response = await ApiService.getPendingWorkshopsForAdmin(params);
            if (response.status === 200) {
                const items = response.data.data?.items || response.data.items || [];
                const total = response.data.data?.count || response.data.totalItems || 0;
                // Map API response to the expected format
                const formattedRequests = await Promise.all(items.map(async (workshop) => {
                    // Fetch category name
                    let categoryName = 'Uncategorized';
                    if (workshop.categoryId) {
                        const categoryResponse = await ApiService.getCategoryById(workshop.categoryId);
                        if (categoryResponse.status === 200 && categoryResponse.data?.data?.name) {
                            categoryName = categoryResponse.data.data.name;
                        }
                    }
                    // Fetch organizer name
                    let organizerName = 'Unknown Organizer';
                    if (workshop.organizerId) {
                        const organizerResponse = await ApiService.getUserById(workshop.organizerId);
                        if (organizerResponse.status === 200 && organizerResponse.data?.data?.name) {
                            organizerName = organizerResponse.data.data.name;
                        }
                    }
                    return {
                        id: workshop.workshopId,
                        name: workshop.title,
                        description: workshop.description,
                        image: workshop.image || "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                        submittedDate: workshop.createdAt,
                        reviewDate: workshop.updatedAt || "",
                        date: workshop.startDate || new Date(workshop.createdAt).toISOString(),
                        time: workshop.startDate && workshop.endDate
                            ? `${new Date(workshop.startDate).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })} - ${new Date(workshop.endDate).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}`
                            : 'N/A',
                        location: workshop.location,
                        status: workshop.status === 0 ? 'pending' : workshop.status === 1 ? 'approved' : 'rejected',
                        price: `${workshop.price.toLocaleString('vi-VN')} VNĐ`,
                        organizer: organizerName,
                        category: categoryName,
                        reviewNotes: workshop.reviewNotes || ""
                    };
                }));
                setWorkshopRequests(formattedRequests);
                setTotalItems(total);
            } else {
                console.error('Failed to fetch workshop requests:', response.message);
            }
        } catch (error) {
            console.error('Fetch Workshop Requests Error:', error);
        }
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

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
            <AdminSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

            <div className="flex flex-col flex-1 overflow-hidden">
                <AdminHeader />
                <main className="flex-1 overflow-y-auto p-6">
                    {/* Header */}
                    <div className="mb-6">
                        <h2 className="text-3xl font-bold text-gray-900">Quản lý Phê duyệt Workshop</h2>
                        <p className="text-gray-600 mt-1">Xem xét và quản lý các yêu cầu workshop từ các tổ chức</p>
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

                                            {/* Price and View Details */}
                                            <div className="flex justify-between items-center mb-4">
                                                <div>
                                                    <span className="text-lg font-bold text-blue-600">{request.price}</span>
                                                </div>
                                                <Link
                                                    to={`/requestdetail/${request.id}`}
                                                    className="px-4 py-2 bg-[#091238] text-white text-sm font-medium rounded-lg hover:bg-[#0c1a5e] transition-colors"
                                                >
                                                    Xem chi tiết
                                                </Link>
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
                                    total={totalItems}
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

export default RequestList;