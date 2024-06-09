import React from "react";
import Lottie from "react-lottie";
import animationData from "../assets/Animation - 1714969839262.json";

const PaymentConfirmation = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="w-full flex flex-col justify-center items-center mb-10">
      <Lottie options={defaultOptions} height={100} width={100} />
      <p className="capitalize text-[1.5em] font-bold ">
        Your Booking has been confirmed
      </p>
      <p className="capitalize text-[.8em]  ">Thanks for Choosing us!</p>
    </div>
  );
};

export default PaymentConfirmation;
