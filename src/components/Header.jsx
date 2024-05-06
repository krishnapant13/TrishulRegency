import React from "react";
import logo from "../assets/TerracePeaksWhite.png";
import { useNavigate } from "react-router-dom";

const Header = ({ name }) => {
  const navigate = useNavigate();
  return (
    <div
      className="bg-cover bg-center h-[50%] w-full flex justify-center items-center "
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dutkerqvn/image/upload/v1714721348/IMG_5302_vikv0t.jpg')",
      }}
    >
      <div className="absolute md:top-10 top-5 flex md:justify-between justify-center items-center md:w-[70%] w-full">
        <img src={logo} className="md:w-[25%] w-[70%] " alt="" />
        <ul className=" justify-center items-center hidden md:flex">
          <li
            className="px-6 font-bold text-white cursor-pointer "
            onClick={() => navigate("/")}
          >
            Home
          </li>
          <li
            className="px-6 font-bold text-white cursor-pointer "
            onClick={() => navigate("/rooms")}
          >
            Rooms
          </li>
          <li
            className="px-6 font-bold text-white cursor-pointer "
            onClick={() => navigate("/about")}
          >
            About
          </li>
          <li
            className="px-6 font-bold text-white cursor-pointer "
            onClick={() => navigate("/contact")}
          >
            Contact
          </li>
        </ul>
      </div>
      <div className="flex flex-col justify-center items-center">
        <p className="font-bold tracking-widest uppercase text-[2em] text-white">
          {name}
        </p>
        <p className=" tracking-widest capitalize   text-center text-white">
          Elevate Your Stay Amidst Nature's Beauty
        </p>
      </div>
    </div>
  );
};

export default Header;
