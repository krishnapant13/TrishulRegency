import React from "react";
import logo from "../assets/TerracePeaksWhite.png";
import { CiFacebook, CiInstagram } from "react-icons/ci";
import { MdOutlineWhatsapp } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white">
      <div className="container mx-auto pt-10 flex flex-col md:flex-row items-center justify-center">
        <img
          src={logo}
          alt="Trishul Regency Logo"
          className="w-[25%] md:mr-10"
        />
        <nav className="md:mr-10">
          <ul>
            <li>About</li>
            <li>Staff</li>
          </ul>
        </nav>
        <nav>
          <ul>
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
        &copy; The Trishul Regency | All Rights Reserved | Developed By @nth__user
      </p>
    </footer>
  );
};

export default Footer;
