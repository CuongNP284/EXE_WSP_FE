import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import CustomerHeader from '../../../components/customer/CustomerHeader';
import CustomeFooter from '../../../components/customer/CustomeFooter';

// Sample blog data (should match BlogUser, without slug)
const blogData = [
  {
    id: 1,
    title: "13 ý tưởng cuộc thi và tặng quà trên mạng xã hội dành cho chuyên gia tổ chức sự kiện",
    readTime: "8 PHÚT ĐỌC",
    author: "Laura Bennett",
    date: "10 Tháng 7, 2024",
    image: "https://vioagency.vn/wp-content/uploads/2022/05/digital-marketing-la-gi-5.jpg",
    topics: ["Mạng xã hội", "Marketing"],
    description: "Khám phá những ý tưởng sáng tạo và hiệu quả để tổ chức các cuộc thi và chương trình tặng quà trên mạng xã hội, giúp tăng cường sự tương tác và mở rộng phạm vi tiếp cận của sự kiện.",
    content: `
      <h2>Tại sao các cuộc thi trên mạng xã hội lại quan trọng?</h2>
      <p>Các cuộc thi và chương trình tặng quà trên mạng xã hội đã trở thành một phần không thể thiếu trong chiến lược marketing hiện đại.</p>
      <!-- Add full content here -->
    `,
  },
  {
    id: 2,
    title: "50+ hashtag sự kiện nên dùng trên TikTok và Instagram",
    readTime: "10 PHÚT ĐỌC",
    author: "Laura Bennett",
    date: "10 Tháng 7, 2024",
    description: "Tìm hiểu danh sách hơn 50 hashtag hiệu quả để sử dụng trên TikTok và Instagram nhằm tăng cường sự hiện diện của sự kiện trên mạng xã hội.",
    image: "https://vioagency.vn/wp-content/uploads/2022/05/digital-marketing-la-gi-5.jpg",
    topics: ["Mạng xã hội"],
    content: `
      <h2>Giới thiệu về hashtag sự kiện</h2>
      <p>Hashtag là công cụ mạnh mẽ để tăng khả năng tiếp cận và tương tác trên mạng xã hội.</p>
      <!-- Add full content -->
    `,
  },
  // Add all 15 blog entries with description and content
];

const BlogDetailUser = () => {
  const { id } = useParams(); // Get id from URL
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    // Find the blog with the matching id
    const blog = blogData.find(blog => blog.id === parseInt(id));

    if (blog.id) {
      setSelectedBlog(blog);

      // Find related blogs (blogs with at least one matching topic, excluding the current blog)
      const related = blogData
        .filter(blog => 
          blog.id !== parseInt(id) && 
          blog.topics.some(topic => selectedBlog.topics.includes(topic)))
        .slice(0, 3); // Limit to 3 related blogs
      setRelatedBlogs(related);
    } else {
      setSelectedBlog(null); // Handle case where blog is not found
    }
  }, [id]);

  const handleShareClick = (platform) => {
    const url = window.location.href;
    const title = selectedBlog?.title || '';
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
        break;
      default:
        break;
    }
  };

  if (!selectedBlog) {
    return (
      <div className="min-h-screen bg-[#FFF8ED] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#091238] mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải bài viết...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8ED]">
      <CustomerHeader />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="text-sm">
            <span className="text-gray-500">Trang chủ</span>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-500">Tin tức</span>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-[#091238] font-medium">Chi tiết bài viết</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <article className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Featured Image */}
            <div className="relative h-64 md:h-96">
              <img
                src={selectedBlog.image}
                alt={selectedBlog.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-[#091238] text-white px-3 py-1 rounded-full text-sm font-medium">
                  {selectedBlog.readTime}
                </span>
              </div>
            </div>

            {/* Article Content */}
            <div className="p-6 md:p-8">
              {/* Topics */}
              <div className="mb-4">
                {selectedBlog.topics.map((topic) => (
                  <span
                    key={topic}
                    className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mr-2 mb-2"
                  >
                    {topic}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {selectedBlog.title}
              </h1>

              {/* Description */}
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {selectedBlog.description}
              </p>

              {/* Meta Info */}
              <div className="flex items-center justify-between border-b border-gray-200 pb-6 mb-8">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-[#091238] rounded-full flex items-center justify-center text-white font-semibold">
                      {selectedBlog.author.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{selectedBlog.author}</p>
                      <p className="text-sm text-gray-500">{selectedBlog.date}</p>
                    </div>
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 mr-2">Chia sẻ:</span>
                  <button
                    onClick={() => handleShareClick('facebook')}
                    className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007-1.792-4.669-4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => handleShareClick('twitter')}
                    className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => handleShareClick('linkedin')}
                    className="p-2 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Article Content */}
              <div 
                className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
                style={{
                  lineHeight: '1.8'
                }}
              />

              {/* Tags */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center flex-wrap">
                  <span className="text-sm font-medium text-gray-600 mr-3">Tags:</span>
                  {selectedBlog.topics.map((topic) => (
                    <span
                      key={topic}
                      className="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full mr-2 mb-2 hover:bg-gray-200 cursor-pointer transition-colors"
                    >
                      #{topic.replace(' ', '').toLowerCase()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>

          {/* Related Articles */}
          {relatedBlogs.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Bài viết liên quan</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedBlogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <Link to={`/blog/${blog.id}`}>
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
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
                      <Link to={`/blog/${blog.id}`}>
                        <h3 className="text-lg font-semibold mt-2 hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                          {blog.title}
                        </h3>
                      </Link>
                      <div className="flex justify-between items-center mt-3">
                        <p className="text-sm text-gray-600">Tác giả: {blog.author}</p>
                        <p className="text-sm text-gray-500">{blog.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Back to Blog List */}
          <div className="mt-8 text-center">
            <Link to="/blog">
              <button
                className="inline-flex items-center px-6 py-3 bg-[#091238] text-white rounded-lg hover:bg-[#0a1a4a] transition-colors duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Quay lại danh sách tin tức
              </button>
            </Link>
          </div>
        </div>
      </div>

      <CustomeFooter />
    </div>
  );
};

export default BlogDetailUser;