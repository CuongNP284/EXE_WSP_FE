import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Pagination, Empty } from 'antd';
import Swal from 'sweetalert2';
import OrganizerSidebar from '../../components/organizer/OrganizerSidebar';
import OrganizerHeader from '../../components/organizer/OrganizerHeader';
import { MapPin, Users, Eye, Edit, Trash2, Plus } from 'lucide-react';
import ApiService from '../../service/ApiService';

const MyWorkshop = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [workshops, setWorkshops] = useState([]);
    const itemsPerPage = 6;

    useEffect(() => {
        const fetchWorkshops = async () => {
            const response = await ApiService.getWorkshopsForOrganizer();
            if (response.status === 200) {
                setWorkshops(response.data.data.items || []);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Không thể tải danh sách workshop',
                });
            }
        };
        fetchWorkshops();
    }, []);

    const handleDelete = async (workshopId) => {
        const result = await Swal.fire({
            title: 'Xác nhận xóa',
            text: 'Bạn có chắc chắn muốn xóa workshop này không?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Hủy',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
        });

        if (result.isConfirmed) {
            const response = await ApiService.deleteWorkshop(workshopId);
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Thành công',
                    text: 'Workshop đã được xóa thành công',
                });
                setWorkshops(workshops.filter(w => w.id !== workshopId));
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: response.message || 'Không thể xóa workshop',
                });
            }
        }
    };

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
                return 'Đang diễn ra';
            case 'upcoming':
                return 'Sắp diễn ra';
            case 'completed':
                return 'Đã hoàn thành';
            default:
                return 'Không xác định';
        }
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

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
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Workshop của tôi</h2>
                            <p className="text-gray-600 mt-1">Quản lý và theo dõi workshop của bạn</p>
                        </div>
                        <Link to="/createworkshop" className="bg-[#091238] hover:bg-gray-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors no-underline">
                            <Plus size={20} />
                            Tạo Workshop Mới
                        </Link>
                    </div>

                    {workshops.length === 0 ? (
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description={
                                <span>
                                    Không tìm thấy workshop.{' '}
                                    <Link to="/createworkshop" className="text-[#091238] hover:underline">
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
                                    <div key={workshop.workshopId} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                                        <div className="relative">
                                            <img
                                                src="https://images.stockcake.com/public/5/4/1/5417e74f-10cd-4be6-b128-85492eb59acc_large/creative-team-meeting-stockcake.jpg"
                                                alt={workshop.title}
                                                className="w-full h-48 object-cover rounded-t-lg"
                                            />
                                            <div className="absolute top-3 right-3">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(workshop.status)}`}>
                                                    {getStatusText(workshop.status)}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-6">
                                            <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                                                {workshop.title}
                                            </h3>
                                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                                {workshop.description}
                                            </p>

                                            <div className="space-y-2 mb-4">
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <MapPin size={16} className="mr-2 text-gray-400" />
                                                    <span className="line-clamp-1">{workshop.location}</span>
                                                </div>
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <Users size={16} className="mr-2 text-gray-400" />
                                                    <span>{workshop.capacity || 'N/A'} người tham gia</span>
                                                </div>
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <span>Thời lượng: {workshop.durationMinutes} phút</span>
                                                </div>
                                            </div>

                                            <div className="mb-4">
                                                <span className="text-lg font-bold text-[#091238]">{workshop.price.toLocaleString('vi-VN')} VNĐ</span>
                                            </div>

                                            <div className="flex space-x-2">
                                                <Link to={`/viewwsdetail/${workshop.workshopId}`} className="flex-1 bg-[#091238] hover:bg-gray-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 no-underline">
                                                    <Eye size={16} />
                                                    Xem Chi Tiết
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(workshop.workshopId)}
                                                    className="bg-red-100 hover:bg-red-200 text-red-600 py-2 px-3 rounded-lg transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

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