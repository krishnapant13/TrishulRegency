import React, { useContext, useEffect, useRef, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { BsTextarea } from "react-icons/bs";
import { IoPeopleCircleOutline } from "react-icons/io5";
import { GiLeafSwirl, GiMountains } from "react-icons/gi";
import BookNowPallet from "./BookNowPallet";
import Button from "./Button";
import PaymentConfirmation from "./PaymentConfirmation";
import { useDispatch, useSelector } from "react-redux";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { server } from "../server";
import axios from "axios";
import {
  setError,
  setStatus,
  updateBookedRoom,
} from "../redux/slices/userSlice";
import { RoomContext } from "./common/RoomContext";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("Cash on Spot");
  const [paymentStatus, setPaymentStatus] = useState("unpaid");
  const bookingDetails = useSelector((state) => state.user.bookingDetails);
  const guestDetails = useSelector((state) => state.user.guestDetails);
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };
  const paid = paymentStatus === "paid";
  const topRef = useRef(null);
  const contentRef = useRef(null);

  const { updateBookedDates } = useContext(RoomContext);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToTop = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const checkInDate = new Date(bookingDetails.checkInDate);
  const checkOutDate = new Date(bookingDetails.checkOutDate);
  const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
  const nights = Math.ceil(timeDifference / (1000 * 3600 * 24));
  const days = nights - 1;
  const dispatch = useDispatch();
  const handleBooking = async () => {
    dispatch(setStatus("loading"));
    try {
      const response = await axios.post(`${server}/room/bookRoom`, {
        bookingDetails,
        guestDetails,
        paymentMethod,
      });
      dispatch(updateBookedRoom(response.data));
      updateBookedDates(bookingDetails.room._id, {
        startDate: bookingDetails.checkInDate,
        endDate: bookingDetails.checkOutDate,
      });
      setPaymentStatus("paid");
      scrollToTop();
      dispatch(setStatus("succeeded"));
    } catch (error) {
      // dispatch(setError(error.response.data));
      dispatch(setStatus("failed"));
    }
  };

  const downloadPdf = async () => {
    const element = contentRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("checkout.pdf");
  };

  return (
    <div className="h-screen" ref={topRef}>
      <Header
        name={`${paymentStatus === "unpaid" ? "Checkout" : "Thank You"}`}
      />
      <div>
        <div
          className="bg-white p-2 md:px-[10em] md:py-[5em] relative overflow-scroll"
          ref={contentRef}
        >
          {paymentStatus === "paid" && <PaymentConfirmation />}

          <div className="grid grid-cols-5  md:px-10 px-0">
            <div
              className={`${
                paid ? "md:col-span-5" : "md:col-span-3"
              } col-span-5  flex flex-col justify-start items-center`}
            >
              <div className="flex md:flex-row flex-col justify-center items-center">
                <div className="flex flex-col justify-center items-start w-fit ">
                  <p className=" font-bold text-xl">
                    {paid ? "Order Details" : "Your Room"}
                  </p>
                  <img
                    src={bookingDetails?.room?.image}
                    alt={"Room"}
                    className={`duration-500 ease-linear`}
                  />{" "}
                </div>
                <div className="flex flex-col justify-start items-start p-5 w-full h-full">
                  <p className="w-full text-start font-bold text-[1.5em]">
                    {bookingDetails?.room?.heading}
                  </p>
                  {paid ? (
                    <div className=" flex flex-col justify-start items-start w-full">
                      <p className="py-2">
                        Check In:{" "}
                        <span className="text-gray-500">
                          {new Date(bookingDetails.checkInDate).toDateString()}{" "}
                        </span>
                      </p>

                      <p className="py-2">
                        Check Out:{" "}
                        <span className="text-gray-500">
                          {new Date(bookingDetails.checkOutDate).toDateString()}
                        </span>
                      </p>

                      <p className="py-2">
                        Guests:{" "}
                        <span className="text-gray-500">
                          {bookingDetails.guestCount}{" "}
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
                    <div className="flex md:flex-col flex-row justify-start items-start  w-full">
                      <div className="flex flex-col md:flex-row md:justify-start items-center w-full py-1">
                        <BsTextarea size={25} className="mr-2" />
                        <span className="text-[0.8em]">25 Sf</span>
                      </div>
                      <div className="flex flex-col md:flex-row md:justify-start items-center  w-full py-1">
                        <IoPeopleCircleOutline size={25} className="mr-2" />
                        <span className="text-[0.8em]"> Guests</span>
                      </div>
                      <div className="flex flex-col md:flex-row md:justify-start items-center w-full py-1">
                        <GiLeafSwirl size={25} className="mr-2" />
                        <span className="text-[0.8em]"> Tea Garden</span>
                      </div>
                      <div className="flex flex-col md:flex-row md:justify-start items-center  w-full py-1">
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
                    Amount Paid: ₹{bookingDetails.calculatedPrice}
                  </p>
                </div>
              )}
              <div className="flex md:flex-row flex-col justify-between items-center w-full ">
                <div className="flex flex-col justify-start items-start py-5 md:pr-5 w-full mt-5">
                  <p className=" font-extrabold md:text-xl text-2xl">
                    Your Information
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-4 gap-x-6 gap-y-2 md:text-sm text-xl mt-3">
                    <div className="flex">
                      <p className="font-bold mr-2">First Name:</p>
                      <p>{guestDetails?.firstName}</p>
                    </div>
                    <div className="flex">
                      <p className="font-bold mr-2">Last Name:</p>
                      <p>{guestDetails?.lastName}</p>
                    </div>
                    <div className="flex">
                      <p className="font-bold mr-2">Email:</p>
                      <p>{guestDetails?.emailAddress}</p>
                    </div>
                    <div className="flex">
                      <p className="font-bold mr-2">State:</p>
                      <p>{guestDetails?.state}</p>
                    </div>
                    <div className="flex">
                      <p className="font-bold mr-2">Country:</p>
                      <p>{guestDetails?.country}</p>
                    </div>
                    <div className="flex">
                      <p className="font-bold mr-2">Zip Code:</p>
                      <p>{guestDetails?.zipCode}</p>
                    </div>
                    <div className="col-span-1 md:col-span-2 flex flex-col">
                      <p className="font-bold">Additional Message:</p>
                      <p>{guestDetails?.additionMessage}</p>
                    </div>
                  </div>
                </div>
                {paid && (
                  <div className=" flex justify-center items-start ">
                    <p className=" font-extrabold text-xl">
                      Reservation Details
                    </p>
                  </div>
                )}
              </div>

              {!paid && (
                <div className="flex flex-col justify-start items-start py-5 pr-5 w-full mt-5 ">
                  <div className="my-5 md:text-xl text-2xl">
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
                      handleBooking();
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
                  room={bookingDetails.room}
                  bookingDetails={bookingDetails}
                />
              </div>
            )}
          </div>
          {paid && (
            <div
              className="md:w-[30%] w-full flex justify-center items-start"
              onClick={() => downloadPdf()}
            >
              <Button title="Download pdf" />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
