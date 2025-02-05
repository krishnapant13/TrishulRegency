import React from "react";

const ImageGrid = () => {
  const images = [
"https://res.cloudinary.com/dutkerqvn/image/upload/v1738740994/Grid%20Images/8_qmqxgt.webp",
"https://res.cloudinary.com/dutkerqvn/image/upload/v1738740993/Grid%20Images/10_ce4tfs.webp",
"https://res.cloudinary.com/dutkerqvn/image/upload/v1738740989/Grid%20Images/9_m64knj.webp",
"https://res.cloudinary.com/dutkerqvn/image/upload/v1738740987/Grid%20Images/6_wemngf.webp",
"https://res.cloudinary.com/dutkerqvn/image/upload/v1738740985/Grid%20Images/5_esoddy.webp",
"https://res.cloudinary.com/dutkerqvn/image/upload/v1738740980/Grid%20Images/4_xql9z0.webp",
"https://res.cloudinary.com/dutkerqvn/image/upload/v1738740976/Grid%20Images/2_lbohbu.webp",
"https://res.cloudinary.com/dutkerqvn/image/upload/v1738740974/Grid%20Images/7_tjoplo.webp",
"https://res.cloudinary.com/dutkerqvn/image/upload/v1738740966/Grid%20Images/3_bo0fzl.webp",
"https://res.cloudinary.com/dutkerqvn/image/upload/v1738740961/Grid%20Images/1_v34aef.webp",
  ];

  const gridItems = images.map((img, index) => {
    let style = {};
    if (images.length % 2 === 0 && images.length <= 5) {
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
    <div className="xl:h-[70vh] h-screen md:pt-10 pt-5 grid xl:grid-cols-4 grid-cols-2 gap-1 my-5 w-full">
      {gridItems}
    </div>
  );
};

export default ImageGrid;
