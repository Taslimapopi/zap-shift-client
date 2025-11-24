import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const ReviewCard = ({review}) => {

    const {userName,user_photoURL,review : testimonial} = review

    return (
        <div className="bg-white rounded-3xl shadow-lg p-8 max-w-xl mx-auto">
      
      {/* Quote Icon */}
      <FaQuoteLeft className="text-4xl text-[#A3D8D8] mb-4" />

      {/* Review Text */}
      <p className="text-[16px] leading-7 mb-6">
        {testimonial}
      </p>

      {/* Dashed Divider */}
      <div className="border-t border-dashed border-[#0B5C5C] my-6"></div>

      {/* User Info */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-[#004D4D]">
            <img src={user_photoURL} alt="" />
        </div>

        <div>
        <h3 className="font-semibold text-lg text-[#004D4D]">{userName}</h3>
          <p className="text-gray-600 text-sm">Senior Product Designer</p>
        </div>
      </div>
    </div>
    );
};

export default ReviewCard;