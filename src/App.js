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

function App() {
  return (
    <div className="App">
      <BrowserRouter  basename="/terrace-peaks">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/room/:roomId" element={<RoomDetails />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
