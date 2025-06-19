import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import OrganizerSidebar from '../../components/organizer/OrganizerSidebar';
import OrganizerHeader from '../../components/organizer/OrganizerHeader';
import { Calendar, Clock, MapPin, Users, DollarSign } from 'lucide-react';
import Swal from 'sweetalert2';
import ApiService from '../../service/ApiService';

const ViewWsDetail = () => {
    const { workshopId } = useParams();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [workshopData, setWorkshopData] = useState(null);

    useEffect(() => {
        const fetchWorkshopDetails = async () => {
            try {
                const response = await ApiService.getWorkshopById(workshopId);
                if (response.status === 200 && response.data?.data) {
                    const workshop = response.data.data;
                    setWorkshopData({
                        workshopId: workshop.workshopId,
                        title: workshop.title,
                        description: workshop.description,
                        eventDate: workshop.startDate ? new Date(workshop.startDate).toLocaleDateString('vi-VN') : 'N/A',
                        startTimeDetail: workshop.startTime ? new Date(workshop.startTime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) : 'N/A',
                        endTimeDetail: workshop.endTime ? new Date(workshop.endTime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) : 'N/A',
                        location: workshop.location,
                        maxParticipants: workshop.maxParticipants || 'N/A',
                        price: `${workshop.price.toLocaleString('vi-VN')} VND`,
                        image: workshop.image || "https://images.stockcake.com/public/5/4/1/5417e74f-10cd-4be6-b128-85492eb59acc_large/creative-team-meeting-stockcake.jpg",
                        ticketTypes: workshop.ticketTypes || [
                            { name: "Vé Standard", price: workshop.price.toString() }
                        ],
                        durationMinutes: workshop.durationMinutes || 'N/A'
                    });
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
        fetchWorkshopDetails();
    }, [workshopId]);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    if (!workshopData) {
        return <div className="flex justify-center items-center h-screen">Đang tải...</div>;
    }

    return (
        <div className="flex h-screen">
            <OrganizerSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="flex flex-col flex-1 overflow-hidden">
                <OrganizerHeader />

                <div className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                            <div className="relative h-64 md:h-80">
                                <img
                                    src={workshopData.image}
                                    alt={workshopData.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="p-6">
                                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                                    {workshopData.title}
                                </h1>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    {workshopData.description}
                                </p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mb-6">
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
                                            <p className="font-medium">{workshopData.maxParticipants} người</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

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

                        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Mô tả chi tiết</h2>
                            <div className="prose max-w-none">
                                <p className="text-gray-600 leading-relaxed">
                                    {workshopData.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewWsDetail;