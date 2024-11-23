import React, { useContext, useEffect, useState } from "react";
import noUser from "../assets/noUser.jpeg";
import Header from "./Header";
import { AuthContext } from "./common/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { server } from "../server";
import axios from "axios";
import {
  MdArrowDropDown,
  MdArrowDropUp,
} from "react-icons/md";
const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isReviewBoxOpen, setIsReviewBoxOpen] = useState({});

  const toggleReviewBox = (index) => {
    setIsReviewBoxOpen((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  const Star = ({ filled, onClick, onMouseEnter, onMouseLeave }) => {
    return (
      <svg
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 cursor-pointer"
        fill={filled ? "orange" : "none"}
        viewBox="0 0 24 24"
        stroke="orange"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.18 6.725h7.065c.969 0 1.371 1.24.588 1.81l-5.707 4.147 2.18 6.725c.3.922-.755 1.688-1.54 1.167L12 18.347l-5.707 4.147c-.784.521-1.838-.245-1.54-1.167l2.18-6.725-5.707-4.147c-.784-.571-.381-1.81.588-1.81h7.065l2.18-6.725z"
        />
      </svg>
    );
  };
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
  const handleStarClick = (starRating) => {
    setSelectedRating(starRating); // Set the selected rating value
    setRating(starRating); // Also set the rating for submission
  };
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const submitReview = async (roomId) => {
    try {
      const response = await axios.post(
        `${server}/review/add-review/${roomId}`,
        { rating, reviewText },
        config
      );
      setReviewText("");
      setIsReviewBoxOpen(false);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div>
      <Header navOnly />
      <div className=" flex flex-col justify-center items-center pt-20">
        <p className="text-2xl w-[80%] hidden md:block text-start font-bold">
          User Profile
        </p>
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
            user.bookedRooms
              .sort(
                (a, b) =>
                  new Date(b.bookingDetails?.checkOutDate) -
                  new Date(a.bookingDetails?.checkOutDate)
              )
              .map((room, index) => (
                <div
                  key={index}
                  className="accordion border border-orange-500 rounded-lg mb-4 w-full"
                >
                  <h2 className="accordion-header mb-0">
                    <button
                      className="accordion-button collapsed w-full text-left p-4 bg-gray-100 hover:bg-gray-200 focus:outline-none cursor-default"
                      type="button"
                    >
                      <div className="flex justify-between items-center w-full">
                        <p className="font-semibold">
                          {room?.bookingDetails?.room?.heading} <span className="hidden md:block">-{" "}
                          {room?.bookingDetails?.room?.subheading}</span>
                        </p>
                        <span className="text-black">
                          {new Date(
                            room.bookingDetails?.checkInDate
                          ).toLocaleDateString()}{" "}
                          to{" "}
                          {new Date(
                            room.bookingDetails?.checkOutDate
                          ).toLocaleDateString()}
                        </span>
                        {/* add stars here */}
                        {!isReviewBoxOpen[index] && (
                          <button
                            onClick={() => toggleReviewBox(index)}
                            className={`${
                              new Date(room.bookingDetails?.checkOutDate) >
                              new Date()
                                ? "bg-gray-500"
                                : "bg-orange-500"
                            } text-white py-2 px-2 md:px-4 mt-2 rounded text-sm md:text-base`}
                            disabled={
                              new Date(room.bookingDetails?.checkOutDate) >
                              new Date()
                            }
                          >
                            Add Review
                          </button>
                        )}
                        {isReviewBoxOpen[index] && (
                          <div className="mt-4 flex justify-center items-center">
                            <div className="flex flex-col justify-center items-start">
                              <div className="flex items-center justify-center mb-4">
                                {[1, 2, 3, 4, 5].map((star, index) => (
                                  <Star
                                    key={index}
                                    filled={
                                      hoverRating >= star ||
                                      selectedRating >= star
                                    }
                                    onClick={() => handleStarClick(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                  />
                                ))}
                              </div>

                              <textarea
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                placeholder="Write your review here"
                                className="w-full p-2 border border-orange-500 rounded"
                                required
                              />
                            </div>

                            <button
                              onClick={() =>
                                submitReview(room?.bookingDetails?.room?._id)
                              }
                              className={`py-2 px-4 ms-6 rounded ${
                                reviewText.trim()
                                  ? "bg-orange-500 text-white cursor-pointer"
                                  : "bg-gray-400 text-white cursor-not-allowed"
                              }`}
                              disabled={!reviewText.trim()} // Disable button if no text
                            >
                              Submit Review
                            </button>
                          </div>
                        )}
                        <span
                          className=" cursor-pointer "
                          onClick={() => toggleAccordion(index)}
                        >
                          {activeAccordion === index ? (
                            <MdArrowDropUp size={45} />
                          ) : (
                            <MdArrowDropDown size={45} />
                          )}
                        </span>
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
