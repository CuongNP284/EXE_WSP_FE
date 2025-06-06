import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ApiService from '../../service/ApiService';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';

const BlogEdit = () => {
    const { id } = useParams(); // Get blogPostId from URL
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const [formData, setFormData] = useState({
        blogPostId: '',
        title: '',
        content: ''
    });
    const [initialFormData, setInitialFormData] = useState({
        blogPostId: '',
        title: '',
        content: ''
    });

    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                const response = await ApiService.getBlogPostById(id);
                if (response.status === 200) {
                    const blogData = response.data.data;
                    const newFormData = {
                        blogPostId: blogData.blogPostId,
                        title: blogData.title,
                        content: blogData.content
                    };
                    setFormData(newFormData);
                    setInitialFormData(newFormData);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Lỗi',
                        text: response.message || 'Không thể tải thông tin blog.',
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Đã xảy ra lỗi khi tải thông tin blog.',
                });
            }
        };
        fetchBlogData();
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

        const userId = localStorage.getItem('userId');
        if (!userId) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.',
            });
            return;
        }

        const blogData = {
            blogPostId: formData.blogPostId,
            title: formData.title,
            content: formData.content,
            userId: userId
        };

        try {
            const response = await ApiService.updateBlogPost(formData.blogPostId, blogData);
            if (response.status === 200) {
                setIsEditing(false);
                setHasChanges(false);
                setInitialFormData({ ...formData });
                Swal.fire({
                    icon: 'success',
                    title: 'Thành công',
                    text: 'Blog đã được cập nhật thành công!',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: response.message || 'Không thể cập nhật blog.',
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Đã xảy ra lỗi khi cập nhật blog.',
            });
        }
    };

    const handleReset = () => {
        setFormData(initialFormData);
        setHasChanges(false);
    };

    const toggleEditMode = () => {
        setIsEditing(true);
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
                                        {isEditing ? 'Chỉnh sửa Blog' : 'Chi tiết Blog'}
                                    </h1>
                                    <p className="text-gray-600">
                                        {isEditing ? 'Cập nhật thông tin bài viết blog' : 'Xem chi tiết thông tin bài viết'}
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
                                        Chỉnh sửa Blog
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Blog Form/Display */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <form onSubmit={handleSubmit}>
                                {/* Title Section */}
                                <div className="p-6 border-b border-gray-200">
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Tiêu đề bài viết
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            placeholder="Nhập tiêu đề blog"
                                            required
                                            className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-400"
                                        />
                                    ) : (
                                        <h2 className="text-xl font-semibold text-gray-900 leading-relaxed">
                                            {formData.title || 'Chưa có tiêu đề'}
                                        </h2>
                                    )}
                                </div>

                                {/* Content Section */}
                                <div className="p-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Nội dung bài viết
                                    </label>
                                    {isEditing ? (
                                        <div className="relative">
                                            <textarea
                                                name="content"
                                                value={formData.content}
                                                onChange={handleInputChange}
                                                placeholder="Nhập nội dung chi tiết của blog..."
                                                required
                                                rows="12"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-400 resize-none"
                                            />
                                            <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                                                {formData.content.length} ký tự
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="bg-gray-50 rounded-lg p-4 min-h-[200px]">
                                            <div className="prose max-w-none">
                                                {formData.content ? (
                                                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                                        {formData.content}
                                                    </p>
                                                ) : (
                                                    <p className="text-gray-500 italic">Chưa có nội dung</p>
                                                )}
                                            </div>
                                        </div>
                                    )}
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
                                                    Cập nhật Blog
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

                        {/* Blog Info Card (when not editing) */}
                        {!isEditing && (
                            <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin bài viết</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-500">ID Bài viết</p>
                                            <p className="text-sm text-gray-900">{formData.blogPostId || 'N/A'}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                        <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-500">Độ dài nội dung</p>
                                            <p className="text-sm text-gray-900">{formData.content.length} ký tự</p>
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

export default BlogEdit;