import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import CustomerHeader from '../../../components/customer/CustomerHeader';
import CustomeFooter from '../../../components/customer/CustomeFooter';
import ApiService from '../../../service/ApiService';

const BlogUser = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const blogsPerPage = 9;

  const allTopics = useMemo(() => [
    "Social Media",
    "Event Planning",
    "Virtual Events",
    "Corporate Events",
    "Wedding",
    "Photography"
  ], []);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await ApiService.getAllBlogPosts({ pageSize: 15, page: 1 });

      const items = response?.data?.data?.items;
      if (response.status === 200 && items) {
        const mappedBlogs = items.map(blog => ({
          ...blog,
          readTime: `${Math.floor(Math.random() * 12) + 4} PHÚT ĐỌC`,
          date: new Date(blog.createdAt).toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' }),
          image: "https://vioagency.vn/wp-content/uploads/2022/05/digital-marketing-la-gi-5.jpg",
        }));
        setBlogs(mappedBlogs);
      } else {
        console.error("Dữ liệu không hợp lệ:", response);
      }
    };
    fetchBlogs();
  }, [allTopics]);

  const filteredBlogs = useMemo(() => {
    return blogs.filter(blog => {
      return blog.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [searchTerm, blogs]);


  const totalBlogs = filteredBlogs.length;
  const totalPages = Math.ceil(totalBlogs / blogsPerPage);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleTopicClick = (topic) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter(t => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedTopics([]);
    setSearchTerm('');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#FFF8ED]">
      <CustomerHeader />
      <div className="bg-[#091238] py-15 text-white text-center">
        <h1 className="text-7xl font-bold">TIN TỨC</h1>
        <p className="text-2xl mt-4">Cập nhật những tin tức và chia sẻ mới nhất</p>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Thanh tìm kiếm */}
        <div className="mb-8 flex justify-center">
          <div className="flex items-center w-full max-w-md">
            <input
              type="text"
              placeholder="Tìm kiếm bài viết theo tiêu đề hoặc tác giả..."
              value={searchTerm}
              onChange={handleSearch}
              className="flex-1 p-2.5 rounded-l-lg border-2 border-[#091238] text-[#091238] placeholder-[#091238] focus:outline-none focus:ring-2 focus:ring-[#091238]"
            />
            <button className="p-3 rounded-r-lg bg-[#091238] text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">
                Hiển thị {currentBlogs.length} / {totalBlogs} kết quả
                {searchTerm && ` cho từ khóa "${searchTerm}"`}
                {selectedTopics.length > 0 && ` trong các chủ đề ${selectedTopics.join(', ')}`}
              </p>
              {(searchTerm || selectedTopics.length > 0) && (
                <button
                  onClick={clearFilters}
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Xóa tất cả bộ lọc
                </button>
              )}
            </div>

            {currentBlogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {currentBlogs.map((blog) => (
                  <div key={blog.blogPostId} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                    <Link to={`/blog/${blog.blogPostId}`}>
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                    <div className="p-4">

                      <Link to={`/blog/${blog.blogPostId}`}>
                        <h2
                          className="text-xl font-semibold mt-2 hover:text-blue-600 transition-colors duration-300"
                        >
                          {blog.title}
                        </h2>
                      </Link>
                      <div className="flex justify-between items-center mt-3">
                        <p className="text-sm text-gray-500">{blog.date}</p>
                        <p className="text-sm text-gray-500">{blog.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-600">
                  Không tìm thấy bài viết
                  {searchTerm && ` cho từ khóa "${searchTerm}"`}
                  {selectedTopics.length > 0 && ` trong các chủ đề đã chọn`}
                </p>
              </div>
            )}

            {/* Phân trang */}
            {totalBlogs > blogsPerPage && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 mx-1 border rounded-lg disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed hover:bg-[#091238] hover:text-white"
                >
                  Đầu
                </button>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 mx-1 border rounded-lg disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed hover:bg-[#091238] hover:text-white"
                >
                  Trước
                </button>
                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 mx-1 border rounded-lg ${currentPage === page ? 'bg-[#091238] text-white' : 'hover:bg-[#091238] hover:text-white'}`}
                      >
                        {page}
                      </button>
                    );
                  } else if (
                    (page === currentPage - 2 && currentPage > 3) ||
                    (page === currentPage + 2 && currentPage < totalPages - 2)
                  ) {
                    return <span key={page} className="px-4 py-2 mx-1">...</span>;
                  }
                  return null;
                })}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 mx-1 border rounded-lg disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed hover:bg-[#091238] hover:text-white"
                >
                  Sau
                </button>
                <button
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 mx-1 border rounded-lg disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed hover:bg-[#091238] hover:text-white"
                >
                  Cuối
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <CustomeFooter />
    </div>
  );
};

export default BlogUser;