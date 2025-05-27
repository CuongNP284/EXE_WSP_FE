import React, { useState } from 'react'
import { Table, Button, Tag, Avatar, Space, Input, Select, Popconfirm, message } from 'antd'
import { UserOutlined, SearchOutlined } from '@ant-design/icons'
import AdminSidebar from '../../components/admin/AdminSidebar'
import AdminHeader from '../../components/admin/AdminHeader'

const UserList = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [users, setUsers] = useState([
        {
            id: 1,
            name: 'Nguyễn Văn A',
            email: 'nguyenvana@email.com',
            joinDate: '2024-01-15',
            status: 'active',
            role: 'user'
        },
        {
            id: 2,
            name: 'Trần Thị B',
            email: 'tranthib@email.com',
            joinDate: '2024-02-20',
            status: 'banned',
            role: 'user'
        },
        {
            id: 3,
            name: 'Lê Văn C',
            email: 'levanc@email.com',
            joinDate: '2024-03-10',
            status: 'active',
            role: 'moderator'
        },
        {
            id: 4,
            name: 'Phạm Thị D',
            email: 'phamthid@email.com',
            joinDate: '2024-04-05',
            status: 'active',
            role: 'user'
        },
        {
            id: 5,
            name: 'Hoàng Văn E',
            email: 'hoangvane@email.com',
            joinDate: '2024-05-01',
            status: 'banned',
            role: 'user'
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleBanUnban = (userId, userName, currentStatus) => {
        const action = currentStatus === 'active' ? 'cấm' : 'bỏ cấm';
        setUsers(users.map(user => 
            user.id === userId 
                ? { ...user, status: user.status === 'active' ? 'banned' : 'active' }
                : user
        ));
        message.success(`Đã ${action} người dùng ${userName} thành công!`);
    };

    // Table columns configuration
    const columns = [
        {
            title: 'Người dùng',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <Space>
                    <Avatar size={40} icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }}>
                        {text.charAt(0)}
                    </Avatar>
                    <span style={{ fontWeight: 500 }}>{text}</span>
                </Space>
            ),
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: (a, b) => a.email.localeCompare(b.email),
        },
        {
            title: 'Ngày tham gia',
            dataIndex: 'joinDate',
            key: 'joinDate',
            render: (date) => formatDate(date),
            sorter: (a, b) => new Date(a.joinDate) - new Date(b.joinDate),
        },
        {
            title: 'Vai trò',
            dataIndex: 'role',
            key: 'role',
            render: (role) => {
                const roleConfig = {
                    admin: { color: 'purple', text: 'Quản trị viên' },
                    moderator: { color: 'blue', text: 'Điều hành viên' },
                    user: { color: 'default', text: 'Người dùng' }
                };
                const config = roleConfig[role] || roleConfig.user;
                return <Tag color={config.color}>{config.text}</Tag>;
            },
            filters: [
                { text: 'Quản trị viên', value: 'admin' },
                { text: 'Điều hành viên', value: 'moderator' },
                { text: 'Người dùng', value: 'user' },
            ],
            onFilter: (value, record) => record.role === value,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'active' ? 'success' : 'error'}>
                    {status === 'active' ? 'Hoạt động' : 'Bị cấm'}
                </Tag>
            ),
            filters: [
                { text: 'Hoạt động', value: 'active' },
                { text: 'Bị cấm', value: 'banned' },
            ],
            onFilter: (value, record) => record.status === value,
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Popconfirm
                    title={`${record.status === 'active' ? 'Cấm' : 'Bỏ cấm'} người dùng`}
                    description={`Bạn có chắc chắn muốn ${record.status === 'active' ? 'cấm' : 'bỏ cấm'} người dùng "${record.name}" không?`}
                    onConfirm={() => handleBanUnban(record.id, record.name, record.status)}
                    okText="Xác nhận"
                    cancelText="Hủy"
                    okType={record.status === 'active' ? 'danger' : 'primary'}
                >
                    <Button 
                        type={record.status === 'active' ? 'primary' : 'default'}
                        danger={record.status === 'active'}
                        size="small"
                    >
                        {record.status === 'active' ? 'Cấm' : 'Bỏ cấm'}
                    </Button>
                </Popconfirm>
            ),
        },
    ];

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    };

    // Filter data based on search term
    const filteredData = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex h-screen">
            <AdminSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

            <div className="flex flex-col flex-1 overflow-hidden">
                <AdminHeader />
                
                <div className="flex-1 overflow-auto p-6">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        {/* Header */}
                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Quản lý người dùng</h2>
                            <p className="text-gray-600">Danh sách tất cả người dùng trong hệ thống</p>
                        </div>

                        {/* Search */}
                        <div className="mb-4">
                            <Input
                                placeholder="Tìm kiếm theo tên hoặc email..."
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
                            dataSource={filteredData}
                            rowKey="id"
                            pagination={{
                                total: filteredData.length,
                                pageSize: 10,
                                showSizeChanger: true,
                                showQuickJumper: true,
                                showTotal: (total, range) => 
                                    `${range[0]}-${range[1]} của ${total} người dùng`,
                                pageSizeOptions: ['5', '10', '20', '50'],
                            }}
                            scroll={{ x: 800 }}
                            size="middle"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserList