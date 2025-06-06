import React from 'react'

const CustomeFooter = () => {
    return (
        <footer className="bg-[#091238] px-4 py-8">
            <div className="container mx-auto">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
                    {/* Company Info - Keep original */}
                    <div className="col-span-1">
                        <h2 className="text-xl font-bold text-white mb-4">Workshophy</h2>
                        <p className="text-sm text-white mb-4">
                            Hệ thống quản lý và phân phối sự kiện
                            <br />
                            Workshophy Co. © 2025
                        </p>
                        <div className="text-sm text-white mb-4">
                            <p>Hotline: 1900.2025</p>
                            <p>Email: support@workshophy.vn</p>
                        </div>
                    </div>

                    {/* Sử dụng Workshophy */}
                    <div>
                        <h3 className="font-semibold mb-4 text-white">Về Workshophy</h3>
                        <ul className="space-y-2 text-sm text-white">
                            <li><a href="/aboutus" className="hover:text-gray-300">Về chúng tôi</a></li>
                            <li><a href="/blog" className="hover:text-gray-300">Blog</a></li>
                            <li><a href="/communitystd" className="hover:text-gray-300">Hướng dẫn Cộng đồng</a></li>
                            <li><a href="/faq" className="hover:text-gray-300">FAQ</a></li>
                        </ul>
                    </div>

                    {/* Lên kế hoạch Workshop */}
                    <div>
                        <h4 className="text-sm font-medium text-white mb-2">Dành cho Nhà Tổ Chức</h4>
                        <ul className="space-y-2 text-sm text-white">
                            <li><a href="/legalterms" className="hover:text-gray-300">Điều Khoản Dịch Vụ</a></li>
                            <li><a href="/privacypolicy" className="hover:text-gray-300">Chính Sách Bảo Mật</a></li>
                            <li><a href="/cookiestm" className="hover:text-gray-300">Tuyên Bố Về Cookie</a></li>
                            <li><a href="/communitystd" className="hover:text-gray-300">Hướng Dẫn Cộng Đồng</a></li>
                            <li><a href="/selleragreement" className="hover:text-gray-300">Thỏa Thuận Nhà Bán Hàng</a></li>
                            <li><a href="/organizerrefundpolicy" className="hover:text-gray-300">Yêu Cầu Chính Sách Hoàn Tiền Của Nhà Tổ Chức</a></li>
                        </ul>
                    </div>

                    {/* Chính sách & Hỗ trợ */}
                    <div>
                        <h3 className="font-semibold mb-4 text-white">Chính sách & Hỗ trợ</h3>
                        <div className="mb-4">
                            <h4 className="text-sm font-medium text-white mb-2">Dành cho Khách hàng</h4>
                            <ul className="space-y-1 text-xs text-white">
                                <li><a href="/termsofservice" className="hover:text-gray-300">Điều Khoản Dịch Vụ</a></li>
                                <li><a href="/privacypolicy" className="hover:text-gray-300">Chính Sách Bảo Mật</a></li>
                                <li><a href="/cookiestm" className="hover:text-gray-300">Tuyên Bố Về Cookie</a></li>
                                <li><a href="/communitystd" className="hover:text-gray-300">Hướng Dẫn Cộng Đồng</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-white mb-2">Dành cho Người Tổ chức</h4>
                            <ul className="space-y-1 text-xs text-white">
                                <li><a href="/termsofservice" className="hover:text-gray-300">Điều Khoản Dịch Vụ</a></li>
                                <li><a href="/privacypolicy" className="hover:text-gray-300">Chính Sách Bảo Mật</a></li>
                                <li><a href="/cookiestm" className="hover:text-gray-300">Tuyên Bố Về Cookie</a></li>
                                <li><a href="/communitystd" className="hover:text-gray-300">Hướng Dẫn Cộng Đồng</a></li>
                                <li><a href="/selleragreement" className="hover:text-gray-300">Thỏa Thuận Nhà Bán Hàng</a></li>
                            <li><a href="/organizerrefundpolicy" className="hover:text-gray-300">Yêu Cầu Chính Sách Hoàn Tiền Của Nhà Tổ Chức</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Business Registration - Keep original */}
                <div className="pt-4 border-t border-gray-600 text-xs text-white text-center">
                    &copy; 2025 Workshophy Co. All rights reserved. <br />
                </div>
            </div>
        </footer>
    )
}

export default CustomeFooter