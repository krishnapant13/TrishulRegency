import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
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
  useEffect(() => {
    updateGuestData();
  }, [checkInDate, checkOutDate, guestCount]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateGuestData();
    const roomName = room.heading.toLowerCase().replace(/\s+/g, "-");
    navigate(`/booking/${roomName}-${room._id}`);
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
    <section className="flex flex-col justify-center items-center w-full">
      <div className="px-8 mt-5 py-10 md:w-[90%] w-full bg-orange-100 flex flex-col justify-center items-center md:mt-1">
        <p>Sub Total</p>
        <p className="text-2xl font-bold mb-3">₹{room?.price}</p>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col justify-center items-center"
        >
          <div>
            <label htmlFor="checkInDate" className="font-semibold">
              Check In
            </label>
            <div>
              <DatePicker
                id="checkInDate"
                selected={checkInDate}
                minDate={new Date()}
                onChange={handleCheckInDateChange}
                dateFormat="d MMM, yyyy"
                placeholderText="Select a date"
                className="p-3 focus:outline-none text-gray-400 "
              />
            </div>
          </div>
          <div className="mt-5">
            <label htmlFor="checkOutDate" className="font-semibold">
              Check Out
            </label>
            <div>
              <DatePicker
                id="checkOutDate"
                selected={checkOutDate}
                onChange={handleCheckOutDateChange}
                minDate={new Date(checkInDate.getTime() + 24 * 60 * 60 * 1000)}
                dateFormat="d MMM, yyyy"
                placeholderText="Select a date"
                className="p-3 focus:outline-none text-gray-400"
              />
            </div>
          </div>
          <div className="my-5">
            <label htmlFor="guestCount" className="font-semibold">
              Guest Count
            </label>
            <div>
              <input
                type="number"
                id="guestCount"
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
                className="focus:outline-none p-3"
              />
            </div>
          </div>
          {button && <Button title="Book Now" />}
        </form>
      </div>
      <div className="py-10 md:w-[90%] w-full bg-orange-100 flex  flex-col justify-center items-center my-10">
        <h2>Booking Help</h2>
        <p className="font-bold text-xl">+91 123 456 7890</p>
      </div>
    </section>
  );
};

export default BookNowPallet;
