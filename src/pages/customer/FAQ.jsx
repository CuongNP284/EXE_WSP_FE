import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, ShieldCheck, FileText, Scale } from 'lucide-react';
import CustomerHeader from '../../components/customer/CustomerHeader';
import CustomeFooter from '../../components/customer/CustomeFooter';

const FAQ = () => {
  const [openFAQs, setOpenFAQs] = useState({
    create: false,
    workshophy: false
  });

  const toggleFAQ = (faq) => {
    setOpenFAQs(prev => ({
      ...prev,
      [faq]: !prev[faq]
    }));
  };

  return (
    <div>
      <CustomerHeader />
      <div className="min-h-screen flex flex-col">
        {/* Phần Hero */}
        <div className="relative h-[500px] flex items-center justify-center overflow-hidden">
          <img
            src="https://cdn.shopify.com/s/files/1/0399/0395/3055/files/CooperateWorkshop_480x480.jpg?v=1652692572"
            alt="Nền Trung Tâm Giúp Đỡ"
            className="absolute inset-0 w-full h-full object-cover blur-xs"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 text-center px-8 py-10 bg-opacity-50 rounded-xl backdrop-blur-2xl shadow-lg max-w-3xl mx-4"
          >
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-5xl font-bold mb-4 text-white"
            >
              Trung Tâm Giúp Đỡ
            </motion.h1>
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-xl max-w-2xl mx-auto text-white"
            >
              Tìm câu trả lời cho câu hỏi của bạn và nhận sự hỗ trợ bạn cần
            </motion.p>
          </motion.div>
        </div>

        {/* Phần Câu Hỏi Thường Gặp */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold text-blue-900 mb-8 text-center"
            >
              Câu Hỏi Thường Gặp
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              {/* Mục Câu Hỏi 1 */}
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <button 
                  onClick={() => toggleFAQ('create')}
                  className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition"
                >
                  <span className="text-xl font-semibold text-blue-900">
                    Làm Thế Nào Để Tạo Tài Khoản?
                  </span>
                  <motion.div
                    animate={{ rotate: openFAQs.create ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="text-blue-900" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFAQs.create && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 text-gray-700 border-t">
                        Bạn có thể đăng ký bằng email hoặc tài khoản mạng xã hội. Chỉ cần nhấn "Đăng Ký" và làm theo hướng dẫn.
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mục Câu Hỏi 2 */}
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <button 
                  onClick={() => toggleFAQ('workshoophy')}
                  className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition"
                >
                  <span className="text-xl font-semibold text-blue-900">
                    Workshophy Là Gì?
                  </span>
                  <motion.div
                    animate={{ rotate: openFAQs.workshophy ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="text-blue-900" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFAQs.workshophy && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 text-gray-700 border-t">
                        Workshophy là một nền tảng được thiết kế để tạo ra những trải nghiệm trực tiếp chuyển biến, kết nối con người trên toàn cầu. Chúng tôi kết hợp công nghệ, sáng tạo và kết nối con người để truyền cảm hứng và biến đổi các tương tác.
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Separator Banner */}
        <div className="flex justify-center my-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="h-48 w-4xl overflow-hidden rounded-lg shadow-md relative"
          >
            <img 
              src="https://in.pito.vn/wp-content/uploads/2024/09/xay-dung-hinh-anh-doanh-nghiep-qua-workshop.webp" 
              alt="Workshop Banner" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
        
        {/* Rules Section */}
        <div className="bg-transparent py-16 mt-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-[#091238] mb-12">
              Quy Định Workshophy Bạn Không Nên Bỏ Qua
            </h2>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto"
            >
              {/* Privacy Policy */}
              <div className="flex flex-col items-center group cursor-pointer">
                <div className="bg-white rounded-xl p-6 mb-4 group-hover:shadow-xl transition-all">
                  <ShieldCheck className="w-16 h-16 text-blue-900 mx-auto" />
                </div>
                <h3 className="text-[#091238] text-xl font-semibold">
                  Chính Sách Riêng Tư
                </h3>
              </div>

              {/* Terms and Conditions */}
              <div className="flex flex-col items-center group cursor-pointer">
                <div className="bg-white rounded-xl p-6 mb-4 group-hover:shadow-xl transition-all">
                  <FileText className="w-16 h-16 text-blue-900 mx-auto" />
                </div>
                <h3 className="text-[#091238] text-xl font-semibold">
                  Điều Khoản và Điều Kiện
                </h3>
              </div>

              {/* Disclaimers */}
              <div className="flex flex-col items-center group cursor-pointer">
                <div className="bg-white rounded-xl p-6 mb-4 group-hover:shadow-xl transition-all">
                  <Scale className="w-16 h-16 text-blue-900 mx-auto" />
                </div>
                <h3 className="text-[#091238] text-xl font-semibold">
                  Tuyên Bố Miễn Trừ
                </h3>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <CustomeFooter />
    </div>
  );
};

export default FAQ;
