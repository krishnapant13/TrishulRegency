import React from "react";
import { Link } from "react-router-dom";
import whiteLogo from "../assets/TerracePeaksWhite.png";
import blackLogo from "../assets/Terrace Peaks.png";
import noUser from "../assets/noUser.jpeg";

const Header = ({ name, navOnly }) => {
  return (
    <header
      className={`bg-cover bg-center ${
        name === "Rooms"
          ? " h-[50%] xl:h-[50%] lg:h-[40%]"
          : navOnly
          ? "h-fit"
          : "h-[40%]"
      } w-full flex justify-center items-center relative`}
      style={{
        backgroundImage:
          !navOnly &&
          "url('https://res.cloudinary.com/dutkerqvn/image/upload/v1714721348/IMG_5302_vikv0t.jpg')",
      }}
    >
      <div className="absolute top-5 flex md:justify-between  justify-end  pr-2 md:pr-0 items-center md:w-[70%] w-full">
        <Link to="/" className="md:w-[25%] w-[40%] cursor-pointer">
          <img src={navOnly ? blackLogo : whiteLogo} alt="Terrace Peaks Logo" />
        </Link>
        <ul className="justify-center items-center hidden md:flex">
          <li
            className={`px-6 font-bold ${
              navOnly ? "text-black" : "text-white"
            } `}
          >
            <Link to="/">Home</Link>
          </li>
          <li
            className={`px-6 font-bold ${
              navOnly ? "text-black" : " text-white"
            }`}
          >
            <Link to="/rooms">Rooms</Link>
          </li>
          <li
            className={`px-6 font-bold ${
              navOnly ? "text-black" : " text-white"
            }`}
          >
            <Link to="/about">About</Link>
          </li>
          <li
            className={`px-6 font-bold ${
              navOnly ? "text-black" : " text-white"
            }`}
          >
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        <Link
          to="/"
          className=" w-10 h-10 rounded-full overflow-hidden cursor-pointer ml-16"
        >
          <img src={noUser} alt="No User" className="bg-cover bg-center" />
        </Link>
      </div>
      {navOnly && (
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-bold tracking-widest uppercase text-2xl text-white">
            {name}
          </h1>
          <p className="tracking-widest capitalize text-center text-white">
            Elevate Your Stay Amidst Nature's Beauty
          </p>
        </div>
      )}
    </header>
  );
};

export default Header;
