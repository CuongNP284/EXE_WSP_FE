import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Pagination, Empty, Popconfirm, message } from 'antd'
import AdminSidebar from '../../components/admin/AdminSidebar'
import AdminHeader from '../../components/admin/AdminHeader'
import { Calendar, Clock, Eye, Edit, Trash2, Plus, User, Tag } from 'lucide-react'

const BlogList = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [blogs, setBlogs] = useState([
        {
            id: 1,
            title: "10 Mẹo Học Tiếng Anh Hiệu Quả Cho Người Mới Bắt Đầu",
            excerpt: "Khám phá những phương pháp học tiếng Anh thú vị và hiệu quả nhất dành cho người mới bắt đầu. Từ việc xây dựng nền tảng từ vựng đến luyện phát âm chuẩn.",
            image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            author: "Nguyễn Văn A",
            publishDate: "2024-05-20",
            status: "published",
            category: "Giáo dục",
            views: 1250,
            readTime: "5 phút đọc"
        },
        {
            id: 2,
            title: "Xu Hướng Công Nghệ 2024: AI và Machine Learning",
            excerpt: "Phân tích sâu về những xu hướng công nghệ mới nhất trong năm 2024. Trí tuệ nhân tạo và machine learning đang thay đổi cách chúng ta làm việc và sống.",
            image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            author: "Trần Thị B",
            publishDate: "2024-05-18",
            status: "published",
            category: "Công nghệ",
            views: 2100,
            readTime: "8 phút đọc"
        },
        {
            id: 3,
            title: "Hướng Dẫn Nấu Ăn Healthy Cho Người Bận Rộn",
            excerpt: "Bộ sưu tập công thức nấu ăn lành mạnh, nhanh gọn dành cho những người có lối sống bận rộn. Từ salad đến smoothie bowl dinh dưỡng.",
            image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            author: "Lê Văn C",
            publishDate: "2024-05-15",
            status: "draft",
            category: "Ẩm thực",
            views: 0,
            readTime: "6 phút đọc"
        },
        {
            id: 4,
            title: "Phong Cách Sống Minimalism: Đơn Giản Hóa Cuộc Sống",
            excerpt: "Khám phá triết lý sống tối giản và cách áp dụng minimalism vào cuộc sống hàng ngày để tìm lại sự cân bằng và hạnh phúc thực sự.",
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            author: "Phạm Thị D",
            publishDate: "2024-05-12",
            status: "published",
            category: "Lifestyle",
            views: 890,
            readTime: "7 phút đọc"
        },
        {
            id: 5,
            title: "Kinh Nghiệm Du Lịch Bụi Đông Nam Á",
            excerpt: "Chia sẻ kinh nghiệm thực tế về du lịch bụi tại các nước Đông Nam Á. Từ lập kế hoạch chi tiết đến những mẹo tiết kiệm chi phí hiệu quả.",
            image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            author: "Hoàng Văn E",
            publishDate: "2024-05-10",
            status: "published",
            category: "Du lịch",
            views: 1680,
            readTime: "10 phút đọc"
        },
        {
            id: 6,
            title: "Đầu Tư Tài Chính Cá Nhân Cho Người Trẻ",
            excerpt: "Hướng dẫn cơ bản về đầu tư và quản lý tài chính cá nhân dành cho thế hệ Gen Z và Millennials. Bắt đầu xây dựng tài sản từ sớm.",
            image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            author: "Ngô Thị F",
            publishDate: "2024-05-08",
            status: "published",
            category: "Tài chính",
            views: 3200,
            readTime: "12 phút đọc"
        }
    ]);
    
    const itemsPerPage = 6;

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

    const handleDeleteBlog = (blogId, blogTitle) => {
        setBlogs(blogs.filter(blog => blog.id !== blogId));
        message.success(`Đã xóa bài viết "${blogTitle}" thành công!`);
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

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstItem, indexOfLastItem);

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
                                    <Link to="/admin/blog/create" className="text-[#091238] hover:underline">
                                        Tạo bài viết đầu tiên của bạn
                                    </Link>
                                </span>
                            }
                            className="py-12"
                        />
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {currentBlogs.map((blog) => (
                                    <div key={blog.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                                        {/* Blog Image */}
                                        <div className="relative">
                                            <img
                                                src={blog.image}
                                                alt={blog.title}
                                                className="w-full h-48 object-cover rounded-t-lg"
                                            />
                                            <div className="absolute top-3 right-3">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(blog.status)}`}>
                                                    {getStatusText(blog.status)}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Blog Content */}
                                        <div className="p-6">
                                            <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                                                {blog.title}
                                            </h3>
                                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                                {blog.excerpt}
                                            </p>

                                            {/* Blog Details */}
                                            <div className="space-y-2 mb-4">
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <User size={16} className="mr-2 text-gray-400" />
                                                    <span>{blog.author}</span>
                                                </div>
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <Calendar size={16} className="mr-2 text-gray-400" />
                                                    <span>{formatDate(blog.publishDate)}</span>
                                                </div>
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <Tag size={16} className="mr-2 text-gray-400" />
                                                    <span>{blog.category}</span>
                                                </div>
                                                <div className="flex items-center justify-between text-sm text-gray-600">
                                                    <div className="flex items-center">
                                                        <Eye size={16} className="mr-2 text-gray-400" />
                                                        <span>{formatViews(blog.views)} lượt xem</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Clock size={16} className="mr-2 text-gray-400" />
                                                        <span>{blog.readTime}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex space-x-2">
                                                <Link 
                                                    to={`/blogedit/${blog.id}`} 
                                                    className="flex-1 bg-[#091238] hover:bg-gray-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 no-underline"
                                                >
                                                    <Eye size={16} />
                                                    Xem chi tiết
                                                </Link>                                  
                                                <Popconfirm
                                                    title="Xóa bài viết"
                                                    description={`Bạn có chắc chắn muốn xóa bài viết "${blog.title}" không?`}
                                                    onConfirm={() => handleDeleteBlog(blog.id, blog.title)}
                                                    okText="Xác nhận"
                                                    cancelText="Hủy"
                                                    okType="danger"
                                                >
                                                    <button className="bg-red-100 hover:bg-red-200 text-red-600 py-2 px-3 rounded-lg transition-colors">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </Popconfirm>
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
                                    total={blogs.length}
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
    )
}

export default BlogList