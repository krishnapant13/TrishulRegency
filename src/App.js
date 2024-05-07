import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home.jsx";
import Rooms from "./components/Rooms.jsx";
import "./App.css";
import Booking from "./components/Booking.jsx";
import RoomDetails from "./components/RoomDetails.jsx";
import Checkout from "./components/Checkout.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import "react-phone-input-2/lib/style.css";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { server } from "./server.js";

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
          <Route path="/trishool-hotel" element={<Home />} />
          <Route path="/rooms" element={<Rooms roomData={roomData} />} />
          <Route path="/booking/:roomName" element={<Booking />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/room/:nameId" element={<RoomDetails />} />
          <Route path="/checkout/:roomName" element={<Checkout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
