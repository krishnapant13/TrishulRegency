import React, { useState } from "react";
import { FaRegUser, FaUser } from "react-icons/fa";
import { GoHome, GoHomeFill } from "react-icons/go";
import { IoCreateOutline, IoCreateSharp } from "react-icons/io5";
import { PiReadCvLogoBold, PiReadCvLogoFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const MobileNavbar = ({ setSelectedItem }) => {
  const [sidebarItems, setSidebarItems] = useState([
    { title: "Home", active: true, link: "/" },
    { title: "Rooms", active: false, link: "/rooms" },
    { title: "About", active: false, link: "/about" },
    { title: "Contact", active: false, link: "/contact" },
  ]);

  const navigate = useNavigate();
  const getIcon = (title, active) => {
    switch (title) {
      case "Home":
        return active ? (
          <GoHomeFill size={25} color="#660cf7" />
        ) : (
          <GoHome size={25} color="#333" />
        );
      case "Course":
        return active ? (
          <IoCreateSharp size={25} color="#660cf7" />
        ) : (
          <IoCreateOutline size={25} color="#333" />
        );
      case "Blog":
        return active ? (
          <PiReadCvLogoFill size={25} color="#660cf7" />
        ) : (
          <PiReadCvLogoBold size={25} color="#333" />
        );
      case "Profile":
        return active ? (
          <FaUser size={25} color="#660cf7" />
        ) : (
          <FaRegUser size={25} color="#333" />
        );
      default:
        return null;
    }
  };

  const handleClick = (index) => {
    const updatedItems = sidebarItems.map((item, i) => {
      if (i === index) {
        return { ...item, active: true };
      } else {
        return { ...item, active: false };
      }
    });
    setSidebarItems(updatedItems);
    setSelectedItem(sidebarItems[index].title);
  };
  return (
    <div className="sticky bottom-0  w-full h-fit bg-blue-100 rounded-t-[1em] xl:hidden flex justify-center items-center z-[99]">
      <ul className="sidebar-list flex justify-evenly items-center w-full">
        {sidebarItems.map((item, index) => (
          <li
            key={index}
            className={`sidebar-item p-2 rounded-full rounded-e-none items-center bg-cover bg-center bg-no-repeat `}
            onClick={() => handleClick(index)}
          >
            <div
              className="p-2 rounded-xl flex flex-col justify-center items-center"
              style={{ backgroundColor: `${item.active ? "#0003" : ""}` }}
            >
              <div onClick={() => navigate(item.link)}>
                {getIcon(item.title, item.active)}
              </div>
              <div className="text-[#660cf7] text-[0.5em]">{item.title}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MobileNavbar;
