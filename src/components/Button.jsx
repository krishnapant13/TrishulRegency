import React from "react";

const Button = ({ title }) => {
  return (
    <button
      type="submit"
      className=" w-full h-full font-bold text-white capitalize bg-gradient-to-r from-orange-400 via-orange-500 to-red-400 p-3 overscroll-scroll"
    >
      <p className="hover:scale-125 duration-100 ease-linear">{title}</p>
    </button>
  );
};

export default Button;
