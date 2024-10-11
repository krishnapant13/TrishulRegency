import React from "react";
import bg from "../../assets/Snapseed.jpg";

const Info = ({ title, subtitle, description, noGap }) => {
  return (
    <section
      className={`my-15 md:mt-0 mt-72 ${
        !noGap && "md:my-10"
      }  bg-transparent bg-cover bg-center `}
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="flex flex-col justify-center items-center">
        <h3 className="font-bold capitalize  text-gray-400 text-md">{title}</h3>
        <hr className="md:w-[10%] w-[20%] h-[4px] bg-orange-400 mb-2" />
        <h2 className="font-bold uppercase text-2xl w-full text-center  tracking-widest mb-2">
          {subtitle}
        </h2>
        <p className="font-bold text-center text-sm w-[90%] md:w-[50%]  tracking-widest">
          {description}
        </p>
      </div>
    </section>
  );
};

export default Info;
