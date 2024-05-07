import React from "react";
import { IoLocation, IoMail } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";

const ContactCard = ({ icon, title, description }) => {
  const iconMap = {
    location: <IoLocation size={30} color="white" />,
    phone: <FaPhoneAlt size={25} color="white" />,
    mail: <IoMail size={30} color="white" />,
  };

  const renderClickable = () => {
    if (icon === "mail") {
      return <a href={`mailto:${description}`}>{description}</a>;
    } else if (icon === "phone") {
      return <a href={`tel:${description}`}>{description}</a>;
    } else {
      return description;
    }
  };

  return (
    <article className="col-span-1 flex flex-col justify-center items-center">
      <div className="bg-orange-300 flex justify-center items-center w-20 h-20 rounded-full mb-2">
        {iconMap[icon]}
      </div>
      <h3 className="font-bold text-xl">{title}</h3>
      <p className="text-center">{renderClickable()}</p>
    </article>
  );
};

export default ContactCard;
