import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Pagination, Empty } from 'antd';
import ApiService from '../../service/ApiService';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import { Calendar, Clock, Eye, Trash2, Plus, User, Tag } from 'lucide-react';

const BlogList = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [blogs, setBlogs] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 6;

    useEffect(() => {
        fetchBlogs();
    }, [currentPage]);

    const fetchBlogs = async () => {
        try {
            const params = {
                pageSize: itemsPerPage,
                page: currentPage,
                includeDeleted: false
            };
            const response = await ApiService.getAllBlogPosts(params);
            if (response.status === 200) {
                setBlogs(response.data.data.items || []); // Assuming the API returns an "items" array
                setTotalItems(response.data.totalItems || 0); // Assuming the API returns "totalItems"
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: response.message || 'Không thể tải danh sách blog.',
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Đã xảy ra lỗi khi tải danh sách blog.',
            });
        }
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'published':
                return 'bg-green-100 text-green-800';
            case 'draft':
                return 'bg-yellow-100 text-yellow-800';
            case 'archived':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'published':
                return 'Đã xuất bản';
            case 'draft':
                return 'Bản nháp';
            case 'archived':
                return 'Đã lưu trữ';
            default:
                return 'Không xác định';
        }
    };

    const handleDeleteBlog = async (blogId, blogTitle) => {
        Swal.fire({
            title: 'Xóa bài viết',
            text: `Bạn có chắc chắn muốn xóa bài viết "${blogTitle}" không?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Hủy'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await ApiService.deleteBlogPost(blogId);
                    if (response.status === 200) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Thành công',
                            text: `Đã xóa bài viết "${blogTitle}" thành công!`,
                        });
                        fetchBlogs(); // Refresh the list after deletion
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Lỗi',
                            text: response.message || 'Không thể xóa bài viết.',
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Lỗi',
                        text: 'Đã xảy ra lỗi khi xóa bài viết.',
                    });
                }
            }
        });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    };

    const formatViews = (views) => {
        if (views >= 1000) {
            return (views / 1000).toFixed(1) + 'K';
        }
        return views.toString();
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="flex h-screen">
            <AdminSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

            <div className="flex flex-col flex-1 overflow-hidden">
                <AdminHeader />
                <main className="flex-1 overflow-y-auto p-6">
                    {/* Header with Add Button */}
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Quản lý Blog</h2>
                            <p className="text-gray-600 mt-1">Quản lý và theo dõi các bài viết blog</p>
                        </div>
                        <Link to="/blogcreate" className="bg-[#091238] hover:bg-gray-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors no-underline">
                            <Plus size={20} />
                            Tạo Blog Mới
                        </Link>
                    </div>

                    {/* Blog Cards Grid or Empty State */}
                    {blogs.length === 0 ? (
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description={
                                <span>
                                    Chưa có bài viết nào.{' '}
                                    <Link to="/blogcreate" className="text-[#091238] hover:underline">
                                        Tạo bài viết đầu tiên của bạn
                                    </Link>
                                </span>
                            }
                            className="py-12"
                        />
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {blogs.map((blog) => (
                                    <div key={blog.blogPostId} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                                        {/* Blog Image - Placeholder since schema doesn't include image */}
                                        <div className="relative">
                                            <img
                                                src="https://images.stockcake.com/public/5/4/1/5417e74f-10cd-4be6-b128-85492eb59acc_large/creative-team-meeting-stockcake.jpg" // Placeholder image since schema doesn't have image
                                                alt={blog.title}
                                                className="w-full h-48 object-cover rounded-t-lg"
                                            />
                                            <div className="absolute top-3 right-3">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor('published')}`}>
                                                    {getStatusText('published')} {/* Status not in schema, default to "published" */}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Blog Content */}
                                        <div className="p-6">
                                            <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                                                {blog.title}
                                            </h3>
                                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                                {blog.content.substring(0, 100) + '...'} {/* Excerpt from content since schema doesn't have excerpt */}
                                            </p>

                                            {/* Action Buttons */}
                                            <div className="flex space-x-2">
                                                <Link 
                                                    to={`/blogedit/${blog.blogPostId}`} 
                                                    className="flex-1 bg-[#091238] hover:bg-gray-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 no-underline"
                                                >
                                                    <Eye size={16} />
                                                    Xem chi tiết
                                                </Link>                                  
                                                <button 
                                                    onClick={() => handleDeleteBlog(blog.blogPostId, blog.title)}
                                                    className="bg-red-100 hover:bg-red-200 text-red-600 py-2 px-3 rounded-lg transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            <div className="mt-8 flex justify-center">
                                <Pagination
                                    current={currentPage}
                                    pageSize={itemsPerPage}
                                    total={totalItems}
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

export default BlogList;