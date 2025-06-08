import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, ChevronRight, ChevronLeft, Users, ClipboardCheck, Newspaper, BarChart2, FileBadge, Layers } from 'lucide-react';

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { icon: <BarChart2 size={20} />, name: 'Bảng thống kê', link: '/admindashboard'},
    { icon: <ClipboardCheck size={20} />, name: 'Quản lý yêu cầu', link: '/requestlist' },
    { icon: <Users size={20} />, name: 'Quản lý người dùng', link: '/userlist' },
    { icon: <Newspaper size={20} />, name: 'Quản lý bài đăng', link: '/bloglist' },
    { icon: <FileBadge size={20} />, name: 'Quản lý danh hiệu', link: '/badgelist' },
    { icon: <Layers size={20} />, name: 'Quản lý danh mục', link: '/categorylist' },
    { icon: <Users size={20} />, name: 'Đăng xuất', link: '/loginuser' },
  ];

  return (
    <div 
      className={`bg-[#091238] text-white h-full transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-20'
      } relative`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {isOpen ? (
          <h1 className="text-xl font-bold">Workspace Admin</h1>
        ) : (
          <div className="mx-auto">
            <Menu size={24} />
          </div>
        )}
        <button 
          onClick={toggleSidebar}
          className="text-gray-400 hover:text-white absolute -right-3 top-10 bg-gray-800 rounded-full p-1"
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
      
      <div className="py-4">
        {menuItems.map((item, index) => (
          <Link 
            to={item.link}
            key={index} 
            className={`flex items-center py-3 px-4 cursor-pointer hover:bg-gray-700 no-underline ${
              item.active ? 'bg-gray-700' : ''
            }`}
          >
            <div className={isOpen ? '' : 'mx-auto'}>
              {item.icon}
            </div>
            {isOpen && <span className="ml-4 text-white">{item.name}</span>}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;