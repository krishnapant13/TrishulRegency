import React from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Header from "./Header";
import NewsLetter from "./NewsLetter";
import Footer from "./Footer";
import ContactCard from "./ContactCard";
import MailForm from "./MailForm";
import { IoLocation, IoMail } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="h-screen">
      <Header name="Contact us" />
      <section className=" grid grid-cols-3 md:w-[60%] w-full m-auto md:p-10 p-2 ">
        <article className="md:col-span-1 col-span-3 flex flex-col justify-center items-center my-5 md:my-0">
          <div className="bg-orange-300 flex justify-center items-center w-20 h-20 rounded-full mb-2">
            <IoLocation size={30} color="white" />
          </div>
          <h3 className="font-bold text-xl">Location</h3>
          <p className="text-center">123 Main Street, City, Country</p>
        </article>
        <article className="md:col-span-1 col-span-3  flex flex-col justify-center items-center my-5 md:my-0">
          <div className="bg-orange-300 flex justify-center items-center w-20 h-20 rounded-full mb-2">
            <FaPhoneAlt size={25} color="white" />
          </div>
          <h3 className="font-bold text-xl">Phone</h3>
          <p className="text-center">
            <a href={`tel:${"+123 456 78  90"}`}>{"+123 456 78  90"}</a>
          </p>
        </article>
        <article className="md:col-span-1 col-span-3  flex flex-col justify-center items-center my-5 md:my-0">
          <div className="bg-orange-300 flex justify-center items-center w-20 h-20 rounded-full mb-2">
            <IoMail size={30} color="white" />
          </div>
          <h3 className="font-bold text-xl">Email</h3>
          <p className="text-center">
            {" "}
            <a href={`mailto:${"example@example.com"}`}>
              {"example@example.com"}
            </a>
          </p>
        </article>
      </section>
      <MailForm />
      {/* <div className="w-full" style={{ height: "200px" }}>
        <MapContainer
          center={[29.8584881, 79.6046793]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[29.8584881, 79.6046793]}>
            <Popup>Terrace Peaks</Popup>
          </Marker>
        </MapContainer>
      </div> */}
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default Contact;
