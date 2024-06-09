import React from "react";
import { FaQuoteLeft, FaStar, FaUserCircle } from "react-icons/fa";
const ReviewCard = () => {
  return (
    <div className="bg-white p-6 shadow-lg rounded-lg flex  flex-col justify-center items-center max-w-md mx-4 ">
      <FaQuoteLeft className=" text-amber-800 mb-4" size={30} />
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} className="text-yellow-500" />
        ))}
      </div>
      <p className="text-gray-600 mb-6 w-full text-center">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia,
        maiores corporis saepe asperiores in vero odio deserunt.
      </p>
      <div className="flex items-center">
        <FaUserCircle className="text-4xl text-gray-400 mr-4" />
        <div className="flex flex-col">
          <p className="font-bold text-gray-800">Krishna Pant</p>
          <p className="text-gray-500">Traveller / Photographer</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
