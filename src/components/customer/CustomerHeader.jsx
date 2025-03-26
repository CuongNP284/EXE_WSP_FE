import React from 'react'
import { User, Search, MenuIcon } from 'lucide-react';

const CustomerHeader = () => {
    return (
        <header className="bg-transparent px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold text-[#091238]">Workshophy</h1>
                <div className="relative flex-grow max-w-md">
                    <input
                        type="text"
                        placeholder="Bạn muốn trải nghiệm workshop gì?"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#091238]"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <a href="#" className="text-gray-600 hover:text-blue-600">Blog</a>
                <a href="#" className="text-gray-600 hover:text-blue-600">Tạo workshop</a>
                <a href="#" className="text-gray-600 hover:text-blue-600">Vé của bạn</a>
                <User className="text-gray-600" size={24} />
            </div>
        </header>
    )
}

export default CustomerHeader
