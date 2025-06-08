import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import CustomerHeader from '../../../components/customer/CustomerHeader';
import CustomeFooter from '../../../components/customer/CustomeFooter';
import ApiService from '../../../service/ApiService';

const BlogDetailUser = () => {
  const { id } = useParams(); // Get blogPostId from URL
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) {
        setError('Invalid blog ID');
        return;
      }

      try {
        const response = await ApiService.getBlogPostById(id);
        if (response.status === 200) {
          // Map API data to include additional fields based on the schema
          const blog = {
            ...response.data.data, // Access the 'data' object within the response
            readTime: `${Math.floor(Math.random() * 12) + 4} PHÚT ĐỌC`, // Placeholder
            date: new Date(response.data.data.createdAt).toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' }),
            image: "https://vioagency.vn/wp-content/uploads/2022/05/digital-marketing-la-gi-5.jpg", // Placeholder
          };
          setSelectedBlog(blog);

          // Fetch related blogs
          const allBlogsResponse = await ApiService.getAllBlogPosts({ pageSize: 15, page: 1 });
          if (allBlogsResponse.status === 200 && allBlogsResponse.data.items) {
            const mappedRelated = allBlogsResponse.data.items.map(b => ({
              ...b,
              readTime: `${Math.floor(Math.random() * 12) + 4} PHÚT ĐỌC`,
              date: new Date(b.createdAt).toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' }),
              image: "https://vioagency.vn/wp-content/uploads/2022/05/digital-marketing-la-gi-5.jpg",
            })).filter(b => b.blogPostId !== id).slice(0, 3);
            setRelatedBlogs(mappedRelated);
          }
        } else {
          setError('Failed to fetch blog details');
        }
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError('Network error or server unavailable');
      }
    };
    fetchBlog();
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

  if (error) {
    return (
      <div className="min-h-screen bg-[#FFF8ED] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
          <Link to="/bloguser">
            <button className="mt-4 px-4 py-2 bg-[#091238] text-white rounded-lg hover:bg-[#0a1a4a] transition-colors duration-300">
              Quay lại danh sách tin tức
            </button>
          </Link>
        </div>
      </div>
    );
  }

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
                    <div>
                      <p className="text-sm text-gray-500">Ngày đăng bài: {selectedBlog.date}</p>
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
            </div>
          </article>

          {/* Related Articles */}
          {relatedBlogs.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Bài viết liên quan</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedBlogs.map((blog) => (
                  <div
                    key={blog.blogPostId}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <Link to={`/blog/${blog.blogPostId}`}>
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                    <div className="p-4">
                      <Link to={`/blog/${blog.blogPostId}`}>
                        <h3 className="text-lg font-semibold mt-2 hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                          {blog.title}
                        </h3>
                      </Link>
                      <div className="flex justify-between items-center mt-3">
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