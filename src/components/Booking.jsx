import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { BsTextarea } from "react-icons/bs";
import { IoPeopleCircleOutline } from "react-icons/io5";
import { GiLeafSwirl, GiMountains } from "react-icons/gi";
import BookNowPallet from "./BookNowPallet";
import BookingForm from "./BookingForm";

const Booking = () => {
  const guestData = JSON.parse(localStorage.getItem("guestData"));
  const { room, ...locationData } = guestData;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="h-screen">
      <Header name="Booking" />
      <div>
        <div className="bg-white p-2 md:px-[10em] xl:px-[10em] lg:px-2 md:py-[5em] relative overflow-scroll">
          <div className="grid grid-cols-5  md:px-[3em]">
            <div className="md:col-span-3 col-span-5  flex flex-col justify-start items-center">
              <div className="flex md:flex-row flex-col justify-center items-center">
                <div className="flex flex-col justify-center items-start w-fit">
                  <p className="font-bold">Your Room</p>
                  <img src={guestData?.room?.image} alt="Room Image" />{" "}
                </div>
                <div className="flex flex-col justify-start items-start md:p-5 p-2 w-full">
                  <p className="w-full text-start font-bold text-[1.5em]">
                    {guestData?.room?.heading}
                  </p>
                  <div className="flex md:flex-col flex-row justify-start items-start w-full">
                    <div className="flex flex-col md:flex-row justify-start items-center w-full py-1">
                      <BsTextarea size={25} className="mr-2" />
                      <span className="text-[0.8em]">25 Sq Ft</span>
                    </div>
                    <div className="flex flex-col md:flex-row justify-start items-center w-full py-1">
                      <IoPeopleCircleOutline size={25} className="mr-2" />
                      <span className="text-[0.8em]">Guests</span>
                    </div>
                    <div className="flex flex-col md:flex-row justify-start items-center w-full py-1">
                      <GiLeafSwirl size={25} className="mr-2" />
                      <span className="text-[0.8em]">Tea Garden</span>
                    </div>
                    <div className="flex flex-col md:flex-row justify-start items-center w-full py-1">
                      <GiMountains size={25} className="mr-2" />
                      <span className="text-[0.8em]">Mountain View</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-start items-start py-5 pr-5 w-full mt-5">
                <div className="flex md:flex-row flex-col justify-between items-start md:items-center w-full">
                  <p className="font-bold md:text-[1em] text-[1.2em]">
                    Add Your Information
                  </p>
                  <p className="font-bold text-[0.8em] text-end md:text-center md:w-auto w-full">
                    Already Registered?{" "}
                    <span>
                      <button className="font-bold text-orange-400 ml-2 text-[1.2em] underline">
                        Login
                      </button>
                    </span>
                  </p>
                </div>
                <BookingForm guestData={guestData} />
              </div>
            </div>
            <div className="md:col-span-2 col-span-5 flex justify-center items-start p-2">
              <BookNowPallet
                room={guestData.room}
                locationData={locationData}
                button={false}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Booking;
