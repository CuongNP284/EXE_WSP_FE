import React from 'react'
import CustomerHeader from '../../components/customer/CustomerHeader'
import CustomeFooter from '../../components/customer/CustomeFooter'
import { motion } from 'framer-motion';

const AboutUs = () => {
    const features = [
        {
            image: "https://lifevision.vn/wp-content/uploads/2024/07/workshop.jpg",
            title: "Live Experience Design",
            description: "Crafting immersive moments that connect people globally"
        },
        {
            image: "https://thienanagency.com/photos/all/khac/workshop-painting.jpg",
            title: "Creative Production",
            description: "Transforming ideas into unforgettable live experiences"
        },
        {
            image: "https://in.pito.vn/wp-content/uploads/2024/09/xay-dung-hinh-anh-doanh-nghiep-qua-workshop.webp",
            title: "Community Building",
            description: "Bringing people together through shared passion"
        }
    ];

    const updates = [
        {
            image: "https://in.pito.vn/wp-content/uploads/2024/09/xay-dung-hinh-anh-doanh-nghiep-qua-workshop.webp",
            date: "Wed, May 3, 9:30AM to 11:45AM",
            title: "New Features",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
            image: "https://lifevision.vn/wp-content/uploads/2024/07/workshop.jpg",
            date: "Wed, May 3, 9:30AM to 11:45AM",
            title: "New Features",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
            image: "https://thienanagency.com/photos/all/khac/workshop-painting.jpg",
            date: "Wed, May 3, 9:30AM to 11:45AM",
            title: "New Features",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        }
    ];

    return (
        <div>
            <CustomerHeader />
            <div className="min-h-screen flex flex-col">
                {/* Hero Section with Image */}
                <div className="relative h-[500px] flex items-center justify-center overflow-hidden">
                    <img
                        src="https://cdn.shopify.com/s/files/1/0399/0395/3055/files/CooperateWorkshop_480x480.jpg?v=1652692572"
                        alt="Workshop Experience"
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
                            Bringing Experiences to Life
                        </motion.h1>
                        <motion.p
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="text-xl max-w-2xl mx-auto text-white"
                        >
                            We create transformative live experiences that connect people across the globe
                        </motion.p>
                    </motion.div>
                </div>

                {/* About Us Section */}
                <div className="container mx-auto px-4 py-16 flex justify-center">
                    <div className="max-w-7xl grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            <h2 className="text-4xl font-bold text-blue-900 mb-4">About Us</h2>
                            <p className="text-gray-700 leading-relaxed text-lg">
                                We are passionate creators dedicated to designing extraordinary live experiences
                                that transcend boundaries. Our mission is to craft moments that inspire, connect,
                                and transform how people interact with the world around them.
                            </p>
                            <p className="text-gray-600">
                                With a deep commitment to innovation and storytelling, we bring together
                                technology, creativity, and human connection to create experiences that
                                resonate and leave a lasting impact.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <img
                                src="https://gogather.com/hubfs/Conference%20Workshop%20Ideas.png"
                                alt="About Us"
                                className="w-full h-auto rounded-lg shadow-lg"
                            />
                        </motion.div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="bg-white py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">
                            Features in Workshophy
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.5 }}
                                    className="group relative overflow-hidden"
                                >
                                    <div className="aspect-w-16 aspect-h-9">
                                        <img
                                            src={feature.image}
                                            alt={feature.title}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="mt-4 text-center">
                                        <h3 className="text-xl font-semibold text-blue-900 mb-2">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            {feature.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Updates Section */}
                <div className="py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">
                            Our Previous Updates
                        </h2>
                        <div className="space-y-12">
                            {updates.map((update, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''
                                        }`}
                                >
                                    <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                                        <img
                                            src={update.image}
                                            alt={update.title}
                                            className="w-full h-auto rounded-lg shadow-lg"
                                        />
                                    </div>
                                    <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                                        <span className="text-sm text-gray-500 mb-2 block">
                                            {update.date}
                                        </span>
                                        <h3 className="text-2xl font-semibold text-blue-900 mb-4">
                                            {update.title}
                                        </h3>
                                        <p className="text-gray-700 leading-relaxed">
                                            {update.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <CustomeFooter />
        </div>
    )
}

export default AboutUs
