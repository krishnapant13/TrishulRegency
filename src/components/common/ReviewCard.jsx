import React from "react";
import { FaQuoteLeft, FaStar, FaUserCircle } from "react-icons/fa";

const ReviewCard = ({ guestName, avatar, roomName, rating, reviewText }) => {
  return (
    <div className="bg-white p-6 shadow-lg rounded-lg flex flex-col justify-center items-center max-w-md mx-4 transition-transform duration-300 hover:scale-105">
      <FaQuoteLeft className="text-amber-800 mb-4" size={30} />
      <div className="flex items-center mb-4">
        {[...Array(rating)].map((_, i) => (
          <FaStar key={i} className="text-yellow-500" />
        ))}
        {[...Array(5 - rating)].map((_, i) => (
          <FaStar key={i} className="text-gray-300" />
        ))}
      </div>
      <p className="text-gray-600 mb-4 w-full text-center">{reviewText}</p>
      <div className="flex items-center">
        <img
          src={avatar}
          alt={`${guestName}'s avatar`}
          className="w-12 h-12 rounded-full mr-4 border-2 border-gray-300"
        />
        <div className="flex flex-col">
          <p className="font-bold text-gray-800">{guestName}</p>
          <p className="text-gray-500 italic">{roomName}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
