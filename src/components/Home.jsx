import React from "react";
import Header from "./Header";
import NewsLetter from "./NewsLetter";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className="h-screen">
      <Header name="Home" />
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default Home;
