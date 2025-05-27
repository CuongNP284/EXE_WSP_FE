import React, { useState } from 'react';
import OrganizerSidebar from '../../components/organizer/OrganizerSidebar';
import OrganizerHeader from '../../components/organizer/OrganizerHeader';
import { Plus, Image, Trash2 } from 'lucide-react';

const CreateWorkshop = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        workshopName: '',
        workshopType: 'offline',
        venue: '',
        district: '',
        category: '',
        description: '',
        date: '',
        startTime: '',
        endTime: '',
        maxAttendees: '',
        tickets: [{ name: '', price: '' }],
        accountHolder: '',
        accountNumber: '',
        bankName: '',
        paymentInstructions: ''
    });
    const [errors, setErrors] = useState({});

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const steps = [
        { id: 1, title: 'Thông tin về Workshop', completed: false },
        { id: 2, title: 'Thời gian & Loại vé', completed: false },
        { id: 3, title: 'Thông tin thanh toán', completed: false }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleTicketChange = (index, field, value) => {
        const updatedTickets = [...formData.tickets];
        updatedTickets[index] = { ...updatedTickets[index], [field]: value };
        setFormData(prev => ({ ...prev, tickets: updatedTickets }));
        setErrors(prev => ({ ...prev, [`ticket${index}`]: '' }));
    };

    const addTicket = () => {
        setFormData(prev => ({
            ...prev,
            tickets: [...prev.tickets, { name: '', price: '' }]
        }));
    };

    const removeTicket = (index) => {
        if (formData.tickets.length > 1) {
            setFormData(prev => ({
                ...prev,
                tickets: prev.tickets.filter((_, i) => i !== index)
            }));
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[`ticket${index}`];
                return newErrors;
            });
        }
    };

    const validateStep = () => {
        const newErrors = {};
        if (currentStep === 1) {
            if (!formData.workshopName.trim()) newErrors.workshopName = 'Tên workshop là bắt buộc';
            if (!formData.workshopType) newErrors.workshopType = 'Hình thức workshop là bắt buộc';
            if (formData.workshopType === 'offline' && !formData.venue.trim()) newErrors.venue = 'Địa điểm là bắt buộc';
            if (formData.workshopType === 'offline' && !formData.district.trim()) newErrors.district = 'Phường là bắt buộc';
            if (!formData.category.trim()) newErrors.category = 'Quận/Huyện là bắt buộc';
            if (!formData.description.trim()) newErrors.description = 'Thể loại là bắt buộc';
        } else if (currentStep === 2) {
            if (!formData.date) newErrors.date = 'Ngày tổ chức là bắt buộc';
            if (!formData.startTime) newErrors.startTime = 'Giờ bắt đầu là bắt buộc';
            if (!formData.endTime) newErrors.endTime = 'Giờ kết thúc là bắt buộc';
            if (!formData.maxAttendees || formData.maxAttendees <= 0) newErrors.maxAttendees = 'Số lượng người tham gia tối đa phải lớn hơn 0';
            formData.tickets.forEach((ticket, index) => {
                if (!ticket.name.trim()) newErrors[`ticket${index}`] = `Tên vé ${index + 1} là bắt buộc`;
                if (!ticket.price || ticket.price < 0) newErrors[`ticket${index}`] = `Giá vé ${index + 1} phải lớn hơn hoặc bằng 0`;
            });
        } else if (currentStep === 3) {
            if (!formData.accountHolder.trim()) newErrors.accountHolder = 'Tên chủ tài khoản là bắt buộc';
            if (!formData.accountNumber.trim()) newErrors.accountNumber = 'Số tài khoản là bắt buộc';
            if (!formData.bankName.trim()) newErrors.bankName = 'Tên ngân hàng là bắt buộc';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep() && currentStep < 3) {
            setCurrentStep(currentStep + 1);
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
                            <label className="block text-white text-sm font-medium mb-2">
                                Tên Workshop
                            </label>
                            <input
                                type="text"
                                name="workshopName"
                                value={formData.workshopName}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-gray-200 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Nhập tên workshop"
                            />
                            {errors.workshopName && <p className="text-red-500 text-sm mt-1">{errors.workshopName}</p>}
                        </div>

                        <div>
                            <label className="block text-white text-sm font-medium mb-3">
                                Hình thức của workshop
                            </label>
                            <div className="flex space-x-4">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="workshopType"
                                        value="offline"
                                        checked={formData.workshopType === 'offline'}
                                        onChange={handleInputChange}
                                        className="w-4 h-4 text-blue-600"
                                    />
                                    <span className="text-white">Workshop Offline</span>
                                </label>
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="workshopType"
                                        value="online"
                                        checked={formData.workshopType === 'online'}
                                        onChange={handleInputChange}
                                        className="w-4 h-4 text-blue-600"
                                    />
                                    <span className="text-white">Workshop Online</span>
                                </label>
                            </div>
                            {errors.workshopType && <p className="text-red-500 text-sm mt-1">{errors.workshopType}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-white text-sm font-medium mb-2">
                                    Địa điểm tổ chức/Địa chỉ
                                </label>
                                <input
                                    type="text"
                                    name="venue"
                                    value={formData.venue}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-gray-200 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nhập địa điểm"
                                    disabled={formData.workshopType === 'online'}
                                />
                                {errors.venue && <p className="text-red-500 text-sm mt-1">{errors.venue}</p>}
                            </div>
                            <div>
                                <label className="block text-white text-sm font-medium mb-2">
                                    Phường
                                </label>
                                <input
                                    type="text"
                                    name="district"
                                    value={formData.district}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-gray-200 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Chọn phường"
                                    disabled={formData.workshopType === 'online'}
                                />
                                {errors.district && <p className="text-red-500 text-sm mt-1">{errors.district}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-white text-sm font-medium mb-2">
                                    Quận/Huyện
                                </label>
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-gray-200 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Chọn quận/huyện"
                                />
                                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-white text-sm font-medium mb-2">
                                Thể loại Workshop
                            </label>
                            <input
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-gray-200 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Chọn thể loại"
                            />
                            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                        </div>

                        <div>
                            <label className="block text-white text-sm font-medium mb-3">
                                Tải hình ảnh/video Workshop lên
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-200 rounded-lg h-40 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors">
                                    <Plus className="w-8 h-8 text-gray-600 mb-2" />
                                    <span className="text-gray-600 text-sm text-center">
                                        Thêm logo của<br />Workshop
                                    </span>
                                </div>
                                <div className="bg-gray-200 rounded-lg h-40 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors">
                                    <div className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center mb-2">
                                        <Plus className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="text-gray-600 text-sm text-center">
                                        Thêm ảnh của<br />Workshop
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-white text-sm font-medium mb-2">
                                Ngày tổ chức
                            </label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-gray-200 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-white text-sm font-medium mb-2">
                                    Giờ bắt đầu
                                </label>
                                <input
                                    type="time"
                                    name="startTime"
                                    value={formData.startTime}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-gray-200 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.startTime && <p className="text-red-500 text-sm mt-1">{errors.startTime}</p>}
                            </div>
                            <div>
                                <label className="block text-white text-sm font-medium mb-2">
                                    Giờ kết thúc
                                </label>
                                <input
                                    type="time"
                                    name="endTime"
                                    value={formData.endTime}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-gray-200 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.endTime && <p className="text-red-500 text-sm mt-1">{errors.endTime}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-white text-sm font-medium mb-2">
                                Số lượng người tham gia tối đa
                            </label>
                            <input
                                type="number"
                                name="maxAttendees"
                                value={formData.maxAttendees}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-gray-200 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Nhập số lượng"
                                min="1"
                            />
                            {errors.maxAttendees && <p className="text-red-500 text-sm mt-1">{errors.maxAttendees}</p>}
                        </div>

                        <div>
                            <label className="block text-white text-sm font-medium mb-3">
                                Loại vé
                            </label>
                            {formData.tickets.map((ticket, index) => (
                                <div key={index} className="flex items-center space-x-4 mb-4">
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            value={ticket.name}
                                            onChange={(e) => handleTicketChange(index, 'name', e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-200 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder={`Tên vé ${index + 1}`}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <input
                                            type="number"
                                            value={ticket.price}
                                            onChange={(e) => handleTicketChange(index, 'price', e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-200 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Giá vé (VND)"
                                            min="0"
                                        />
                                    </div>
                                    {formData.tickets.length > 1 && (
                                        <button
                                            onClick={() => removeTicket(index)}
                                            className="p-2 text-red-500 hover:text-red-700"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    )}
                                    {errors[`ticket${index}`] && <p className="text-red-500 text-sm mt-1">{errors[`ticket${index}`]}</p>}
                                </div>
                            ))}
                            <button
                                onClick={addTicket}
                                className="mt-2 flex items-center text-blue-500 hover:text-blue-700"
                            >
                                <Plus className="w-5 h-5 mr-2" />
                                Thêm loại vé
                            </button>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-white text-sm font-medium mb-2">
                                Tên chủ tài khoản
                            </label>
                            <input
                                type="text"
                                name="accountHolder"
                                value={formData.accountHolder}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-gray-200 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Nhập tên chủ tài khoản"
                            />
                            {errors.accountHolder && <p className="text-red-500 text-sm mt-1">{errors.accountHolder}</p>}
                        </div>

                        <div>
                            <label className="block text-white text-sm font-medium mb-2">
                                Số tài khoản
                            </label>
                            <input
                                type="text"
                                name="accountNumber"
                                value={formData.accountNumber}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-gray-200 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Nhập số tài khoản"
                            />
                            {errors.accountNumber && <p className="text-red-500 text-sm mt-1">{errors.accountNumber}</p>}
                        </div>

                        <div>
                            <label className="block text-white text-sm font-medium mb-2">
                                Tên ngân hàng
                            </label>
                            <input
                                type="text"
                                name="bankName"
                                value={formData.bankName}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-gray-200 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Nhập tên ngân hàng"
                            />
                            {errors.bankName && <p className="text-red-500 text-sm mt-1">{errors.bankName}</p>}
                        </div>

                        <div>
                            <label className="block text-white text-sm font-medium mb-2">
                                Hướng dẫn thanh toán
                            </label>
                            <textarea
                                name="paymentInstructions"
                                value={formData.paymentInstructions}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-gray-200 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Nhập hướng dẫn thanh toán (nếu có)"
                                rows="4"
                            />
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
                        <h2 className="text-3xl font-bold text-gray-900">Tạo một Workshop</h2>
                        <p className="text-gray-600 mt-1">Quản lý và theo dõi trạng thái các yêu cầu workshop</p>
                    </div>

                    <div className="bg-slate-800 rounded-xl p-6 mb-8">
                        <div className="flex items-center justify-between mb-8">
                            {steps.map((step, index) => (
                                <div key={step.id} className="flex items-center">
                                    <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${currentStep >= step.id
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-600 text-gray-300'
                                        }`}>
                                        {step.id}
                                    </div>
                                    <span className={`ml-3 text-sm font-medium ${currentStep >= step.id ? 'text-white' : 'text-gray-400'
                                        }`}>
                                        {step.title}
                                    </span>
                                    {index < steps.length - 1 && (
                                        <div className={`mx-4 h-0.5 w-16 ${currentStep > step.id ? 'bg-blue-600' : 'bg-gray-600'
                                            }`} />
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
                                className={`px-6 py-2 rounded-lg font-medium ${currentStep === 1
                                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                    : 'bg-gray-700 text-white hover:bg-gray-600'
                                    }`}
                            >
                                Quay lại
                            </button>

                            <button
                                onClick={handleNext}
                                disabled={currentStep === 3}
                                className={`px-6 py-2 rounded-lg font-medium ${currentStep === 3
                                    ? 'bg-green-600 text-white hover:bg-green-700'
                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                                    }`}
                            >
                                {currentStep === 3 ? 'Hoàn thành' : 'Tiếp tục'}
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default CreateWorkshop;