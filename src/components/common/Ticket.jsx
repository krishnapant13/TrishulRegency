import React from "react";
import { FaHotel } from "react-icons/fa6";
import logo from "../../assets/Terrace Peaks.png";
import bg from "../../assets/Snapseed.jpg";
import Button from "../Button";

const Ticket = ({ roomDetails, guestDetails }) => {
  const name = guestDetails?.firstName + " " + guestDetails?.lastName;
  return (
    <div className="h-screen flex justify-center items-center md:p-0 bg-orange-400 p-2">
      <div
        className="w-full md:w-[50%] h-auto md:h-[50%] bg-center bg-cover rounded-md relative overflow-hidden"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="absolute -left-9 top-1/2 -translate-y-1/2 w-16 h-16 bg-orange-400 rounded-full" />
        <div className="absolute -right-9 top-1/2 -translate-y-1/2 w-16 h-16 bg-orange-400 rounded-full" />
        <div className="md:h-[30%] h-[25%] flex justify-center items-center w-full border-b-[1px] border-black ">
          <div className="flex-col  justify-center items-center w-full">
            <p className=" font-extrabold text-xl md:text-2xl uppercase text-center">
              Monday
            </p>
            <p className="  text-sm  text-gray-700 text-center">1/1/2001</p>
          </div>
          <span className="w-[10%] h-[1px] bg-black mx-2" />
          <span className="w-[10%] h-[1px] bg-black mx-2" />
          <FaHotel size={80} />
          <span className="w-[10%] h-[1px] bg-black mx-2" />
          <span className="w-[10%] h-[1px] bg-black mx-2" />
          <div className="flex-col  justify-center items-center w-full">
            <p className=" font-extrabold text-xl md:text-2xl uppercase text-center">
              Friday
            </p>
            <p className="  text-sm  text-gray-700 text-center">1/1/2001</p>
          </div>
        </div>
        <div className="md:h-[70%] h-[75%] flex-col justify-center items-center w-full p-2 ">
          <img src={logo} className="w-[30%] m-auto mb-2" alt="" />
          <div className="grid grid-cols-2 justify-around items-center md:px-16 px-6">
            <div className=" col-span-1 flex flex-col justify-start items-start md:text-sm text-xs ">
              <h3 className="font-bold uppercase text-start w-full mb-1 text-base">
                Guest Details
              </h3>
              <p className="font-bold ">
                Name:{" "}
                <span className="font-normal"> {"Krishna Pant" || name}</span>
              </p>
              <p className="font-bold ">
                Country:{" "}
                <span className="font-normal">
                  {" "}
                  {"India" || guestDetails?.country}
                </span>
              </p>
              <p className="font-bold ">
                State:{" "}
                <span className="font-normal">
                  {" "}
                  {"Uttarakhand" || guestDetails?.state}
                </span>
              </p>
              <p className="font-bold ">
                Zip Code:{" "}
                <span className="font-normal">
                  {" "}
                  {"203639" || guestDetails?.zipCode}
                </span>
              </p>
              <p className="font-bold ">
                Guests:
                <span className="font-normal">
                  {" "}
                  {"2 Adults 0 Childrens" || guestDetails?.guestCount}
                </span>
              </p>
              <p className="font-bold ">
                Duration:{" "}
                <span className="font-normal">
                  {" "}
                  {"2 days 1 night" || guestDetails?.duration}
                </span>
              </p>
            </div>
            <div className=" col-span-1 flex flex-col justify-start items-start h-full md:text-sm text-xs ">
              <h3 className="font-bold uppercase text-start w-full mb-1 text-base">
                Room Details
              </h3>
              <p className="font-bold">
                Category:{" "}
                <span className="font-normal">
                  {"Deluxe Room" || roomDetails?.category}
                </span>
              </p>
              <p className="font-bold">
                Booked On:{" "}
                <span className="font-normal">
                  {" "}
                  {"1/1/2002" || new Date(roomDetails?.createdAt)}
                </span>
              </p>
              <p className="font-bold">
                Payment mode:{" "}
                <span className="font-normal">
                  {"Pay On Spot" || roomDetails?.paymentMethod}
                </span>
              </p>
              <p className="font-bold">
                Payment Status:{" "}
                <span className="font-normal">
                  {" "}
                  {"Unpaid" || roomDetails?.paymentStatus}
                </span>
              </p>
              <p className="font-bold">
                Price to pay :{" "}
                <span className="font-normal">
                  ₹{"2000" || roomDetails?.calculatedPrice}
                </span>
              </p>
            </div>
          </div>
          <button className="absolute md:bottom-3 bottom-1 right-3 md:w-[25%] w-[40%] bg-gradient-to-r from-orange-400 via-orange-500 to-red-400 text-white text-xs md:text-base font-bold p-2 shadow-lg rounded-lg shadow-gray-500">
            Cancel Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
