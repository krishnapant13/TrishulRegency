import React, { useState } from "react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
    <div className="flex md:px-[10em] ">
      {/* Profile Section */}
      <div className="w-1/4 p-4">
        <div className="profile-section">
          {/* Placeholder for profile image */}
          <img src="profile.jpg" alt="Profile" className="profile-image" />
        </div>
        {/* Tab Section */}
        <div className="mt-4">
          <button
            className={`w-full p-2 rounded ${
              activeTab === "profile" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            Profile Details
          </button>
          <button
            className={`w-full p-2 rounded ${
              activeTab === "booking" ? "bg-blue-500 text-white" : "bg-gray-200"
            } mt-2`}
            onClick={() => setActiveTab("booking")}
          >
            Booking Details
          </button>
        </div>
      </div>

      {/* Details Section */}
      <div className="w-3/4 p-4">
        {activeTab === "profile" && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Account Details</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="firstName" className="block mb-1">
                  First Name:
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="lastName" className="block mb-1">
                  Last Name:
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phoneNumber" className="block mb-1">
                  Phone Number:
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block mb-1">
                  Address:
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="gender" className="block mb-1">
                  Gender:
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded"
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
            {/* Add your booking details here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
