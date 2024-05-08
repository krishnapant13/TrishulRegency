import React from "react";
import Slider from "react-slick";

const HomeCarousel = ({ children }) => {
  const settings = {
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="md:w-full md:h-full w-80 h-80 my-3">
      <Slider {...settings}>{children}</Slider>
    </div>
  );
};

export default HomeCarousel;
