import React, { useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Header from "./Header";
import NewsLetter from "./NewsLetter";
import Footer from "./Footer";
import MailForm from "./MailForm";
import { IoLocation, IoMail } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { Helmet } from "react-helmet";

const Contact = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Trishul Regency - Contact</title>
        <meta
          name="description"
          content="Get in touch with us for bookings, inquiries, or any assistance during your stay."
        />
      </Helmet>
      <div className="h-screen">
        <Header
          name="Contact us"
          description="Get in touch with us for bookings, inquiries, or any assistance during your stay."
        />
        <section className=" grid grid-cols-3 md:w-[60%] w-full m-auto md:p-10 p-2 ">
          <article className="md:col-span-1 col-span-3 flex flex-col justify-center items-center my-5 md:my-0">
            <div className="bg-yellow-700 flex justify-center items-center w-20 h-20 rounded-full mb-2">
              <IoLocation size={30} color="white" />
            </div>
            <h3 className="font-bold text-xl">Location</h3>
            <p className="text-center">
              Garur-Baijnath Road, Kausani, Bageshwar
            </p>
          </article>
          <article className="md:col-span-1 col-span-3  flex flex-col justify-center items-center my-5 md:my-0">
            <div className="bg-yellow-700 flex justify-center items-center w-20 h-20 rounded-full mb-2">
              <FaPhoneAlt size={25} color="white" />
            </div>
            <h3 className="font-bold text-xl">Phone</h3>
            <p className="text-center">
              <a href={`tel:${"+919068075114"}`}>{"+91 906 807 5114"}</a>
            </p>
          </article>
          <article className="md:col-span-1 col-span-3  flex flex-col justify-center items-center my-5 md:my-0">
            <div className="bg-yellow-700 flex justify-center items-center w-20 h-20 rounded-full mb-2">
              <IoMail size={30} color="white" />
            </div>
            <h3 className="font-bold text-xl">Email</h3>
            <p className="text-center">
              {" "}
              <a href={`mailto:${"trishulregency@gmail.com"}`}>
                {"trishulregency@gmail.com"}
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
            <Popup>Trishul Regency </Popup>
          </Marker>
        </MapContainer>
      </div> */}
        <NewsLetter />
        <Footer />
      </div>
    </>
  );
};

export default Contact;
