import React, { useState } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import { Popconfirm, message } from 'antd';

const BlogEdit = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);

    // Mock initial blog data
    const initialBlogData = {
        title: 'Khám phá Công nghệ AI trong năm 2025',
        category: 'technology',
        content: 'Nội dung chi tiết về các xu hướng AI mới nhất trong năm 2025...',
        status: 'draft',
        tags: 'AI, công nghệ, tương lai',
        author: 'Nguyễn Văn A',
        description: 'Bài viết khám phá các xu hướng công nghệ AI nổi bật trong năm 2025.',
        featuredImage: null,
        additionalImages: []
    };
    const [formData, setFormData] = useState(initialBlogData);
    const [initialFormData] = useState(initialBlogData);

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
            setHasChanges(true);
        };
        input.click();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsEditing(false);
        setHasChanges(false);
        console.log('Blog updated:', formData);
        message.success('Blog đã được cập nhật thành công!');
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

                                {/* Blog Status */}
                                <div>
                                    <h3 className="text-white text-sm font-medium mb-3">Trạng thái bài viết</h3>
                                    {isEditing ? (
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
                                    ) : (
                                        <p className="text-white">{formData.status === 'draft' ? 'Bản nháp' : 'Xuất bản'}</p>
                                    )}
                                </div>

                                {/* Category and Author */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h3 className="text-white text-sm font-medium mb-2">Danh mục</h3>
                                        {isEditing ? (
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
                                        ) : (
                                            <p className="text-white">{formData.category}</p>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="text-white text-sm font-medium mb-2">Tác giả</h3>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="author"
                                                value={formData.author}
                                                onChange={handleInputChange}
                                                placeholder="Nhập tên tác giả"
                                                required
                                                className="w-full px-4 py-3 rounded-lg bg-gray-200 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                                            />
                                        ) : (
                                            <p className="text-white">{formData.author}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Tags */}
                                <div>
                                    <h3 className="text-white text-sm font-medium mb-2">Tags</h3>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="tags"
                                            value={formData.tags}
                                            onChange={handleInputChange}
                                            placeholder="Nhập tags (phân cách bằng dấu phẩy)"
                                            className="w-full px-4 py-3 rounded-lg bg-gray-200 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                                        />
                                    ) : (
                                        <p className="text-white">{formData.tags}</p>
                                    )}
                                </div>

                                {/* Description */}
                                <div>
                                    <h3 className="text-white text-sm font-medium mb-2">Mô tả ngắn</h3>
                                    {isEditing ? (
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            placeholder="Nhập mô tả ngắn cho blog"
                                            required
                                            rows="3"
                                            className="w-full px-4 py-3 rounded-lg bg-gray-200 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 resize-none"
                                        />
                                    ) : (
                                        <p className="text-white">{formData.description}</p>
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

                                {/* Image Display/Upload Section */}
                                <div>
                                    <h3 className="text-white text-sm font-medium mb-4">Hình ảnh cho blog</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Featured Image */}
                                        <div
                                            onClick={isEditing ? () => handleFileUpload('featured') : null}
                                            className={`rounded-lg p-8 flex flex-col items-center justify-center ${isEditing ? 'bg-gray-200 cursor-pointer hover:bg-gray-300 transition-colors' : 'bg-gray-300'} min-h-[150px]`}
                                        >
                                            <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center mb-4">
                                                <span className="text-2xl text-white">+</span>
                                            </div>
                                            <p className="text-gray-600 text-center">
                                                {isEditing ? 'Cập nhật ảnh đại diện cho Blog' : 'Ảnh đại diện'}
                                            </p>
                                            {formData.featuredImage && (
                                                <p className="text-sm text-blue-600 mt-2">
                                                    {formData.featuredImage.name || 'Ảnh hiện tại'}
                                                </p>
                                            )}
                                        </div>

                                        {/* Additional Images */}
                                        <div
                                            onClick={isEditing ? () => handleFileUpload('additional') : null}
                                            className={`rounded-lg p-8 flex flex-col items-center justify-center ${isEditing ? 'bg-gray-200 cursor-pointer hover:bg-gray-300 transition-colors' : 'bg-gray-300'} min-h-[150px]`}
                                        >
                                            <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center mb-4">
                                                <span className="text-2xl text-white">+</span>
                                            </div>
                                            <p className="text-gray-600 text-center">
                                                {isEditing ? 'Cập nhật ảnh bổ sung cho Blog' : 'Ảnh bổ sung'}
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
                                <div className="flex justify-end pt-6">
                                    {isEditing ? (
                                        <>
                                            <Popconfirm
                                                title="Xác nhận cập nhật"
                                                description="Bạn có chắc muốn lưu các thay đổi cho blog này?"
                                                onConfirm={handleSubmit}
                                                okText="Có"
                                                cancelText="Không"
                                                disabled={!hasChanges}
                                            >
                                                <button
                                                    type="button"
                                                    disabled={!hasChanges}
                                                    className={`px-6 py-3 rounded-lg text-white transition-colors ${hasChanges ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-400 cursor-not-allowed'}`}
                                                >
                                                    Cập nhật Blog
                                                </button>
                                            </Popconfirm>
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