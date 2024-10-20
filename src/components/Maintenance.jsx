// Maintenance.jsx
import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import MaintenaceLoader from "../assets/Maintenance.json";

const Maintenance = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-black text-center">
      <Player
        autoplay
        loop
        src={MaintenaceLoader}
        className="w-72 h-52 sm:w-96 sm:h-96"
      />
      <h2 className="text-2xl font-bold mt-6 sm:text-4xl text-white">
        We Are Under Maintenance
      </h2>
      <p className="text-lg text-gray-600 mt-2 sm:text-xl">
        We will be back soon! Thank you for your patience.
      </p>
    </div>
  );
};

export default Maintenance;
