import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ApiService from '../../service/ApiService';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';

const CategoryCreate = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const categoryData = {
            name: formData.name,
            description: formData.description
        };

        try {
            const response = await ApiService.createCategory(categoryData);
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Thành công',
                    text: 'Danh mục đã được tạo thành công!',
                }).then(() => {
                    navigate('/categorylist');
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: response.message || 'Không thể tạo danh mục. Vui lòng thử lại.',
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Đã xảy ra lỗi khi tạo danh mục. Vui lòng thử lại.',
            });
        }
    };

    const handleReset = () => {
        setFormData({
            name: '',
            description: ''
        });
    };

    return (
        <div className="flex h-screen">
            <AdminSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

            <div className="flex flex-col flex-1 overflow-hidden">
                <AdminHeader />
                
                {/* Category Create Form */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-[#091238] rounded-lg shadow-lg p-6">
                            <h2 className="text-white text-xl font-semibold mb-6">Tạo Danh Mục Mới</h2>
                            
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Category Name */}
                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Nhập tên danh mục"
                                        required
                                        className="w-full px-4 py-3 rounded-lg bg-gray-200 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <h3 className="text-white text-sm font-medium mb-2">Mô tả</h3>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        placeholder="Nhập mô tả chi tiết của danh mục"
                                        required
                                        rows="8"
                                        className="w-full px-4 py-3 rounded-lg bg-gray-200 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 resize-none"
                                    />
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-between pt-6">
                                    <button
                                        type="submit"
                                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Tạo Danh Mục
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleReset}
                                        className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                    >
                                        Đặt lại
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryCreate;