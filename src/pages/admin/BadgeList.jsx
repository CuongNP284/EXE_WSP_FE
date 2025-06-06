import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Input } from 'antd';
import { SearchOutlined, EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import ApiService from '../../service/ApiService';
import Swal from 'sweetalert2';

const BadgeList = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [badges, setBadges] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Fetch badges on component mount
  useEffect(() => {
    fetchBadges();
  }, []);

  const fetchBadges = async () => {
    try {
      const response = await ApiService.getAllBadges();
      if (response.status === 200) {
        setBadges(response.data.data.items || []);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Không thể tải danh hiệu!',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Đã xảy ra lỗi khi tải danh hiệu!',
      });
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleDelete = async (badgeId, badgeName) => {
    const result = await Swal.fire({
      title: 'Xóa danh hiệu',
      text: `Bạn có chắc chắn muốn xóa danh hiệu "${badgeName}" không?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
    });

    if (result.isConfirmed) {
      try {
        const response = await ApiService.deleteBadge(badgeId);
        if (response.status === 200) {
          setBadges(badges.filter(badge => badge.badgeId !== badgeId));
          Swal.fire({
            icon: 'success',
            title: 'Thành công',
            text: `Đã xóa danh hiệu "${badgeName}" thành công!`,
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: 'Không thể xóa danh hiệu!',
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Đã xảy ra lỗi khi xóa danh hiệu!',
        });
      }
    }
  };

  const handleCreateOrUpdate = (badge = null) => {
    if (badge) {
      navigate(`/badgeedit/${badge.badgeId}`);
    } else {
      navigate('/badgecreate');
    }
  };

  const showDetails = async (badge) => {
    const result = await Swal.fire({
      title: 'Chi tiết danh hiệu',
      html: `
        <div style="text-align: left;">
          <p><strong>Tên danh hiệu:</strong> ${badge.name}</p>
          <p style="margin-top: 10px;"><strong>Mô tả:</strong> ${badge.description}</p>
          <p style="margin-top: 10px;"><strong>Khu vực:</strong> ${badge.area}</p>
          <p style="margin-top: 10px;"><strong>Hình ảnh:</strong></p>
          <img src="${badge.imageUrl}" alt="${badge.name}" style="max-width: 200px; max-height: 200px; margin-top: 10px;" />
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
      navigate(`/badgeedit/${badge.badgeId}`);
    }
  };

  // Filter badges based on search term
  const filteredBadges = badges.filter(badge =>
    badge.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    badge.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    badge.area.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Table columns configuration
  const columns = [
    {
      title: 'Tên danh hiệu',
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
      title: 'Khu vực',
      dataIndex: 'area',
      key: 'area',
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (text) => (
        <img
          src={text}
          alt="Badge"
          style={{ maxWidth: '50px', maxHeight: '50px', objectFit: 'contain' }}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/50?text=Error';
          }}
        />
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
            onClick={() => handleDelete(record.badgeId, record.name)}
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
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Quản lý danh hiệu</h2>
                <p className="text-gray-600">Danh sách tất cả danh hiệu trong hệ thống</p>
              </div>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => handleCreateOrUpdate()}
                style={{backgroundColor: '#091238', borderColor: '#091238'}}
              >
                Tạo danh hiệu mới
              </Button>
            </div>

            {/* Search */}
            <div className="mb-4">
              <Input
                placeholder="Tìm kiếm theo tên, mô tả hoặc khu vực..."
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
              dataSource={filteredBadges}
              rowKey="badgeId"
              pagination={{
                total: filteredBadges.length,
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} của ${total} danh hiệu`,
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

export default BadgeList;