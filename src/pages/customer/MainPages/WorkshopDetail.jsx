import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, Eye, Star } from 'lucide-react';
import CustomerHeader from '../../../components/customer/CustomerHeader';
import CustomeFooter from '../../../components/customer/CustomeFooter';
import ApiService from '../../../service/ApiService';
import { message } from 'antd';

const WorkshopDetail = () => {
    const { workshopId } = useParams();
    const navigate = useNavigate();
    const [workshop, setWorkshop] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [similarWorkshops, setSimilarWorkshops] = useState([]);
    const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
    const [userCanReview, setUserCanReview] = useState(false);
    const userId = localStorage.getItem('userId');

    const mapStatusToDisplay = (status) => {
        switch (status) {
            case 0: return 'OFFLINE';
            case 1: return 'ONLINE';
            default: return 'UNKNOWN';
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await ApiService.getWorkshopById(workshopId);
                const workshopData = res?.data?.data;

                if (!res || res.status !== 200 || !workshopData) {
                    message.error('Không thể tải chi tiết workshop.');
                    setLoading(false);
                    return;
                }

                const mappedWorkshop = {
                    ...workshopData,
                    status: mapStatusToDisplay(workshopData.status),
                    organizer: `${workshopData.userInfo?.firstName || ''} ${workshopData.userInfo?.lastName || ''}` || 'Unknown Organizer'
                };
                setWorkshop(mappedWorkshop);

                const ticketsResponse = await ApiService.getWorkshopTickets();
                if (ticketsResponse.status === 200 && ticketsResponse.data) {
                    const userTickets = ticketsResponse.data.data.items.filter(
                        ticket => ticket.userId === userId && ticket.workshopId === workshopId && ticket.paymentStatus === 'Completed'
                    );
                    setUserCanReview(userTickets.length > 0);
                }

                const reviewsResponse = await ApiService.getAllReviews({ workshopId });
                if (reviewsResponse.status === 200 && reviewsResponse.data) {
                    setReviews(reviewsResponse.data.data.items || []);
                }

                const workshopsResponse = await ApiService.getAllWorkshops();
                if (workshopsResponse.status === 200 && workshopsResponse.data) {
                    const filteredWorkshops = workshopsResponse.data.data.items.filter(w => w.workshopId !== workshopId);
                    setSimilarWorkshops(filteredWorkshops.slice(0, 3));
                }
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
    }, [workshopId, userId]);

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('vi-VN');
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!userCanReview) {
            message.error('Bạn cần hoàn thành đặt vé và thanh toán để để lại đánh giá.');
            return;
        }

        const reviewData = {
            userId: userId,
            workshopId: workshopId,
            rating: newReview.rating,
            comment: newReview.comment,
        };

        try {
            const response = await ApiService.createReview(reviewData);
            if (response.status === 200) {
                message.success('Đánh giá đã được gửi thành công.');
                setNewReview({ rating: 0, comment: '' });
                const reviewsResponse = await ApiService.getAllReviews({ workshopId });
                if (reviewsResponse.status === 200 && reviewsResponse.data) {
                    setReviews(reviewsResponse.data.data.items || []);
                }
            } else {
                message.error(response.message || 'Không thể gửi đánh giá.');
            }
        } catch (error) {
            message.error('Đã xảy ra lỗi khi gửi đánh giá.');
            console.error(error);
        }
    };

    const handleRatingChange = (rating) => {
        setNewReview({ ...newReview, rating });
    };

    const handleBookNow = () => {
        if (workshop && userId) {
            const workshopData = {
                workshopId: workshop.workshopId,
                title: workshop.title,
                instructor: workshop.organizer,
                date: workshop.startTime ? formatDate(workshop.startTime) : 'N/A',
                time: workshop.startTime ? `${new Date(workshop.startTime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })} - ${new Date(workshop.endTime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}` : 'N/A',
                location: workshop.location,
                originalPrice: workshop.price,
                image: workshop.image || 'https://thienanagency.com/photos/all/khac/workshop-painting.jpg'
            };
            localStorage.setItem('selectedWorkshop', JSON.stringify(workshopData));
            navigate('/checkout');
        } else {
            message.error('Vui lòng đăng nhập để đặt vé.');
        }
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
                    <div className="lg:col-span-2">
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

                        <div className="mb-6">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{workshop.title}</h1>
                            <p className="text-gray-600 text-lg">{workshop.description}</p>
                        </div>

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
                                <div className="flex items-start">
                                    <Clock size={20} className="text-gray-400 mr-3 mt-1" />
                                    <div>
                                        <p className="font-medium text-gray-900">Thời lượng</p>
                                        <p className="text-gray-600">{workshop.durationMinutes} phút</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <Users size={20} className="text-gray-400 mr-3 mt-1" />
                                    <div>
                                        <p className="font-medium text-gray-900">Người tổ chức</p>
                                        <p className="text-gray-600">{workshop.organizer}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {workshop.introVideoUrl && (
                            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">VIDEO GIỚI THIỆU</h2>
                                <div className="relative" style={{ paddingBottom: '56.25%' }}>
                                    <video
                                        className="absolute top-0 left-0 w-full h-full rounded-lg"
                                        controls
                                        src={workshop.introVideoUrl}
                                    >
                                        Trình duyệt của bạn không hỗ trợ video.
                                    </video>
                                </div>
                            </div>
                        )}

                        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">MÔ TẢ</h2>
                            <div className="text-gray-600 whitespace-pre-line">
                                {workshop.description}
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">LỊCH CHI TIẾT</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="text-center">
                                    <div className="bg-[#091238] text-white rounded-lg p-4">
                                        <div className="text-sm opacity-80 mb-1">{new Date(workshop.startTime).toLocaleDateString('vi-VN', { weekday: 'long' })}</div>
                                        <div className="text-xs opacity-60 mb-2">{new Date(workshop.startTime).toLocaleDateString('vi-VN', { month: 'long' })}</div>
                                        <div className="text-2xl font-bold mb-2">
                                            {new Date(workshop.startTime).getDate()}
                                        </div>
                                        <div className="text-xs opacity-80">{new Date(workshop.startTime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })} - {new Date(workshop.endTime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                ĐÁNH GIÁ
                                <span className="text-sm text-gray-500 ml-2">Đánh giá gần đây</span>
                            </h2>
                            <div className="space-y-4 mb-6">
                                {reviews.map((review) => (
                                    <div key={review.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                                        <img
                                            src={review.avatar || 'https://images.unsplash.com/photo-1494790108755-2616b612b789?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'}
                                            alt={review.name}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="font-medium text-gray-900">{review.name || 'Anonymous'}</h4>
                                                <div className="flex items-center">
                                                    <Star size={16} className="text-yellow-500 fill-current mr-1" />
                                                    <span className="text-sm font-medium text-gray-900">{review.rating || 0}</span>
                                                </div>
                                            </div>
                                            <p className="text-gray-600 text-sm">{review.comment || 'No comment'}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {ApiService.isAuthenticated() && (
                                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Để lại đánh giá của bạn</h3>
                                    <form onSubmit={handleReviewSubmit}>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 font-medium mb-2">Đánh giá của bạn</label>
                                            <div className="flex space-x-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star
                                                        key={star}
                                                        size={24}
                                                        className={`cursor-pointer ${newReview.rating >= star ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                                                        onClick={() => handleRatingChange(star)}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 font-medium mb-2">Bình luận</label>
                                            <textarea
                                                value={newReview.comment}
                                                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                rows="4"
                                                placeholder="Viết nhận xét của bạn..."
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full bg-[#091238] text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors"
                                            disabled={!userCanReview || !newReview.rating}
                                        >
                                            Gửi đánh giá
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-[#091238] text-white rounded-lg p-6 sticky top-4">
                            <h3 className="text-lg font-semibold mb-4">Thông tin vé</h3>
                            <div className="mb-4">
                                <h4 className="text-xl font-bold mb-2">{workshop.title}</h4>
                                <div className="flex items-center text-sm opacity-80 mb-2">
                                    <MapPin size={14} className="mr-1" />
                                    <span>{workshop.location}</span>
                                </div>
                            </div>
                            <div className="mb-6">
                                <div className="text-2xl font-bold mb-2">Giá từ: {workshop.price.toLocaleString('vi-VN')} VNĐ</div>
                                <button
                                    onClick={handleBookNow}
                                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                                >
                                    ĐẶT VÉ NGAY
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">WORKSHOP BẠN CÓ THỂ THÍCH</h2>
                    <p className="text-gray-600 mb-6">Dựa trên thể loại workshop bạn đang xem</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {similarWorkshops.map((workshop) => (
                            <div key={workshop.workshopId} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                                <div className="relative">
                                    <img
                                        src={workshop.image || 'https://thienanagency.com/photos/all/khac/workshop-painting.jpg'}
                                        alt={workshop.name}
                                        className="w-full h-48 object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        {workshop.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4">
                                        {workshop.description}
                                    </p>
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <Calendar size={16} className="mr-2 text-gray-700" />
                                            <span>{new Date(workshop.createdAt).toLocaleDateString('vi-VN')}</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <MapPin size={16} className="mr-2 text-gray-700" />
                                            <span className="line-clamp-1">{workshop.location}</span>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-lg font-bold text-[#091238]">{workshop.price.toLocaleString('vi-VN')} VNĐ</span>
                                            {workshop.originalPrice && (
                                                <span className="text-sm text-gray-500 line-through">{workshop.originalPrice}</span>
                                            )}
                                        </div>
                                    </div>
                                    <Link
                                        to={`/workshopdetail/${workshop.workshopId}`}
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