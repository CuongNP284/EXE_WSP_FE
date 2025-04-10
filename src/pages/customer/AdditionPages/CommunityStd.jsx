import React from 'react';
import CustomerHeader from '../../../components/customer/CustomerHeader';
import CustomeFooter from '../../../components/customer/CustomeFooter';
import { div } from 'framer-motion/client';

const CommunityStd = () => {
    return (
        <div className="min-h-screen">
            <CustomerHeader />

            <div className="bg-[#091238] min-h-screen flex flex-col">
                {/* Phần tiêu đề */}
                <div className="w-full relative pt-16 pb-20 px-6 md:px-16">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Cột trái - Nội dung văn bản */}
                        <div className="flex flex-col justify-center">
                            <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold mb-8">
                                Hướng Dẫn
                                <br />
                                Cộng Đồng
                            </h1>

                            <div className="space-y-6 text-white text-lg">
                                <p>
                                    Chúng tôi quy tụ một cộng đồng đa dạng gồm hàng triệu người để khám phá 
                                    nhiều trải nghiệm trực tiếp trên khắp thế giới. Chúng tôi rất coi trọng 
                                    sự toàn vẹn của nền tảng của mình. Chúng tôi đã phát triển Hướng Dẫn Cộng Đồng 
                                    để phác thảo những gì <span className="italic">không</span> được phép trên 
                                    thị trường của chúng tôi hoặc liên quan đến việc sử dụng dịch vụ của chúng tôi. 
                                    Ngoài ra, một số tính năng có thể có chính sách cụ thể; vui lòng xem lại{' '}
                                    <a href="#" className="text-white underline hover:text-gray-300">
                                        Hướng Dẫn Nội Dung Quảng Cáo
                                    </a> của chúng tôi để hiểu những gì có thể không được phép khi sử dụng các dịch vụ đó.
                                </p>
                            </div>
                        </div>

                        {/* Cột phải - Hình ảnh */}
                        <div className="relative">
                            <div className="h-[600px] w-2xl lg:max-w-lg lg:ml-auto">
                                <img
                                    src="https://media.istockphoto.com/id/540526464/photo/brilliant-ideas-in-the-making.jpg?s=612x612&w=0&k=20&c=N0YpZIKuldV0LfmKeLUl_nIkQrjDWbqk8W1vaEyyOrY="
                                    alt="Sự kiện cộng đồng với mọi người thưởng thức âm nhạc trực tiếp"
                                    className="object-cover w-full h-full rounded-lg shadow-lg"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Phần Xây dựng Cộng đồng Workshophy */}
                <div className="bg-white w-full py-16 px-6 md:px-16">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-[#091238] text-4xl md:text-5xl font-bold mb-6">
                            Xây Dựng Một Cộng Đồng Workshophy
                        </h2>

                        <div className="space-y-6 text-gray-800 text-lg">
                            <p>
                                Sứ mệnh của chúng tôi là gắn kết thế giới thông qua các trải nghiệm chung. 
                                Chúng tôi cung cấp một thị trường toàn cầu nơi bạn có thể tạo ra hoặc tìm kiếm 
                                các trải nghiệm trực tiếp khơi dậy đam mê của bạn, và chúng tôi cam kết hỗ trợ 
                                các nhà tổ chức sự kiện tổ chức những buổi họp mặt an toàn. Các giá trị cốt lõi 
                                của chúng tôi về sự tự do biểu đạt, an toàn thể chất, tính xác thực và phẩm giá 
                                định hướng cho cam kết này. Tìm hiểu thêm về Giá Trị Tin Cậy và An Toàn của chúng tôi{' '}
                                <a href="#" className="text-[#091238] underline hover:text-[#0f1d53]">tại đây</a>.
                            </p>

                            <p>
                                Hướng Dẫn Cộng Đồng của chúng tôi áp dụng cho tất cả nội dung được đăng tải trên nền tảng, 
                                bao gồm nhưng không giới hạn ở danh sách sự kiện, hình ảnh, video, email và nội dung được 
                                tạo ra bởi AI. Do tính chất độc đáo của thị trường của chúng tôi, các lệnh cấm này không chỉ 
                                áp dụng cho nội dung cụ thể được chia sẻ qua thị trường mà còn cho các hoạt động diễn ra tại 
                                một sự kiện trực tiếp được bán vé trên thị trường.
                            </p>

                            <p>
                                Trong một số bối cảnh, bao gồm nhưng không giới hạn ở học thuật hoặc giáo dục, nội dung có thể 
                                vi phạm theo cách khác có thể được chính sách của chúng tôi cho phép, theo quyết định riêng 
                                của chúng tôi, miễn là bối cảnh và nội dung thể hiện rõ ý định. Xin lưu ý rằng một số khía cạnh 
                                của Hướng Dẫn này được duy trì để tuân thủ các chính sách sử dụng chấp nhận được của các nhà 
                                xử lý thanh toán của chúng tôi, bao gồm nhưng không giới hạn ở một số hạn chế về cần sa, nội dung 
                                người lớn và cờ bạc. Ngoài ra, mặc dù các Hướng Dẫn này thường áp dụng trên toàn cầu, một số Hướng 
                                Dẫn có thể khác nhau ở một số khu vực pháp lý. Điều quan trọng là bạn phải tuân thủ luật pháp và 
                                quy định địa phương khi áp dụng. Dưới đây, bạn sẽ tìm thấy danh sách hiện tại của chúng tôi về nội 
                                dung bị cấm. Xin lưu ý rằng danh sách này (và các ví dụ minh họa) không đầy đủ, và chúng tôi có thể 
                                bổ sung hoặc cải thiện nó, vì vậy điều quan trọng là bạn tiếp tục kiểm tra thường xuyên để cập nhật 
                                bất kỳ sửa đổi hay thay đổi nào.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Phần Nội dung Vi phạm */}
                <div className="bg-gray-100 w-full py-16 px-6 md:px-16">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-[#091238] text-4xl md:text-5xl font-bold mb-10">
                            Nội Dung Vi Phạm
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Cột trái của các vi phạm */}
                            <div className="space-y-8">
                                {/* Lạm dụng & Quấy rối */}
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Lạm Dụng & Quấy Rối</h3>
                                    <p className="text-gray-700">
                                        Nội dung hoặc sự kiện thúc đẩy, đe dọa hoặc kích động bạo lực, quấy rối, bắt nạt hoặc 
                                        đe dọa đối với cá nhân hoặc nhóm. Điều này bao gồm lời nói thù hận, phân biệt đối xử, 
                                        đe dọa và nội dung tạo ra môi trường thù địch cho bất kỳ cộng đồng nào.
                                    </p>
                                </div>

                                {/* Gian lận & Sai lệch */}
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Gian Lận & Sai Lệch</h3>
                                    <p className="text-gray-700">
                                        Các sự kiện hoặc hoạt động được thiết kế để lừa dối hoặc gian lận người dùng, bao gồm 
                                        hàng giả, thực hành kinh doanh sai lệch, mô hình kim tự tháp hoặc sự kiện không thực sự 
                                        tồn tại. Việc mạo danh cá nhân hoặc tổ chức bị nghiêm cấm.
                                    </p>
                                </div>

                                {/* Hoạt động Nguy hiểm & Bất hợp pháp */}
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Hoạt Động Nguy Hiểm & Bất Hợp Pháp</h3>
                                    <p className="text-gray-700">
                                        Nội dung hoặc sự kiện quảng bá các hoạt động bất hợp pháp, tự làm hại bản thân, hành vi 
                                        nguy hiểm hoặc bất cứ điều gì gây rủi ro đáng kể cho người tham gia. Điều này bao gồm 
                                        quảng bá các chất gây hại, vũ khí hoặc hướng dẫn cho các hoạt động nguy hiểm.
                                    </p>
                                </div>
                            </div>

                            {/* Cột phải của các vi phạm */}
                            <div className="space-y-8">
                                {/* Vi phạm Quyền riêng tư */}
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Vi Phạm Quyền Riêng Tư</h3>
                                    <p className="text-gray-700">
                                        Chia sẻ thông tin cá nhân hoặc riêng tư mà không có sự đồng ý, bao gồm doxxing, 
                                        hình ảnh thân mật không được đồng ý, hoặc các sự kiện được thiết kế để thu thập thông 
                                        tin mà không có sự tiết lộ và đồng ý đúng đắn từ người tham gia.
                                    </p>
                                </div>

                                {/* Xâm phạm Quyền sở hữu trí tuệ */}
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Xâm Phạm Quyền Sở Hữu Trí Tuệ</h3>
                                    <p className="text-gray-700">
                                        Nội dung hoặc sự kiện vi phạm bản quyền, nhãn hiệu hoặc các quyền sở hữu trí tuệ khác. 
                                        Điều này bao gồm sử dụng trái phép tài liệu được bảo vệ, làm giả hoặc các sự kiện quảng 
                                        bá hành vi sao chép lậu hoặc phân phối trái phép.
                                    </p>
                                </div>

                                {/* Spam & Lạm dụng Nền tảng */}
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Spam & Lạm Dụng Nền Tảng</h3>
                                    <p className="text-gray-700">
                                        Đăng bài quá mức, sự kiện giả mạo, thao túng số liệu nền tảng một cách giả tạo, hoặc bất kỳ 
                                        nỗ lực nào để lạm dụng dịch vụ của chúng tôi. Điều này bao gồm tạo nhiều tài khoản để lách 
                                        các hạn chế hoặc cố gắng khai thác lỗ hổng trong hệ thống của chúng tôi.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Báo Cáo Vi Phạm</h3>
                            <p className="text-gray-700">
                                Nếu bạn gặp phải nội dung hoặc sự kiện vi phạm các hướng dẫn này, vui lòng báo cáo ngay lập tức 
                                qua <a href="#" className="text-[#091238] underline hover:text-[#0f1d53]">công cụ báo cáo</a> của chúng tôi. 
                                Đội ngũ Tin Cậy & An Toàn của chúng tôi sẽ xem xét tất cả các báo cáo và thực hiện hành động thích hợp. 
                                Chúng tôi cam kết duy trì tính toàn vẹn của nền tảng và đảm bảo một môi trường an toàn cho tất cả người dùng.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <CustomeFooter />
        </div>
    );
};

export default CommunityStd;