import React, { useEffect, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import DatePicker from "react-datepicker";
import roomData from "../rooms.json";
import NewsLetter from "./NewsLetter";
import Footer from "./Footer";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const Rooms = () => {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guestCount, setGuestCount] = useState(2);
  const [showCheckInDatePicker, setShowCheckInDatePicker] = useState(false);
  const [showCheckoutDatePicker, setShowCheckoutDatePicker] = useState(false);

  useEffect(() => {
    const currentDate = new Date();
    setCheckInDate(currentDate);

    const nextDay = new Date(currentDate);
    nextDay.setDate(nextDay.getDate() + 1);
    setCheckOutDate(nextDay);
  }, []);

  const handleCheckInDateSelect = (date) => {
    setCheckInDate(date);
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    setCheckOutDate(nextDay);
    setShowCheckInDatePicker(false);
  };
  const handleCheckOutDateSelect = (date) => {
    setCheckOutDate(date);
    setShowCheckoutDatePicker(false);
  };

  const handleGuestCountChange = (e) => {
    setGuestCount(e.target.value);
  };

  const handleRoomClick = (room) => {
    navigate(`/room/${room?.id}`, {
      state: {
        checkInDate: checkInDate.toISOString(),
        checkOutDate: checkOutDate.toISOString(),
        guestCount: guestCount,
        price: room?.price,
      },
    });
  };

  const navigate = useNavigate();
  return (
    <div className="relative h-screen w-full">
      <Header name="Rooms" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95%] md:w-[55%] h-[15vh] bg-black shadow-xl flex justify-center items-center">
        <div className=" flex flex-col justify-center items-center bg-white w-full h-full">
          <p className=" text-[0.7em] font-bold text-gray-500 w-full text-start pl-5 uppercase">
            check in
          </p>
          <div className="flex justify-center items-center w-full">
            <div className="  text-black w-full text-start pl-5 uppercase">
              <span className=" font-bold md:text-[1.5em]">
                {checkInDate ? checkInDate.getDate() : 12}
              </span>
              <span className="text-[0.8em]">
                {checkInDate
                  ? " / " +
                    checkInDate.toLocaleDateString("en-US", {
                      month: "short",
                    })
                  : ""}
              </span>
            </div>
            <RiArrowDropDownLine
              size={50}
              className="mr-5 cursor-pointer"
              onClick={() => setShowCheckInDatePicker((prev) => !prev)}
            />
            {showCheckInDatePicker && (
              <div className="absolute md:-bottom-[15em] left-1/2  top-1/2 transform -translate-x-1/2 translate-y-[20%] md:-left-7 md:top-[7em] md:translate-x-1 md:translate-y-1 ">
                <DatePicker
                  selected={checkInDate}
                  onChange={handleCheckInDateSelect}
                  minDate={new Date()}
                  inline
                />
              </div>
            )}
          </div>
        </div>{" "}
        <div className=" flex flex-col justify-center items-center bg-white w-full h-full">
          <p className=" text-[0.7em] font-bold text-gray-500 w-full text-start pl-5 uppercase">
            check out
          </p>
          <div className="flex justify-center items-center w-full">
            <p className="  text-black w-full text-start pl-5 uppercase">
              <span className=" font-bold  md:text-[1.5em]">
                {checkOutDate ? checkOutDate.getDate() : 12}
              </span>
              <span className="text-[0.8em]">
                {checkOutDate
                  ? " / " +
                    checkOutDate.toLocaleDateString("en-US", {
                      month: "short",
                    })
                  : ""}
              </span>
            </p>
            <RiArrowDropDownLine
              size={50}
              className="mr-5 cursor-pointer"
              onClick={() => setShowCheckoutDatePicker((prev) => !prev)}
            />
            {showCheckoutDatePicker && (
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 translate-y-[20%] md:left-[2em] md:top-[7em] md:translate-x-1/2 md:translate-y-1 md:-bottom-[15em] ">
                <DatePicker
                  selected={checkOutDate}
                  onChange={handleCheckOutDateSelect}
                  minDate={
                    new Date(checkInDate.getTime() + 24 * 60 * 60 * 1000)
                  }
                  inline
                />
              </div>
            )}
          </div>
        </div>
        <div className=" flex flex-col justify-center items-center bg-white w-full h-full">
          <p className=" text-[0.7em] font-bold text-gray-500 text-center w-full uppercase">
            Guest Count
          </p>
          <input
            type="number"
            value={guestCount}
            className=" font-bold md:text-[1.5em] md:w-[2em] w-[1em] focus:outline-none"
            onChange={(e) => handleGuestCountChange(e)}
          />
        </div>
        <Button title="Check" />
      </div>
      <div className="flex flex-wrap justify-center mt-20">
        {roomData.map((room) => (
          <div
            key={room.id}
            className="max-w-sm mx-4 mb-8 bg-white rounded-lg overflow-hidden shadow-md cursor-pointer "
            onClick={() => handleRoomClick(room)}
          >
            <img
              className="w-full hover:scale-110 duration-150 ease-linear "
              src={room.image}
              alt={room.heading}
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{room.heading}</h2>
              <h3 className="text-gray-600 mb-2">{room.subheading}</h3>
              <p className="text-gray-800 mb-2">{room.description}</p>
              <p className="text-gray-700 font-semibold">
                ₹{room.price} per night
              </p>
            </div>
          </div>
        ))}
      </div>
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default Rooms;
