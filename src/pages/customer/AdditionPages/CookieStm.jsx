import React from 'react';
import CustomerHeader from '../../../components/customer/CustomerHeader';
import CustomeFooter from '../../../components/customer/CustomeFooter';

const CookieStm = () => {
  const sections = [
    {
      title: "1. Cookie Là Gì?",
      content: `
        Cookie là các tệp dữ liệu nhỏ được lưu trữ trên thiết bị của bạn khi bạn truy cập Workshophy (sau đây gọi là "Dịch Vụ"). Chúng giúp chúng tôi ghi nhớ thông tin về bạn, cải thiện trải nghiệm sử dụng và phân tích cách bạn tương tác với Dịch Vụ.
      `,
    },
    {
      title: "2. Chúng Tôi Sử Dụng Cookie Như Thế Nào?",
      content: `
        Workshophy sử dụng cookie cho các mục đích sau:
        - **Cookie cần thiết**: Đảm bảo Dịch Vụ hoạt động bình thường, như đăng nhập tài khoản hoặc xử lý giao dịch mua vé.
        - **Cookie hiệu suất**: Thu thập dữ liệu về cách bạn sử dụng Dịch Vụ để chúng tôi cải thiện giao diện và tính năng.
        - **Cookie chức năng**: Ghi nhớ sở thích của bạn (ví dụ: ngôn ngữ hoặc khu vực) để cá nhân hóa trải nghiệm.
        - **Cookie quảng cáo**: Hiển thị các quảng cáo phù hợp với sở thích của bạn dựa trên hành vi duyệt web.
      `,
    },
    {
      title: "3. Các Loại Cookie Chúng Tôi Sử Dụng",
      content: `
        - **Cookie phiên**: Chỉ tồn tại trong phiên truy cập và bị xóa khi bạn đóng trình duyệt.
        - **Cookie lâu dài**: Được lưu trữ trên thiết bị của bạn trong một khoảng thời gian nhất định (thường từ vài ngày đến vài tháng).
        - **Cookie bên thứ ba**: Được đặt bởi các đối tác của chúng tôi (như Google Analytics hoặc các nền tảng quảng cáo) để hỗ trợ phân tích và tiếp thị.
      `,
    },
    {
      title: "4. Quản Lý Cookie",
      content: `
        Bạn có thể kiểm soát việc sử dụng cookie thông qua cài đặt trình duyệt của mình. Hầu hết các trình duyệt cho phép bạn:
        - Chặn tất cả cookie.
        - Xóa cookie đã lưu trữ.
        - Chấp nhận cookie chỉ từ các trang web cụ thể.
        Tuy nhiên, việc tắt cookie cần thiết có thể ảnh hưởng đến khả năng sử dụng một số tính năng của Dịch Vụ.
      `,
    },
    {
      title: "5. Công Nghệ Tương Tự",
      content: `
        Ngoài cookie, chúng tôi có thể sử dụng các công nghệ khác như:
        - **Pixel theo dõi**: Để đo lường hiệu quả quảng cáo.
        - **Bộ nhớ cục bộ (Local Storage)**: Lưu trữ dữ liệu tạm thời trên thiết bị của bạn.
        Những công nghệ này hoạt động tương tự cookie và cũng nhằm cải thiện trải nghiệm của bạn.
      `,
    },
    {
      title: "6. Đồng Ý Sử Dụng Cookie",
      content: `
        Khi bạn truy cập Dịch Vụ lần đầu, chúng tôi sẽ hiển thị thông báo về cookie. Nếu bạn tiếp tục sử dụng Dịch Vụ mà không thay đổi cài đặt, điều đó đồng nghĩa với việc bạn chấp nhận chính sách cookie của chúng tôi.
      `,
    },
    {
      title: "7. Bảo Mật Dữ Liệu Từ Cookie",
      content: `
        Dữ liệu thu thập từ cookie được bảo vệ theo Chính sách Bảo mật của chúng tôi. Chúng tôi không sử dụng cookie để thu thập thông tin nhạy cảm mà không có sự đồng ý rõ ràng từ bạn.
      `,
    },
    {
      title: "8. Thay Đổi Tuyên Bố Cookie",
      content: `
        Workshophy có thể cập nhật Tuyên bố về Cookie này để phản ánh các thay đổi trong công nghệ hoặc quy định pháp luật. Chúng tôi khuyến khích bạn kiểm tra lại trang này định kỳ để nắm thông tin mới nhất.
      `,
    },
    {
      title: "9. Luật Áp Dụng",
      content: `
        Tuyên bố này được điều chỉnh bởi luật pháp Việt Nam. Mọi tranh chấp liên quan sẽ được giải quyết tại tòa án có thẩm quyền tại Việt Nam.
      `,
    },
    {
      title: "10. Liên Hệ",
      content: `
        Nếu bạn có câu hỏi về việc sử dụng cookie hoặc cần thêm thông tin, vui lòng liên hệ qua email: support@workshophy.com hoặc số điện thoại: (+84) 123 456 789.
      `,
    },
  ];

  return (
    <div className="min-h-screen">
      <CustomerHeader />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#091238] to-[#0f1d53] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Tuyên Bố Về Cookie</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Chúng tôi sử dụng cookie để nâng cao trải nghiệm của bạn trên Workshophy. Hãy đọc kỹ để hiểu cách chúng tôi áp dụng công nghệ này.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Tuyên Bố Về Cookie Workshophy</h2>
          <p className="text-gray-600 mb-8">
            Tuyên bố này giải thích cách chúng tôi sử dụng cookie và công nghệ tương tự khi bạn truy cập Dịch Vụ.
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

export default CookieStm;