import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import NewsLetter from "./NewsLetter";
import Speciality from "./Speciality";
import ImageGrid from "./common/ImageGrid";

const About = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="h-screen">
      <Header name="About us" />
      <section className="bg-white px-2 py-10 md:px-[5em] xl:px-[10em] lg:px-2 md:py-[5em] relative overflow-scroll">
        <div className="flex flex-col justify-center items-center">
          <h3 className="font-bold uppercase text-yellow-700 text-lg w-full text-center">
            We are awesome
          </h3>
          <h1 className="font-bold uppercase text-2xl text-center">
            Welcome to the Terrace Peaks !
          </h1>
          <h5 className="font-bold uppercase text-sm text-gray-400 tracking-widest text-center">
            Hotel | Restaurents
          </h5>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1  md:gap-10 mt-5">
          <p className=" text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At modi
            totam ipsam quidem consectetur quo cumque, quibusdam corrupti labore
            dolorem accusamus dolore laboriosam reiciendis, harum corporis
            repellendus, voluptatibus adipisci? Laudantium.
          </p>
          <p className=" text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At modi
            totam ipsam quidem consectetur quo cumque, quibusdam corrupti labore
            dolorem accusamus dolore laboriosam reiciendis, harum corporis
            repellendus, voluptatibus adipisci? Laudantium.
          </p>
        </div>
      </section>
      <section className=" md:px-40 px-2 lg:px-2">
        <ImageGrid />
      </section>
      <Speciality />
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default About;
