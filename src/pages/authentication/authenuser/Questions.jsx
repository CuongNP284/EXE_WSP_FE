import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ApiService from '../../../service/ApiService';
import { useNavigate } from 'react-router-dom';

const Questions = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({
        hobbyTypes: [],
    });
    const [direction, setDirection] = useState('forward');
    const [completed, setCompleted] = useState(false);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await ApiService.getAllCategories();
            if (response.status === 200 && response.data) {
                setCategories(response.data.data.items.map(item => ({
                    id: item.categoryId,
                    name: item.name,
                })));
            }
        };
        fetchCategories();
    }, []);

    const questions = [
        {
            id: 'hobbyTypes',
            question: 'Bạn yêu thích những loại sở thích nào?',
            type: 'checkbox',
            options: categories.map(cat => cat.name),
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

    const nextQuestion = async () => {
        if (currentStep < questions.length - 1) {
            setDirection('forward');
            setCurrentStep((prev) => prev + 1);
        } else {
            setDirection('forward');
            const selectedIds = categories
                .filter(cat => answers.hobbyTypes.includes(cat.name))
                .map(cat => cat.id); // array of strings

            if (selectedIds.length > 0) {
                const result = await ApiService.handleFavouriteCategory({ categoryIds: selectedIds });
                if (result.status !== 200) {
                    console.error("Lưu category yêu thích thất bại:", result.message);
                }
            }

            setCompleted(true);
            navigate('/');
        }
    };

    const skipSurvey = () => {
        setDirection('forward');
        setCompleted(true);
        navigate('/');
    };

    const isNextDisabled = () => {
        const currentQuestion = questions[currentStep];
        if (currentQuestion.type === 'checkbox') {
            return (answers[currentQuestion.id] || []).length === 0;
        }
        return false;
    };

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

    const selectionVariants = {
        unselected: { scale: 1 },
        selected: { scale: 1.05 },
    };

    const checkboxVariants = {
        checked: { scale: 1, backgroundColor: '#3b82f6', borderColor: '#3b82f6' },
        unchecked: { scale: 1, backgroundColor: 'transparent', borderColor: '#9ca3af' }
    };

    return (
        <motion.div
            className="min-h-screen flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{ backgroundImage: `url('https://images.stockcake.com/public/6/5/4/6548b764-14da-4bc1-9adc-4190de4bce84_large/crafting-workshop-fun-stockcake.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <div className="w-full max-w-3xl">
                <AnimatePresence mode="wait" custom={direction}>
                    {!completed ? (
                        <motion.div
                            key="survey"
                            className="bg-white rounded-2xl shadow-xl overflow-hidden bg-opacity-90"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
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
                                        <motion.p
                                            className="text-gray-600 mb-4"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3, duration: 0.3 }}
                                        >
                                            Hãy chọn ít nhất 2 sở thích để chúng tôi gợi ý những workshop phù hợp nhất với bạn!
                                        </motion.p>

                                        <div className="space-y-4 mb-8">
                                            {questions[currentStep].type === 'checkbox' && (
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
                                            )}
                                        </div>

                                        <motion.div
                                            className="flex justify-between"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.4, duration: 0.3 }}
                                        >
                                            <motion.button
                                                onClick={skipSurvey}
                                                className="px-6 py-2 rounded-lg text-gray-600 font-medium hover:bg-gray-100"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                Bỏ qua khảo sát
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
                        <motion.div
                            key="completion"
                            className="bg-white rounded-2xl shadow-xl overflow-hidden bg-opacity-90"
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
                                    onClick={() => navigate('/')}
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