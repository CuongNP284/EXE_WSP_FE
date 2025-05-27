import React from 'react'

const OrganizerHeader = () => {
  return (
    <div className="bg-white shadow-sm h-16 flex items-center px-6 justify-between">
      <h1 className="text-xl font-semibold text-gray-800"></h1>
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
          <span className="font-semibold text-gray-600">JD</span>
        </div>
      </div>
    </div>
  );
}

export default OrganizerHeader
