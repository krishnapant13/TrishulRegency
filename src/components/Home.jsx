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
import { Helmet } from "react-helmet";

const Home = ({ roomData }) => {
  // useEffect(() => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // }, []);
  const images = [
    "https://res.cloudinary.com/dutkerqvn/image/upload/v1727939174/IMG_8866_o3bj0x.jpg",
    "https://res.cloudinary.com/dutkerqvn/image/upload/v1727933766/IMG_E8119_wgsjog.jpg",
    "https://res.cloudinary.com/dutkerqvn/image/upload/v1727934267/IMG_8864_f64zan.jpg",
    "https://res.cloudinary.com/dutkerqvn/image/upload/v1727934558/tsaubq1j0ybf8wmia1k7.jpg",
  ];
  const reviews = [
    {
      name: "Amit Sharma",
      profession: "Software Engineer",
      comment:
        "Amazing stay! The views were breathtaking, and the service was impeccable.",
    },
    {
      name: "Priya Mehta",
      profession: "Doctor",
      comment:
        "A peaceful getaway with fantastic amenities. Highly recommend Trishul Regency.",
    },
    {
      name: "Rahul Verma",
      profession: "Business Analyst",
      comment:
        "Luxurious rooms with beautiful surroundings. Perfect for a relaxing vacation.",
    },
    {
      name: "Anjali Singh",
      profession: "Interior Designer",
      comment:
        "Loved the ambiance and the hospitality. I will definitely come back!",
    },
    {
      name: "Vikram Patel",
      profession: "Entrepreneur",
      comment: "Great service and a perfect place to unwind in nature.",
    },
    {
      name: "Neha Kapoor",
      profession: "Teacher",
      comment:
        "The hotel is well-maintained with friendly staff. A memorable experience!",
    },
    {
      name: "Rajesh Gupta",
      profession: "Photographer",
      comment:
        "Stunning views and excellent facilities. Perfect for a photography retreat.",
    },
    {
      name: "Radhika Iyer",
      profession: "Writer",
      comment:
        "A perfect spot to find inspiration. The surroundings are serene and beautiful.",
    },
    {
      name: "Suresh",
      profession: "Architect",
      comment:
        "The rooms are spacious and well-designed. Loved every moment of my stay.",
    },
    {
      name: "Divya Rao",
      profession: "Chef",
      comment:
        "As a chef, I enjoyed the local delicacies offered here. The service was excellent.",
    },
  ];
  return (
    <>
      <Helmet>
        <title>Trishul Regency - Your Dream Vacation Awaits</title>
        <meta
          name="description"
          content="Experience the breathtaking views of the Himalayas at Trishul Regency, Kausani. Enjoy luxurious rooms, exquisite local cuisine, and personalized travel services for an unforgettable stay."
        />
      </Helmet>
      <div
        className="  bg-center bg-contain "
        style={{ backgroundImage: `url(${bg})` }}
      >
        <Header navOnly />
        <section className="grid md:grid-cols-3 m-auto md:px-[13em] px-2 md:pt-28 pt-10  w-full ">
          <div className="flex flex-col md:col-span-2 col-span-3 justify-center md:items-start items-center w-full  md:w-[80%]">
            <h4 className="text-orange-400 uppercase  text-xl mt-10 md:mt-0 my-2">
              Its amazing
            </h4>
            <h1 className="text-amber-900 font-bold text-center md:text-start capitalize text-4xl my-2">
              Enjoy a dream vacation in hotel Trishul Regency
            </h1>
            <h5 className="text-black text-justify text-lg my-2">
              Experience comfort, relaxation, and panoramic views that will make
              your stay unforgettable. Perfect for nature lovers and peace
              seekers, Hotel Trishul Regency is where your dream vacation
              begins.
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
          subtitle="YOUR STAY AT Trishul Regency "
          description=" Enjoy cozy, modern rooms with panoramic views of the Himalayas and tea gardens. With personalized service, local delicacies, and a serene ambiance, your stay promises comfort and unforgettable memories."
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
                  <p className="capitalize text-black">Starts from</p>
                  <p className="text-2xl font-extrabold mx-2">₹{room?.price}</p>
                  <p className="text-lg font-bold text-orange-400 ml-2">
                    /Night
                  </p>
                </div>
                <div className="flex flex-col justify-center items-start w-full my-2">
                  <div className="flex justify-between items-center w-[70%]">
                    <p className="capitalize font-bold mr-4 w-full">Status</p>
                    <p className="text-black w-full text-left">Available</p>
                  </div>
                  <div className="flex justify-between items-center w-[70%]">
                    <p className="capitalize font-bold mr-4 w-full">Payment</p>
                    <p className="text-black w-full text-left">
                      Online / On-Spot
                    </p>
                  </div>
                  <div className="flex justify-between items-center w-[70%]">
                    <p className="capitalize font-bold mr-4 w-full">
                      Guest Limit
                    </p>
                    <p className="text-black w-full text-left">3</p>
                  </div>
                  <div className="flex justify-between items-center w-[70%]">
                    <p className="capitalize font-bold mr-4 w-full">Beds</p>
                    <p className="text-black w-full text-left">1</p>
                  </div>
                </div>
                <div className="flex  justify-start items-center w-full my-2">
                  <Button title="Book Now" />
                </div>
              </div>
            </div>
          ))}
        </section>
        <section className=" grid grid-cols-3 md:w-[70%] w-full m-auto md:p-14 p-2 items-start">
          <article className="md:col-span-1 col-span-3 flex flex-col justify-center items-center my-5 md:my-0">
            <div className=" bg-yellow-700 flex justify-center items-center w-20 h-20 rounded-full mb-2">
              <GiKeyCard size={30} color="white" />
            </div>
            <h3 className="font-bold text-xl">Luxurious Rooms</h3>
            <p className="text-center">
              Spacious, elegantly designed rooms with stunning views, ensuring a
              restful and premium experience.
            </p>
          </article>
          <article className="md:col-span-1 col-span-3  flex flex-col justify-center items-center my-5 md:my-0">
            <div className=" bg-yellow-700 flex justify-center items-center w-20 h-20 rounded-full mb-2">
              <PiCallBellBold size={25} color="white" />
            </div>
            <h3 className="font-bold text-xl">Quality Service</h3>
            <p className="text-center">
              Dedicated hospitality offering personalized attention to make your
              stay comfortable and memorable.
            </p>
          </article>
          <article className="md:col-span-1 col-span-3  flex flex-col justify-center items-center my-5 md:my-0">
            <div className=" bg-yellow-700 flex justify-center items-center w-20 h-20 rounded-full mb-2">
              <FaTreeCity size={30} color="white" />
            </div>
            <h3 className="font-bold text-xl">Great Environment</h3>
            <p className="text-center">
              A serene setting amidst mountains and tea gardens, perfect for
              relaxation and peace.
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
            {reviews.map((review, i) => (
              <div key={i} className="my-3">
                <ReviewCard
                  name={review.name}
                  profession={review.profession}
                  comment={review.comment}
                />
              </div>
            ))}
          </CommonCarousel>
        </div>
        <NewsLetter />
        <Footer />
      </div>
    </>
  );
};

export default Home;
