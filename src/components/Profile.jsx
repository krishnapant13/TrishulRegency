import React, { useContext, useState } from "react";
import Ticket from "./common/Ticket";
import noUser from "../assets/noUser.jpeg";
import { useSelector } from "react-redux";
import Header from "./Header";
import { BsPencilFill } from "react-icons/bs";
import Button from "./Button";
import { AuthContext } from "./common/AuthContext";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const user = useSelector((state) => state?.user?.guestDetails);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: user?.firstName,
    lastName: user.lastName,
    email: user.emailAddress,
    phoneNumber: user?.phoneNumber,
    address: user?.address,
    zipCode: user?.zipCode,
    state: user?.state,
    country: user?.country,
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleLogout = () => {
    navigate("/");
    logout();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Updating user details:", formData);
      setFormData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        gender: "",
      });
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  return (
    <div>
      {/* <Header navOnly /> */}
      <div className="flex flex-col md:flex-row p-4 md:px-[10em]">
        <div className="w-full md:w-1/4 mb-4 md:mb-0">
          <h1 className="text-2xl font-bold">User Profile</h1>
          {/* Tab Section */}
          <div className="mt-4">
            <button
              className={`w-full p-2 rounded ${
                activeTab === "profile"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setActiveTab("profile")}
            >
              Profile Details
            </button>
            <button
              className={`w-full p-2 rounded ${
                activeTab === "booking"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              } mt-2`}
              onClick={() => setActiveTab("booking")}
            >
              Booking Details
            </button>
            <div onClick={() => handleLogout()}>
              <Button title="Logout" />
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="w-full md:w-3/4 p-4">
          {activeTab === "profile" && (
            <div>
              <div className="flex mb-4 flex-row ">
                <div className="relative">
                  <img
                    src={user ? user.avatar : noUser}
                    alt="Profile"
                    className="w-20 h-20 rounded-full"
                  />
                  <div className="absolute -right-0 bottom-2 flex justify-center items-center rounded-full p-1 bg-orange-400  shadow-md cursor-pointer">
                    <BsPencilFill color="white" size={12} className="" />
                  </div>
                </div>
                <div className="flex  flex-col justify-center items-start mx-4 font-bold">
                  <p>{user?.firstName + " " + user?.lastName}</p>
                  <p>{user?.state + ", " + user?.country}</p>
                </div>
              </div>
              <h2 className="text-lg font-semibold mb-4">Account Details</h2>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded  focus:outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded  focus:outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded  focus:outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Phone Number"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded  focus:outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="Zip Code"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded  focus:outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded  focus:outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded  focus:outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded  focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="gender" className="block mb-1">
                      Gender:
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded  focus:outline-none"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
                >
                  Update
                </button>
              </form>
            </div>
          )}
          {/* Add another tab content for booking details */}
          {activeTab === "booking" && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Booking Details</h2>
              <Ticket guestDetails={user} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
