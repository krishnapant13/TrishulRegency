import React, { useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import PhoneInput from "react-phone-input-2";
import axios from "axios";
import { server } from "../server";
import { toast } from "react-toastify";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addGuestDetails } from "../redux/slices/userSlice";

const BookingForm = ({ guestData }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    phoneNumber: "",
    address: "",
    state: "",
    country: "",
    zipCode: "",
    additionMessage: "",
    couponCode: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newError = "";

    if (name === "emailAddress") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(value)) {
        newError = "Please enter a valid email address";
      }
    } else if (name === "password") {
      const passwordRegex =
        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      if (!passwordRegex.test(value)) {
        newError =
          "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.";
      }
    }
    setError(newError);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhoneChange = (value) => {
    setFormData({
      ...formData,
      phoneNumber: value || "",
    });
  };

  const handleCountryChange = (country) => {
    setFormData({
      ...formData,
      country: country,
      state: "",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error) {
      toast.error(error);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${server}/guest/create-guest`,
        formData
      );
      const roomName = guestData?.room.heading
        .toLowerCase()
        .replace(/\s+/g, "-");
      dispatch(addGuestDetails(response.data.user));
      navigate(`/checkout/${roomName}-${guestData?.room._id}`);
      toast.success(response.data.message);
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message;
        toast.error(errorMessage);
      } else if (error.request) {
        toast.error("Please try again later.");
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="mt-2" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="p-2 border border-gray-300 w-full focus:outline-none"
          required
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="p-2 border border-gray-300 w-full focus:outline-none"
          required
        />
        <input
          type="email"
          name="emailAddress"
          value={formData.emailAddress}
          onChange={handleChange}
          placeholder="Email Address"
          className="p-2 border border-gray-300 w-full focus:outline-none"
          required
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create Login Password"
            className="p-2 border border-gray-300 w-full focus:outline-none"
            required
          />
          {showPassword ? (
            <BsEyeSlashFill
              size={20}
              className="absolute top-1/2 right-2 -translate-x-1/2 -translate-y-1/2"
              onClick={() => setShowPassword((prev) => !prev)}
            />
          ) : (
            <BsEyeFill
              size={20}
              className="absolute top-1/2 right-2 -translate-x-1/2 -translate-y-1/2"
              onClick={() => setShowPassword((prev) => !prev)}
            />
          )}
        </div>
        <PhoneInput
          country={"in"}
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handlePhoneChange}
          inputStyle={{
            border: "1px solid #ccc",
            borderRadius: "0",
            padding: "20px 10px",
            width: "80%",
            outline: "none",
            marginLeft: "20%",
          }}
          buttonStyle={{
            border: "1px solid #ccc",
            backgroundColor: "white",
            padding: "6px",
          }}
          containerStyle={{
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
          inputProps={{
            required: true,
          }}
        />
        <CountryDropdown
          name="country"
          value={formData.country}
          onChange={(val) => handleCountryChange(val)}
          className="w-full p-2 border bg-white text-gray-400 border-gray-300 focus:outline-none"
          required
        />
        <RegionDropdown
          name="state"
          country={formData.country}
          value={formData.state}
          onChange={(val) =>
            setFormData({
              ...formData,
              state: val,
            })
          }
          className="w-full p-2 border  bg-white text-gray-400 border-gray-300 focus:outline-none"
          blankOptionLabel="Select State"
          required
        />
        <input
          type="number"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          placeholder="Zip Code"
          className="p-2 border border-gray-300 w-full focus:outline-none"
          required
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          className="p-2 border border-gray-300 w-full focus:outline-none"
          required
        />
        <textarea
          name="additionMessage"
          value={formData.additionMessage}
          onChange={handleChange}
          placeholder="Additional Message"
          className="p-2 border border-gray-300 w-full col-span-2 focus:outline-none"
        ></textarea>
        <input
          type="number"
          name="couponCode"
          value={formData.couponCode}
          onChange={handleChange}
          placeholder="Coupon Code"
          className="p-2 border border-gray-300 w-full focus:outline-none"
        />
        <Button title="book now" />
      </div>
    </form>
  );
};

export default BookingForm;
