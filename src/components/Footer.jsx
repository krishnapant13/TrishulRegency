import React from "react";
import logo from "../assets/TerracePeaksWhite.png";
import { CiFacebook, CiInstagram } from "react-icons/ci";
import { MdOutlineWhatsapp } from "react-icons/md";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white pt-2">
      <img
        src={logo}
        alt="Trishul Regency Logo"
        className="w-[50%] md:w-[25%] m-auto"
      />
      <div className="container mx-auto pt-2 flex items-center justify-center">
        <nav className="md:mr-10 w-full">
          <ul className=" w-full flex justify-evenly items-center">
            <li>
              {" "}
              <Link to="/about">About</Link>{" "}
            </li>
            <li>Staff</li>
            <li>Services</li>
            <li>Restaurants</li>
          </ul>
        </nav>
      </div>
      <hr className="w-full bg-white my-10" />
      <div className="flex justify-center items-center mb-3">
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-3"
        >
          <CiFacebook size={30} />
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-3"
        >
          <CiInstagram size={30} />
        </a>
        <a
          href="https://web.whatsapp.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-3"
        >
          <MdOutlineWhatsapp size={30} />
        </a>
      </div>
      <p className="text-center">
        &copy; Hotel Trishul Regency | All Rights Reserved | Developed By
        @nth__user
      </p>
    </footer>
  );
};

export default Footer;
