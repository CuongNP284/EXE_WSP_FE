import React, { useState } from 'react';
import { ArrowRight, CheckCircle, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Questions = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({
        hobbyTypes: [],
        timeSpent: '',
        preferredEnvironment: '',
        socialPreference: '',
        learningPreference: '',
    });
    const [direction, setDirection] = useState('forward');
    const [completed, setCompleted] = useState(false);

    const questions = [
        {
            id: 'hobbyTypes',
            question: 'Bạn yêu thích những loại sở thích nào?',
            type: 'checkbox',
            options: [
                'Nghệ thuật sáng tạo (Vẽ, Tô màu, v.v.)',
                'Âm nhạc (Chơi nhạc cụ, Hát)',
                'Thể thao & Hoạt động thể chất',
                'Đọc sách & Viết lách',
                'Công nghệ & Trò chơi điện tử',
                'Nấu ăn & Ẩm thực',
                'Làm vườn & Chăm sóc cây',
                'Du lịch & Khám phá',
                'Sưu tầm (Tem, Thẻ, v.v.)',
                'Tự làm đồ & Thủ công',
            ],
        },
        {
            id: 'timeSpent',
            question: 'Bạn thường dành bao nhiêu thời gian cho sở thích mỗi tuần?',
            type: 'radio',
            options: [
                'Dưới 2 giờ',
                '2–5 giờ',
                '6–10 giờ',
                '11–15 giờ',
                'Trên 15 giờ',
            ],
        },
        {
            id: 'preferredEnvironment',
            question: 'Bạn thích thực hiện sở thích ở đâu?',
            type: 'radio',
            options: [
                'Tại nhà',
                'Ngoài trời, gần thiên nhiên',
                'Các địa điểm chuyên biệt (studio, phòng gym, v.v.)',
                'Không gian cộng đồng',
                'Khi đi du lịch',
            ],
        },
        {
            id: 'socialPreference',
            question: 'Bạn thích tham gia sở thích theo cách nào:',
            type: 'radio',
            options: [
                'Một mình / Tự lập',
                'Cùng người thân hoặc bạn bè thân thiết',
                'Trong nhóm nhỏ',
                'Trong cộng đồng lớn',
                'Linh hoạt tùy hoạt động',
            ],
        },
    ];

    const handleCheckboxChange = (questionId, option) => {
        setAnswers((prev) => {
            const currentSelections = prev[questionId] || [];
            if (currentSelections.includes(option)) {
                return {
                    ...prev,
                    [questionId]: currentSelections.filter((item) => item !== option),
                };
            } else {
                return { ...prev, [questionId]: [...currentSelections, option] };
            }
        });
    };

    const handleRadioChange = (questionId, option) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: option,
        }));
    };

    const nextQuestion = () => {
        if (currentStep < questions.length - 1) {
            setDirection('forward');
            setCurrentStep((prev) => prev + 1);
        } else {
            // Survey completed
            setDirection('forward');
            setCompleted(true);
        }
    };

    const prevQuestion = () => {
        if (currentStep > 0) {
            setDirection('backward');
            setCurrentStep((prev) => prev - 1);
        }
    };

    const isNextDisabled = () => {
        const currentQuestion = questions[currentStep];
        if (currentQuestion.type === 'checkbox') {
            return (answers[currentQuestion.id] || []).length === 0;
        } else {
            return !answers[currentQuestion.id];
        }
    };

    // Animation variants
    const pageVariants = {
        enter: (direction) => ({
            x: direction === 'forward' ? '100%' : '-100%',
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction) => ({
            x: direction === 'forward' ? '-100%' : '100%',
            opacity: 0,
        }),
    };

    const pageTransition = {
        type: 'tween',
        ease: 'easeInOut',
        duration: 0.4,
    };

    // Animation for checkbox and radio selection
    const selectionVariants = {
        unselected: { scale: 1 },
        selected: { scale: 1.05 },
    };

    const checkboxVariants = {
        checked: { scale: 1, backgroundColor: '#3b82f6', borderColor: '#3b82f6' },
        unchecked: { scale: 1, backgroundColor: 'transparent', borderColor: '#9ca3af' }
    };

    const radioVariants = {
        checked: { scale: 1 },
        unchecked: { scale: 0 }
    };

    return (
        <motion.div
            className="min-h-screen flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <div className="w-full max-w-3xl">
                <AnimatePresence mode="wait" custom={direction}>
                    {!completed ? (
                        <motion.div
                            key="survey"
                            className="bg-white rounded-2xl shadow-xl overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Progress bar */}
                            <motion.div
                                className="w-full bg-gray-200 h-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <motion.div
                                    className="bg-[#0A1338] h-2"
                                    initial={{ width: `${((currentStep) / questions.length) * 100}%` }}
                                    animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                                    transition={{ duration: 0.4 }}
                                ></motion.div>
                            </motion.div>

                            <div className="px-8 py-10 overflow-hidden">
                                <AnimatePresence mode="wait" custom={direction}>
                                    <motion.div
                                        key={currentStep}
                                        custom={direction}
                                        variants={pageVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={pageTransition}
                                        className="py-2"
                                    >
                                        <motion.h2
                                            className="text-3xl font-bold text-gray-800 mb-6"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2, duration: 0.3 }}
                                        >
                                            {questions[currentStep].question}
                                        </motion.h2>

                                        <div className="space-y-4 mb-8">
                                            {questions[currentStep].type === 'checkbox' ? (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {questions[currentStep].options.map((option, optionIndex) => {
                                                        const isSelected = (answers[questions[currentStep].id] || []).includes(option);
                                                        return (
                                                            <motion.div
                                                                key={option}
                                                                className={`p-4 border rounded-lg cursor-pointer ${isSelected
                                                                        ? 'border-blue-500 bg-blue-50'
                                                                        : 'border-gray-200 hover:border-blue-300'
                                                                    }`}
                                                                onClick={() =>
                                                                    handleCheckboxChange(questions[currentStep].id, option)
                                                                }
                                                                variants={selectionVariants}
                                                                whileHover={{ scale: 1.02 }}
                                                                animate={{
                                                                    ...(isSelected ? selectionVariants.selected : selectionVariants.unselected),
                                                                    opacity: 1,
                                                                    y: 0
                                                                }}
                                                                whileTap={{ scale: 0.98 }}
                                                                initial={{ opacity: 0, y: 10 }}
                                                                transition={{
                                                                    delay: 0.1 + optionIndex * 0.05,
                                                                    duration: 0.3
                                                                }}
                                                            >
                                                                <div className="flex items-center">
                                                                    <motion.div
                                                                        className={`w-5 h-5 border rounded mr-3 flex items-center justify-center ${isSelected
                                                                                ? 'bg-blue-500 border-blue-500'
                                                                                : 'border-gray-400'
                                                                            }`}
                                                                        variants={checkboxVariants}
                                                                        animate={isSelected ? "checked" : "unchecked"}
                                                                        transition={{ duration: 0.2 }}
                                                                    >
                                                                        {isSelected && (
                                                                            <motion.svg
                                                                                className="w-3 h-3 text-white"
                                                                                fill="currentColor"
                                                                                viewBox="0 0 20 20"
                                                                                initial={{ opacity: 0, scale: 0 }}
                                                                                animate={{ opacity: 1, scale: 1 }}
                                                                                transition={{ duration: 0.2 }}
                                                                            >
                                                                                <path
                                                                                    fillRule="evenodd"
                                                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                                    clipRule="evenodd"
                                                                                />
                                                                            </motion.svg>
                                                                        )}
                                                                    </motion.div>
                                                                    <span className="text-gray-700">{option}</span>
                                                                </div>
                                                            </motion.div>
                                                        );
                                                    })}
                                                </div>
                                            ) : (
                                                <div className="space-y-3">
                                                    {questions[currentStep].options.map((option, optionIndex) => {
                                                        const isSelected = answers[questions[currentStep].id] === option;
                                                        return (
                                                            <motion.div
                                                                key={option}
                                                                className={`p-4 border rounded-lg cursor-pointer ${isSelected
                                                                        ? 'border-blue-500 bg-blue-50'
                                                                        : 'border-gray-200 hover:border-blue-300'
                                                                    }`}
                                                                onClick={() => handleRadioChange(questions[currentStep].id, option)}
                                                                variants={selectionVariants}
                                                                whileHover={{ scale: 1.02 }}
                                                                whileTap={{ scale: 0.98 }}
                                                                initial={{ opacity: 0, y: 10 }}
                                                                animate={{
                                                                    ...(isSelected ? selectionVariants.selected : selectionVariants.unselected),
                                                                    opacity: 1,
                                                                    y: 0
                                                                }}
                                                                transition={{
                                                                    delay: 0.1 + optionIndex * 0.05,
                                                                    duration: 0.3
                                                                }}
                                                            >
                                                                <div className="flex items-center">
                                                                    <div
                                                                        className={`w-5 h-5 border rounded-full mr-3 flex items-center justify-center ${isSelected
                                                                                ? 'border-blue-500'
                                                                                : 'border-gray-400'
                                                                            }`}
                                                                    >
                                                                        <motion.div
                                                                            className="w-3 h-3 rounded-full bg-blue-500"
                                                                            variants={radioVariants}
                                                                            animate={isSelected ? "checked" : "unchecked"}
                                                                            initial={false}
                                                                            transition={{ duration: 0.2 }}
                                                                        />
                                                                    </div>
                                                                    <span className="text-gray-700">{option}</span>
                                                                </div>
                                                            </motion.div>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>

                                        <motion.div
                                            className="flex justify-between"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.4, duration: 0.3 }}
                                        >
                                            <motion.button
                                                onClick={prevQuestion}
                                                className={`px-6 py-2 rounded-lg text-gray-600 font-medium ${currentStep === 0 ? 'invisible' : 'hover:bg-gray-100'
                                                    }`}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                Quay lại
                                            </motion.button>
                                            <motion.button
                                                onClick={nextQuestion}
                                                disabled={isNextDisabled()}
                                                className={`px-6 py-3 rounded-lg text-white font-medium flex items-center ${isNextDisabled()
                                                        ? 'bg-gray-300 cursor-not-allowed'
                                                        : 'bg-blue-600 hover:bg-blue-700'
                                                    }`}
                                                style={!isNextDisabled() ? { backgroundColor: '#0A1338' } : {}}
                                                whileHover={!isNextDisabled() ? { scale: 1.05 } : {}}
                                                whileTap={!isNextDisabled() ? { scale: 0.95 } : {}}
                                            >
                                                {currentStep === questions.length - 1 ? 'Gửi' : 'Tiếp theo'}
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </motion.button>
                                        </motion.div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ) : (
                        // Thank you screen
                        <motion.div
                            key="completion"
                            className="bg-white rounded-2xl shadow-xl overflow-hidden"
                            custom={direction}
                            variants={pageVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={pageTransition}
                        >
                            <div className="px-8 py-16 flex flex-col items-center text-center">
                                <motion.div
                                    className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 20,
                                        delay: 0.2
                                    }}
                                >
                                    <CheckCircle className="h-12 w-12 text-green-500" />
                                </motion.div>
                                <motion.h2
                                    className="text-3xl font-bold text-gray-800 mb-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4, duration: 0.6 }}
                                >
                                    Cảm ơn bạn!
                                </motion.h2>
                                <motion.p
                                    className="text-gray-600 mb-8 max-w-md"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6, duration: 0.6 }}
                                >
                                    Chúng tôi rất trân trọng thời gian bạn đã dành để hoàn thành khảo sát này. Những câu trả lời của bạn sẽ giúp chúng tôi tạo ra những trải nghiệm tốt hơn.
                                </motion.p>
                                <motion.button
                                    onClick={() => console.log('Navigate to homepage')}
                                    className="px-8 py-3 rounded-lg text-white font-medium flex items-center"
                                    style={{ backgroundColor: '#0A1338' }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8, duration: 0.6 }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Home className="mr-2 h-5 w-5" />
                                    Về trang chủ
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Question indicator */}
                {!completed && (
                    <div className="mt-6 flex justify-center">
                        {questions.map((_, index) => (
                            <motion.div
                                key={index}
                                className={`w-2 h-2 rounded-full mx-1 ${index === currentStep ? 'bg-white' : 'bg-white bg-opacity-40'
                                    }`}
                                initial={{ scale: 0.8, opacity: 0.5 }}
                                animate={{
                                    scale: index === currentStep ? 1.2 : 1,
                                    opacity: index === currentStep ? 1 : 0.5
                                }}
                                transition={{ duration: 0.3 }}
                            ></motion.div>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default Questions;