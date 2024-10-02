import React from "react";
import { CiMail } from "react-icons/ci";

const NewsLetter = () => {
  return (
    <section className="bg-cover bg-center h-fit  w-full flex flex-col justify-center items-center">
      <div
        className="bg-cover bg-center h-fit p-10 w-full flex flex-col justify-center items-center "
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dutkerqvn/image/upload/v1726290441/Room_urvbrx.jpg')",
        }}
        aria-hidden="true"
      >
        <p className="text-white tracking-widest capitalize">
          Get updates regularly
        </p>
        <h2 className="font-bold tracking-widest capitalize text-2xl text-white mb-4 text-center  ">
          Subscribe to our newsletter
        </h2>
        <p className="text-white tracking-widest capitalize text-center">
          Elevate Your Stay Amidst Nature's Beauty
        </p>
        <div className="relative md:w-[50%] w-[90%]">
          <input
            type="email"
            placeholder="Enter Email"
            className="w-full p-4 bg-white text-black rounded-lg focus:outline-none mt-2"
          />
          <CiMail
            size={30}
            className="absolute top-1/2 right-4 -translate-y-1/2 text-black"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
