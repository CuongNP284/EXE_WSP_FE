import React, { useState } from 'react';
import { Form, Input, Button, Upload, Avatar, Tag, Space, Divider, message } from 'antd';
import { UserOutlined, EditOutlined, SaveOutlined, UploadOutlined, PlusOutlined } from '@ant-design/icons';
import OrganizerSidebar from '../../components/organizer/OrganizerSidebar';
import OrganizerHeader from '../../components/organizer/OrganizerHeader';

const { TextArea } = Input;

const OrganizerProfile = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [form] = Form.useForm();
    const [tags, setTags] = useState(['#Tĩnh tâm', '#Kiến thức', '#Sức khỏe']);
    const [newTag, setNewTag] = useState('');

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const initialValues = {
        organizerName: 'Tumy House',
        description: 'Là nơi mà bạn có thể đến để cùng nhau kết nối, học hỏi và tìm thấy phương pháp để giúp bạn thấm "Nâng cao rung động – Tìm thấy chính mình" để tương thích với sự chuyển dịch của Trái Đất mới!',
        followers: '1,123',
        experience: '2',
        workshops: '9',
        email: 'contact@tumyhouse.com',
        phone: '+84 123 456 789',
        address: 'Hồ Chí Minh, Việt Nam',
        website: 'www.tumyhouse.com'
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            console.log('Saved values:', values);
            message.success('Thông tin đã được cập nhật thành công!');
            setIsEditing(false);
        } catch (error) {
            console.error('Validation failed:', error);
        }
    };

    const handleCancel = () => {
        form.setFieldsValue(initialValues);
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

    return (
        <div className="flex h-screen">
            <OrganizerSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="flex flex-col flex-1 overflow-hidden">
                <OrganizerHeader />
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-4xl mx-auto">
                        {/* Header */}
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
                                initialValues={initialValues}
                                className="space-y-4"
                            >
                                {/* Profile Image and Basic Info */}
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
                                                <div className="text-lg font-semibold text-gray-800">Tumy House</div>
                                                <div className="text-sm text-blue-500 bg-blue-50 px-2 py-1 rounded">
                                                    Tao workshop
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

                                {/* Statistics */}
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

                                {/* Contact Information */}
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

                                {/* Tags */}
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