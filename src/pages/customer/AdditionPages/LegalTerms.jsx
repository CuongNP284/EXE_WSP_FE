import React from 'react';
import { Link } from 'react-router-dom'; // Thêm Link từ react-router-dom
import CustomerHeader from '../../../components/customer/CustomerHeader';
import CustomeFooter from '../../../components/customer/CustomeFooter';

// Icons (bạn có thể thay thế các biểu tượng này bằng SVG thực tế hoặc sử dụng thư viện biểu tượng)
const ConsumerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const OrganizerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const LegalTerms = () => {
  const sections = [
    {
      icon: <ConsumerIcon />,
      title: 'Người Dùng',
      description: 'Duyệt, mua sắm, tương tác với người dùng Workshophy khác và quyền riêng tư của bạn',
      links: [
        { text: 'Điều Khoản Dịch Vụ', path: '/termsofservice' },
        { text: 'Chính Sách Bảo Mật', path: '/privacypolicy' },
        { text: 'Tuyên Bố Về Cookie', path: '/cookiestm' },
        { text: 'Hướng Dẫn Cộng Đồng', path: '/communitystd' },
        { text: 'Câu Hỏi Thường Gặp Về Bảo Vệ Dữ Liệu', path: '/faq-dataprotection' },
      ],
    },
    {
      icon: <OrganizerIcon />,
      title: 'Nhà Tổ Chức',
      description: 'Tạo tài khoản và sự kiện, xử lý thanh toán, hoàn tiền và quyền riêng tư dữ liệu',
      links: [
        { text: 'Điều Khoản Dịch Vụ', path: '/termsofservice' },
        { text: 'Chính Sách Bảo Mật', path: '/privacypolicy' },
        { text: 'Tuyên Bố Về Cookie', path: '/cookiestm' },
        { text: 'Hướng Dẫn Cộng Đồng', path: '/communitystd' },
        { text: 'Thỏa Thuận Nhà Bán Hàng', path: '/selleragreement' },
        { text: 'Yêu Cầu Chính Sách Hoàn Tiền Của Nhà Tổ Chức', path: '/organizerrefundpolicy' },
      ],
    },
  ];

  return (
    <div>
      <CustomerHeader />
      <div className="min-h-screen">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-3xl font-bold text-gray-900">Điều Khoản Pháp Lý</h1>
            <p className="mt-2 text-gray-600">
              Chào mừng bạn! Hãy tìm hiểu về các quy định pháp lý khi sử dụng Workshophy.
            </p>

            {/* Top Navigation */}
            <div className="mt-4 flex space-x-4">
              <Link to="/termsofservice" className="px-3 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200">
                Điều Khoản Dịch Vụ
              </Link>
              <Link to="/communitystd" className="px-3 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200">
                Hướng Dẫn Cộng Đồng
              </Link>
              <Link to="/privacypolicy" className="px-3 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200">
                Chính Sách Bảo Mật
              </Link>
              <Link to="/cookiestm" className="px-3 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200">
                Tuyên Bố Về Cookie
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sections.map((section, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-6">
                <div className="flex items-center mb-4">
                  {section.icon}
                  <h2 className="ml-4 text-xl font-semibold text-gray-800">{section.title}</h2>
                </div>
                <p className="text-gray-600 mb-4">{section.description}</p>
                <div className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <Link
                      key={linkIndex}
                      to={link.path}
                      className="block text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {link.text}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <CustomeFooter />
    </div>
  );
};

export default LegalTerms;