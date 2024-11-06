import React, { useEffect, useState } from "react";
import { CiStar } from "react-icons/ci";
import { BsTextarea } from "react-icons/bs";
import { IoPeopleCircleOutline, IoBedOutline } from "react-icons/io5";
import { GiLeafSwirl, GiMountains } from "react-icons/gi";
import { LiaToiletSolid } from "react-icons/lia";
import { MdOutlineBalcony, MdWifi } from "react-icons/md";
import { RiRestaurant2Line } from "react-icons/ri";
import { useParams } from "react-router-dom";
import BookNowPallet from "./BookNowPallet";
import Footer from "./Footer";
import axios from "axios";
import { server } from "../server";
import Loader from "./Loader";
import Header from "./Header";
import { Helmet } from "react-helmet";
import bgVerticle from "../assets/bgVertical.jpg";
import { useSelector } from "react-redux";
import ImageGrid from "./common/ImageGrid";

const RoomDetails = () => {
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const { nameId } = useParams();
  const roomId = nameId.split("-").pop();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await axios.get(`${server}/room/${roomId}`);
        setRoom(response.data);
      } catch (error) {
        console.error("Error fetching room:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [roomId]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const renderFacilityIcon = (facility) => {
    switch (facility) {
      case "Deluxe Bed":
        return <IoBedOutline size={25} />;
      case "King Size Bed":
        return <IoBedOutline size={25} />;
      case "Wash Room":
        return <LiaToiletSolid size={25} />;
      case "Free Wifi":
        return <MdWifi size={25} />;
      case "Common Balcony":
        return <MdOutlineBalcony size={25} />;
      case "Personal Balcony":
        return <MdOutlineBalcony size={25} />;
      case "Restaurant Service":
        return <RiRestaurant2Line size={25} />;
      default:
        return null;
    }
  };
  const generateStructuredData = () => {
    if (!room) return null;

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Room",
      name: room.heading,
      description: room.description,
      image: room.image,
      priceRange: `$${room.price}`,
      address: {
        "@type": "PostalAddress",
        addressCountry: "India",
        addressState: "Uttarakhand",
        addressCity: "Almora",
        addressLocality: "Kausani",
      },
    };

    return JSON.stringify(structuredData);
  };

  return (
    <>
      <Helmet>
        <title>
          {room ? `${room.heading} - Room Details` : "Room Details"}
        </title>
        <meta
          name="description"
          content={
            room
              ? `${room.description}. Book now to experience ${room.heading}!`
              : "Explore our available rooms and book your stay at Hotel Trishul Regency ."
          }
        />
        {room && (
          <script type="application/ld+json">{generateStructuredData()}</script>
        )}
      </Helmet>

      <div className="h-screen">
        <Header name="Room Details" />
        <div>
          {" "}
          {loading ? (
            <Loader />
          ) : (
            <div className="w-full">
              <div
                className="bg-white p-2 md:px-[5em] xl:px-[10em] lg:px-2 md:py-[5em] relative overflow-scroll bg-repeat bg-contain"
                style={{ backgroundImage: `url(${bgVerticle})` }}
              >
                <div className="grid grid-cols-5 w-full">
                  <div className="md:col-span-3 col-span-5  flex flex-col justify-start items-center">
                    <div className="flex justify-between items-center w-full md:mb-5">
                      <h1 className="font-bold capitalize my-[1em] md:my-0 text-2xl md:text-4xl ">
                        {room?.heading}
                      </h1>
                    </div>
                    <img
                      src={room?.image}
                      alt="room"
                      className="w-full h-[40%]"
                    />
                    <div className="flex justify-evenly items-center border border-orange-500 p-2 w-full mt-5">
                      <div className="flex flex-col justify-center items-center border border-s-0 border-t-0 border-b-0 border-e-gray-400  md:px-5  w-full">
                        <BsTextarea size={25} />
                        <span className="text-[0.8em]">{room?.length}</span>
                      </div>
                      <div className="flex flex-col justify-center items-center border border-s-0 border-t-0 border-b-0 border-e-gray-400 md:px-5  w-full">
                        <IoPeopleCircleOutline size={25} />
                        <span className="text-[0.8em]"> Guests</span>
                      </div>
                      <div className="flex flex-col justify-center items-center border border-s-0 border-t-0 border-b-0 border-e-gray-400 md:px-5  w-full">
                        <GiLeafSwirl size={25} />
                        <span className="text-[0.8em]"> Tea Garden</span>
                      </div>
                      <div className="flex flex-col justify-center items-center md:px-5  w-full">
                        <GiMountains size={25} />
                        <span className="text-[0.8em] text-center">
                          Mountain View
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center items-start w-full mt-4">
                      <p className="font-bold capitalize">Description</p>
                      <p className="text-start">{room?.description}</p>
                    </div>
                    <div className="flex flex-col justify-center items-start w-full mt-4">
                      <p className="font-bold capitalize">Facilites</p>
                      <div className=" border border-orange-500 mt-2 ">
                        {room && room.facility && (
                          <div className="flex  justify-center items-start w-full mt-4">
                            {room.facility.map((facility, index) => (
                              <div
                                key={index}
                                className="flex flex-col justify-center items-center h-[4em] md:px-5 "
                              >
                                {renderFacilityIcon(facility)}
                                <span className="text-[0.8em] text-center w-full">
                                  {facility}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col justify-center items-start w-full mt-4">
                      <p className="font-bold capitalize">Gallery</p>
                      <ImageGrid />
                    </div>
                  </div>
                  <div className=" md:col-span-2 col-span-5 flex justify-center items-start ">
                    <BookNowPallet
                      room={room}
                      bookingDetails={user.bookingDetails}
                      button
                    />
                  </div>
                </div>
              </div>
              <Footer />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RoomDetails;
