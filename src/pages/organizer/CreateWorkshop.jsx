import React, { useState, useEffect } from 'react';
import { Select, DatePicker, message } from 'antd';
import OrganizerSidebar from '../../components/organizer/OrganizerSidebar';
import OrganizerHeader from '../../components/organizer/OrganizerHeader';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import ApiService from '../../service/ApiService';
import dayjs from 'dayjs';

const { Option } = Select;

const CreateWorkshop = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [currentStep, setCurrentStep] = useState(1);
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        categoryId: '',
        location: '',
        introVideoUrl: '',
        durationMinutes: '',
        price: '',
        startTime: null,
        endTime: null
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await ApiService.getAllCategories();
            if (response.status === 200) {
                const mappedCategories = response.data.data.items.map(item => ({
                    id: item.id || item.categoryId,
                    name: item.name
                }));
                setCategories(mappedCategories);
            } else {
                message.error('Không thể tải danh sách danh mục');
            }
        };
        fetchCategories();
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const steps = [
        { id: 1, title: 'Thông tin Workshop', completed: false },
        { id: 2, title: 'Chi tiết & Hình ảnh', completed: false }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleCategoryChange = (value) => {
        console.log("Selected category value:", value);
        setFormData(prev => ({
            ...prev,
            categoryId: value ? String(value) : ''
        }));
        setErrors(prev => ({ ...prev, categoryId: value ? '' : 'Danh mục là bắt buộc' }));
    };

    const handleDateTimeChange = (field, date) => {
        setFormData(prev => ({
            ...prev,
            [field]: date ? date.toISOString() : null
        }));
        setErrors(prev => ({ ...prev, [field]: date ? '' : `${field === 'startTime' ? 'Thời gian bắt đầu' : 'Thời gian kết thúc'} là bắt buộc` }));
    };

    const validateStep = () => {
        const newErrors = {};
        if (currentStep === 1) {
            if (!formData.title.trim()) newErrors.title = 'Tên workshop là bắt buộc';
            if (!formData.description.trim()) newErrors.description = 'Mô tả là bắt buộc';
            if (!formData.categoryId) newErrors.categoryId = 'Danh mục là bắt buộc';
            if (!formData.location.trim()) newErrors.location = 'Địa điểm là bắt buộc';
        } else if (currentStep === 2) {
            if (!formData.durationMinutes || formData.durationMinutes <= 0)
                newErrors.durationMinutes = 'Thời lượng phải lớn hơn 0';
            if (formData.price === '' || formData.price < 0)
                newErrors.price = 'Giá phải là số không âm';
            if (!formData.startTime) newErrors.startTime = 'Thời gian bắt đầu là bắt buộc';
            if (!formData.endTime) newErrors.endTime = 'Thời gian kết thúc là bắt buộc';
            if (formData.startTime && formData.endTime && dayjs(formData.startTime).isAfter(dayjs(formData.endTime)))
                newErrors.endTime = 'Thời gian kết thúc phải sau thời gian bắt đầu';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = async () => {
        if (validateStep()) {
            if (currentStep === 2) {
                const organizerId = localStorage.getItem('userId');
                if (!organizerId) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Lỗi',
                        text: 'Không tìm thấy thông tin người tổ chức. Vui lòng đăng nhập lại.',
                    });
                    navigate('/loginuser');
                    return;
                }

                const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
                if (!uuidRegex.test(organizerId)) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Lỗi',
                        text: 'Định dạng ID người tổ chức không hợp lệ. Vui lòng đăng nhập lại.',
                    });
                    navigate('/loginuser');
                    return;
                }

                const workshopData = {
                    ...formData,
                    organizerId,
                    durationMinutes: parseInt(formData.durationMinutes),
                    price: parseFloat(formData.price),
                    startTime: formData.startTime,
                    endTime: formData.endTime
                };

                try {
                    const response = await ApiService.createWorkshop(workshopData);
                    if (response.status === 200) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Thành công!',
                            text: 'Workshop đã được tạo thành công. Vui lòng chờ bộ phận kiểm duyệt duyệt workshop của bạn.',
                            confirmButtonText: 'OK'
                        }).then(() => {
                            setFormData({
                                title: '',
                                description: '',
                                categoryId: '',
                                location: '',
                                introVideoUrl: '',
                                durationMinutes: '',
                                price: '',
                                startTime: null,
                                endTime: null
                            });
                            setCurrentStep(1);
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Lỗi',
                            text: response.message || 'Không thể tạo workshop. Vui lòng thử lại.',
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Lỗi',
                        text: 'Đã xảy ra lỗi khi tạo workshop. Vui lòng thử lại.',
                    });
                }
            } else {
                setCurrentStep(currentStep + 1);
            }
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            setErrors({});
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-white text-sm font-medium mb-2">Tên Workshop</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-gray-200 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Nhập tên workshop"
                            />
                            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                        </div>

                        <div>
                            <label className="block text-white text-sm font-medium mb-2">Danh mục</label>
                            <Select
                                value={formData.categoryId || undefined}
                                onChange={handleCategoryChange}
                                className="w-full"
                                placeholder="Chọn danh mục"
                            >
                                {categories.map(category => (
                                    <Option key={category.id} value={category.id}>
                                        {category.name}
                                    </Option>
                                ))}
                            </Select>
                            {errors.categoryId && <p className="text-red-500 text-sm mt-1">{errors.categoryId}</p>}
                        </div>

                        <div>
                            <label className="block text-white text-sm font-medium mb-2">Địa điểm</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-gray-200 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Nhập địa điểm"
                            />
                            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                        </div>

                        <div>
                            <label className="block text-white text-sm font-medium mb-2">Mô tả</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-gray-200 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Nhập mô tả"
                                rows="4"
                            />
                            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-white text-sm font-medium mb-2">Thời lượng (phút)</label>
                            <input
                                type="number"
                                name="durationMinutes"
                                value={formData.durationMinutes}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-gray-200 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Nhập thời lượng"
                                min="1"
                            />
                            {errors.durationMinutes && <p className="text-red-500 text-sm mt-1">{errors.durationMinutes}</p>}
                        </div>

                        <div>
                            <label className="block text-white text-sm font-medium mb-2">Giá (VND)</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-gray-200 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Nhập giá"
                                min="0"
                            />
                            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                        </div>

                        <div>
                            <label className="block text-white text-sm font-medium mb-2">URL Video Giới thiệu</label>
                            <input
                                type="text"
                                name="introVideoUrl"
                                value={formData.introVideoUrl}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-gray-200 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Nhập URL video"
                            />
                        </div>

                        <div>
                            <label className="block text-white text-sm font-medium mb-2">Thời gian bắt đầu</label>
                            <DatePicker
                                showTime
                                value={formData.startTime ? dayjs(formData.startTime) : null}
                                onChange={(date) => handleDateTimeChange('startTime', date)}
                                className="w-full px-4 py-3 bg-gray-200 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Chọn thời gian bắt đầu"
                            />
                            {errors.startTime && <p className="text-red-500 text-sm mt-1">{errors.startTime}</p>}
                        </div>

                        <div>
                            <label className="block text-white text-sm font-medium mb-2">Thời gian kết thúc</label>
                            <DatePicker
                                showTime
                                value={formData.endTime ? dayjs(formData.endTime) : null}
                                onChange={(date) => handleDateTimeChange('endTime', date)}
                                className="w-full px-4 py-3 bg-gray-200 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Chọn thời gian kết thúc"
                            />
                            {errors.endTime && <p className="text-red-500 text-sm mt-1">{errors.endTime}</p>}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex h-screen">
            <OrganizerSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="flex flex-col flex-1 overflow-hidden">
                <OrganizerHeader />
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="mb-6">
                        <h2 className="text-3xl font-bold text-gray-900">Tạo Workshop</h2>
                        <p className="text-gray-600 mt-1">Tạo một workshop mới</p>
                    </div>

                    <div className="bg-slate-800 rounded-xl p-6 mb-8">
                        <div className="flex items-center justify-between mb-8">
                            {steps.map((step, index) => (
                                <div key={step.id} className="flex items-center">
                                    <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${currentStep >= step.id ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300'}`}>
                                        {step.id}
                                    </div>
                                    <span className={`ml-3 text-sm font-medium ${currentStep >= step.id ? 'text-white' : 'text-gray-400'}`}>
                                        {step.title}
                                    </span>
                                    {index < steps.length - 1 && (
                                        <div className={`mx-4 h-0.5 w-16 ${currentStep > step.id ? 'bg-blue-600' : 'bg-gray-600'}`} />
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="min-h-96">
                            {renderStepContent()}
                        </div>

                        <div className="flex justify-between mt-8 pt-6 border-t border-gray-700">
                            <button
                                onClick={handlePrevious}
                                disabled={currentStep === 1}
                                className={`px-6 py-2 rounded-lg font-medium ${currentStep === 1 ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
                            >
                                Quay lại
                            </button>

                            <button
                                onClick={handleNext}
                                className="px-6 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700"
                            >
                                {currentStep === 2 ? 'Tạo' : 'Tiếp theo'}
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default CreateWorkshop;