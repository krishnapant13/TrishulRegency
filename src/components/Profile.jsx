import React, { useContext, useEffect, useState } from "react";
import Ticket from "./common/Ticket";
import noUser from "../assets/noUser.jpeg";
import { useSelector } from "react-redux";
import Header from "./Header";
import { BsPencilFill } from "react-icons/bs";
import Button from "./Button";
import { AuthContext } from "./common/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { server } from "../server";
import axios from "axios";
const Profile = () => {
  const { id } = useParams(); // Get the user ID from the URL params
  const [user, setUser] = useState(null);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [activeAccordion, setActiveAccordion] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${server}/guest/get-guest/${id}`);
        setUser(response.data?.guest);
        setFormData({
          firstName: response.data?.guest?.firstName,
          lastName: response.data?.guest?.lastName,
          email: response.data?.guest?.emailAddress,
          phoneNumber: response.data?.guest?.phoneNumber,
          address: response.data?.guest?.address,
          zipCode: response.data?.guest?.zipCode,
          state: response.data?.guest?.state,
          country: response.data?.guest?.country,
          gender: response.data?.guest?.gender || "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [id]);
  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };
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
      <Header navOnly />
      <div className=" flex flex-col justify-center items-center pt-20">
        <p className="text-2xl w-[80%] hidden md:block text-start font-bold">User Profile</p>
        <div className="w-full flex flex-col md:flex-row justify-evenly items-center p-4 bg-white">
          <div className="flex mb-4 flex-col justify-center items-center">
            {/* <div className="relative"> */}
            <img
              src={user ? user.avatar : noUser}
              alt="Profile"
              className="w-40 h-40 rounded-full"
            />
            {/* <div className="absolute -right-0 bottom-2 flex justify-center items-center rounded-full p-1 bg-orange-400  shadow-md cursor-pointer">
                <BsPencilFill color="white" size={12} className="" />
              </div> */}
            {/* </div> */}
            <div className="flex  flex-col justify-center items-center mx-4 font-bold">
              <p className=" font-extrabold">
                {user?.firstName + " " + user?.lastName}
              </p>
              <p>{user?.state + ", " + user?.country}</p>
            </div>
          </div>
          <div className="h-full w-[0.05em] bg-slate-300"></div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-2 border border-orange-500 rounded  focus:outline-none"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full p-2 border border-orange-500 rounded  focus:outline-none"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-orange-500 rounded  focus:outline-none"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full p-2 border border-orange-500 rounded  focus:outline-none"
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Zip Code"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="w-full p-2 border border-orange-500 rounded  focus:outline-none"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full p-2 border border-orange-500 rounded  focus:outline-none"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full p-2 border border-orange-500 rounded  focus:outline-none"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-2 border border-orange-500 rounded  focus:outline-none"
                />
              </div>
              <div>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full p-2 border border-orange-500 rounded  focus:outline-none"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <button
                type="submit"
                className="bg-orange-500 text-white py-2 px-4 rounded "
              >
                Update
              </button>
              <button
                type="submit"
                className="bg-orange-500 text-white py-2 px-4 rounded "
                onClick={() => handleLogout()}
              >
                Logout
              </button>
            </div>
          </form>
        </div>
        <div className="w-[90%]">
          <h2 className="text-lg font-semibold mb-4">Booking Details</h2>

          {user?.bookedRooms?.length >= 1 ? (
            user.bookedRooms.map((room, index) => (
              <div
                key={index}
                className="accordion border border-orange-500 rounded-lg mb-4 w-full"
              >
                <h2 className="accordion-header mb-0">
                  <button
                    className="accordion-button collapsed w-full text-left p-4 bg-gray-100 hover:bg-gray-200 focus:outline-none"
                    type="button"
                    onClick={() => toggleAccordion(index)}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className="font-semibold">
                        {room?.bookingDetails?.room?.heading} -{" "}
                        {room?.bookingDetails?.room?.subheading}
                      </span>
                      <span className="text-black">
                        {new Date(
                          room.bookingDetails?.checkInDate
                        ).toLocaleDateString()}{" "}
                        to{" "}
                        {new Date(
                          room.bookingDetails?.checkOutDate
                        ).toLocaleDateString()}
                      </span>
                      <span>{activeAccordion === index ? "-" : "+"}</span>
                    </div>
                  </button>
                </h2>
                {activeAccordion === index && (
                  <div className="accordion-body p-4 bg-white rounded-b-lg duration-300 ease-linear">
                    <table className="min-w-full table-auto border-collapse border border-orange-500">
                      <thead className="bg-gray-200">
                        <tr>
                          <th className="border border-orange-500 px-4 py-2 text-left">
                            Category
                          </th>
                          <th className="border border-orange-500 px-4 py-2 text-left">
                            Details
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-orange-500 px-4 py-2">
                            Guests
                          </td>
                          <td className="border border-orange-500 px-4 py-2">
                            {room.bookingDetails?.guestCount}
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-orange-500 px-4 py-2">
                            Room Price
                          </td>
                          <td className="border border-orange-500 px-4 py-2">
                            ₹{room.bookingDetails?.room?.price}
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-orange-500 px-4 py-2">
                            Calculated Price
                          </td>
                          <td className="border border-orange-500 px-4 py-2">
                            ₹{room.bookingDetails?.calculatedPrice}
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-orange-500 px-4 py-2">
                            Meals Included
                          </td>
                          <td className="border border-orange-500 px-4 py-2">
                            <ul className="list-disc list-inside">
                              {Object.entries(room.bookingDetails?.meals)
                                .filter(([key, value]) => value.isChecked)
                                .map(([key, value]) => (
                                  <li key={key}>
                                    {value.name}: ₹{value.price}
                                  </li>
                                ))}
                            </ul>
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-orange-500 px-4 py-2">
                            Room Facilities
                          </td>
                          <td className="border border-orange-500 px-4 py-2">
                            <ul className="list-disc list-inside">
                              {room.bookingDetails?.room.facility.map(
                                (facility, i) => (
                                  <li key={i}>{facility}</li>
                                )
                              )}
                            </ul>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No Rooms Booked Currently</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
