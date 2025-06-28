import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined, EyeOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import ApiService from '../../service/ApiService';

const BlogList = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
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
        setBlogs(response.data.data.items || []);
        setTotalItems(response.data.totalItems || 0);
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
            fetchBlogs();
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

  const showDetails = (blogId) => {
    navigate(`/blogedit/${blogId}`);
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (text) => <span style={{ fontWeight: 500 }}>{text}</span>,
    },
    {
      title: 'Nội dung',
      dataIndex: 'content',
      key: 'content',
      render: (text) => <span>{text.substring(0, 100) + '...'}</span>,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => new Date(text).toLocaleDateString('vi-VN'),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${status === 'published' ? 'bg-green-100 text-green-800' : status === 'draft' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
          {status === 'published' ? 'Đã xuất bản' : status === 'draft' ? 'Bản nháp' : 'Đã lưu trữ'}
        </span>
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="default"
            icon={<EyeOutlined />}
            size="small"
            onClick={() => showDetails(record.blogPostId)}
          >
            Xem chi tiết
          </Button>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            size="small"
            onClick={() => handleDeleteBlog(record.blogPostId, record.title)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="flex h-screen">
      <AdminSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader />

        <div className="flex-1 overflow-auto p-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Quản lý Blog</h2>
                <p className="text-gray-600">Quản lý và theo dõi các bài viết blog</p>
              </div>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => navigate('/blogcreate')}
                style={{ backgroundColor: '#091238', borderColor: '#091238' }}
              >
                Tạo Blog Mới
              </Button>
            </div>

            <div className="mb-4">
              <Input
                placeholder="Tìm kiếm theo tiêu đề hoặc nội dung..."
                prefix={<SearchOutlined />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: 300 }}
                allowClear
              />
            </div>

            <Table
              columns={columns}
              dataSource={filteredBlogs}
              rowKey="blogPostId"
              pagination={{
                total: totalItems,
                pageSize: itemsPerPage,
                current: currentPage,
                onChange: setCurrentPage,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} bài viết`,
                pageSizeOptions: ['6', '12', '24', '50'],
              }}
              scroll={{ x: 800 }}
              size="middle"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogList;