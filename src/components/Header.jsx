import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import whiteLogo from "../assets/TerracePeaksWhite.png";
import blackLogo from "../assets/Terrace Peaks.png";
import noUser from "../assets/noUser.jpeg";

const Header = ({ name, navOnly }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header
      className={`bg-cover bg-center ${
        name === "Rooms"
          ? " h-[50%] xl:h-[50%] lg:h-[40%]"
          : navOnly
          ? "md:h-0 h-[10%]"
          : "h-[40%]"
      } w-full md:flex flex-col justify-center items-center relative`}
      style={{
        backgroundImage:
          !navOnly &&
          "url('https://res.cloudinary.com/dutkerqvn/image/upload/v1714721348/IMG_5302_vikv0t.jpg')",
      }}
    >
      <div
        className={` md:fixed  absolute
         top-5 flex md:justify-between  justify-end  pr-2 md:pr-0 items-center md:w-[70%] w-full transition-all duration-150 ease-linear ${
           scrolled &&
           "md:bg-white md:rounded-full md:shadow-xl md:px-10 md:z-[50]"
         }`}
      >
        <Link to="/" className="md:w-[25%] w-[40%] cursor-pointer">
          <img
            src={navOnly || scrolled ? blackLogo : whiteLogo}
            alt="Terrace Peaks Logo"
          />
        </Link>
        <ul className="justify-center items-center hidden md:flex">
          <li
            className={`px-6 font-bold ${
              navOnly || scrolled ? "text-black" : "text-white"
            } `}
          >
            <Link to="/">Home</Link>
          </li>
          <li
            className={`px-6 font-bold ${
              navOnly || scrolled ? "text-black" : " text-white"
            }`}
          >
            <Link to="/rooms">Rooms</Link>
          </li>
          <li
            className={`px-6 font-bold ${
              navOnly || scrolled ? "text-black" : " text-white"
            }`}
          >
            <Link to="/about">About</Link>
          </li>
          <li
            className={`px-6 font-bold ${
              navOnly || scrolled ? "text-black" : " text-white"
            }`}
          >
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        <Link
          to="/profile"
          className=" w-10 h-10 rounded-full overflow-hidden cursor-pointer md:mr-10 md:ml-0 ml-16 shadow-xl"
        >
          <img src={noUser} alt="No User" className="bg-cover bg-center" />
        </Link>
      </div>
      {!navOnly && (
        <div className="flex flex-col justify-center items-center h-full">
          <h1 className="font-extrabold  tracking-widest uppercase text-2xl text-white">
            {name}
          </h1>
          <p className="md:block hidden tracking-widest capitalize text-center text-white">
            Elevate Your Stay Amidst Nature's Beauty
          </p>
        </div>
      )}
    </header>
  );
};

export default Header;
