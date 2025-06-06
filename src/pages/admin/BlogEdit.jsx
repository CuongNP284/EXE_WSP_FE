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
                    const blogData = response.data;
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

    return (
        <div className="flex h-screen">
            <AdminSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

            <div className="flex flex-col flex-1 overflow-hidden">
                <AdminHeader />
                
                {/* Blog Detail/Edit Form */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-[#091238] rounded-lg shadow-lg p-6">
                            <h2 className="text-white text-xl font-semibold mb-6">
                                {isEditing ? 'Chỉnh sửa Blog' : 'Chi tiết Blog'}
                            </h2>
                            
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Blog Title */}
                                <div>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            placeholder="Nhập tiêu đề blog"
                                            required
                                            className="w-full px-4 py-3 rounded-lg bg-gray-200 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                                        />
                                    ) : (
                                        <h3 className="text-white text-lg">{formData.title}</h3>
                                    )}
                                </div>

                                {/* Content */}
                                <div>
                                    <h3 className="text-white text-sm font-medium mb-2">Nội dung bài viết</h3>
                                    {isEditing ? (
                                        <textarea
                                            name="content"
                                            value={formData.content}
                                            onChange={handleInputChange}
                                            placeholder="Nhập nội dung chi tiết của blog"
                                            required
                                            rows="8"
                                            className="w-full px-4 py-3 rounded-lg bg-gray-200 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 resize-none"
                                        />
                                    ) : (
                                        <p className="text-white">{formData.content}</p>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-end pt-6">
                                    {isEditing ? (
                                        <>
                                            <button
                                                type="submit"
                                                disabled={!hasChanges}
                                                className={`px-6 py-3 rounded-lg text-white transition-colors ${hasChanges ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-400 cursor-not-allowed'}`}
                                            >
                                                Cập nhật Blog
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleReset}
                                                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors ml-4"
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
                                            Chỉnh sửa Blog
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

export default BlogEdit;