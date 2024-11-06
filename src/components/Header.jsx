import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import whiteLogo from "../assets/TerracePeaksWhite.png";
import blackLogo from "../assets/TrishulRegency.png";
import noUser from "../assets/noUser.jpeg";
import { useSelector } from "react-redux";
import Login from "./Login";

const Header = ({ name, navOnly, description }) => {
  const [scrolled, setScrolled] = useState(false);
  const isLogIn = localStorage.getItem("token");
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state) => state?.user?.userDetails);

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
           "md:bg-white md:rounded-full md:shadow-xl md:px-10 md:z-[53]"
         }`}
      >
        <Link to="/" className="md:w-[25%] w-[40%] cursor-pointer">
          <img
            src={navOnly || scrolled ? blackLogo : whiteLogo}
            alt="Trishul Regency  Logo"
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
          to={isLogIn && user ? `/profile/${user?._id}` : ""}
          className={`w-10 h-10 rounded-full overflow-hidden md:mr-10 md:ml-0 ml-16 ${
            isLogIn ? "shadow-xl  cursor-pointer" : "cursor-default "
          } `}
        >
          <img
            src={user && isLogIn ? user.avatar : noUser}
            alt="No User"
            className="bg-cover bg-center w-full h-full"
            onClick={()=> !isLogIn ? setShowModal(true) : "" }
          />
        </Link>
      </div>
      {!navOnly && (
        <div className="flex flex-col justify-center items-center h-full">
          <h1 className="font-extrabold  tracking-widest uppercase text-2xl text-white">
            {name}
          </h1>
          <p className="md:block hidden tracking-widest capitalize text-center text-white">
            {description}
          </p>
        </div>
      )}
      {showModal && <Login setShowModal={setShowModal} />}
    </header>
  );
};

export default Header;
