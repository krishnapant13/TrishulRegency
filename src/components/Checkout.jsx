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
  setStatus,
  updateBookedRooms,
  updateGuestDetails,
} from "../redux/slices/userSlice";
import { RoomContext } from "./common/RoomContext";
import { toast } from "react-toastify";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("Pay on Spot");
  const [paymentStatus, setPaymentStatus] = useState("unpaid");
  const [guestInfoAdded, setGuestInfoAdded] = useState(false);
  const [guests, setGuests] = useState([{ title: "", name: "", age: "" }]);
  const bookingDetails = useSelector((state) => state.user.bookingDetails);
  const userDetails = useSelector((state) => state.user.userDetails);
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };
  const handleGuestChange = (index, e) => {
    const newGuests = guests.map((guest, i) =>
      i === index ? { ...guest, [e.target.name]: e.target.value } : guest
    );
    setGuests(newGuests);
    dispatch(updateGuestDetails(newGuests));
    validGuestInfo(newGuests);
  };
  const validGuestInfo = (guestList) => {
    const isValid = guestList.every((guest) => {
      return guest.title && guest.name && guest.age;
    });
    setGuestInfoAdded(isValid);
  };
  const paid = paymentStatus === "paid";
  const topRef = useRef(null);
  const contentRef = useRef(null);

  const { updateBookedDates } = useContext(RoomContext);
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);
  useEffect(() => {
    if (bookingDetails?.guestCount) {
      const initialGuests = Array.from(
        { length: bookingDetails.guestCount },
        () => ({ title: "", name: "", age: "" })
      );
      setGuests(initialGuests);
    }
  }, [bookingDetails?.guestCount]);

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
    if (!guestInfoAdded) {
      toast.warning(
        "Please fill in all guest Information fields before proceeding with the payment."
      );
      return;
    }
    try {
      const response = await axios.post(`${server}/room/bookRoom`, {
        bookingDetails,
        userDetails,
        paymentMethod,
        guests,
      });
      if (response.status === 200) {
        updateBookedDates(bookingDetails.room._id, {
          startDate: bookingDetails?.checkInDate,
          endDate: bookingDetails?.checkOutDate,
        });
        setPaymentStatus("paid");
        dispatch(setStatus("succeeded"));
        dispatch(
          updateBookedRooms({
            bookingDetails: bookingDetails,
            checkInDate: bookingDetails.checkInDate,
            checkOutDate: bookingDetails.checkOutDate,
            bookedOn: new Date(),
          })
        );
        scrollToTop();
      } else {
        throw new Error("Booking failed");
      }
    } catch (error) {
      console.error("Error while booking the room:", error);
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
        description={`${
          paymentStatus === "unpaid"
            ? "Complete your booking and get ready for a relaxing stay at Trishul Regency."
            : "for choosing us! We look forward to welcoming you soon."
        }`}
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
                    className={`duration-500 ease-linear w-[80%] h-[80%] `}
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
                  <div className="w-full bg-gray-400 h-[1px] mt-[1em]"></div>

                  <p className="w-full text-end font-bold">
                    {" "}
                    Amount To Be Paid: ₹{bookingDetails.calculatedPrice}
                  </p>
                </div>
              )}
              {paid ? (
                <div className="flex flex-col justify-start items-start py-5 w-full mt-5">
                  <p className="font-extrabold md:text-xl text-2xl">
                    Guest's Information
                  </p>

                  <ul className="list-disc pl-5">
                    {bookingDetails.guests.map((guest, index) => (
                      <li key={index} className="mb-2">
                        <p className="font-bold">{`Guest ${index + 1}:`}</p>
                        <div className="flex justify-between items-start py-3">
                          <p className="pe-2 font-bold">
                            {`Name - ${guest.title ? `${guest.title} ` : ""}${
                              guest.name || "N/A"
                            }`}
                          </p>
                          {"|"}
                          <p className="pe-2 font-bold">{`Age - ${
                            guest.age !== undefined ? guest.age : "N/A"
                          }`}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="flex md:flex-row flex-col justify-between items-center w-full ">
                  <div className="flex flex-col justify-start items-start py-2 md:pr-5 w-full mt-5">
                    <p className=" font-extrabold md:text-xl text-2xl">
                      Guest's Information
                    </p>

                    {Array.from({ length: bookingDetails?.guestCount }).map(
                      (_, index) => (
                        <div
                          key={index}
                          className="flex justify-evenly items-center mt-4"
                        >
                          <div className="flex justify-start items-center mr-2">
                            <select
                              name="title"
                              className="py-[0.55em] border border-gray-300 border-e-0 bg-slate-100"
                              required
                              value={guests[index]?.title || ""}
                              onChange={(e) => handleGuestChange(index, e)}
                            >
                              <option value="">Title</option>
                              <option value="Mr">Mr</option>
                              <option value="Mrs">Mrs</option>
                              <option value="Ms">Ms</option>
                            </select>
                            <input
                              type="text"
                              name="name"
                              placeholder="Name"
                              className="p-2 border border-gray-300 w-full focus:outline-none border-s-0 bg-slate-100"
                              required
                              value={guests[index]?.name || ""}
                              onChange={(e) => handleGuestChange(index, e)}
                            />
                          </div>

                          <input
                            type="number"
                            name="age"
                            placeholder="Age"
                            min={0}
                            max={110}
                            className="p-2 border border-gray-300 w-1/2 focus:outline-none bg-slate-100"
                            required
                            value={guests[index]?.age || ""}
                            onChange={(e) => handleGuestChange(index, e)}
                          />
                        </div>
                      )
                    )}
                  </div>
                  {paid && (
                    <div className=" flex justify-center items-start ">
                      <p className=" font-extrabold text-xl">
                        Reservation Details
                      </p>
                    </div>
                  )}
                </div>
              )}

              {!paid && (
                <div className="flex flex-col justify-start items-start py-5 pr-5 w-full mt-5 ">
                  <div className="my-5 md:text-xl text-2xl">
                    <p className="font-semibold mb-4">Payment Method</p>
                    <p className="font-bold text-red-600 italic">
                      Note: We are not accepting any online payments currently*
                    </p>
                    <div>
                      <input
                        type="radio"
                        id="cash"
                        name="paymentMethod"
                        value="Pay on Spot"
                        checked={paymentMethod === "Pay on Spot"}
                        onChange={handlePaymentMethodChange}
                      />
                      <label htmlFor="cash" className="px-3">
                        Pay on Spot
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
                        disabled
                      />
                      <label
                        htmlFor="creditCard"
                        className="px-3 text-gray-500"
                      >
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
                        disabled
                      />
                      <label
                        htmlFor="bankTransfer"
                        className="px-3 text-gray-500"
                      >
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
                        disabled
                      />
                      <label
                        htmlFor="upiPayment"
                        className="px-3 text-gray-500"
                      >
                        UPI Payment
                      </label>
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      handleBooking();
                    }}
                  >
                    <Button title="Pay now" disabled={!guestInfoAdded} />
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
