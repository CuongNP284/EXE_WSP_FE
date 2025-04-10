import React from 'react';
import CustomerHeader from '../../../components/customer/CustomerHeader';
import CustomeFooter from '../../../components/customer/CustomeFooter';

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "1. Giới Thiệu",
      content: `
        Workshophy cam kết bảo vệ quyền riêng tư của bạn khi sử dụng dịch vụ của chúng tôi (sau đây gọi là "Dịch Vụ"). Chính sách Bảo mật này giải thích cách chúng tôi thu thập, sử dụng, lưu trữ và bảo vệ thông tin cá nhân của bạn. Bằng cách sử dụng Dịch Vụ, bạn đồng ý với các điều khoản được nêu trong chính sách này. Nếu bạn không đồng ý, xin vui lòng không tiếp tục sử dụng Dịch Vụ.
      `,
    },
    {
      title: "2. Thông Tin Chúng Tôi Thu Thập",
      content: `
        Chúng tôi thu thập các loại thông tin sau khi bạn sử dụng Dịch Vụ:
        - **Thông tin cá nhân**: Bao gồm họ tên, địa chỉ email, số điện thoại, và thông tin thanh toán khi bạn đăng ký tài khoản hoặc mua vé workshop.
        - **Thông tin tự động**: Địa chỉ IP, loại thiết bị, trình duyệt, thời gian truy cập và các trang bạn đã xem trên Workshophy.
        - **Thông tin từ bên thứ ba**: Chúng tôi có thể nhận thông tin từ các đối tác thanh toán hoặc mạng xã hội nếu bạn sử dụng chúng để đăng nhập hoặc giao dịch.
        Bạn có quyền không cung cấp một số thông tin, nhưng điều này có thể ảnh hưởng đến trải nghiệm của bạn trên Dịch Vụ.
      `,
    },
    {
      title: "3. Cách Chúng Tôi Sử Dụng Thông Tin",
      content: `
        Workshophy sử dụng thông tin của bạn để:
        - Cung cấp và quản lý Dịch Vụ, bao gồm xử lý đơn mua vé và hỗ trợ khách hàng.
        - Cá nhân hóa trải nghiệm của bạn, như gợi ý các workshop phù hợp.
        - Gửi thông báo về sự kiện, cập nhật dịch vụ hoặc chương trình khuyến mãi (nếu bạn đồng ý nhận).
        - Phân tích và cải thiện Dịch Vụ, đảm bảo hệ thống hoạt động hiệu quả và an toàn.
        Chúng tôi không bán hoặc chia sẻ thông tin cá nhân của bạn với bên thứ ba vì mục đích thương mại mà không có sự đồng ý của bạn.
      `,
    },
    {
      title: "4. Chia Sẻ Thông Tin",
      content: `
        Chúng tôi chỉ chia sẻ thông tin của bạn trong các trường hợp sau:
        - Với nhà tổ chức workshop để họ quản lý danh sách tham gia.
        - Với các nhà cung cấp dịch vụ thanh toán để xử lý giao dịch của bạn.
        - Khi luật pháp yêu cầu hoặc để bảo vệ quyền lợi hợp pháp của Workshophy.
        Tất cả các bên thứ ba nhận thông tin từ chúng tôi đều được yêu cầu tuân thủ các tiêu chuẩn bảo mật nghiêm ngặt.
      `,
    },
    {
      title: "5. Bảo Mật Thông Tin",
      content: `
        Chúng tôi áp dụng các biện pháp kỹ thuật và tổ chức để bảo vệ thông tin của bạn khỏi truy cập trái phép, mất mát hoặc lạm dụng. Tuy nhiên, không có hệ thống nào đảm bảo an toàn tuyệt đối. Bạn nên sử dụng mật khẩu mạnh và không chia sẻ thông tin tài khoản với người khác để tăng cường bảo mật.
      `,
    },
    {
      title: "6. Quyền Của Bạn",
      content: `
        Bạn có các quyền sau đối với thông tin cá nhân của mình:
        - Yêu cầu truy cập, chỉnh sửa hoặc xóa thông tin mà chúng tôi lưu trữ.
        - Từ chối nhận thông tin tiếp thị từ chúng tôi bất kỳ lúc nào.
        - Rút lại sự đồng ý đã cung cấp trước đó (nếu có).
        Để thực hiện các quyền này, vui lòng liên hệ qua email: support@workshophy.com.
      `,
    },
    {
      title: "7. Thời Gian Lưu Trữ",
      content: `
        Chúng tôi lưu trữ thông tin cá nhân của bạn chỉ trong thời gian cần thiết để thực hiện các mục đích được nêu trong chính sách này, hoặc theo yêu cầu của pháp luật. Sau đó, thông tin sẽ được xóa hoặc ẩn danh một cách an toàn.
      `,
    },
    {
      title: "8. Cookie và Công Nghệ Tương Tự",
      content: `
        Workshophy sử dụng cookie để cải thiện trải nghiệm người dùng. Vui lòng tham khảo Tuyên bố về Cookie của chúng tôi để biết thêm chi tiết về cách chúng tôi sử dụng công nghệ này.
      `,
    },
    {
      title: "9. Thay Đổi Chính Sách",
      content: `
        Workshophy có quyền cập nhật Chính sách Bảo mật này bất kỳ lúc nào. Chúng tôi sẽ thông báo cho bạn qua email hoặc thông báo trên trang web nếu có thay đổi quan trọng. Việc bạn tiếp tục sử dụng Dịch Vụ sau khi có thay đổi đồng nghĩa với việc chấp nhận các điều khoản mới.
      `,
    },
    {
      title: "10. Luật Áp Dụng",
      content: `
        Chính sách này được điều chỉnh bởi luật pháp Việt Nam. Mọi tranh chấp liên quan sẽ được giải quyết tại tòa án có thẩm quyền tại Việt Nam.
      `,
    },
    {
      title: "11. Liên Hệ",
      content: `
        Nếu bạn có câu hỏi hoặc cần hỗ trợ về Chính sách Bảo mật, vui lòng liên hệ qua email: support@workshophy.com hoặc số điện thoại: (+84) 123 456 789. Chúng tôi luôn sẵn sàng giải đáp thắc mắc của bạn.
      `,
    },
  ];

  return (
    <div className="min-h-screen">
      <CustomerHeader />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#091238] to-[#0f1d53] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Chính Sách Bảo Mật</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Chào mừng bạn đến với Workshophy! Chúng tôi tôn trọng quyền riêng tư của bạn và cam kết bảo vệ thông tin cá nhân khi bạn sử dụng dịch vụ của chúng tôi.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Chính Sách Bảo Mật Workshophy</h2>
          <p className="text-gray-600 mb-8">
            Chính sách này áp dụng cho tất cả người dùng của Workshophy. Vui lòng đọc kỹ để hiểu cách chúng tôi xử lý thông tin của bạn.
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

export default PrivacyPolicy;