import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ApiService from '../../service/ApiService';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';

const BadgeEdit = () => {
    const { id } = useParams(); // Get badgeId from URL
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const [formData, setFormData] = useState({
        badgeId: '',
        name: '',
        description: '',
        area: '',
        imageUrl: ''
    });
    const [initialFormData, setInitialFormData] = useState({
        badgeId: '',
        name: '',
        description: '',
        area: '',
        imageUrl: ''
    });

    useEffect(() => {
        const fetchBadgeDataById = async () => {
            try {
                const response = await ApiService.getBadgeById(id);
                if (response.status === 200) {
                    const badgeData = response.data.data;
                    const newFormData = {
                        badgeId: badgeData.badgeId,
                        name: badgeData.name,
                        description: badgeData.description,
                        area: badgeData.area,
                        imageUrl: badgeData.imageUrl
                    };
                    setFormData(newFormData);
                    setInitialFormData(newFormData);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Lỗi',
                        text: response.message || 'Không thể tải thông tin danh hiệu.',
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Đã xảy ra lỗi khi tải thông tin danh hiệu.',
                });
            }
        };
        fetchBadgeDataById();
    }, [id]);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setHasChanges(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const badgeData = {
            name: formData.name,
            description: formData.description,
            area: formData.area,
            imageUrl: formData.imageUrl
        };

        try {
            const response = await ApiService.updateBadge(formData.badgeId, badgeData);
            if (response.status === 200) {
                setIsEditing(false);
                setHasChanges(false);
                setInitialFormData({ ...formData });
                Swal.fire({
                    icon: 'success',
                    title: 'Thành công',
                    text: 'Danh hiệu đã được cập nhật thành công!',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: response.message || 'Không thể cập nhật danh hiệu.',
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Đã xảy ra lỗi khi cập nhật danh hiệu.',
            });
        }
    };

    const handleReset = () => {
        setFormData(initialFormData);
        setHasChanges(false);
    };

    const toggleEditMode = () => {
        Swal.fire({
            title: 'Xác nhận',
            text: 'Bạn có chắc chắn muốn chỉnh sửa danh hiệu này không?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Đồng ý',
            cancelButtonText: 'Hủy'
        }).then((result) => {
            if (result.isConfirmed) {
                setIsEditing(true);
            }
        });
    };

    const cancelEdit = () => {
        setIsEditing(false);
        setFormData(initialFormData);
        setHasChanges(false);
    };

    return (
        <div className="flex h-screen">
            <AdminSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

            <div className="flex flex-col flex-1 overflow-hidden">
                <AdminHeader />
                
                {/* Main Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-5xl mx-auto">
                        {/* Header Section */}
                        <div className="mb-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                        {isEditing ? 'Chỉnh sửa Danh hiệu' : 'Chi tiết Danh hiệu'}
                                    </h1>
                                    <p className="text-gray-600">
                                        {isEditing ? 'Cập nhật thông tin danh hiệu' : 'Xem chi tiết thông tin danh hiệu'}
                                    </p>
                                </div>
                                {!isEditing && (
                                    <button
                                        onClick={toggleEditMode}
                                        className="inline-flex items-center px-4 py-2 bg-[#091238] hover:bg-gray-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Chỉnh sửa Danh hiệu
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Badge Image Section - Centered and Prominent */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
                            <div className="text-center">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Hình ảnh Danh hiệu</h3>
                                <div className="flex justify-center mb-4">
                                    {formData.imageUrl ? (
                                        <div className="relative">
                                            <img 
                                                src={formData.imageUrl} 
                                                alt={formData.name || 'Badge'}
                                                className="w-32 h-32 object-cover rounded-full border-4 border-blue-100 shadow-lg"
                                                onError={(e) => {
                                                    e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></svg>';
                                                }}
                                            />                                           
                                        </div>
                                    ) : (
                                        <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center border-4 border-gray-200">
                                            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                {isEditing && (
                                    <div className="max-w-md mx-auto">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            URL Hình ảnh
                                        </label>
                                        <input
                                            type="url"
                                            name="imageUrl"
                                            value={formData.imageUrl}
                                            onChange={handleInputChange}
                                            placeholder="Nhập URL hình ảnh danh hiệu"
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-400"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Badge Information Form */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <form onSubmit={handleSubmit}>
                                {/* Badge Name */}
                                <div className="p-6 border-b border-gray-200">
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Tên danh hiệu
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="Nhập tên danh hiệu"
                                            required
                                            className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-400"
                                        />
                                    ) : (
                                        <h2 className="text-xl font-semibold text-gray-900 leading-relaxed">
                                            {formData.name || 'Chưa có tên danh hiệu'}
                                        </h2>
                                    )}
                                </div>

                                {/* Description and Area */}
                                <div className="p-6 border-b border-gray-200">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        {/* Description */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                                Mô tả
                                            </label>
                                            {isEditing ? (
                                                <textarea
                                                    name="description"
                                                    value={formData.description}
                                                    onChange={handleInputChange}
                                                    placeholder="Nhập mô tả chi tiết của danh hiệu"
                                                    required
                                                    rows="4"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-400 resize-none"
                                                />
                                            ) : (
                                                <div className="bg-gray-50 rounded-lg p-4 min-h-[100px]">
                                                    <p className="text-gray-700 leading-relaxed">
                                                        {formData.description || 'Chưa có mô tả'}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Area */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                                Khu vực
                                            </label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    name="area"
                                                    value={formData.area}
                                                    onChange={handleInputChange}
                                                    placeholder="Nhập khu vực (ví dụ: Giáo dục, Công nghệ...)"
                                                    required
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-400"
                                                />
                                            ) : (
                                                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                                                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-500">Khu vực</p>
                                                        <p className="text-gray-900">{formData.area || 'Chưa xác định'}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                {isEditing && (
                                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                                        <div className="flex items-center justify-between">
                                            <button
                                                type="button"
                                                onClick={cancelEdit}
                                                className="inline-flex items-center px-4 py-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors duration-200"
                                            >
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                                Hủy bỏ
                                            </button>
                                            
                                            <div className="flex space-x-3">
                                                <button
                                                    type="button"
                                                    onClick={handleReset}
                                                    className="inline-flex items-center px-4 py-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors duration-200"
                                                >
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                    </svg>
                                                    Đặt lại
                                                </button>
                                                
                                                <button
                                                    type="submit"
                                                    disabled={!hasChanges}
                                                    className={`inline-flex items-center px-6 py-2 font-medium rounded-lg transition-colors duration-200 ${
                                                        hasChanges 
                                                            ? 'bg-[#091238] hover:bg-gray-700 text-white shadow-sm' 
                                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                    }`}
                                                >
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    Cập nhật Danh Hiệu
                                                </button>
                                            </div>
                                        </div>
                                        
                                        {hasChanges && (
                                            <div className="mt-3 flex items-center text-sm text-amber-600">
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                                </svg>
                                                Bạn có thay đổi chưa được lưu
                                            </div>
                                        )}
                                    </div>
                                )}
                            </form>
                        </div>

                        {/* Badge Stats Card (when not editing) */}
                        {!isEditing && (
                            <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin danh hiệu</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-500">ID Danh hiệu</p>
                                            <p className="text-sm text-gray-900">{formData.badgeId || 'N/A'}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                        <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-500">Độ dài mô tả</p>
                                            <p className="text-sm text-gray-900">{formData.description.length} ký tự</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                        <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                            <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-500">Trạng thái hình ảnh</p>
                                            <p className="text-sm text-gray-900">{formData.imageUrl ? 'Có hình ảnh' : 'Chưa có hình ảnh'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BadgeEdit;