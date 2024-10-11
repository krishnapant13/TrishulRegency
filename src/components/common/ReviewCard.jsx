import React, { useEffect, useState } from "react";
import { FaQuoteLeft, FaStar, FaUserCircle } from "react-icons/fa";
const ReviewCard = ({ name, profession, comment }) => {
  const [stars, setStars] = useState(5);
  useEffect(() => {
    const randomStars = Math.floor(Math.random() * (5 - 3 + 1)) + 3;
    setStars(randomStars);
  }, []);

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg flex  flex-col justify-center items-center max-w-md mx-4 ">
      <FaQuoteLeft className=" text-amber-800 mb-4" size={30} />
      <div className="flex items-center mb-4">
        {[...Array(stars)].map((_, i) => (
          <FaStar key={i} className="text-yellow-500" />
        ))}
      </div>
      <p className="text-gray-600 mb-6 w-full text-center">{comment}</p>
      <div className="flex items-center">
        <FaUserCircle className="text-4xl text-gray-400 mr-4" />
        <div className="flex flex-col">
          <p className="font-bold text-gray-800">{name}</p>
          <p className="text-gray-500">{profession}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
