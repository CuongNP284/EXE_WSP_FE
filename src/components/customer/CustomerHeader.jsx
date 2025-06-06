import React from 'react';
import { User, Search, Settings, LogOut } from 'lucide-react';
import { Dropdown } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService'; // Adjust the import path as needed

const CustomerHeader = () => {
    const navigate = useNavigate();

    const handleMenuClick = async ({ key }) => {
        switch (key) {
            case 'profile':
                navigate('/userprofile');
                break;
            case 'signout':
                const token = localStorage.getItem('token');
                if (token) {
                    const logoutData = { token };
                    const response = await ApiService.logoutUser(logoutData);
                    if (response.status === 200) {
                        navigate('/loginuser');
                    }
                }
                break;
            default:
                break;
        }
    };

    const items = [
        {
            key: 'profile',
            label: (
                <Link to="/profile" className="flex items-center space-x-2 px-2 py-1">
                    <User size={16} />
                    <span>Hồ sơ cá nhân</span>
                </Link>
            ),
        },
        {
            type: 'divider',
        },
        {
            key: 'signout',
            label: (
                <Link to="#" className="flex items-center space-x-2 px-2 py-1 text-red-600" onClick={(e) => e.preventDefault()}>
                    <LogOut size={16} />
                    <span>Đăng xuất</span>
                </Link>
            ),
        },
    ];

    return (
        <header className="bg-transparent px-4 py-3 flex items-center justify-between border-b border-gray-300">
            <div className="flex items-center space-x-4">
                <Link to="/"><h1 className="text-2xl font-bold text-[#091238]">Workshophy</h1></Link>
                <div className="relative flex-grow max-w-md">
                    <input
                        type="text"
                        placeholder="Bạn muốn trải nghiệm workshop gì?"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#091238]"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <Link to="/blog" className="text-gray-600 hover:text-blue-600">Blog</Link>
                <Link to="/faq" className="text-gray-600 hover:text-blue-600">FAQs</Link>
                <Link to="/aboutus" className="text-gray-600 hover:text-blue-600">Về chúng tôi</Link>
                <Link to="/tickets" className="text-gray-600 hover:text-blue-600">Vé của bạn</Link>
                <Dropdown
                    menu={{
                        items,
                        onClick: handleMenuClick,
                    }}
                    trigger={['click']}
                    placement="bottomRight"
                >
                    <div className="cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors">
                        <User className="text-gray-600" size={24} />
                    </div>
                </Dropdown>
            </div>
        </header>
    );
};

export default CustomerHeader;