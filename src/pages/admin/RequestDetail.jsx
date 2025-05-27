import React, { useState } from 'react'
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import { Popconfirm, message } from 'antd';
import { Calendar, Clock, MapPin, Users, DollarSign, CheckCircle, XCircle } from 'lucide-react';

const RequestDetail = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isApproving, setIsApproving] = useState(false);
    const [isRejecting, setIsRejecting] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // Mock workshop data
    const workshopData = {
        title: "Luyện tập thân khỏe với Yoga",
        description: "Khóa học yoga cơ bản dành cho người mới bắt đầu, giúp bạn thư giãn và tăng cường sức khỏe.",
        date: "15/6/2024",
        startTime: "09:00",
        endTime: "11:00",
        location: "Phòng tập Yoga Center, Quận 1",
        participants: "25/30 người tham gia",
        price: "500,000 VND",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        eventDate: "06/01/2025",
        startTimeDetail: "09:00 AM",
        endTimeDetail: "12:00 PM",
        maxParticipants: 50,
        ticketTypes: [
            { name: "Standard Ticket", price: "100000" },
            { name: "VIP Ticket", price: "200000" }
        ],
        status: "Đang chờ duyệt",
        organizer: "Yoga Center Saigon",
        organizerEmail: "info@yogacenter.com",
        submittedDate: "20/12/2024"
    };

    const handleApprove = () => {
        setIsApproving(true);
        // Simulate API call
        setTimeout(() => {
            message.success('Workshop đã được duyệt thành công!');
            setIsApproving(false);
        }, 1500);
    };

    const handleReject = () => {
        setIsRejecting(true);
        // Simulate API call
        setTimeout(() => {
            message.success('Workshop đã bị từ chối!');
            setIsRejecting(false);
        }, 1500);
    };

    return (
        <div className="flex h-screen bg-gray-50">
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
                                    <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                        Chờ duyệt
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
                                    <span>Người tổ chức: <strong>{workshopData.organizer}</strong></span>
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
                                            <p className="font-medium">{workshopData.maxParticipants} người</p>
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

                        {/* Status and Actions */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Trạng thái Workshop</h2>
                                    <div className="flex items-center space-x-2">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                                            {workshopData.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex space-x-3">
                                    {/* Nút Duyệt */}
                                    <Popconfirm
                                        title="Duyệt workshop"
                                        description="Bạn có chắc chắn muốn duyệt workshop này không?"
                                        onConfirm={handleApprove}
                                        okText="Xác nhận"
                                        cancelText="Hủy"
                                        okButtonProps={{ loading: isApproving }}
                                    >
                                        <button
                                            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                                            disabled={isApproving || isRejecting}
                                        >
                                            <CheckCircle className="w-4 h-4" />
                                            <span>Duyệt</span>
                                        </button>
                                    </Popconfirm>

                                    {/* Nút Từ chối */}
                                    <Popconfirm
                                        title="Từ chối workshop"
                                        description="Bạn có chắc chắn muốn từ chối workshop này không?"
                                        onConfirm={handleReject}
                                        okText="Xác nhận"
                                        cancelText="Hủy"
                                        okButtonProps={{ loading: isRejecting }}
                                    >
                                        <button
                                            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                                            disabled={isApproving || isRejecting}
                                        >
                                            <XCircle className="w-4 h-4" />
                                            <span>Từ chối</span>
                                        </button>
                                    </Popconfirm>
                                </div>
                            </div>
                        </div>

                        {/* Additional Info */}
                        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Mô tả chi tiết</h2>
                            <div className="prose max-w-none">
                                <p className="text-gray-600 leading-relaxed">
                                    Khóa học yoga này được thiết kế đặc biệt dành cho những người mới bắt đầu muốn tìm hiểu và thực hành yoga.
                                    Trong suốt khóa học, bạn sẽ được hướng dẫn các tư thế cơ bản, kỹ thuật thở hấp và thiền định.
                                    Yoga không chỉ giúp cải thiện sức khỏe thể chất mà còn mang lại sự thư giãn tinh thần,
                                    giảm stress và tăng cường sự linh hoạt của cơ thể.
                                </p>
                                <p className="text-gray-600 leading-relaxed mt-4">
                                    Lớp học được tổ chức trong không gian thoáng mát, yên tĩnh với đầy đủ trang thiết bị hỗ trợ.
                                    Giảng viên có kinh nghiệm nhiều năm trong lĩnh vực yoga sẽ đồng hành cùng bạn trong suốt quá trình học.
                                </p>
                            </div>
                        </div>

                        {/* Organizer Information */}
                        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Thông tin người tổ chức</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <span className="text-sm text-gray-500">Tên tổ chức</span>
                                    <p className="font-medium">{workshopData.organizer}</p>
                                </div>
                                <div>
                                    <span className="text-sm text-gray-500">Email liên hệ</span>
                                    <p className="font-medium">{workshopData.organizerEmail}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RequestDetail