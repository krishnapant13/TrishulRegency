import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserRoomBookingDetails,
  updateCheckInDate,
  updateCheckOutDate,
} from "../redux/slices/userSlice";
import Login from "./Login";

const BookNowPallet = ({ bookingDetails, room, button }) => {
  const [checkInDate, setCheckInDate] = useState(bookingDetails?.checkInDate);
  const [checkOutDate, setCheckOutDate] = useState(
    bookingDetails?.checkOutDate
  );
  const [adults, setAdultsCount] = useState(
    bookingDetails?.adults ? bookingDetails?.adults : bookingDetails?.guestCount
  );
  const [children, setChildrenCount] = useState(bookingDetails?.children || 0);
  const guestCount = parseInt(adults) + parseInt(children) || 0;

  const initialMealPrices = {
    breakfast: 100,
    lunch: 150,
    dinner: 200,
  };

  // Get meals state from Redux store
  const mealsFromRedux = useSelector(
    (state) => state.user.bookingDetails?.meals
  );

  const [meals, setMeals] = useState(
    mealsFromRedux
      ? mealsFromRedux
      : {
          breakfast: { isChecked: true, price: initialMealPrices.breakfast },
          lunch: { isChecked: false, price: initialMealPrices.lunch },
          dinner: { isChecked: false, price: initialMealPrices.dinner },
        }
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (mealsFromRedux) {
      setMeals(mealsFromRedux);
    }
  }, [mealsFromRedux]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const guestData = {
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      guestCount: guestCount.toString(),
      adults: adults.toString(),
      children: children.toString(),
      price: room?.price,
      calculatedPrice: calculateTotalPrice(),
      meals: meals,
      room: room && room,
    };
    const roomName = room.heading.toLowerCase().replace(/\s+/g, "-");
    navigate(`/checkout/${roomName}-${room?._id}`);
    dispatch(updateUserRoomBookingDetails(guestData));
  };

  const handleCheckInDateChange = (date) => {
    setCheckInDate(date);
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    setCheckOutDate(nextDay);
    dispatch(updateCheckInDate(date));
    dispatch(updateCheckOutDate(nextDay));
  };

  const handleCheckOutDateChange = (date) => {
    setCheckOutDate(date);
    dispatch(updateCheckOutDate(date));
  };
  const handleMealsChange = (e) => {
    const { name, checked } = e.target;
    setMeals((prevMeals) => ({
      ...prevMeals,
      [name]: {
        ...prevMeals[name],
        isChecked: checked,
      },
    }));
  };

  const getDaysCount = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = Math.abs(end - start);
    const diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  const mealDays = getDaysCount(checkInDate, checkOutDate);
  const [showModal, setShowModal] = useState(false);
  const isLogIn = localStorage.getItem("token");
  const calculateTotalPrice = () => {
    let totalPrice = bookingDetails?.price
      ? bookingDetails?.price
      : room?.price;
    for (const meal in meals) {
      if (meals[meal].isChecked) {
        totalPrice += meals[meal].price * adults * mealDays;
      }
    }
    return totalPrice;
  };

  return (
    <section className="flex flex-col justify-center items-center w-full">
      <div className="mt-5 py-10 md:w-[90%] w-full bg-orange-100 flex flex-col justify-center items-center md:mt-1">
        <p className="font-extrabold text-center w-full text-2xl">
          Booking Details
        </p>
        <p>Sub Total</p>
        <p className="text-2xl font-bold mb-3">₹ {calculateTotalPrice()}</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
            // if (isLogIn) {

            // } else {
            //   setShowModal(true);
            // }
          }}
          className="w-full flex flex-col justify-center items-center"
        >
          <div className="flex flex-wrap justify-center items-center w-full">
            <div className="w-auto md:w-1/2 p-2">
              <label htmlFor="checkInDate" className="font-semibold">
                Check In
              </label>
              <div className="w-full">
                <DatePicker
                  id="checkInDate"
                  selected={checkInDate}
                  minDate={new Date()}
                  onChange={handleCheckInDateChange}
                  dateFormat="d MMM, yyyy"
                  placeholderText="Select a date"
                  className="p-3 focus:outline-none text-gray-400 w-full"
                  disabled
                />
              </div>
            </div>
            <div className="w-auto md:w-1/2 p-2">
              <label htmlFor="checkOutDate" className="font-semibold">
                Check Out
              </label>
              <div className="w-full">
                <DatePicker
                  id="checkOutDate"
                  selected={checkOutDate}
                  onChange={handleCheckOutDateChange}
                  minDate={
                    new Date(
                      new Date(checkInDate).getTime() + 24 * 60 * 60 * 1000
                    )
                  }
                  dateFormat="d MMM, yyyy"
                  placeholderText="Select a date"
                  className="p-3 focus:outline-none text-gray-400 w-full"
                  disabled
                />
              </div>
            </div>
            <div className="w-auto md:w-1/2 p-2">
              <label htmlFor="adults" className="font-semibold">
                Adults
              </label>
              <div className="w-full">
                <input
                  type="number"
                  id="adults"
                  max={3}
                  value={adults}
                  onChange={(e) => setAdultsCount(e.target.value)}
                  className="focus:outline-none p-3 w-full"
                  disabled
                />
              </div>
            </div>
            <div className="w-auto md:w-1/2 p-2">
              <label htmlFor="children" className="font-semibold">
                Children
              </label>
              <div className="w-full">
                <input
                  type="number"
                  id="children"
                  max={2}
                  value={children}
                  onChange={(e) => setChildrenCount(e.target.value)}
                  className="focus:outline-none p-3 w-full"
                />
              </div>
            </div>
            <div className="w-auto md:w-1/2 p-2">
              <label htmlFor="guestCount" className="font-semibold">
                Guest Count
              </label>
              <div className="w-full">
                <input
                  type="text"
                  value={guestCount}
                  readOnly
                  className="font-bold md:text-[1.5em] w-full focus:outline-none p-3"
                />
              </div>
            </div>
            <div className="w-auto md:w-1/2 p-2 md:text-sm text-2xl">
              <label className="font-semibold">Include Meals</label>
              <div className="flex flex-col w-full">
                {Object.entries(meals).map(([meal, data]) => (
                  <label key={meal} className="flex items-center">
                    <input
                      type="checkbox"
                      name={meal}
                      checked={data.isChecked}
                      onChange={handleMealsChange}
                      className="mr-2"
                    />
                    {meal.charAt(0).toUpperCase() + meal.slice(1)}
                    <span className="text-green-500 pl-2">
                      + ₹{data.price * adults * mealDays}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {button && <Button title="Book Now" />}
        </form>
      </div>
      <div className="py-10 md:w-[90%] w-full bg-orange-100 flex  flex-col justify-center items-center my-10">
        <h2>Booking Help</h2>
        <p className="font-bold text-xl">+91 123 456 7890</p>
      </div>
      {showModal && <Login setShowModal={setShowModal} />}
    </section>
  );
};

export default BookNowPallet;
