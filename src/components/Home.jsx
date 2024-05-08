import React from "react";
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

const Home = () => {
  const images = [
    "https://res.cloudinary.com/dutkerqvn/image/upload/v1714721348/IMG_5302_vikv0t.jpg",
    "https://res.cloudinary.com/dutkerqvn/image/upload/v1714721348/IMG_5302_vikv0t.jpg",
    "https://res.cloudinary.com/dutkerqvn/image/upload/v1714721348/IMG_5302_vikv0t.jpg",
  ];
  return (
    <div className="h-screen">
      <Header navOnly />
      <section className="grid md:grid-cols-3 m-auto md:px-[13em] px-2 md:pt-20 pt-10 h-screen w-full">
        <div className="flex flex-col md:col-span-2 col-span-3 justify-center items-start w-full  md:w-[80%]">
          <h4 className="text-orange-400 uppercase text-xl my-2">
            Its amazing
          </h4>
          <h1 className="text-amber-900 font-bold capitalize text-4xl my-2">
            Enjoy a dream vacation in the hotel terrace peaks
          </h1>
          <h5 className="text-gray-400 text-lg my-2">
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
                alt={`Image ${index}`}
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
      <section className=" grid grid-cols-3 md:w-[60%] w-full m-auto md:p-10 p-2 ">
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
        title="Live a luxurious life"
        subtitle="Best Quality Rooms"
        description=" Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore provident vero, debitis."
      />
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default Home;
