import React, { useState } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import { Card, Row, Col, Table, Progress, Statistic, Tag, DatePicker, Select, Space, Button } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { 
  UserOutlined, 
  CalendarOutlined, 
  BookOutlined, 
  DollarOutlined,
  TrophyOutlined,
  StarOutlined,
  TeamOutlined,
  RiseOutlined
} from '@ant-design/icons';

const { RangePicker } = DatePicker;
const { Option } = Select;

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Mock data cho các thống kê
  const statsData = [
    { title: 'Tổng Workshop', value: 156, icon: <BookOutlined />, color: '#1890ff' },
    { title: 'Học viên đăng ký', value: 2847, icon: <UserOutlined />, color: '#52c41a' },
    { title: 'Doanh thu tháng', value: 45200000, prefix: '₫', icon: <DollarOutlined />, color: '#faad14' },
    { title: 'Đánh giá trung bình', value: 4.8, suffix: '/5', icon: <StarOutlined />, color: '#f5222d' }
  ];

  // Data cho biểu đồ doanh thu theo tháng
  const revenueData = [
    { month: 'T1', revenue: 35000000, workshops: 12 },
    { month: 'T2', revenue: 28000000, workshops: 10 },
    { month: 'T3', revenue: 42000000, workshops: 15 },
    { month: 'T4', revenue: 38000000, workshops: 13 },
    { month: 'T5', revenue: 45200000, workshops: 18 },
    { month: 'T6', revenue: 52000000, workshops: 20 }
  ];

  // Data cho biểu đồ workshop theo danh mục
  const categoryData = [
    { name: 'Lập trình', value: 45, color: '#1890ff' },
    { name: 'Thiết kế', value: 32, color: '#52c41a' },
    { name: 'Marketing', value: 28, color: '#faad14' },
    { name: 'Kinh doanh', value: 35, color: '#f5222d' },
    { name: 'Khác', value: 16, color: '#722ed1' }
  ];

  // Data cho bảng workshop phổ biến
  const popularWorkshops = [
    {
      key: '1',
      name: 'React.js từ cơ bản đến nâng cao',
      instructor: 'Nguyễn Văn A',
      students: 245,
      rating: 4.9,
      revenue: 12500000,
      status: 'active',
      category: 'Lập trình'
    },
    {
      key: '2', 
      name: 'UI/UX Design cho người mới bắt đầu',
      instructor: 'Trần Thị B',
      students: 189,
      rating: 4.7,
      revenue: 9800000,
      status: 'active',
      category: 'Thiết kế'
    },
    {
      key: '3',
      name: 'Digital Marketing Strategy 2024',
      instructor: 'Lê Văn C',
      students: 156,
      rating: 4.8,
      revenue: 8400000,
      status: 'active',
      category: 'Marketing'
    },
    {
      key: '4',
      name: 'Python cho Data Science',
      instructor: 'Phạm Thị D',
      students: 134,
      rating: 4.6,
      revenue: 7200000,
      status: 'pending',
      category: 'Lập trình'
    },
    {
      key: '5',
      name: 'Khởi nghiệp và quản lý startup',
      instructor: 'Hoàng Văn E',
      students: 98,
      rating: 4.5,
      revenue: 5400000,
      status: 'completed',
      category: 'Kinh doanh'
    }
  ];

  // Data cho top instructors
  const topInstructors = [
    {
      key: '1',
      name: 'Nguyễn Văn A',
      workshops: 8,
      students: 456,
      rating: 4.9,
      revenue: 28500000
    },
    {
      key: '2',
      name: 'Trần Thị B', 
      workshops: 6,
      students: 324,
      rating: 4.8,
      revenue: 19200000
    },
    {
      key: '3',
      name: 'Lê Văn C',
      workshops: 5,
      students: 289,
      rating: 4.7,
      revenue: 16800000
    }
  ];

  const workshopColumns = [
    {
      title: 'Tên Workshop',
      dataIndex: 'name',
      key: 'name',
      width: 300,
      render: (text) => <span className="font-medium">{text}</span>
    },
    {
      title: 'Giảng viên',
      dataIndex: 'instructor',
      key: 'instructor'
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      render: (category) => {
        const colors = {
          'Lập trình': 'blue',
          'Thiết kế': 'green', 
          'Marketing': 'orange',
          'Kinh doanh': 'red'
        };
        return <Tag color={colors[category]}>{category}</Tag>;
      }
    },
    {
      title: 'Học viên',
      dataIndex: 'students',
      key: 'students',
      render: (students) => <span className="font-semibold">{students.toLocaleString()}</span>
    },
    {
      title: 'Đánh giá',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating) => (
        <div className="flex items-center">
          <StarOutlined className="text-yellow-400 mr-1" />
          <span>{rating}</span>
        </div>
      )
    },
    {
      title: 'Doanh thu',
      dataIndex: 'revenue',
      key: 'revenue',
      render: (revenue) => <span className="font-semibold text-green-600">₫{revenue.toLocaleString()}</span>
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusConfig = {
          active: { color: 'green', text: 'Đang diễn ra' },
          pending: { color: 'orange', text: 'Chờ bắt đầu' },
          completed: { color: 'blue', text: 'Hoàn thành' }
        };
        return <Tag color={statusConfig[status].color}>{statusConfig[status].text}</Tag>;
      }
    }
  ];

  const instructorColumns = [
    {
      title: 'Giảng viên',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span className="font-medium">{text}</span>
    },
    {
      title: 'Số Workshop',
      dataIndex: 'workshops',
      key: 'workshops'
    },
    {
      title: 'Tổng học viên',
      dataIndex: 'students',
      key: 'students',
      render: (students) => <span className="font-semibold">{students.toLocaleString()}</span>
    },
    {
      title: 'Đánh giá',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating) => (
        <div className="flex items-center">
          <StarOutlined className="text-yellow-400 mr-1" />
          <span>{rating}</span>
        </div>
      )
    },
    {
      title: 'Doanh thu',
      dataIndex: 'revenue',
      key: 'revenue',
      render: (revenue) => <span className="font-semibold text-green-600">₫{revenue.toLocaleString()}</span>
    }
  ];

  return (
    <div className="flex h-screen">
      <AdminSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader />
        
        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Header with filters */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Workshop</h1>
              <Space>
                <RangePicker />
                <Select defaultValue="all" style={{ width: 120 }}>
                  <Option value="all">Tất cả</Option>
                  <Option value="active">Đang diễn ra</Option>
                  <Option value="pending">Chờ bắt đầu</Option>
                  <Option value="completed">Hoàn thành</Option>
                </Select>
                <Button type="primary">Xuất báo cáo</Button>
              </Space>
            </div>
          </div>

          {/* Statistics Cards */}
          <Row gutter={[16, 16]} className="mb-6">
            {statsData.map((stat, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <Card>
                  <Statistic
                    title={stat.title}
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    valueStyle={{ color: stat.color }}
                  />
                </Card>
              </Col>
            ))}
          </Row>

          {/* Charts Row */}
          <Row gutter={[16, 16]} className="mb-6">
            <Col xs={24} lg={16}>
              <Card title="Doanh thu và Workshop theo tháng" className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip 
                      formatter={(value, name) => [
                        name === 'revenue' ? `₫${value.toLocaleString()}` : value,
                        name === 'revenue' ? 'Doanh thu' : 'Số Workshop'
                      ]}
                    />
                    <Legend />
                    <Bar yAxisId="right" dataKey="workshops" fill="#faad14" name="Số Workshop" />
                    <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#1890ff" strokeWidth={3} name="Doanh thu" />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </Col>
            <Col xs={24} lg={8}>
              <Card title="Workshop theo danh mục" className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </Col>
          </Row>

          {/* Workshop Performance Metrics */}
          <Row gutter={[16, 16]} className="mb-6">
            <Col xs={24} md={8}>
              <Card title="Tỷ lệ hoàn thành Workshop">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Hoàn thành</span>
                      <span>78%</span>
                    </div>
                    <Progress percent={78} status="success" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Đang diễn ra</span>
                      <span>15%</span>
                    </div>
                    <Progress percent={15} status="active" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Chờ bắt đầu</span>
                      <span>7%</span>
                    </div>
                    <Progress percent={7} status="normal" />
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card title="Mức độ hài lòng">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Rất hài lòng (5⭐)</span>
                      <span>62%</span>
                    </div>
                    <Progress percent={62} strokeColor="#52c41a" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Hài lòng (4⭐)</span>
                      <span>28%</span>
                    </div>
                    <Progress percent={28} strokeColor="#faad14" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Bình thường (3⭐)</span>
                      <span>8%</span>
                    </div>
                    <Progress percent={8} strokeColor="#fa8c16" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Không hài lòng (≤2⭐)</span>
                      <span>2%</span>
                    </div>
                    <Progress percent={2} strokeColor="#f5222d" />
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card title="Thống kê tương tác">
                <div className="space-y-4">
                  <Statistic title="Tổng bình luận" value={1234} prefix={<TeamOutlined />} />
                  <Statistic title="Câu hỏi được đặt" value={567} prefix={<CalendarOutlined />} />
                  <Statistic title="Tỷ lệ tham gia" value={87} suffix="%" prefix={<RiseOutlined />} />
                </div>
              </Card>
            </Col>
          </Row>

          {/* Tables */}
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Card title="Workshop phổ biến nhất" className="mb-6">
                <Table 
                  columns={workshopColumns}
                  dataSource={popularWorkshops}
                  pagination={false}
                  scroll={{ x: 800 }}
                />
              </Card>
            </Col>
            <Col xs={24}>
              <Card title="Top giảng viên xuất sắc">
                <Table 
                  columns={instructorColumns}
                  dataSource={topInstructors}
                  pagination={false}
                />
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;