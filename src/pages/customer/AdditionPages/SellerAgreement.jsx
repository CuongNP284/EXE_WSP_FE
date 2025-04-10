import React from 'react';
import CustomerHeader from '../../../components/customer/CustomerHeader';
import CustomeFooter from '../../../components/customer/CustomeFooter';

const SellerAgreement = () => {
  const sections = [
    {
      title: "1. Giới Thiệu",
      content: `
        Thỏa Thuận Nhà Bán Hàng này áp dụng cho các cá nhân hoặc tổ chức (sau đây gọi là "Nhà Tổ Chức") sử dụng Workshophy để tạo, quản lý và bán vé cho các sự kiện. Bằng cách đăng ký làm Nhà Tổ Chức, bạn đồng ý tuân thủ các điều khoản dưới đây cùng với Điều Khoản Dịch Vụ và Chính Sách Bảo Mật của chúng tôi.
      `,
    },
    {
      title: "2. Trách Nhiệm Của Nhà Tổ Chức",
      content: `
        - Bạn chịu trách nhiệm cung cấp thông tin chính xác và đầy đủ về sự kiện, bao gồm thời gian, địa điểm, giá vé và chính sách hoàn tiền.
        - Bạn cam kết tuân thủ luật pháp Việt Nam và các quy định liên quan khi tổ chức sự kiện.
        - Workshophy chỉ là nền tảng trung gian, bạn chịu trách nhiệm chính cho việc thực hiện sự kiện và xử lý các vấn đề phát sinh với người tham dự.
      `,
    },
    {
      title: "3. Quyền Của Workshophy",
      content: `
        - Workshophy có quyền từ chối hoặc xóa sự kiện nếu phát hiện nội dung vi phạm pháp luật, đạo đức hoặc chính sách của chúng tôi.
        - Chúng tôi có thể giữ lại một phần phí dịch vụ trong trường hợp cần xử lý hoàn tiền thay mặt bạn, theo yêu cầu của người tham dự hoặc quy định pháp luật.
      `,
    },
    {
      title: "4. Xử Lý Thanh Toán",
      content: `
        - Workshophy sẽ thu tiền vé từ người tham dự và chuyển khoản cho bạn sau khi trừ phí dịch vụ đã thỏa thuận.
        - Bạn đồng ý cung cấp thông tin tài khoản ngân hàng chính xác để nhận thanh toán. Thời gian chuyển khoản có thể mất từ 3-7 ngày làm việc sau khi sự kiện kết thúc.
      `,
    },
    {
      title: "5. Bảo Mật Dữ Liệu",
      content: `
        - Workshophy sẽ xử lý thông tin người tham dự thay mặt bạn theo vai trò "Bên Xử Lý Dữ Liệu". Bạn có trách nhiệm đảm bảo rằng thông tin thu thập được sử dụng hợp pháp.
        - Nếu người tham dự yêu cầu xóa dữ liệu cá nhân, bạn cần thông báo cho chúng tôi qua email: support@workshophy.com để thực hiện.
      `,
    },
    {
      title: "6. Chấm Dứt Thỏa Thuận",
      content: `
        - Workshophy có quyền chấm dứt thỏa thuận này nếu bạn vi phạm các điều khoản hoặc gây thiệt hại cho người dùng khác.
        - Sau khi chấm dứt, bạn vẫn chịu trách nhiệm hoàn thành các nghĩa vụ liên quan đến sự kiện đã tổ chức trước đó.
      `,
    },
    {
      title: "7. Luật Áp Dụng",
      content: `
        Thỏa thuận này được điều chỉnh bởi luật pháp Việt Nam. Mọi tranh chấp sẽ được giải quyết tại tòa án có thẩm quyền tại Việt Nam.
      `,
    },
    {
      title: "8. Liên Hệ",
      content: `
        Nếu bạn có thắc mắc về Thỏa Thuận Nhà Bán Hàng, vui lòng liên hệ qua email: support@workshophy.com hoặc số điện thoại: (+84) 123 456 789.
      `,
    },
  ];

  return (
    <div className="min-h-screen">
      <CustomerHeader />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#091238] to-[#0f1d53] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Thỏa Thuận Nhà Bán Hàng</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Chào mừng bạn đến với Workshophy! Thỏa thuận này quy định trách nhiệm và quyền lợi của Nhà Tổ Chức khi sử dụng dịch vụ của chúng tôi.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Thỏa Thuận Nhà Bán Hàng Workshophy</h2>
          <p className="text-gray-600 mb-8">
            Vui lòng đọc kỹ các điều khoản dưới đây để hiểu rõ vai trò của bạn khi trở thành Nhà Tổ Chức trên Workshophy.
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

export default SellerAgreement;