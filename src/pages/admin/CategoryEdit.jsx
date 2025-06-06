import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ApiService from '../../service/ApiService';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';

const CategoryEdit = () => {
    const { id } = useParams(); // Get categoryId from URL
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const [formData, setFormData] = useState({
        categoryId: '',
        name: '',
        description: ''
    });
    const [initialFormData, setInitialFormData] = useState({
        categoryId: '',
        name: '',
        description: ''
    });

    useEffect(() => {
        const fetchCategoryDataById = async () => {
            try {
                const response = await ApiService.getCategoryById(id);
                if (response.status === 200) {
                    const categoryData = response.data.data;
                    const newFormData = {
                        categoryId: categoryData.categoryId,
                        name: categoryData.name,
                        description: categoryData.description
                    };
                    setFormData(newFormData);
                    setInitialFormData(newFormData);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Lỗi',
                        text: response.message || 'Không thể tải thông tin danh mục.',
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Đã xảy ra lỗi khi tải thông tin danh mục.',
                });
            }
        };
        fetchCategoryDataById();
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

        const categoryData = {
            categoryId: formData.categoryId,
            name: formData.name,
            description: formData.description
        };

        try {
            const response = await ApiService.updateCategory(formData.categoryId, categoryData);
            if (response.status === 200) {
                setIsEditing(false);
                setHasChanges(false);
                setInitialFormData({ ...formData });
                Swal.fire({
                    icon: 'success',
                    title: 'Thành công',
                    text: 'Danh mục đã được cập nhật thành công!',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: response.message || 'Không thể cập nhật danh mục.',
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Đã xảy ra lỗi khi cập nhật danh mục.',
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
            text: 'Bạn có chắc chắn muốn chỉnh sửa danh mục này không?',
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

    return (
        <div className="flex h-screen">
            <AdminSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

            <div className="flex flex-col flex-1 overflow-hidden">
                <AdminHeader />
                
                {/* Category Detail/Edit Form */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-[#091238] rounded-lg shadow-lg p-6">
                            <h2 className="text-white text-xl font-semibold mb-6">
                                {isEditing ? 'Chỉnh sửa danh mục' : 'Chi tiết danh mục'}
                            </h2>
                            
                            <form onSubmit={handleSubmit}>
                                {/* Row for Category Name and Description */}
                                <div className="flex items-start space-x-6 mb-6">
                                    {/* Category Name */}
                                    <div className="flex-1">
                                        <h3 className="text-white text-sm font-medium mb-2">Tên danh mục</h3>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                placeholder="Nhập tên danh mục"
                                                required
                                                className="w-full px-4 py-3 rounded-lg bg-gray-200 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                                            />
                                        ) : (
                                            <p className="text-white text-lg font-medium">{formData.name}</p>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <div className="flex-1">
                                        <h3 className="text-white text-sm font-medium mb-2">Mô tả</h3>
                                        {isEditing ? (
                                            <textarea
                                                name="description"
                                                value={formData.description}
                                                onChange={handleInputChange}
                                                placeholder="Nhập mô tả chi tiết của danh mục"
                                                required
                                                rows="3"
                                                className="w-full px-4 py-3 rounded-lg bg-gray-200 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 resize-none"
                                            />
                                        ) : (
                                            <p className="text-white">{formData.description}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-between pt-6">
                                    {isEditing ? (
                                        <>
                                            <button
                                                type="submit"
                                                disabled={!hasChanges}
                                                className={`px-6 py-3 rounded-lg text-white transition-colors ${hasChanges ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-400 cursor-not-allowed'}`}
                                            >
                                                Cập nhật Danh Mục
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleReset}
                                                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                            >
                                                Đặt lại
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={toggleEditMode}
                                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            Chỉnh sửa Danh Mục
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryEdit;