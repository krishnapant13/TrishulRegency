import React, { useState, useEffect, useRef } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaHome } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import { MdOutlineBedroomParent } from "react-icons/md";
import { GrContactInfo } from "react-icons/gr";
import { LiaHotelSolid } from "react-icons/lia";

const Navigators = () => {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const [active, setActiveIndex] = useState(() => {
    switch (location.pathname) {
      case "/":
        return 0;
      case "/rooms":
        return 1;
      case "/about":
        return 2;
      case "/contact":
        return 3;
      default:
        return 0; // Default to Home
    }
  });
  const calculateTop = (active) => {
    const topValue = active * 2 + 0.4;
    return `${topValue}em`;
  };
  const indicatorText = (active) => {
    switch (active) {
      case 1:
        return "Rooms";
      case 2:
        return "About";
      case 3:
        return "Contact";
      default:
        return "Home";
    }
  };
  const navigatorsRef = useRef(null);
  console.log(expanded);
  useEffect(() => {
    localStorage.setItem("activeIndex", active.toString());
    const handleOutsideClick = (e) => {
      if (
        expanded &&
        navigatorsRef.current &&
        !navigatorsRef.current.contains(e.target) &&
        e.target.tagName !== "svg"
      ) {
        setExpanded(false);
      }
    };
    if (expanded) {
      window.addEventListener("click", handleOutsideClick);
    }
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [expanded, active]);

  return (
    <div
      ref={navigatorsRef}
      className={`fixed ${
        expanded ? "h-auto" : ""
      } rounded-full top-[1em] p-3 left-[1em] h-[3em] w-[3em]  bg-gradient-to-r from-orange-400 via-orange-500 to-red-400  transition-all duration-1000 ease-in-out md:hidden ${
        !expanded && "cursor-pointer"
      }`}
      onClick={() => setExpanded(true)}
    >
      {expanded ? (
        <IoCloseSharp
          size={20}
          color={"white"}
          className={`cursor-pointer m-auto mb-2 z-9`}
          onClick={(e) => {
            e.stopPropagation(); // Stop event propagation
            setExpanded(false);
          }}
        />
      ) : (
        <GiHamburgerMenu
          size={20}
          color={"white"}
          className="cursor-pointer m-auto z-9"
          onClick={(e) => {
            e.stopPropagation(); // Stop event propagation
            setExpanded(true);
          }}
        />
      )}
      {expanded && (
        <div className="flex flex-col justify-center items-center relative pb-2">
          <div
            className={`absolute flex justify-center items-center left-[2em] transition-all duration-300 ease-in-out`}
            style={{
              top: calculateTop(active),
            }}
          >
            <div
              className="h-[1.5em] w-[0.2em] mr-2"
              style={{
                backgroundColor: location.pathname === "/" ? "black" : "white",
              }}
            />
            <p style={{ color: location.pathname === "/" ? "black" : "white" }}>
              {indicatorText(active)}
            </p>
          </div>

          <Link to="/" onClick={() => setActiveIndex(0)}>
            <FaHome
              size={17}
              className="m-2"
              color={active === 0 ? "black" : "white"}
            />
          </Link>
          <Link to="/rooms" onClick={() => setActiveIndex(1)}>
            <MdOutlineBedroomParent
              size={17}
              className="m-2"
              color={active === 1 ? "black" : "white"}
            />
          </Link>
          <Link to="/about" onClick={() => setActiveIndex(2)}>
            <LiaHotelSolid
              size={17}
              className="m-2"
              color={active === 2 ? "black" : "white"}
            />
          </Link>
          <Link to="/contact" onClick={() => setActiveIndex(3)}>
            <GrContactInfo
              size={17}
              className="m-2"
              color={active === 3 ? "black" : "white"}
            />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navigators;
