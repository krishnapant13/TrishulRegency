import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const BookNowPallet = ({ locationData, room, button }) => {
  const [checkInDate, setCheckInDate] = useState(
    new Date(locationData.checkInDate)
  );
  const [checkOutDate, setCheckOutDate] = useState(
    new Date(locationData.checkOutDate)
  );
  const [guestCount, setGuestCount] = useState(locationData.guestCount);

  const navigate = useNavigate();

  useEffect(() => {
    updateGuestData();
  }, [checkInDate, checkOutDate, guestCount]);
  const updateGuestData = () => {
    const guestData = {
      room: room,
      checkInDate: checkInDate.toISOString(),
      checkOutDate: checkOutDate.toISOString(),
      guestCount: guestCount.toString(),
      price: locationData.price,
    };
    localStorage.setItem("guestData", JSON.stringify(guestData));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateGuestData();
    navigate("/booking");
  };

  const handleCheckInDateChange = (date) => {
    setCheckInDate(date);
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    setCheckOutDate(nextDay);
  };

  const handleCheckOutDateChange = (date) => {
    setCheckOutDate(date);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="px-8 mt-5 py-10 md:w-[90%] w-full bg-orange-100 flex flex-col justify-center items-center md:mt-1">
        <p>Sub Total</p>
        <p className="text-[2em] mb-3">₹{room?.price}</p>
        <form onSubmit={handleSubmit}>
          <div className="relative">
            <p className=" font-semibold ">Check In</p>
            <div className="relative my-3">
              <DatePicker
                selected={checkInDate}
                minDate={new Date()}
                onChange={handleCheckInDateChange}
                dateFormat="d MMM, yyyy"
                placeholderText="Select a date"
                className="p-3 focus:outline-none text-gray-400"
              />
              <RiArrowDropDownLine
                size={30}
                className="absolute right-3 top-1/2 -translate-y-1/2 "
              />
            </div>
          </div>
          <div className="relative mt-5">
            <p className=" font-semibold ">Check Out</p>
            <div className="relative my-3">
              <DatePicker
                selected={checkOutDate}
                onChange={handleCheckOutDateChange}
                minDate={new Date(checkInDate.getTime() + 24 * 60 * 60 * 1000)}
                dateFormat="d MMM, yyyy"
                placeholderText="Select a date"
                className="p-3 focus:outline-none text-gray-400"
              />
              <RiArrowDropDownLine
                size={30}
                className=" absolute right-3 top-1/2 -translate-y-1/2 "
              />
            </div>
          </div>
          <div className=" my-5">
            <p className=" font-semibold ">Guest Count</p>
            <div className="relative my-3">
              <input
                type="number"
                value={guestCount}
                placeholder={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
                className="focus:outline-none p-3"
              />
            </div>
          </div>
          {button && <Button title="book now" />}
        </form>
      </div>
      <div className="py-[3em] md:w-[90%] w-full bg-orange-100 flex  flex-col justify-center items-center my-[3em]">
        <p>Booking Help</p>
        <p className="font-bold text-[1.5em]">+91 123 456 7890</p>
      </div>
    </div>
  );
};

export default BookNowPallet;
