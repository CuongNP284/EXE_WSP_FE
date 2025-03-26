import React from 'react';
import CustomerHeader from '../../components/customer/CustomerHeader';
import CustomeFooter from '../../components/customer/CustomeFooter';

const TermsOfService = () => {
  const sections = [
    {
      title: "1. Chấp Nhận Điều Khoản",
      content: `
        Bằng việc truy cập và sử dụng dịch vụ của Workshophy (sau đây gọi là "Dịch Vụ"), bạn đồng ý tuân thủ các Điều Khoản Dịch Vụ này. Nếu bạn không đồng ý với bất kỳ điều khoản nào trong văn bản này, vui lòng không sử dụng Dịch Vụ. Workshophy có quyền sửa đổi hoặc cập nhật các điều khoản này bất kỳ lúc nào mà không cần thông báo trước. Việc bạn tiếp tục sử dụng Dịch Vụ sau khi có thay đổi đồng nghĩa với việc bạn chấp nhận các điều khoản đã được sửa đổi.
      `,
    },
    {
      title: "2. Đăng Ký Tài Khoản",
      content: `
        Để sử dụng một số tính năng của Dịch Vụ, bạn cần đăng ký tài khoản. Bạn cam kết cung cấp thông tin chính xác, đầy đủ và cập nhật khi đăng ký. Bạn chịu trách nhiệm bảo mật thông tin tài khoản của mình, bao gồm mật khẩu, và chịu trách nhiệm cho mọi hoạt động diễn ra dưới tài khoản của bạn. Workshophy không chịu trách nhiệm cho bất kỳ tổn thất nào phát sinh từ việc bạn không bảo mật thông tin tài khoản.
      `,
    },
    {
      title: "3. Mua Vé Workshop",
      content: `
        Workshophy cung cấp nền tảng để bạn mua vé tham gia các workshop. Giá vé và thông tin sự kiện được cung cấp bởi nhà tổ chức workshop, và Workshophy không chịu trách nhiệm cho bất kỳ sai sót nào trong thông tin này. Khi mua vé, bạn đồng ý thanh toán đầy đủ số tiền được hiển thị, bao gồm cả phí dịch vụ (nếu có). Thanh toán được thực hiện thông qua các cổng thanh toán bên thứ ba, và bạn đồng ý tuân thủ các điều khoản của họ.
      `,
    },
    {
      title: "4. Chính Sách Hoàn Tiền",
      content: `
        Chính sách hoàn tiền được quyết định bởi nhà tổ chức workshop. Workshophy chỉ đóng vai trò trung gian và không chịu trách nhiệm cho các quyết định hoàn tiền. Nếu bạn muốn yêu cầu hoàn tiền, vui lòng liên hệ trực tiếp với nhà tổ chức. Trong trường hợp workshop bị hủy, Workshophy sẽ hỗ trợ hoàn tiền theo chính sách của nhà tổ chức, trừ đi các khoản phí dịch vụ không hoàn lại.
      `,
    },
    {
      title: "5. Hành Vi Người Dùng",
      content: `
        Bạn đồng ý không sử dụng Dịch Vụ cho bất kỳ mục đích bất hợp pháp nào, bao gồm nhưng không giới hạn ở việc: (a) phát tán nội dung vi phạm bản quyền, (b) quấy rối hoặc đe dọa người dùng khác, (c) sử dụng Dịch Vụ để lừa đảo hoặc thực hiện các hành vi gian lận. Workshophy có quyền chấm dứt tài khoản của bạn nếu phát hiện bất kỳ hành vi vi phạm nào.
      `,
    },
    {
      title: "6. Quyền Sở Hữu Trí Tuệ",
      content: `
        Tất cả nội dung trên Workshophy, bao gồm nhưng không giới hạn ở văn bản, hình ảnh, logo, và thiết kế, đều thuộc sở hữu của Workshophy hoặc các đối tác của chúng tôi. Bạn không được sao chép, phân phối, hoặc sử dụng nội dung này mà không có sự cho phép bằng văn bản từ Workshophy.
      `,
    },
    {
      title: "7. Giới Hạn Trách Nhiệm",
      content: `
        Workshophy không chịu trách nhiệm cho bất kỳ thiệt hại trực tiếp, gián tiếp, ngẫu nhiên, hoặc hậu quả nào phát sinh từ việc sử dụng Dịch Vụ, bao gồm nhưng không giới hạn ở việc mất dữ liệu, mất lợi nhuận, hoặc gián đoạn kinh doanh. Dịch Vụ được cung cấp trên cơ sở "như hiện tại" và "theo khả năng sẵn có".
      `,
    },
    {
      title: "8. Bảo Mật và Quyền Riêng Tư",
      content: `
        Workshophy cam kết bảo vệ thông tin cá nhân của bạn theo Chính Sách Bảo Mật của chúng tôi. Tuy nhiên, bạn hiểu rằng việc truyền tải thông tin qua internet không bao giờ hoàn toàn an toàn, và Workshophy không thể đảm bảo tuyệt đối về bảo mật dữ liệu trong quá trình truyền tải.
      `,
    },
    {
      title: "9. Chấm Dứt Dịch Vụ",
      content: `
        Workshophy có quyền chấm dứt hoặc tạm ngưng quyền truy cập của bạn vào Dịch Vụ bất kỳ lúc nào, với hoặc không có lý do, mà không cần thông báo trước. Sau khi chấm dứt, bạn sẽ không còn quyền truy cập vào tài khoản hoặc bất kỳ nội dung nào liên quan đến tài khoản của bạn.
      `,
    },
    {
      title: "10. Luật Áp Dụng",
      content: `
        Các Điều Khoản Dịch Vụ này được điều chỉnh và giải thích theo luật pháp của Việt Nam. Mọi tranh chấp phát sinh từ hoặc liên quan đến Dịch Vụ sẽ được giải quyết tại tòa án có thẩm quyền tại Việt Nam.
      `,
    },
    {
      title: "11. Liên Hệ",
      content: `
        Nếu bạn có bất kỳ câu hỏi nào về Điều Khoản Dịch Vụ này, vui lòng liên hệ với chúng tôi qua email: support@workshophy.com hoặc số điện thoại: (+84) 123 456 789. Chúng tôi luôn sẵn sàng hỗ trợ bạn.
      `,
    },
  ];

  return (
    <div className=" min-h-screen">
      <CustomerHeader />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#091238] to-[#0f1d53] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Điều Khoản Dịch Vụ</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Chào mừng bạn đến với Workshophy! Vui lòng đọc kỹ các điều khoản dưới đây để hiểu rõ quyền và nghĩa vụ của bạn khi sử dụng dịch vụ của chúng tôi.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Điều Khoản Sử Dụng Dịch Vụ Workshophy</h2>
          <p className="text-gray-600 mb-8">
            Các điều khoản này áp dụng cho tất cả người dùng của Workshophy, bao gồm cả người mua vé và nhà tổ chức workshop. Vui lòng đọc kỹ trước khi sử dụng dịch vụ.
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

export default TermsOfService;