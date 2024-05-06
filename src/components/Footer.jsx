import React from "react";
import logo from "../assets/TerracePeaksWhite.png";
import { CiFacebook, CiInstagram } from "react-icons/ci";
import { MdOutlineWhatsapp } from "react-icons/md";

const Footer = () => {
  return (
    <div className="w-full bg-black  h-contain flex flex-col p-10 justify-center items-center text-white">
      <div className="flex md:flex-row flex-col justify-evenly items-center p-10">
        <img src={logo} alt="logo" className="md:w-[30%] w-full" />
        <ul>
          <li>About</li>
          <li>Staff</li>
        </ul>
        <ul>
          <li>Services</li>
          <li>Restaurents</li>
        </ul>
      </div>
      <div className="w-full h-[1px] bg-white my-10"></div>
      <div className=" flex justify-around items-center m-3 w-[30%]">
        <CiFacebook size={30} />
        <CiInstagram size={30} />
        <MdOutlineWhatsapp size={30} />
      </div>
      <p className="mb-[3em]">
        &copy; Terrace Peaks Restaurant | All Rights Reserved | Made by :
        Krishna Pant (@nth__user)
      </p>
    </div>
  );
};

export default Footer;
