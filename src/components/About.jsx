import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import NewsLetter from "./NewsLetter";
import Speciality from "./Speciality";
import ImageGrid from "./common/ImageGrid";
import { Helmet } from "react-helmet";

const About = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Trishul Regency - About</title>
        <meta
          name="description"
          content="Learn more about our story, vision, and commitment to providing exceptional hospitality."
        />
      </Helmet>
      <div className="h-screen">
        <Header
          name="About us"
          description="Learn more about our story, vision, and commitment to providing exceptional hospitality."
        />
        <section className="bg-white px-2 py-10 md:px-[5em] xl:px-[10em] lg:px-2 md:py-[2em] relative overflow-scroll">
          <div className="flex flex-col justify-center items-center">
            <h3 className="font-bold uppercase text-yellow-700 text-lg w-full text-center">
              We are awesome
            </h3>
            <h1 className="font-bold uppercase text-2xl text-center">
              Welcome to The Trishul Regency !
            </h1>
            <h5 className="font-bold uppercase text-sm text-gray-400 tracking-widest text-center">
              Hotel | Restaurents
            </h5>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1  md:gap-10 mt-5">
            <p className=" text-justify">
              Nestled in the serene village of Kausani, Almora, where the
              majestic Himalayas provide a breathtaking backdrop to your
              getaway. Our hotel prides itself on offering the finest
              accommodations at competitive prices, ensuring that your stay is
              both comfortable and affordable. Each room is thoughtfully
              designed to provide a blend of luxury and warmth, making it the
              perfect retreat after a day of exploration.
            </p>
            <p className=" text-justify">
              At Trishul Regency, we believe in offering more than just a place
              to stay. Our dedicated team is committed to providing exceptional
              service, and we take pride in serving authentic{" "}
              <b>local cuisine</b> that showcases the rich flavors of the
              region. To enhance your travel experience, we also offer
              knowledgeable <b>guides</b> and <b>reliable vehicles </b>
              for sightseeing and exploring the natural beauty of Kausani. Come
              and create unforgettable memories with us at Trishul Regency,
              where comfort meets adventure.
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
    </>
  );
};

export default About;
