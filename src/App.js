import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home.jsx";
import Rooms from "./components/Rooms.jsx";
import Booking from "./components/Booking.jsx";
import RoomDetails from "./components/RoomDetails.jsx";
import Checkout from "./components/Checkout.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Profile from "./components/Profile.jsx";
import Maintenance from "./components/Maintenance.jsx";
import Navigators from "./components/Navigators.jsx";
import Admin from "./components/Admin.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "react-phone-input-2/lib/style.css";
import "react-datepicker/dist/react-datepicker.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import bg from "./assets/Snapseed.jpg";
import Ticket from "./components/common/Ticket.jsx";
import { RoomProvider } from "./components/common/RoomContext.js";
import { AuthProvider } from "./components/common/AuthContext.js";

function App() {
  return (
    <div
      className="App bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <AuthProvider>
        <RoomProvider>
          <BrowserRouter basename="/TrishulRegency">
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="/" element={<Maintenance />} /> */}
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/booking/:roomName" element={<Booking />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/room/:nameId" element={<RoomDetails />} />
              <Route path="/checkout/:roomName" element={<Checkout />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/admin/" element={<Admin />} />
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
        </RoomProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
