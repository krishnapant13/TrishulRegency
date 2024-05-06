import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { BsTextarea } from "react-icons/bs";
import { IoPeopleCircleOutline } from "react-icons/io5";
import { GiLeafSwirl, GiMountains } from "react-icons/gi";
import BookNowPallet from "./BookNowPallet";
import Button from "./Button";
import PaymentConfirmation from "./PaymentConfirmation";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("Cash on Spot");
  const [paymentStatus, setPaymentStatus] = useState("unpaid");
  const guestData = JSON.parse(localStorage.getItem("guestData"));
  const { room, ...locationData } = guestData;
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };
  const paid = paymentStatus === "paid";
  const topRef = useRef(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const scrollToTop = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const checkInDate = new Date(locationData.checkInDate);
  const checkOutDate = new Date(locationData.checkOutDate);
  const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
  const nights = Math.ceil(timeDifference / (1000 * 3600 * 24));
  const days = nights - 1;
  return (
    <div className="h-screen" ref={topRef}>
      <Header
        name={`${paymentStatus === "unpaid" ? "Checkout" : "Thank You"}`}
      />
      <div>
        <div className="bg-white p-2 md:px-[10em] md:py-[5em] relative overflow-scroll">
          {paymentStatus === "paid" && <PaymentConfirmation />}

          <div className="grid grid-cols-5  px-[3em]">
            <div
              className={`${
                paid ? "md:col-span-5" : "md:col-span-3"
              } col-span-5  flex flex-col justify-start items-center`}
            >
              <div className="flex justify-center items-center">
                <div className="flex flex-col justify-center items-start w-fit ">
                  <p className=" font-bold text-[1.2em]">
                    {paid ? "Order Details" : "Your Room"}
                  </p>
                  <img
                    src={guestData?.room?.image}
                    alt={"Room Image"}
                    className={`duration-500 ease-linear`}
                  />{" "}
                </div>
                <div className="flex flex-col justify-start items-start p-5 w-full h-full">
                  <p className="w-full text-start font-bold text-[1.5em]">
                    {guestData?.room?.heading}
                  </p>
                  {paid ? (
                    <div className=" flex flex-col justify-start items-start w-full">
                      <p className="py-2">
                        Check In:{" "}
                        <span className="text-gray-500">
                          {new Date(locationData.checkInDate).toDateString()}{" "}
                        </span>
                      </p>

                      <p className="py-2">
                        Check Out:{" "}
                        <span className="text-gray-500">
                          {new Date(locationData.checkOutDate).toDateString()}
                        </span>
                      </p>

                      <p className="py-2">
                        Guests:{" "}
                        <span className="text-gray-500">
                          {locationData.guestCount}{" "}
                        </span>
                      </p>
                      <p className="font-bold">
                        Total:{" "}
                        <span className="text-gray-500 font-normal">
                          {days > 0
                            ? `${days} ${days === 1 ? "day" : "days"}`
                            : ""}
                          {days > 0 && nights > 0 ? ", " : ""}
                          {nights > 0
                            ? `${nights} ${nights === 1 ? "night" : "nights"}`
                            : ""}
                        </span>
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col justify-start items-start  w-full">
                      <div className="flex  justify-start items-center w-full py-1">
                        <BsTextarea size={25} className="mr-2" />
                        <span className="text-[0.8em]">25 Sf</span>
                      </div>
                      <div className="flex  justify-start items-center  w-full py-1">
                        <IoPeopleCircleOutline size={25} className="mr-2" />
                        <span className="text-[0.8em]"> Guests</span>
                      </div>
                      <div className="flex  justify-start items-center w-full py-1">
                        <GiLeafSwirl size={25} className="mr-2" />
                        <span className="text-[0.8em]"> Tea Garden</span>
                      </div>
                      <div className="flex  justify-start items-center  w-full py-1">
                        <GiMountains size={25} className="mr-2" />
                        <span className="text-[0.8em] text-center">
                          Mountain View
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {paid && (
                <div className="w-full">
                  <div className="w-full bg-gray-400 h-[1px] my-[2em]"></div>

                  <p className="w-full text-end font-bold">
                    {" "}
                    Amount Paid: ₹{locationData.price}
                  </p>
                </div>
              )}
              <div className="flex flex-col justify-start items-start py-5 pr-5 w-full mt-5 ">
                <p className="font-bold"> Your Information </p>
              </div>
              {!paid && (
                <div className="flex flex-col justify-start items-start py-5 pr-5 w-full mt-5 ">
                  <div className="my-5">
                    <p className="font-semibold mb-4">Payment Method</p>
                    <div>
                      <input
                        type="radio"
                        id="cash"
                        name="paymentMethod"
                        value="Cash on Spot"
                        checked={paymentMethod === "Cash on Spot"}
                        onChange={handlePaymentMethodChange}
                      />
                      <label htmlFor="cash" className="px-3">
                        Cash on Spot
                      </label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="creditCard"
                        name="paymentMethod"
                        value="Credit Card"
                        checked={paymentMethod === "Credit Card"}
                        onChange={handlePaymentMethodChange}
                      />
                      <label htmlFor="creditCard" className="px-3">
                        Credit Card
                      </label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="bankTransfer"
                        name="paymentMethod"
                        value="Bank Transfer"
                        checked={paymentMethod === "Bank Transfer"}
                        onChange={handlePaymentMethodChange}
                      />
                      <label htmlFor="bankTransfer" className="px-3">
                        Bank Transfer
                      </label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="upiPayment"
                        name="paymentMethod"
                        value="UPI Payment"
                        checked={paymentMethod === "UPI Payment"}
                        onChange={handlePaymentMethodChange}
                      />
                      <label htmlFor="upiPayment" className="px-3">
                        UPI Payment
                      </label>
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      setPaymentStatus("paid");
                      scrollToTop();
                    }}
                  >
                    <Button title="Pay now" />
                  </div>
                </div>
              )}
            </div>
            {!paid && (
              <div className=" md:col-span-2 col-span-5 flex justify-center items-start ">
                <BookNowPallet
                  room={guestData.room}
                  locationData={locationData}
                />
              </div>
            )}
            <div className=" w-full flex justify-center items-start">
              <Button title="Download pdf" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
