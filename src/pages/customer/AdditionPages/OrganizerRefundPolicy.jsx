import React from 'react';
import CustomerHeader from '../../../components/customer/CustomerHeader';
import CustomeFooter from '../../../components/customer/CustomeFooter';

const OrganizerRefundPolicy = () => {
  const sections = [
    {
      title: "1. Giới Thiệu",
      content: `
        Workshophy yêu cầu tất cả Nhà Tổ Chức thiết lập chính sách hoàn tiền rõ ràng nhằm đảm bảo trải nghiệm công bằng cho người tham dự. Yêu cầu này áp dụng cho các sự kiện có thu phí được tổ chức trên nền tảng của chúng tôi.
      `,
    },
    {
      title: "2. Yêu Cầu Tối Thiểu Về Chính Sách Hoàn Tiền",
      content: `
        Nhà Tổ Chức phải:
        - Công khai chính sách hoàn tiền trên trang sự kiện trước khi bán vé.
        - Hoàn tiền đầy đủ (trừ phí dịch vụ của Workshophy) nếu sự kiện bị hủy hoặc thay đổi đáng kể (ví dụ: đổi địa điểm, ngày giờ).
        - Xử lý yêu cầu hoàn tiền trong vòng 7 ngày kể từ khi nhận được yêu cầu hợp lệ từ người tham dự.
      `,
    },
    {
      title: "3. Trường Hợp Workshophy Can Thiệp",
      content: `
        Workshophy có thể hoàn tiền thay mặt Nhà Tổ Chức trong các trường hợp sau:
        - Sự kiện bị hủy mà Nhà Tổ Chức không phản hồi yêu cầu hoàn tiền trong 7 ngày.
        - Có khiếu nại hợp lệ từ người tham dự về việc thông tin sự kiện không chính xác hoặc lừa đảo.
        - Phí dịch vụ của Workshophy sẽ không được hoàn lại trong mọi trường hợp.
      `,
    },
    {
      title: "4. Trách Nhiệm Của Nhà Tổ Chức",
      content: `
        - Bạn phải thông báo ngay cho Workshophy nếu sự kiện bị hủy hoặc thay đổi.
        - Đảm bảo có đủ ngân sách để hoàn tiền khi cần thiết, vì Workshophy sẽ khấu trừ số tiền hoàn từ khoản thanh toán của bạn nếu cần.
      `,
    },
    {
      title: "5. Quy Trình Yêu Cầu Hoàn Tiền",
      content: `
        - Người tham dự gửi yêu cầu trực tiếp đến Nhà Tổ Chức qua thông tin liên hệ trên trang sự kiện.
        - Nếu không nhận được phản hồi, họ có thể liên hệ Workshophy tại support@workshophy.com để yêu cầu hỗ trợ.
      `,
    },
    {
      title: "6. Thay Đổi Chính Sách",
      content: `
        Workshophy có quyền cập nhật yêu cầu này bất kỳ lúc nào. Nhà Tổ Chức sẽ được thông báo qua email nếu có thay đổi quan trọng.
      `,
    },
    {
      title: "7. Luật Áp Dụng",
      content: `
        Yêu cầu này được điều chỉnh bởi luật pháp Việt Nam. Mọi tranh chấp sẽ được giải quyết tại tòa án có thẩm quyền tại Việt Nam.
      `,
    },
    {
      title: "8. Liên Hệ",
      content: `
        Nếu bạn cần hỗ trợ về chính sách hoàn tiền, vui lòng liên hệ qua email: support@workshophy.com hoặc số điện thoại: (+84) 123 456 789.
      `,
    },
  ];

  return (
    <div className="min-h-screen">
      <CustomerHeader />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#091238] to-[#0f1d53] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Yêu Cầu Chính Sách Hoàn Tiền Của Nhà Tổ Chức</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Workshophy cam kết tạo điều kiện công bằng cho cả Nhà Tổ Chức và người tham dự. Vui lòng đọc kỹ các yêu cầu về chính sách hoàn tiền dưới đây.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Yêu Cầu Chính Sách Hoàn Tiền Workshophy</h2>
          <p className="text-gray-600 mb-8">
            Các yêu cầu này giúp đảm bảo quyền lợi của người tham dự và trách nhiệm của Nhà Tổ Chức trên nền tảng Workshophy.
          </p>

          {/* Sections */}
          {sections.map((section, index) => (
            <div key={index} className="mb-8">
              <h3 className="text-xl font-semibold text-[#091238] mb-3">{section.title}</h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{section.content}</p>
            </div>
          ))}

          {/* Last Updated */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm">
              Cập nhật lần cuối: <span className="font-medium">25/03/2025</span>
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Bạn Có Thắc Mắc?</h3>
          <p className="text-gray-600 mb-6">
            Nếu bạn cần thêm thông tin hoặc hỗ trợ, đừng ngần ngại liên hệ với chúng tôi.
          </p>
          <a
            href="mailto:support@workshophy.com"
            className="inline-block bg-[#091238] text-white px-6 py-3 rounded-md hover:bg-[#0f1d53] transition duration-300"
          >
            Liên Hệ Ngay
          </a>
        </div>
      </div>

      <CustomeFooter />
    </div>
  );
};

export default OrganizerRefundPolicy;