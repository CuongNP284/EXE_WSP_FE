import React, { useState, useEffect, useRef } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import { Card, Row, Col, Table, Progress, Statistic, Tag, DatePicker, Select, Space, Button, message } from 'antd';
import { Bar, Pie } from 'react-chartjs-2';
import { UserOutlined, CalendarOutlined, BookOutlined, DollarOutlined, StarOutlined, TeamOutlined, RiseOutlined } from '@ant-design/icons';
import ApiService from '../../service/ApiService'; // Corrected import path
import { Chart, registerables } from 'chart.js'; // Import Chart and registerables

// Register all Chart.js components
Chart.register(...registerables);

const { RangePicker } = DatePicker;
const { Option } = Select;

// Chart.js configurations
const revenueData = {
  labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'],
  datasets: [
    {
      label: 'Doanh thu (₫)',
      data: [35000000, 28000000, 42000000, 38000000, 45200000, 52000000],
      backgroundColor: '#1890ff',
      yAxisID: 'y1',
    },
    {
      label: 'Số Workshop',
      data: [12, 10, 15, 13, 18, 20],
      backgroundColor: '#faad14',
      yAxisID: 'y2',
    },
  ],
};

const categoryData = {
  labels: ['Lập trình', 'Thiết kế', 'Marketing', 'Kinh doanh', 'Khác'],
  datasets: [
    {
      data: [45, 32, 28, 35, 16],
      backgroundColor: ['#1890ff', '#52c41a', '#faad14', '#f5222d', '#722ed1'],
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false, // Allow custom height
  plugins: {
    legend: { position: 'top' },
    tooltip: {
      callbacks: {
        label: function (tooltipItem) {
          return tooltipItem.dataset.label + ': ' + tooltipItem.raw.toLocaleString() + (tooltipItem.dataset.yAxisID === 'y1' ? ' ₫' : '');
        },
      },
    },
  },
  scales: {
    y1: {
      type: 'linear',
      position: 'left',
      title: { display: true, text: 'Doanh thu (₫)' },
      ticks: { callback: value => `${value / 1000000}M` },
    },
    y2: {
      type: 'linear',
      position: 'right',
      title: { display: true, text: 'Số Workshop' },
      grid: { drawOnChartArea: false },
    },
  },
};

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [statsData, setStatsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const barChartRef = useRef(null); // Ref for Bar chart
  const pieChartRef = useRef(null); // Ref for Pie chart

  useEffect(() => {
    const fetchAdminAnalytics = async () => {
      setLoading(true);
      try {
        const response = await ApiService.getAdminAnalytics();
        if (response.status === 200 && response.data) {
          setStatsData([
            { title: 'Tổng Người Dùng', value: response.data.data.totalUser || 0, icon: <UserOutlined />, color: '#1890ff' },
            { title: 'Doanh Thu Tháng', value: response.data.data.revenueByMonth || 0, prefix: '₫', icon: <DollarOutlined />, color: '#faad14' },
            { title: 'Workshop Phổ Biến Nhất', value: response.data.data.mostAttendedWorkshop || 'N/A', icon: <BookOutlined />, color: '#52c41a' },
            { title: 'Đánh giá trung bình', value: 4.8, suffix: '/5', icon: <StarOutlined />, color: '#f5222d' },
          ]);
        }
      } catch (error) {
        message.error('Failed to fetch admin analytics');
      } finally {
        setLoading(false);
      }
    };

    fetchAdminAnalytics();

    // Cleanup charts on unmount
    return () => {
      if (barChartRef.current) {
        barChartRef.current.destroy();
      }
      if (pieChartRef.current) {
        pieChartRef.current.destroy();
      }
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

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
        
        <div className="flex-1 overflow-y-auto p-6">
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

          <Row gutter={[16, 16]} className="mb-6">
            {loading ? (
              <Col xs={24}>
                <Card loading={true} />
              </Col>
            ) : (
              statsData.map((stat, index) => (
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
              ))
            )}
          </Row>

          <Row gutter={[16, 16]} className="mb-6">
            <Col xs={24} lg={16}>
              <Card title="Doanh thu và Workshop theo tháng" className="h-96">
                <Bar
                  data={revenueData}
                  options={options}
                  ref={barChartRef}
                />
              </Card>
            </Col>
            <Col xs={24} lg={8}>
              <Card title="Workshop theo danh mục" className="h-96">
                <Pie
                  data={categoryData}
                  options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top' } } }}
                  ref={pieChartRef}
                />
              </Card>
            </Col>
          </Row>

          {/* Rest of the component (Workshop Performance Metrics, Tables, etc.) remains unchanged */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;