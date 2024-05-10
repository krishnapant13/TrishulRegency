import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home.jsx";
import Rooms from "./components/Rooms.jsx";
import Booking from "./components/Booking.jsx";
import RoomDetails from "./components/RoomDetails.jsx";
import Checkout from "./components/Checkout.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import { server } from "./server.js";
import Navigators from "./components/Navigators.jsx";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "react-phone-input-2/lib/style.css";
import "react-datepicker/dist/react-datepicker.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  const [roomData, setRoomData] = useState([]);
  useEffect(() => {
    const fetchRoomsData = async () => {
      try {
        const response = await axios.get(`${server}/room/get-rooms`);
        setRoomData(response.data);
      } catch (error) {
        console.error("Error fetching rooms data:", error);
      }
    };

    fetchRoomsData();
  }, []);
  return (
    <div className="App">
      <BrowserRouter basename="/TerracePeaks">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms roomData={roomData} />} />
          <Route path="/booking/:roomName" element={<Booking />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/room/:nameId" element={<RoomDetails />} />
          <Route path="/checkout/:roomName" element={<Checkout />} />
        </Routes>
        <Navigators />
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          style={{ width: "max-content" }}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
