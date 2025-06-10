import React, { useState, useEffect } from 'react';
import { Table, Button, Tag, Avatar, Space, Input, Select, message } from 'antd';
import Swal from 'sweetalert2';
import { UserOutlined, SearchOutlined } from '@ant-design/icons';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import ApiService from '../../service/ApiService';

const UserList = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 5;

    useEffect(() => {
        fetchUsers();
    }, [currentPage]);

    const fetchUsers = async () => {
        try {
            const params = {
                pageSize: itemsPerPage,
                page: currentPage,
                includeDeleted: false,
            };
            const response = await ApiService.getAllUsers(params);
            if (response.status === 200) {
                const items = response.data.data?.items || response.data.items || [];
                const total = response.data.data?.count || response.data.totalItems || 0;

                // Filter out admin users (role === 0) and organizer users (role === 1 or as per your role mapping)
                const filteredItems = items.filter(user => user.role !== 0 && user.role !== 2);

                const formattedUsers = filteredItems.map(user => ({
                    id: user.id || '',
                    firstName: user.firstName || '',
                    lastName: user.lastName || '',
                    email: user.email || 'No Email',
                    phoneNumber: user.phoneNumber || 'Chưa có',
                    achievementPoint: user.achievementPoint ?? 0,
                    status: user.status === 1 ? 'active' : 'banned',
                    role: 'user', // Default to 'user' since organizers are filtered out
                }));

                setUsers(formattedUsers);
                setTotalItems(total);
            } else {
                message.error(response.message || 'Không thể tải danh sách người dùng.');
            }
        } catch (error) {
            message.error('Đã xảy ra lỗi khi tải danh sách người dùng.');
            console.error('Fetch Users Error:', error);
        }
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleDeleteUser = async (userId, userName) => {
        const result = await Swal.fire({
            title: 'Xóa người dùng',
            text: `Bạn có chắc chắn muốn xóa người dùng "${userName}" không? Hành động này không thể hoàn tác.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Hủy',
            confirmButtonColor: '#d33'
        });

        if (result.isConfirmed) {
            try {
                const response = await ApiService.deleteUserById(userId);
                if (response.status === 200) {
                    setUsers(users.filter(user => user.id !== userId));
                    setTotalItems(totalItems - 1);
                    Swal.fire('Thành công!', `Đã xóa người dùng "${userName}"`, 'success');
                } else {
                    Swal.fire('Lỗi!', `Không thể xóa người dùng "${userName}"`, 'error');
                }
            } catch (error) {
                Swal.fire('Lỗi!', `Không thể xóa người dùng "${userName}"`, 'error');
                console.error('Delete User Error:', error);
            }
        }
    };

    const columns = [
        {
            title: 'Người dùng',
            key: 'name',
            render: (record) => {
                const fullName = `${record.firstName} ${record.lastName}`.trim();
                return (
                    <Space>
                        <Avatar size={40} icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }}>
                            {fullName.charAt(0) || 'U'}
                        </Avatar>
                        <span style={{ fontWeight: 500 }}>{fullName || 'Không tên'}</span>
                    </Space>
                );
            },
            sorter: (a, b) => `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: (a, b) => a.email.localeCompare(b.email),
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Điểm thành tựu',
            dataIndex: 'achievementPoint',
            key: 'achievementPoint',
            sorter: (a, b) => a.achievementPoint - b.achievementPoint,
        },
        {
            title: 'Vai trò',
            dataIndex: 'role',
            key: 'role',
            render: () => <Tag color="default">Người dùng</Tag>,
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
            render: (_, record) => {
                const fullName = `${record.firstName} ${record.lastName}`.trim();
                return (
                    <Button
                        type="primary"
                        danger
                        size="small"
                        onClick={() => handleDeleteUser(record.id, fullName)}
                    >
                        Xóa
                    </Button>
                );
            },
        },
    ];

    const filteredData = users.filter(user => {
        const name = `${user.firstName} ${user.lastName}`.toLowerCase();
        const email = user.email.toLowerCase();
        return name.includes(searchTerm.toLowerCase()) || email.includes(searchTerm.toLowerCase());
    });

    return (
        <div className="flex h-screen">
            <AdminSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="flex flex-col flex-1 overflow-hidden">
                <AdminHeader />
                <div className="flex-1 overflow-auto p-6">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Quản lý người dùng</h2>
                            <p className="text-gray-600">Danh sách tất cả người dùng trong hệ thống</p>
                        </div>
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
                        <Table
                            columns={columns}
                            dataSource={filteredData}
                            rowKey="id"
                            pagination={{
                                total: totalItems,
                                pageSize: itemsPerPage,
                                current: currentPage,
                                onChange: (page) => setCurrentPage(page),
                                showSizeChanger: false,
                                showQuickJumper: true,
                                showTotal: (total, range) =>
                                    `${range[0]}-${range[1]} của ${total} người dùng`,
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

export default UserList;