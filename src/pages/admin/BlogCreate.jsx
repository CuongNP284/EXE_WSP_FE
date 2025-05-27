import React, { useState } from 'react'
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';

const BlogCreate = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        content: '',
        status: 'draft',
        tags: '',
        author: '',
        description: '',
        featuredImage: null,
        additionalImages: []
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

    const handleFileUpload = (type) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.multiple = type === 'additional';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const files = Array.from(e.target.files);
            if (type === 'featured') {
                setFormData(prev => ({
                    ...prev,
                    featuredImage: files[0]
                }));
            } else {
                setFormData(prev => ({
                    ...prev,
                    additionalImages: [...prev.additionalImages, ...files]
                }));
            }
        };
        input.click();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Blog created:', formData);
    };

    const handleReset = () => {
        setFormData({
            title: '',
            category: '',
            content: '',
            status: 'draft',
            tags: '',
            author: '',
            description: '',
            featuredImage: null,
            additionalImages: []
        });
    };

    return (
        <div className="flex h-screen">
            <AdminSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

            <div className="flex flex-col flex-1 overflow-hidden">
                <AdminHeader />
                
                {/* Blog Create Form */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-[#091238] rounded-lg shadow-lg p-6">
                            <h2 className="text-white text-xl font-semibold mb-6">Tạo Blog Mới</h2>
                            
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Blog Title */}
                                <div>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        placeholder="Nhập tiêu đề blog"
                                        required
                                        className="w-full px-4 py-3 rounded-lg bg-gray-200 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                                    />
                                </div>

                                {/* Blog Status */}
                                <div>
                                    <h3 className="text-white text-sm font-medium mb-3">Trạng thái bài viết</h3>
                                    <div className="flex space-x-6">
                                        <label className="flex items-center text-white cursor-pointer">
                                            <input
                                                type="radio"
                                                name="status"
                                                value="draft"
                                                checked={formData.status === 'draft'}
                                                onChange={handleInputChange}
                                                className="mr-2 w-4 h-4 text-blue-600"
                                            />
                                            Bản nháp
                                        </label>
                                        <label className="flex items-center text-white cursor-pointer">
                                            <input
                                                type="radio"
                                                name="status"
                                                value="published"
                                                checked={formData.status === 'published'}
                                                onChange={handleInputChange}
                                                className="mr-2 w-4 h-4 text-blue-600"
                                            />
                                            Xuất bản
                                        </label>
                                    </div>
                                </div>

                                {/* Category and Author */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h3 className="text-white text-sm font-medium mb-2">Danh mục</h3>
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg bg-gray-200 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                                        >
                                            <option value="">Chọn danh mục</option>
                                            <option value="technology">Công nghệ</option>
                                            <option value="lifestyle">Phong cách sống</option>
                                            <option value="business">Kinh doanh</option>
                                            <option value="education">Giáo dục</option>
                                            <option value="health">Sức khỏe</option>
                                        </select>
                                    </div>
                                    <div>
                                        <h3 className="text-white text-sm font-medium mb-2">Tác giả</h3>
                                        <input
                                            type="text"
                                            name="author"
                                            value={formData.author}
                                            onChange={handleInputChange}
                                            placeholder="Nhập tên tác giả"
                                            required
                                            className="w-full px-4 py-3 rounded-lg bg-gray-200 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                                        />
                                    </div>
                                </div>

                                {/* Tags */}
                                <div>
                                    <h3 className="text-white text-sm font-medium mb-2">Tags</h3>
                                    <input
                                        type="text"
                                        name="tags"
                                        value={formData.tags}
                                        onChange={handleInputChange}
                                        placeholder="Nhập tags (phân cách bằng dấu phẩy)"
                                        className="w-full px-4 py-3 rounded-lg bg-gray-200 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <h3 className="text-white text-sm font-medium mb-2">Mô tả ngắn</h3>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        placeholder="Nhập mô tả ngắn cho blog"
                                        required
                                        rows="3"
                                        className="w-full px-4 py-3 rounded-lg bg-gray-200 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 resize-none"
                                    />
                                </div>

                                {/* Content */}
                                <div>
                                    <h3 className="text-white text-sm font-medium mb-2">Nội dung bài viết</h3>
                                    <textarea
                                        name="content"
                                        value={formData.content}
                                        onChange={handleInputChange}
                                        placeholder="Nhập nội dung chi tiết của blog"
                                        required
                                        rows="8"
                                        className="w-full px-4 py-3 rounded-lg bg-gray-200 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 resize-none"
                                    />
                                </div>

                                {/* Image Upload Section */}
                                <div>
                                    <h3 className="text-white text-sm font-medium mb-4">Hình ảnh cho blog</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Featured Image Upload */}
                                        <div
                                            onClick={() => handleFileUpload('featured')}
                                            className="bg-gray-200 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors min-h-[150px]"
                                        >
                                            <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center mb-4">
                                                <span className="text-2xl text-white">+</span>
                                            </div>
                                            <p className="text-gray-600 text-center">
                                                Thêm ảnh đại diện<br />cho Blog
                                            </p>
                                            {formData.featuredImage && (
                                                <p className="text-sm text-blue-600 mt-2">
                                                    Đã chọn: {formData.featuredImage.name}
                                                </p>
                                            )}
                                        </div>

                                        {/* Additional Images Upload */}
                                        <div
                                            onClick={() => handleFileUpload('additional')}
                                            className="bg-gray-200 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors min-h-[150px]"
                                        >
                                            <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center mb-4">
                                                <span className="text-2xl text-white">+</span>
                                            </div>
                                            <p className="text-gray-600 text-center">
                                                Thêm ảnh bổ sung<br />cho Blog
                                            </p>
                                            {formData.additionalImages.length > 0 && (
                                                <p className="text-sm text-blue-600 mt-2">
                                                    {formData.additionalImages.length} ảnh đã chọn
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-between pt-6">
                                    <button
                                        type="submit"
                                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Tạo Blog
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogCreate