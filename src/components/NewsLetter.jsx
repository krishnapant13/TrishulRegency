import React from "react";
import { CiMail } from "react-icons/ci";

const NewsLetter = () => {
  return (
    <div
      className="bg-cover bg-center h-fit p-10 w-full flex flex-col justify-center items-center "
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dutkerqvn/image/upload/v1714721348/IMG_5302_vikv0t.jpg')",
      }}
    >
      <p className=" tracking-widest capitalize  text-white">
        get updates regularly
      </p>
      <p className="font-bold tracking-widest capitalize text-[2em] text-white">
        Subscribe to our newsletter
      </p>
      <p className=" tracking-widest capitalize  text-white">
        Elevate Your Stay Amidst Nature's Beauty
      </p>
      <div className="relative md:w-[50%] w-[90%] mb-10">
        <input
          type="text"
          placeholder="Enter Email"
          className="w-[100%] p-4 bg-white text-black rounded-lg focus:outline-none mt-2"
        />
        <CiMail
          size={30}
          className="absolute top-1/2 right-4 -translate-y-1/2"
        />
      </div>
    </div>
  );
};

export default NewsLetter;
