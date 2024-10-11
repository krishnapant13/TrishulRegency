import React, { useContext, useEffect, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import DatePicker from "react-datepicker";
import NewsLetter from "./NewsLetter";
import Footer from "./Footer";
import Header from "./Header";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import bg from "../assets/Snapseed.jpg";
import { useDispatch, useSelector } from "react-redux";
import { updateUserRoomBookingDetails } from "../redux/slices/userSlice";
import { RoomContext } from "../components/common/RoomContext";

const Rooms = () => {
  const {
    roomData,
    loading,
    checkInDate,
    setCheckInDate,
    checkOutDate,
    setCheckOutDate,
    fetchRoomsData,
  } = useContext(RoomContext);
  const [guestCount, setGuestCount] = useState(2);
  const [showCheckInDatePicker, setShowCheckInDatePicker] = useState(false);
  const [showCheckoutDatePicker, setShowCheckoutDatePicker] = useState(false);
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  useEffect(() => {
    fetchRoomsData();
  }, [location]);

  const dispatch = useDispatch();
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
    const meals = {
      breakfast: { isChecked: true, price: 100, name: "Breakfast" },
      lunch: { isChecked: false, price: 150, name: "Lunch" },
      dinner: { isChecked: false, price: 200, name: "Dinner" },
    };
    dispatch(
      updateUserRoomBookingDetails({
        checkInDate: checkInDate.toISOString(),
        checkOutDate: checkOutDate.toISOString(),
        guestCount: guestCount,
        meals: meals,
      })
    );
    const roomName = room.heading.toLowerCase().replace(/\s+/g, "-");
    navigate(`/room/${roomName}-${room._id}`);
  };

  const findNearestEndDate = (bookedDates) => {
    if (!bookedDates || bookedDates.length === 0) return null;

    const nearestEndDate = bookedDates.reduce((nearestDate, booking) => {
      const endDate = new Date(booking.endDate);
      return endDate > nearestDate ? endDate : nearestDate;
    }, new Date(bookedDates[0].endDate));

    return nearestEndDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }
  const isRoomAvailable = (bookedDates) => {
    const formattedCheckInDate = new Date(checkInDate)
      .toISOString()
      .split("T")[0];
    const bookedDatesCount = bookedDates.filter(
      (booking) =>
        new Date(booking.startDate).toISOString().split("T")[0] ===
        formattedCheckInDate
    ).length;
    return bookedDatesCount < 3;
  };

  const availableRoomCount = (room) => {
    const formattedCheckInDate = checkInDate.toISOString().split("T")[0];
    const bookingsOnCheckInDate = room.bookedDates.filter(
      (booking) =>
        new Date(booking.startDate).toISOString().split("T")[0] ===
        formattedCheckInDate
    );
    const bookedRoomCount = bookingsOnCheckInDate.length;
    const availableRooms = 4 - bookedRoomCount;
    return availableRooms >= 0 ? availableRooms : 0;
  };

  return (
    <>
      <Helmet>
        <title>Trishul Regency - Rooms</title>
        <meta
          name="description"
          content="Explore our available rooms and book your stay at Trishul Regency  ."
        />
      </Helmet>
      <div className="relative h-screen w-full">
        <Header
          name="Rooms"
          description="Explore our range of comfortable, elegant rooms designed for your perfect getaway"
        />
        <div className="z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95%] md:w-[55%] lg:w-[80%] h-[15vh] lg:h-[8vh] xl:h-[15vh] xl:w-[55%] bg-black shadow-xl flex justify-center items-center">
          <div className=" flex flex-col justify-center items-center bg-white w-[80%] h-full">
            <p className=" text-[0.5em] font-bold text-gray-500 w-full text-start pl-5 uppercase">
              check in
            </p>
            <div className="flex justify-center items-center w-full">
              <div className="  text-black w-full text-start pl-5 uppercase">
                <span className=" font-bold md:text-xl text-sm">
                  {checkInDate ? checkInDate.getDate() : 12}
                </span>
                <span className="text-[0.6em] md:text-lg">
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
                onClick={() => {
                  setShowCheckoutDatePicker(false);
                  setShowCheckInDatePicker((prev) => !prev);
                }}
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
          <div className=" flex flex-col justify-center items-center bg-white w-[80%] h-full">
            <p className=" text-[0.5em] font-bold text-gray-500 w-full text-start pl-5 uppercase">
              check out
            </p>
            <div className="flex justify-center items-center w-full">
              <p className="text-black w-full text-start pl-5 uppercase">
                <span className="font-bold md:text-xl text-sm">
                  {checkOutDate ? checkOutDate.getDate() : 12}
                </span>
                <span className="text-[0.5em] md:text-lg">
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
                onClick={() => {
                  setShowCheckInDatePicker(false);
                  setShowCheckoutDatePicker((prev) => !prev);
                }}
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
          <div className=" flex flex-col justify-center items-center bg-white  h-full">
            <p className=" text-[0.8em] font-bold text-gray-500 text-center w-full hidden md:block uppercase">
              Guest Count
            </p>
            <p className="mb-3 text-[0.5em] font-bold block md:hidden text-gray-500 text-center w-full uppercase">
              Guests
            </p>
            <input
              type="number"
              max={3}
              value={guestCount}
              className=" font-bold md:text-[1.2em] w-full text-center focus:outline-none"
              onChange={(e) => handleGuestCountChange(e)}
            />
          </div>
          {/* <button
            onClick={handleCheckAvailability}
            className=" w-full bg-gradient-to-r from-orange-400 via-orange-500 to-red-400 text-white text-xs md:text-xl font-extrabold h-full md:px-10 uppercase "
          >
            Check
          </button> */}
        </div>

        <div
          className="flex flex-wrap justify-center mt-20 bg-cover bg-center"
          style={{ backgroundImage: `url(${bg})` }}
        >
          {roomData?.data?.map((room) => {
            const nearestEndDate = findNearestEndDate(room.bookedDates);
            const roomNotAvailable = !isRoomAvailable(room.bookedDates);
            return (
              <div
                key={room._id}
                className={` relative h-[33em] max-w-sm mx-4 mb-8 bg-white ${
                  roomNotAvailable ? "" : " rounded-lg shadow-md cursor-pointer"
                }  overflow-hidden  `}
                onClick={() => !roomNotAvailable && handleRoomClick(room)}
              >
                <div
                  className={`w-full h-[15em] ${
                    roomNotAvailable ? "" : " hover:scale-110 "
                  }duration-150 ease-linear bg-cover bg-center flex justify-end items-end relative`}
                  style={{ backgroundImage: `url(${room.image})` }}
                >
                  {roomNotAvailable && (
                    <marquee className="w-full text-sm h-full pt-4 text-white font-bold uppercase">
                      {` CheckIn will be available on:  ${
                        (" ", nearestEndDate)
                      }`}
                    </marquee>
                  )}
                  {!roomNotAvailable && (
                    <p className="absolute bottom-2 left-5 text-red-500 font-bold uppercase">
                      {`Available Rooms: ${availableRoomCount(room)}`}
                    </p>
                  )}
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold">{room.heading}</h2>
                  <h3 className="text-gray-600 mb-2">{room.subheading}</h3>
                  <p className="text-gray-800 mb-2">{room.description}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-700 font-semibold">
                      ₹{room.price}{" "}
                      <span className="text-red-500 line-through">
                        {room.mainPrice}
                      </span>{" "}
                      per night
                    </p>
                    {roomNotAvailable && (
                      <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#ffffff86] h-full w-full flex justify-center items-start">
                        <p className=" font-extrabold tracking-widest text-xl  uppercase text-red-500 text-center pt-28">
                          {room.heading +
                            "s are not available at selected date"}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <footer>
          <NewsLetter />
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default Rooms;
