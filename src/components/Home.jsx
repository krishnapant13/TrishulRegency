import React, { useEffect } from "react";
import Header from "./Header";
import NewsLetter from "./NewsLetter";
import Footer from "./Footer";
import Button from "./Button";
import { Link } from "react-router-dom";
import { GiKeyCard } from "react-icons/gi";
import { FaTreeCity } from "react-icons/fa6";
import { PiCallBellBold } from "react-icons/pi";
import Info from "./common/Info";
import HomeCarousel from "./common/HomeCarousel";
import bg from "../assets/Snapseed.jpg";
import ReviewCard from "./common/ReviewCard";
import CommonCarousel from "./common/CommonCarousel";

const Home = ({ roomData }) => {
  // useEffect(() => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // }, []);
  const images = [
    "https://res.cloudinary.com/dutkerqvn/image/upload/v1714721348/IMG_5302_vikv0t.jpg",
    "https://res.cloudinary.com/dutkerqvn/image/upload/v1714721348/IMG_5302_vikv0t.jpg",
    "https://res.cloudinary.com/dutkerqvn/image/upload/v1714721348/IMG_5302_vikv0t.jpg",
  ];
  return (
    <div
      className="h-screen bg-cover bg-center "
      style={{ backgroundImage: `url(${bg})` }}
    >
      <Header navOnly />
      <section className="grid md:grid-cols-3 m-auto md:px-[13em] px-2 md:pt-28 pt-10  h-screen w-full ">
        <div className="flex flex-col md:col-span-2 col-span-3 justify-center md:items-start items-center w-full  md:w-[80%]">
          <h4 className="text-orange-400 uppercase  text-xl my-2">
            Its amazing
          </h4>
          <h1 className="text-amber-900 font-bold text-center md:text-start capitalize text-4xl my-2">
            Enjoy a dream vacation in the hotel terrace peaks
          </h1>
          <h5 className="text-gray-400 text-justify text-lg my-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
            quae nobis repellat repellendus iure nisi impedit, dolore modi
            laudantium autem, beatae quis. Molestiae laudantium commodi fuga,
            laboriosam obcaecati vero accusantium.
          </h5>
          <Link to="/rooms" className="w-[50%] my-2">
            <Button title="Book Now" />
          </Link>
        </div>
        <div className="flex md:col-span-1 col-span-3 justify-center items-center">
          <HomeCarousel>
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`carousel-${index}`}
                className="object-cover bg-cover  md:h-[35em]"
              />
            ))}
          </HomeCarousel>
        </div>
      </section>
      <Info
        title="We are champ"
        subtitle="YOUR STAY AT TERRACE PEAKS"
        description=" Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore provident vero, debitis."
      />
      <section>
        {roomData?.data?.map((room, index) => (
          <div
            key={index}
            className={`md:flex hidden justify-center items-center md:h-[70vh] h-auto my-2 ${
              index % 2 === 1 ? "flex-row-reverse" : ""
            }`}
          >
            <img src={room?.image} alt={"room" + index} className="w-[50%]" />
            <div className=" w-[50%] h-full px-36 flex flex-col justify-center items-center">
              <p className=" text-left w-full font-extrabold text-4xl  capitalize my-3">
                {room?.heading}
              </p>
              <p className="  text-left text-lg  capitalize my-3">
                {room?.description}
              </p>
              <div className="flex justify-start items-center w-full my-2">
                <p className="capitalize text-gray-400">Starts from</p>
                <p className="text-2xl font-extrabold mx-2">₹{room?.price}</p>
                <p className="text-lg font-bold text-orange-400 ml-2">/Night</p>
              </div>
              <div className="flex flex-col justify-center items-start w-full my-2">
                <div className="flex justify-between items-center w-[70%]">
                  <p className="capitalize font-bold mr-4 w-full">Status</p>
                  <p className="text-gray-400 w-full text-left">Available</p>
                </div>
                <div className="flex justify-between items-center w-[70%]">
                  <p className="capitalize font-bold mr-4 w-full">Payment</p>
                  <p className="text-gray-400 w-full text-left">
                    Online / On-Spot
                  </p>
                </div>
                <div className="flex justify-between items-center w-[70%]">
                  <p className="capitalize font-bold mr-4 w-full">
                    Guest Limit
                  </p>
                  <p className="text-gray-400 w-full text-left">3</p>
                </div>
                <div className="flex justify-between items-center w-[70%]">
                  <p className="capitalize font-bold mr-4 w-full">Beds</p>
                  <p className="text-gray-400 w-full text-left">1</p>
                </div>
              </div>
              <div className="flex  justify-start items-center w-full my-2">
                <Button title="Book Now" />
              </div>
            </div>
          </div>
        ))}
      </section>
      <section className=" grid grid-cols-3 md:w-[60%] w-full m-auto md:p-10 p-2">
        <article className="md:col-span-1 col-span-3 flex flex-col justify-center items-center my-5 md:my-0">
          <div className=" bg-yellow-700 flex justify-center items-center w-20 h-20 rounded-full mb-2">
            <GiKeyCard size={30} color="white" />
          </div>
          <h3 className="font-bold text-xl">Luxurious Rooms</h3>
          <p className="text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
            officia dicta eveniet, libero eius earum.
          </p>
        </article>
        <article className="md:col-span-1 col-span-3  flex flex-col justify-center items-center my-5 md:my-0">
          <div className=" bg-yellow-700 flex justify-center items-center w-20 h-20 rounded-full mb-2">
            <PiCallBellBold size={25} color="white" />
          </div>
          <h3 className="font-bold text-xl">Quality Service</h3>
          <p className="text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
            officia dicta eveniet, libero eius earum.
          </p>
        </article>
        <article className="md:col-span-1 col-span-3  flex flex-col justify-center items-center my-5 md:my-0">
          <div className=" bg-yellow-700 flex justify-center items-center w-20 h-20 rounded-full mb-2">
            <FaTreeCity size={30} color="white" />
          </div>
          <h3 className="font-bold text-xl">Great Environment</h3>
          <p className="text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
            officia dicta eveniet, libero eius earum.
          </p>
        </article>
      </section>
      <Info
        title="Testimonial & Review"
        subtitle="What People Say"
        description=" "
        noGap
      />
      <div
        className="flex justify-center items-center md:px-16 px-8 py-5 bg-center bg-cover"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <CommonCarousel>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="my-3">
              <ReviewCard />
            </div>
          ))}
        </CommonCarousel>
      </div>
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default Home;
