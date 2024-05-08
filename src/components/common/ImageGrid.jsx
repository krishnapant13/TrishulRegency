import React from "react";

const ImageGrid = () => {
  const images = [
    "https://res.cloudinary.com/dutkerqvn/image/upload/v1714721348/IMG_5302_vikv0t.jpg",
    "https://res.cloudinary.com/dutkerqvn/image/upload/v1714721348/IMG_5302_vikv0t.jpg",
    "https://res.cloudinary.com/dutkerqvn/image/upload/v1714721348/IMG_5302_vikv0t.jpg",
    "https://res.cloudinary.com/dutkerqvn/image/upload/v1714721348/IMG_5302_vikv0t.jpg",
    "https://res.cloudinary.com/dutkerqvn/image/upload/v1714721348/IMG_5302_vikv0t.jpg",
    "https://res.cloudinary.com/dutkerqvn/image/upload/v1714721348/IMG_5302_vikv0t.jpg",
    "https://res.cloudinary.com/dutkerqvn/image/upload/v1714721348/IMG_5302_vikv0t.jpg",
    "https://res.cloudinary.com/dutkerqvn/image/upload/v1714721348/IMG_5302_vikv0t.jpg",
    "https://res.cloudinary.com/dutkerqvn/image/upload/v1714721348/IMG_5302_vikv0t.jpg",
    "https://res.cloudinary.com/dutkerqvn/image/upload/v1714721348/IMG_5302_vikv0t.jpg",
  ];

  const gridItems = images.map((img, index) => {
    let style = {};
    if (images.length % 2 === 0 && images.length <= 4) {
      style.gridRow = "span 1";
      style.gridColumn = "span 2";
    } else if (index % 5 === 0) {
      style.gridRow = "span 2";
      style.gridColumn = "span 2";
    } else {
      style.gridRow = "span 3";
      style.gridColumn = "span 1";
    }
    return (
      <div
        className=" cursor-pointer overflow-hidden"
        style={style}
        key={index}
      >
        <div
          className={`hover:scale-105 transition-all duration-200 ease-linear h-full flex flex-col justify-center items-start bg-cover bg-no-repeat bg-center pl-5`}
          style={{
            backgroundImage: ` url(${img})`,
          }}
        ></div>
      </div>
    );
  });
  return (
    <div className="xl:h-[70vh] h-screen md:pt-10 pt-5 grid xl:grid-cols-4 grid-cols-2 gap-1 my-5">
      {gridItems}
    </div>
  );
};

export default ImageGrid;
