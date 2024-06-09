import React from "react";
import animationData from "../assets/loader.json";
import Lottie from "react-lottie";

const Loader = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="h-screen w-full flex justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0000007a]">
      <Lottie options={defaultOptions} height={200} width={200} />
    </div>
  );
};

export default Loader;
