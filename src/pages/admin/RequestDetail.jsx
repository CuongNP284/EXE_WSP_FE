import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import Swal from 'sweetalert2';
import { Calendar, Clock, MapPin, Users, DollarSign, CheckCircle } from 'lucide-react';
import ApiService from '../../service/ApiService';

const RequestDetail = () => {
    const { workshopId } = useParams();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isApproving, setIsApproving] = useState(false);
    const [workshopData, setWorkshopData] = useState(null);
    const [categoryName, setCategoryName] = useState('Uncategorized');
    const [organizerName, setOrganizerName] = useState('Unknown Organizer');
    const [organizerEmail, setOrganizerEmail] = useState('N/A');

    useEffect(() => {
        fetchWorkshopDetails();
    }, [workshopId]);

    const fetchWorkshopDetails = async () => {
        try {
            const response = await ApiService.getWorkshopById(workshopId);
            if (response.status === 200 && response.data?.data) {
                const workshop = response.data.data;
                setWorkshopData({
                    workshopId: workshop.workshopId,
                    title: workshop.title,
                    description: workshop.description,
                    date: new Date(workshop.createdAt).toLocaleDateString('vi-VN'),
                    startTime: workshop.startTime || 'N/A',
                    endTime: workshop.endTime || 'N/A',
                    location: workshop.location,
                    participants: workshop.maxParticipants ? `${workshop.currentParticipants || 0}/${workshop.maxParticipants} người tham gia` : 'N/A',
                    price: `${workshop.price.toLocaleString('vi-VN')} VND`,
                    image: "https://images.stockcake.com/public/5/4/1/5417e74f-10cd-4be6-b128-85492eb59acc_large/creative-team-meeting-stockcake.jpg",
                    eventDate: new Date(workshop.createdAt).toLocaleDateString('vi-VN'),
                    startTimeDetail: workshop.startTime ? new Date(workshop.startTime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) : 'N/A',
                    endTimeDetail: workshop.endTime ? new Date(workshop.endTime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) : 'N/A',
                    maxParticipants: workshop.maxParticipants || 'N/A',
                    ticketTypes: workshop.ticketTypes || [
                        { name: "Standard Ticket", price: workshop.price.toString() }
                    ],
                    status: workshop.status === 0 ? 'Đang chờ duyệt' : workshop.status === 1 ? 'Đã phê duyệt' : 'Bị từ chối',
                    organizerId: workshop.organizerId,
                    categoryId: workshop.categoryId,
                    introVideoUrl: workshop.introVideoUrl,
                    submittedDate: new Date(workshop.createdAt).toLocaleDateString('vi-VN'),
                    durationMinutes: workshop.durationMinutes
                });

                // Fetch category name
                if (workshop.categoryId) {
                    const categoryResponse = await ApiService.getCategoryById(workshop.categoryId);
                    if (categoryResponse.status === 200 && categoryResponse.data?.data?.name) {
                        setCategoryName(categoryResponse.data.data.name);
                    }
                }

                // Fetch organizer details
                if (workshop.organizerId) {
                    try {
                        const organizerResponse = await ApiService.getUserById(workshop.organizerId);
                        if (organizerResponse.status === 200 && organizerResponse.data?.data) {
                            const user = organizerResponse.data.data;
                            setOrganizerName(`${user.firstName} ${user.lastName}` || 'Unknown Organizer');
                            setOrganizerEmail(user.email || 'N/A');
                        }
                    } catch (err) {
                        console.error('Lỗi khi fetch organizer info:', err);
                    }
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Không thể tải chi tiết workshop',
                });
            }
        } catch (error) {
            console.error('Error fetching workshop details:', error);
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Lỗi khi tải chi tiết workshop',
            });
        }
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleApprove = async () => {
        const result = await Swal.fire({
            title: 'Duyệt workshop',
            text: 'Bạn có chắc chắn muốn duyệt workshop này không?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Hủy',
            confirmButtonColor: '#28a745',
            cancelButtonColor: '#dc3545',
        });

        if (result.isConfirmed) {
            setIsApproving(true);
            try {
                const response = await ApiService.approveWorkshop(workshopId);
                if (response.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Thành công',
                        text: 'Workshop đã được duyệt thành công!',
                    }).then(() => {
                        navigate('/requestlist');
                    });
                    setWorkshopData(prev => ({
                        ...prev,
                        status: response.data?.status || 'Đã phê duyệt'
                    }));
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Lỗi',
                        text: response.message || 'Không thể duyệt workshop',
                    });
                }
            } catch (error) {
                console.error('Error approving workshop:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Lỗi khi duyệt workshop',
                });
            } finally {
                setIsApproving(false);
            }
        }
    };

    if (!workshopData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex h-screen">
            <AdminSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="flex flex-col flex-1 overflow-hidden">
                <AdminHeader />

                <div className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-4xl mx-auto">
                        {/* Workshop Image and Title */}
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                            <div className="relative h-64 md:h-80">
                                <img
                                    src={workshopData.image}
                                    alt={workshopData.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 right-4">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${workshopData.status === 'Đã phê duyệt' ? 'bg-green-500 text-white' : workshopData.status === 'Bị từ chối' ? 'bg-red-500 text-white' : 'bg-yellow-500 text-white'}`}>
                                        {workshopData.status}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6">
                                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                                    {workshopData.title}
                                </h1>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    {workshopData.description}
                                </p>
                                <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
                                    <span>Người tổ chức: <strong>{organizerName}</strong></span>
                                    <span>Ngày gửi: <strong>{workshopData.submittedDate}</strong></span>
                                </div>
                            </div>
                        </div>

                        {/* Workshop Details Grid */}
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            {/* Thông tin cơ bản */}
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Thông tin cơ bản</h2>

                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <Calendar className="w-5 h-5 text-blue-500" />
                                        <div>
                                            <span className="text-sm text-gray-500">Ngày tổ chức</span>
                                            <p className="font-medium">{workshopData.eventDate}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <Clock className="w-5 h-5 text-green-500" />
                                        <div>
                                            <span className="text-sm text-gray-500">Thời gian</span>
                                            <p className="font-medium">{workshopData.startTimeDetail} - {workshopData.endTimeDetail}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <Clock className="w-5 h-5 text-green-500" />
                                        <div>
                                            <span className="text-sm text-gray-500">Thời lượng</span>
                                            <p className="font-medium">{workshopData.durationMinutes} phút</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <MapPin className="w-5 h-5 text-red-500" />
                                        <div>
                                            <span className="text-sm text-gray-500">Địa điểm</span>
                                            <p className="font-medium">{workshopData.location}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <Users className="w-5 h-5 text-purple-500" />
                                        <div>
                                            <span className="text-sm text-gray-500">Số lượng tối đa</span>
                                            <p className="font-medium">{workshopData.maxParticipants}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <Users className="w-5 h-5 text-purple-500" />
                                        <div>
                                            <span className="text-sm text-gray-500">Danh mục</span>
                                            <p className="font-medium">{categoryName}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Thông tin vé */}
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Loại vé & Giá</h2>

                                <div className="space-y-4">
                                    {workshopData.ticketTypes.map((ticket, index) => (
                                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <DollarSign className="w-5 h-5 text-yellow-500" />
                                                <div>
                                                    <p className="font-medium">{ticket.name}</p>
                                                    <span className="text-sm text-gray-500">Loại vé</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-lg text-blue-600">
                                                    {parseInt(ticket.price).toLocaleString('vi-VN')} VND
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Video URL */}
                        {workshopData.introVideoUrl && (
                            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Video giới thiệu</h2>
                                <a
                                    href={workshopData.introVideoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    {workshopData.introVideoUrl}
                                </a>
                            </div>
                        )}

                        {/* Status and Actions */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Trạng thái Workshop</h2>
                                    <div className="flex items-center space-x-2">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${workshopData.status === 'Đã phê duyệt' ? 'bg-green-100 text-green-800' : workshopData.status === 'Bị từ chối' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {workshopData.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex space-x-3">
                                    {/* Nút Duyệt */}
                                    <button
                                        onClick={handleApprove}
                                        className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                                        disabled={isApproving || workshopData.status !== 'Đang chờ duyệt'}
                                    >
                                        <CheckCircle className="w-4 h-4" />
                                        <span>Duyệt</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Additional Info */}
                        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Mô tả chi tiết</h2>
                            <div className="prose max-w-none">
                                <p className="text-gray-600 leading-relaxed">
                                    {workshopData.description}
                                </p>
                            </div>
                        </div>

                        {/* Organizer Information */}
                        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Thông tin người tổ chức</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <span className="text-sm text-gray-500">Tên tổ chức</span>
                                    <p className="font-medium">{organizerName}</p>
                                </div>
                                <div>
                                    <span className="text-sm text-gray-500">Email liên hệ</span>
                                    <p className="font-medium">{organizerEmail}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RequestDetail;