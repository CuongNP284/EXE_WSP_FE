import React from 'react'

const CustomeFooter = () => {
    return (
        <footer className="bg-[#091238] px-4 py-6">
            <div className="container mx-auto grid grid-cols-3 gap-8">
                {/* Company Info */}
                <div>
                    <h2 className="text-xl font-bold text-blue-600 mb-4">Workshophy</h2>
                    <p className="text-sm text-white">
                        Hệ thống quản lý và phân phối sự kiện
                        <br />
                        Workshophy Co. © 2025
                    </p>
                    <div className="mt-4 text-sm text-white">
                        <p>Hotline: 1900.2025</p>
                        <p>Email: support@workshophy.vn</p>
                    </div>
                </div>

                {/* Customer Services */}
                <div>
                    <h3 className="font-semibold mb-4 text-white">Dành cho Khách hàng</h3>
                    <ul className="space-y-2 text-sm text-white">
                        <li>Điều khoản sử dụng cho khách hàng</li>
                        <li>Bảo mật thông tin</li>
                        <li>Quy chế hoạt động</li>
                    </ul>
                </div>

                {/* Organization Services */}
                <div>
                    <h3 className="font-semibold mb-4 text-white">Dành cho Người Tổ chức</h3>
                    <ul className="space-y-2 text-sm text-white">
                        <li>Điều khoản sử dụng cho người tổ chức</li>
                        <li>Chính sách quyết toán chi phí</li>
                        <li>Chính sách hoàn tiền</li>
                        <li>Phương thức thanh toán</li>
                    </ul>
                </div>
            </div>

            {/* Business Registration */}
            <div className="mt-6 pt-4 border-t border-gray-200 text-xs text-white text-center">
                GCNĐKKD: [Số đăng ký kinh doanh]
                <br />
                Số kế hoạch và Đầu tư TP. Hồ Chí Minh
                <br />
                Cấp lần đầu ngày: DD/MM/YYYY
            </div>
        </footer>
    )
}

export default CustomeFooter
