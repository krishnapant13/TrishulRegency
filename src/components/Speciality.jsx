import React from "react";
import SpecialityCard from "./SpecialityCard";
import Info from "./common/Info";

const Speciality = () => {
  const specialties = [
    {
      icon: "24/7 Hours Open",
      title: "Open 24/7",
      description: "We are always available.",
    },
    {
      icon: "Great Environment",
      title: "Great Environment",
      description: "Enjoy our cozy atmosphere.",
    },
    {
      icon: "Free Car Parking",
      title: "Free Car Parking",
      description: "Convenient parking for our guests.",
    },
    {
      icon: "Hotel Rooms",
      title: "Hotel Rooms",
      description: "Comfortable rooms for a relaxing stay.",
    },
    {
      icon: "Offer on Special Days",
      title: "Special Offers",
      description: "Exclusive discounts on special occasions.",
    },
    {
      icon: "Open Terrace Restaurant",
      title: "Open Terrace Restaurant",
      description: "Dine under the stars with a view.",
    },
    {
      icon: "On Order Food",
      title: "On Order Food",
      description: "Customize your meal to your liking.",
    },
    {
      icon: "Tea Garden",
      title: "Tea Garden",
      description: "Relax and unwind in our lush tea garden.",
    },
    {
      icon: "Mountain View",
      title: "Mountain View",
      description: "Breathtaking views of the mountains.",
    },
  ];

  return (
    <section>
      <Info
        title="We are awesome"
        subtitle=" Our Speciality"
        description=" Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore provident vero, debitis."
      />
      <div className="grid md:grid-cols-3 grid-cols-4 md:w-[70%] w-[90%] m-auto">
        {specialties.map((specialty, index) => (
          <SpecialityCard
            key={index}
            icon={specialty.icon}
            title={specialty.title}
            description={specialty.description}
          />
        ))}
      </div>{" "}
    </section>
  );
};

export default Speciality;
