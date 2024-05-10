import React from "react";
import { IoLocation } from "react-icons/io5";
import { GiGreenhouse, GiPlantWatering } from "react-icons/gi";
import {
  MdOutlineBedroomParent,
  MdOutlineCarRepair,
  MdOutlineRoofing,
} from "react-icons/md";
import { RiCoupon3Line } from "react-icons/ri";
import { PiCallBellBold, PiMountains } from "react-icons/pi";

const SpecialityCard = ({ icon, title, description }) => {
  const iconMap = {
    "24/7 Hours Open": <IoLocation size={50} color="orange" />,
    "Great Environment": <GiGreenhouse size={50} color="orange" />,
    "Free Car Parking": <MdOutlineCarRepair size={50} color="orange" />,
    "Hotel Rooms": <MdOutlineBedroomParent size={50} color="orange" />,
    "Offer on Special Days": <RiCoupon3Line size={50} color="orange" />,
    "Open Terrace Restaurant": <MdOutlineRoofing size={50} color="orange" />,
    "On Order Food": <PiCallBellBold size={50} color="orange" />,
    "Tea Garden": <GiPlantWatering size={50} color="orange" />,
    "Mountain View": <PiMountains size={50} color="orange" />,
  };

  return (
    <article className=" md:col-span-1 col-span-4 flex justify-center items-center md:p-5 p-2">
      <div className="flex justify-center item-center w-full">
        <div className=" flex justify-center items-center w-[30%] md:w-[20%]">
          {iconMap[icon]}
        </div>
        <div className="flex flex-col justify-center items-start pl-2 w-[80%]">
          <h3 className="font-bold text-xl my-2 w-full">{title}</h3>
          <p className="text-left md:w-[80%] w-full">{description}</p>
        </div>
      </div>
    </article>
  );
};

export default SpecialityCard;
