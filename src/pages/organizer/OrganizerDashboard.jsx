import React, { useState, useEffect } from 'react';
import OrganizerSidebar from '../../components/organizer/OrganizerSidebar';
import OrganizerHeader from '../../components/organizer/OrganizerHeader';
import { Card, Table, Progress, Tag, Select, DatePicker, Row, Col, message } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, Users, Calendar, DollarSign, Award, Eye } from 'lucide-react';
import ApiService from '../../service/ApiService'; // Import ApiService

const { RangePicker } = DatePicker;

const OrganizerDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [statsData, setStatsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrganizerAnalytics = async () => {
            setLoading(true);
            try {
                const response = await ApiService.getOrganizerAnalytics();
                if (response.status === 200 && response.data) {
                    const data = response.data.data;
                    setStatsData([
                        { title: 'Tổng Vé Đã Mua', value: data.totalTicketBoughtForOwnWorkshop || 0, icon: <Calendar />, color: '#1890ff' },
                        { title: 'Tổng Doanh Thu', value: data.revenue || 0, prefix: '₫', icon: <DollarSign />, color: '#faad14' },
                        { title: 'Đánh Giá Gần Nhất', value: data.currentReview ? `${data.currentReview.rating}/5 - ${data.currentReview.comment}` : 'N/A', icon: <Award />, color: '#52c41a' },
                        { title: 'Workshop Đánh Giá Cao Nhất', value: data.bestRatingWorkshop ? data.bestRatingWorkshop.title : 'N/A', icon: <Eye />, color: '#f5222d' }
                    ]);
                }
            } catch (error) {
                message.error('Failed to fetch organizer analytics');
            } finally {
                setLoading(false);
            }
        };

        fetchOrganizerAnalytics();
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // Mock data for charts (can be replaced with API data later)
    const monthlyRevenueData = [
        { month: 'Jan', revenue: 12000000, workshops: 15, participants: 450 },
        { month: 'Feb', revenue: 18000000, workshops: 22, participants: 660 },
        { month: 'Mar', revenue: 25000000, workshops: 28, participants: 840 },
        { month: 'Apr', revenue: 22000000, workshops: 25, participants: 750 },
        { month: 'May', revenue: 30000000, workshops: 35, participants: 1050 },
        { month: 'Jun', revenue: 28000000, workshops: 32, participants: 960 }
    ];

    const workshopCategoryData = [
        { name: 'Yoga', value: 35, color: '#8884d8' },
        { name: 'Fitness', value: 25, color: '#82ca9d' },
        { name: 'Dance', value: 20, color: '#ffc658' },
        { name: 'Meditation', value: 12, color: '#ff7c7c' },
        { name: 'Martial Arts', value: 8, color: '#8dd1e1' }
    ];

    const participantTrendData = [
        { week: 'Week 1', registered: 120, attended: 108 },
        { week: 'Week 2', registered: 135, attended: 125 },
        { week: 'Week 3', registered: 150, attended: 140 },
        { week: 'Week 4', registered: 180, attended: 165 }
    ];

    const topWorkshopsData = [
        {
            key: '1',
            name: 'Luyện tập thân khỏe với Yoga',
            category: 'Yoga',
            participants: '45/50',
            revenue: '22,500,000 VND',
            rating: 4.8,
            status: 'active'
        },
        {
            key: '2',
            name: 'Kickboxing cơ bản',
            category: 'Fitness',
            participants: '38/40',
            revenue: '19,000,000 VND',
            rating: 4.6,
            status: 'active'
        },
        {
            key: '3',
            name: 'Thiền và thư giãn',
            category: 'Meditation',
            participants: '25/30',
            revenue: '12,500,000 VND',
            rating: 4.9,
            status: 'completed'
        },
        {
            key: '4',
            name: 'Hip Hop Dance',
            category: 'Dance',
            participants: '42/45',
            revenue: '21,000,000 VND',
            rating: 4.7,
            status: 'active'
        },
        {
            key: '5',
            name: 'Taekwondo cho trẻ em',
            category: 'Martial Arts',
            participants: '20/25',
            revenue: '15,000,000 VND',
            rating: 4.5,
            status: 'pending'
        }
    ];

    const workshopColumns = [
        {
            title: 'Workshop',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <div>
                    <div className="font-medium">{text}</div>
                    <div className="text-sm text-gray-500">{record.category}</div>
                </div>
            )
        },
        {
            title: 'Participants',
            dataIndex: 'participants',
            key: 'participants',
            render: (text) => {
                const [current, total] = text.split('/').map(Number);
                const percentage = (current / total) * 100;
                return (
                    <div>
                        <div className="text-sm font-medium">{text}</div>
                        <Progress percent={percentage} size="small" showInfo={false} />
                    </div>
                );
            }
        },
        {
            title: 'Revenue',
            dataIndex: 'revenue',
            key: 'revenue',
            render: (text) => <span className="font-medium text-green-600">{text}</span>
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
            render: (rating) => (
                <div className="flex items-center">
                    <span className="mr-1">⭐</span>
                    <span className="font-medium">{rating}</span>
                </div>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                const colors = {
                    active: 'green',
                    completed: 'blue',
                    pending: 'orange'
                };
                const labels = {
                    active: 'Đang diễn ra',
                    completed: 'Hoàn thành',
                    pending: 'Chờ duyệt'
                };
                return <Tag color={colors[status]}>{labels[status]}</Tag>;
            }
        }
    ];

    return (
        <div className="flex h-screen">
            <OrganizerSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

            <div className="flex flex-col flex-1 overflow-hidden">
                <OrganizerHeader />
                <main className="flex-1 overflow-y-auto">
                    <div className="p-6">
                        <Row gutter={[16, 16]} className="mb-6">
                            {loading ? (
                                <Col xs={24}>
                                    <Card loading={true} />
                                </Col>
                            ) : (
                                statsData.map((stat, index) => (
                                    <Col xs={24} sm={12} lg={6} key={index}>
                                        <Card className="text-center">
                                            <div className="flex items-center justify-center mb-2">
                                                {stat.icon && React.cloneElement(stat.icon, { className: `w-8 h-8 ${stat.color.replace('#', 'text-')}` })}
                                            </div>
                                            <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                                            <div className="text-sm text-gray-500">{stat.title}</div>
                                            <div className="text-xs text-green-500 mt-1">+10% từ tháng trước</div> {/* Mocked growth */}
                                        </Card>
                                    </Col>
                                ))
                            )}
                        </Row>

                        {/* Charts and other sections remain unchanged */}
                        <Row gutter={[16, 16]} className="mb-6">
                            <Col xs={24} lg={16}>
                                <Card title="Doanh thu theo tháng" className="h-96">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={monthlyRevenueData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" />
                                            <YAxis tickFormatter={(value) => `${value / 1000000}M`} />
                                            <Tooltip formatter={(value) => [`${(value / 1000000).toFixed(1)}M VND`, 'Doanh thu']} />
                                            <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </Card>
                            </Col>
                            <Col xs={24} lg={8}>
                                <Card title="Phân loại Workshop" className="h-96">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={workshopCategoryData}
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="value"
                                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                            >
                                                {workshopCategoryData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </Card>
                            </Col>
                        </Row>

                        {/* Additional Charts */}
                        <Row gutter={[16, 16]} className="mb-6">
                            <Col xs={24} lg={12}>
                                <Card title="Số lượng Workshop & Người tham gia">
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={monthlyRevenueData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" />
                                            <YAxis yAxisId="left" />
                                            <YAxis yAxisId="right" orientation="right" />
                                            <Tooltip />
                                            <Legend />
                                            <Bar yAxisId="left" dataKey="workshops" fill="#8884d8" name="Workshops" />
                                            <Bar yAxisId="right" dataKey="participants" fill="#82ca9d" name="Participants" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </Card>
                            </Col>
                            <Col xs={24} lg={12}>
                                <Card title="Tỷ lệ tham gia theo tuần">
                                    <ResponsiveContainer width="100%" height={300}>
                                        <LineChart data={participantTrendData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="week" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="registered" stroke="#8884d8" name="Đăng ký" />
                                            <Line type="monotone" dataKey="attended" stroke="#82ca9d" name="Tham gia" />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </Card>
                            </Col>
                        </Row>

                        {/* Top Workshops Table */}
                        <Card title="Top Workshops" className="mb-6">
                            <Table
                                columns={workshopColumns}
                                dataSource={topWorkshopsData}
                                pagination={false}
                                scroll={{ x: 800 }}
                            />
                        </Card>

                        {/* Quick Stats */}
                        <Row gutter={[16, 16]}>
                            <Col xs={24} sm={8}>
                                <Card title="Completion Rate" className="text-center">
                                    <Progress type="circle" percent={87} strokeColor="#52c41a" />
                                    <div className="mt-4 text-sm text-gray-600">
                                        Workshop completion rate trong tháng
                                    </div>
                                </Card>
                            </Col>
                            <Col xs={24} sm={8}>
                                <Card title="Customer Satisfaction" className="text-center">
                                    <Progress type="circle" percent={94} strokeColor="#1890ff" />
                                    <div className="mt-4 text-sm text-gray-600">
                                        Độ hài lòng khách hàng trung bình
                                    </div>
                                </Card>
                            </Col>
                            <Col xs={24} sm={8}>
                                <Card title="Return Rate" className="text-center">
                                    <Progress type="circle" percent={76} strokeColor="#faad14" />
                                    <div className="mt-4 text-sm text-gray-600">
                                        Tỷ lệ khách hàng quay lại
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default OrganizerDashboard
