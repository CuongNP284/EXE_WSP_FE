import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Upload, Avatar, Tag, Space, Divider, message } from 'antd';
import { UserOutlined, EditOutlined, SaveOutlined, UploadOutlined, PlusOutlined } from '@ant-design/icons';
import OrganizerSidebar from '../../components/organizer/OrganizerSidebar';
import OrganizerHeader from '../../components/organizer/OrganizerHeader';
import ApiService from '../../service/ApiService';

const { TextArea } = Input;

const OrganizerProfile = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [form] = Form.useForm();
    const [tags, setTags] = useState(['#Tĩnh tâm', '#Kiến thức', '#Sức khỏe']);
    const [newTag, setNewTag] = useState('');
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await ApiService.getLoggedInUserInfo();
                if (response.status === 200 && response.data) {
                    setUserData(response.data);
                    form.setFieldsValue({
                        organizerName: `${response.data.firstName} ${response.data.lastName}`,
                        email: response.data.email,
                        phone: response.data.phoneNumber,
                        description: response.data.description || 'Chưa có mô tả.',
                        address: response.data.address || 'Chưa có địa chỉ.',
                        website: response.data.website || 'Chưa có website.',
                        followers: response.data.followers || '0',
                        experience: response.data.experience || '0',
                        workshops: response.data.workshops || '0',
                    });
                } else {
                    message.error(response.message || 'Không thể lấy thông tin người dùng.');
                }
            } catch (error) {
                message.error('Lỗi khi lấy thông tin người dùng.');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [form]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            // Simulate API call to update profile (implement actual API call if available)
            console.log('Saved values:', values);
            message.success('Thông tin đã được cập nhật thành công!');
            setIsEditing(false);
        } catch (error) {
            console.error('Validation failed:', error);
            message.error('Lỗi khi lưu thông tin.');
        }
    };

    const handleCancel = () => {
        if (userData) {
            form.setFieldsValue({
                organizerName: `${userData.firstName} ${userData.lastName}`,
                email: userData.email,
                phone: userData.phoneNumber,
                description: userData.description || 'Chưa có mô tả.',
                address: userData.address || 'Chưa có địa chỉ.',
                website: userData.website || 'Chưa có website.',
                followers: userData.followers || '0',
                experience: userData.experience || '0',
                workshops: userData.workshops || '0',
            });
        }
        setIsEditing(false);
    };

    const handleAddTag = () => {
        if (newTag && !tags.includes(newTag)) {
            setTags([...tags, newTag]);
            setNewTag('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const uploadProps = {
        name: 'avatar',
        listType: 'picture-card',
        className: 'avatar-uploader',
        showUploadList: false,
        beforeUpload: (file) => {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                message.error('Bạn chỉ có thể tải lên file JPG/PNG!');
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                message.error('Hình ảnh phải nhỏ hơn 2MB!');
            }
            return isJpgOrPng && isLt2M;
        },
    };

    if (loading) {
        return <div>Đang tải thông tin...</div>;
    }

    if (!userData) {
        return <div>Không thể tải thông tin người dùng.</div>;
    }

    return (
        <div className="flex h-screen">
            <OrganizerSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="flex flex-col flex-1 overflow-hidden">
                <OrganizerHeader />
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                            <div className="flex justify-between items-center mb-4">
                                <h1 className="text-2xl font-bold text-gray-800">Thông tin tài khoản</h1>
                                <div className="space-x-2">
                                    {!isEditing ? (
                                        <Button
                                            type="primary"
                                            icon={<EditOutlined />}
                                            onClick={handleEdit}
                                            className="bg-blue-500 hover:bg-blue-600"
                                        >
                                            Chỉnh sửa
                                        </Button>
                                    ) : (
                                        <Space>
                                            <Button onClick={handleCancel}>
                                                Hủy
                                            </Button>
                                            <Button
                                                type="primary"
                                                icon={<SaveOutlined />}
                                                onClick={handleSave}
                                                className="bg-green-500 hover:bg-green-600"
                                            >
                                                Lưu thay đổi
                                            </Button>
                                        </Space>
                                    )}
                                </div>
                            </div>

                            <Form
                                form={form}
                                layout="vertical"
                                className="space-y-4"
                            >
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="flex flex-col items-center space-y-4">
                                        <div className="relative">
                                            <Avatar
                                                size={120}
                                                icon={<UserOutlined />}
                                                className="border-4 border-white shadow-lg"
                                                style={{ backgroundColor: '#87ceeb' }}
                                            />
                                            {isEditing && (
                                                <Upload {...uploadProps}>
                                                    <Button
                                                        type="primary"
                                                        shape="circle"
                                                        icon={<UploadOutlined />}
                                                        size="small"
                                                        className="absolute -bottom-2 -right-2 bg-blue-500 hover:bg-blue-600"
                                                    />
                                                </Upload>
                                            )}
                                        </div>
                                        {!isEditing && (
                                            <div className="text-center">
                                                <div className="text-lg font-semibold text-gray-800">
                                                    {userData.firstName} {userData.lastName}
                                                </div>
                                                <div className="text-sm text-blue-500 bg-blue-50 px-2 py-1 rounded">
                                                    {ApiService.mapRoleIdToName(userData.role)}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1 space-y-4">
                                        <Form.Item
                                            label="Tên tổ chức"
                                            name="organizerName"
                                            rules={[{ required: true, message: 'Vui lòng nhập tên tổ chức!' }]}
                                        >
                                            <Input
                                                placeholder="Nhập tên tổ chức"
                                                disabled={!isEditing}
                                                className={!isEditing ? 'border-none shadow-none bg-transparent p-0 text-lg font-semibold' : ''}
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            label="Mô tả"
                                            name="description"
                                        >
                                            <TextArea
                                                rows={4}
                                                placeholder="Mô tả về tổ chức của bạn..."
                                                disabled={!isEditing}
                                                className={!isEditing ? 'border-none shadow-none bg-transparent p-0 resize-none' : ''}
                                            />
                                        </Form.Item>
                                    </div>
                                </div>

                                <Divider />

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                                        <div className="text-2xl font-bold text-blue-600">
                                            <Form.Item name="followers" className="mb-0">
                                                <Input
                                                    disabled={!isEditing}
                                                    className={!isEditing ? 'border-none shadow-none bg-transparent text-center text-2xl font-bold text-blue-600 p-0' : 'text-center'}
                                                />
                                            </Form.Item>
                                        </div>
                                        <div className="text-gray-600">Người theo dõi</div>
                                    </div>
                                    <div className="text-center p-4 bg-green-50 rounded-lg">
                                        <div className="text-2xl font-bold text-green-600">
                                            <Form.Item name="experience" className="mb-0">
                                                <Input
                                                    disabled={!isEditing}
                                                    className={!isEditing ? 'border-none shadow-none bg-transparent text-center text-2xl font-bold text-green-600 p-0' : 'text-center'}
                                                    suffix={!isEditing ? " năm" : ""}
                                                />
                                            </Form.Item>
                                        </div>
                                        <div className="text-gray-600">Thâm niên</div>
                                    </div>
                                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                                        <div className="text-2xl font-bold text-orange-600">
                                            <Form.Item name="workshops" className="mb-0">
                                                <Input
                                                    disabled={!isEditing}
                                                    className={!isEditing ? 'border-none shadow-none bg-transparent text-center text-2xl font-bold text-orange-600 p-0' : 'text-center'}
                                                    suffix={!isEditing ? "+ workshop đã tổ chức" : ""}
                                                />
                                            </Form.Item>
                                        </div>
                                        <div className="text-gray-600">Workshop</div>
                                    </div>
                                </div>

                                <Divider />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Form.Item
                                        label="Email liên hệ"
                                        name="email"
                                        rules={[{ type: 'email', message: 'Email không hợp lệ!' }]}
                                    >
                                        <Input
                                            placeholder="email@example.com"
                                            disabled={!isEditing}
                                            className={!isEditing ? 'border-none shadow-none bg-transparent p-0' : ''}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label="Số điện thoại"
                                        name="phone"
                                    >
                                        <Input
                                            placeholder="+84 123 456 789"
                                            disabled={!isEditing}
                                            className={!isEditing ? 'border-none shadow-none bg-transparent p-0' : ''}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label="Địa chỉ"
                                        name="address"
                                    >
                                        <Input
                                            placeholder="Nhập địa chỉ"
                                            disabled={!isEditing}
                                            className={!isEditing ? 'border-none shadow-none bg-transparent p-0' : ''}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label="Website"
                                        name="website"
                                    >
                                        <Input
                                            placeholder="www.example.com"
                                            disabled={!isEditing}
                                            className={!isEditing ? 'border-none shadow-none bg-transparent p-0' : ''}
                                        />
                                    </Form.Item>
                                </div>

                                <Divider />

                                <div>
                                    <div className="mb-3 font-medium text-gray-700">Thể loại</div>
                                    <div className="space-y-3">
                                        <div className="flex flex-wrap gap-2">
                                            {tags.map((tag, index) => (
                                                <Tag
                                                    key={index}
                                                    closable={isEditing}
                                                    onClose={() => handleRemoveTag(tag)}
                                                    className="px-3 py-1 text-sm"
                                                    color="blue"
                                                >
                                                    {tag}
                                                </Tag>
                                            ))}
                                        </div>
                                        {isEditing && (
                                            <div className="flex gap-2">
                                                <Input
                                                    placeholder="Thêm thể loại mới (vd: #Yoga)"
                                                    value={newTag}
                                                    onChange={(e) => setNewTag(e.target.value)}
                                                    onPressEnter={handleAddTag}
                                                    className="flex-1"
                                                />
                                                <Button
                                                    type="dashed"
                                                    icon={<PlusOutlined />}
                                                    onClick={handleAddTag}
                                                >
                                                    Thêm
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrganizerProfile;