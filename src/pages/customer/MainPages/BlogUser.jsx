import React, { useState, useMemo } from 'react';
import CustomerHeader from '../../../components/customer/CustomerHeader';
import CustomeFooter from '../../../components/customer/CustomeFooter';

const BlogUser = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopics, setSelectedTopics] = useState([]);
  const blogsPerPage = 9;

  const blogData = [
  {
    id: 1,
    title: "13 ý tưởng cuộc thi và tặng quà trên mạng xã hội dành cho chuyên gia tổ chức sự kiện",
    readTime: "8 PHÚT ĐỌC",
    author: "Laura Bennett",
    date: "10 Tháng 7, 2024",
    image: "https://vioagency.vn/wp-content/uploads/2022/05/digital-marketing-la-gi-5.jpg",
    topics: ["Mạng xã hội", "Marketing"],
    slug: "social-media-contest-ideas-giveaways"
  },
  {
    id: 2,
    title: "50+ hashtag sự kiện nên dùng trên TikTok và Instagram",
    readTime: "10 PHÚT ĐỌC",
    author: "Laura Bennett",
    date: "10 Tháng 7, 2024",
    image: "https://vioagency.vn/wp-content/uploads/2022/05/digital-marketing-la-gi-5.jpg",
    topics: ["Mạng xã hội"],
    slug: "event-hashtags-tiktok-instagram"
  },
  {
    id: 3,
    title: "Cách tạo bộ lọc Snapchat cho sự kiện: Hướng dẫn từng bước",
    readTime: "4 PHÚT ĐỌC",
    author: "Rachel Grate",
    date: "10 Tháng 7, 2024",
    image: "https://vioagency.vn/wp-content/uploads/2022/05/digital-marketing-la-gi-5.jpg",
    topics: ["Mạng xã hội"],
    slug: "create-snapchat-filter-event"
  },
  {
    id: 4,
    title: "Mẹo lập kế hoạch sự kiện cho người mới bắt đầu",
    readTime: "6 PHÚT ĐỌC",
    author: "John Doe",
    date: "15 Tháng 6, 2024",
    image: "https://vioagency.vn/wp-content/uploads/2022/05/digital-marketing-la-gi-5.jpg",
    topics: ["Lập kế hoạch sự kiện"],
    slug: "event-planning-tips-beginners"
  },
  {
    id: 5,
    title: "Top 10 xu hướng sự kiện năm 2024",
    readTime: "7 PHÚT ĐỌC",
    author: "Jane Smith",
    date: "20 Tháng 5, 2024",
    image: "https://vioagency.vn/wp-content/uploads/2022/05/digital-marketing-la-gi-5.jpg",
    topics: ["Lập kế hoạch sự kiện"],
    slug: "top-event-trends-2024"
  },
  {
    id: 6,
    title: "Chiến lược tổ chức sự kiện trực tuyến thành công",
    readTime: "5 PHÚT ĐỌC",
    author: "Alice Johnson",
    date: "10 Tháng 4, 2024",
    image: "https://vioagency.vn/wp-content/uploads/2022/05/digital-marketing-la-gi-5.jpg",
    topics: ["Sự kiện trực tuyến"],
    slug: "virtual-event-success-strategies"
  },
  {
    id: 7,
    title: "Thực hành tốt nhất trong quản lý sự kiện doanh nghiệp",
    readTime: "9 PHÚT ĐỌC",
    author: "Mike Wilson",
    date: "25 Tháng 3, 2024",
    image: "https://vioagency.vn/wp-content/uploads/2022/05/digital-marketing-la-gi-5.jpg",
    topics: ["Sự kiện doanh nghiệp"],
    slug: "corporate-event-management-practices"
  },
  {
    id: 8,
    title: "Lịch trình lập kế hoạch đám cưới: Hướng dẫn đầy đủ",
    readTime: "12 PHÚT ĐỌC",
    author: "Sarah Davis",
    date: "15 Tháng 3, 2024",
    image: "https://vioagency.vn/wp-content/uploads/2022/05/digital-marketing-la-gi-5.jpg",
    topics: ["Đám cưới"],
    slug: "wedding-planning-timeline-guide"
  },
  {
    id: 9,
    title: "Mẹo và thủ thuật chụp ảnh sự kiện",
    readTime: "6 PHÚT ĐỌC",
    author: "Tom Brown",
    date: "28 Tháng 2, 2024",
    image: "https://vioagency.vn/wp-content/uploads/2022/05/digital-marketing-la-gi-5.jpg",
    topics: ["Nhiếp ảnh"],
    slug: "event-photography-tips-tricks"
  },
  {
    id: 10,
    title: "Ý tưởng trang trí sự kiện tiết kiệm chi phí",
    readTime: "8 PHÚT ĐỌC",
    author: "Lisa Green",
    date: "20 Tháng 2, 2024",
    image: "https://vioagency.vn/wp-content/uploads/2022/05/digital-marketing-la-gi-5.jpg",
    topics: ["Lập kế hoạch sự kiện"],
    slug: "budget-friendly-event-decoration"
  },
  {
    id: 11,
    title: "Lập kế hoạch thực đơn phục vụ tiệc cho sự kiện lớn",
    readTime: "10 PHÚT ĐỌC",
    author: "Chef Martinez",
    date: "10 Tháng 2, 2024",
    image: "https://vioagency.vn/wp-content/uploads/2022/05/digital-marketing-la-gi-5.jpg",
    topics: ["Lập kế hoạch sự kiện"],
    slug: "catering-menu-planning-large-events"
  },
  {
    id: 12,
    title: "Âm nhạc và giải trí cho sự kiện doanh nghiệp",
    readTime: "7 PHÚT ĐỌC",
    author: "DJ Roberts",
    date: "30 Tháng 1, 2024",
    image: "https://vioagency.vn/wp-content/uploads/2022/05/digital-marketing-la-gi-5.jpg",
    topics: ["Sự kiện doanh nghiệp"],
    slug: "music-entertainment-corporate-events"
  },
  {
    id: 13,
    title: "An ninh sự kiện: Các biện pháp an toàn cần thiết",
    readTime: "11 PHÚT ĐỌC",
    author: "Security Expert",
    date: "25 Tháng 1, 2024",
    image: "https://vioagency.vn/wp-content/uploads/2022/05/digital-marketing-la-gi-5.jpg",
    topics: ["Lập kế hoạch sự kiện"],
    slug: "event-security-safety-measures"
  },
  {
    id: 14,
    title: "Lập kế hoạch sự kiện bền vững: Hướng đến xanh hóa",
    readTime: "9 PHÚT ĐỌC",
    author: "Eco Evans",
    date: "15 Tháng 1, 2024",
    image: "https://vioagency.vn/wp-content/uploads/2022/05/digital-marketing-la-gi-5.jpg",
    topics: ["Lập kế hoạch sự kiện"],
    slug: "sustainable-event-planning-go-green"
  },
  {
    id: 15,
    title: "Xu hướng công nghệ sự kiện năm 2024",
    readTime: "8 PHÚT ĐỌC",
    author: "Tech Taylor",
    date: "10 Tháng 1, 2024",
    image: "https://vioagency.vn/wp-content/uploads/2022/05/digital-marketing-la-gi-5.jpg",
    topics: ["Lập kế hoạch sự kiện"],
    slug: "event-technology-trends-2024"
  }
];


  const allTopics = useMemo(() => [
    "Social Media",
    "Event Planning",
    "Virtual Events",
    "Corporate Events",
    "Wedding",
    "Photography"
  ], []);

  const filteredBlogs = useMemo(() => {
    return blogData.filter(blog => {
      const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTopics = selectedTopics.length === 0 ||
        selectedTopics.some(topic => blog.topics.includes(topic));
      return matchesSearch && matchesTopics;
    });
  }, [searchTerm, selectedTopics]);

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

  const handleBlogClick = (slug) => {
    console.log(`Navigate to: /blog/${slug}`);
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
                  <div key={blog.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div
                      className="cursor-pointer"
                      onClick={() => handleBlogClick(blog.slug)}
                    >
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <div className="mb-2">
                        {blog.topics.slice(0, 2).map((topic) => (
                          <span
                            key={topic}
                            className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-1 mb-1"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                      <h2
                        className="text-xl font-semibold mt-2 cursor-pointer hover:text-blue-600 transition-colors duration-300"
                        onClick={() => handleBlogClick(blog.slug)}
                      >
                        {blog.title}
                      </h2>
                      <div className="flex justify-between items-center mt-3">
                        <p className="text-sm text-gray-600">Tác giả: {blog.author}</p>
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

          <div className="lg:w-80">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Lọc theo chủ đề</h3>
              <div className="space-y-2">
                {allTopics.map((topic) => (
                  <div
                    key={topic}
                    className={`px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedTopics.includes(topic)
                        ? 'bg-blue-100 text-blue-800 border border-blue-300'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => handleTopicClick(topic)}
                  >
                    <span className="font-medium">{topic}</span>
                    <span className="text-sm ml-2">
                      ({blogData.filter(blog => blog.topics.includes(topic)).length})
                    </span>
                  </div>
                ))}
              </div>

              {selectedTopics.length > 0 && (
                <button
                  onClick={() => setSelectedTopics([])}
                  className="w-full mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                >
                  Xóa bộ lọc chủ đề
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <CustomeFooter />
    </div>
  );
};

export default BlogUser;
