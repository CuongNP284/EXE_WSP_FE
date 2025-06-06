import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Input } from 'antd';
import { SearchOutlined, EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import ApiService from '../../service/ApiService';
import Swal from 'sweetalert2';

const CategoryList = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await ApiService.getAllCategories();
      if (response.status === 200) {
        setCategories(response.data.data.items|| []);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Không thể tải danh mục!',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Đã xảy ra lỗi khi tải danh mục!',
      });
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleDelete = async (categoryId, categoryName) => {
    const result = await Swal.fire({
      title: 'Xóa danh mục',
      text: `Bạn có chắc chắn muốn xóa danh mục "${categoryName}" không?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
    });

    if (result.isConfirmed) {
      try {
        const response = await ApiService.deleteCategory(categoryId);
        if (response.status === 200) {
          setCategories(categories.filter(category => category.categoryId !== categoryId));
          Swal.fire({
            icon: 'success',
            title: 'Thành công',
            text: `Đã xóa danh mục "${categoryName}" thành công!`,
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: 'Không thể xóa danh mục!',
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Đã xảy ra lỗi khi xóa danh mục!',
        });
      }
    }
  };

  const handleCreateOrUpdate = (category = null) => {
    if (category) {
      navigate(`/categoryedit/${category.categoryId}`);
    } else {
      navigate('/categorycreate');
    }
  };

  const showDetails = async (category) => {
    const result = await Swal.fire({
      title: 'Chi tiết danh mục',
      html: `
        <div style="text-align: left;">
          <p><strong>Tên danh mục:</strong> ${category.name}</p>
          <p style="margin-top: 10px;"><strong>Mô tả:</strong> ${category.description}</p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Sửa',
      cancelButtonText: 'Đóng',
      customClass: {
        popup: 'view-mode',
      },
    });

    if (result.isConfirmed) {
      navigate(`/categoryedit/${category.categoryId}`);
    }
  };

  // Filter categories based on search term
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Table columns configuration
  const columns = [
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text) => <span style={{ fontWeight: 500 }}>{text}</span>,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
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
            onClick={() => showDetails(record)}
          >
            Chi tiết
          </Button>
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleCreateOrUpdate(record)}
          >
            Sửa
          </Button>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            size="small"
            onClick={() => handleDelete(record.categoryId, record.name)}
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
            {/* Header */}
            <div className="mb-6 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Quản lý danh mục</h2>
                <p className="text-gray-600">Danh sách tất cả danh mục workshop trong hệ thống</p>
              </div>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => handleCreateOrUpdate()}
                style={{backgroundColor: '#091238', borderColor: '#091238'}}
              >
                Tạo danh mục mới
              </Button>
            </div>

            {/* Search */}
            <div className="mb-4">
              <Input
                placeholder="Tìm kiếm theo tên hoặc mô tả..."
                prefix={<SearchOutlined />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: 300 }}
                allowClear
              />
            </div>

            {/* Table */}
            <Table
              columns={columns}
              dataSource={filteredCategories}
              rowKey="categoryId"
              pagination={{
                total: filteredCategories.length,
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} của ${total} danh mục`,
                pageSizeOptions: ['5', '10', '20', '50'],
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

export default CategoryList;