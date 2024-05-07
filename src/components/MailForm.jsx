import React, { useState } from "react";
import Button from "./Button";

const MailForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = "";
    if (name === "email") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(value)) {
        error = "Please enter a valid email address";
      }
    }
    setFormData({
      ...formData,
      [name]: value,
      error,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   // Send form data to Node.js backend for email processing
    //   const response = await fetch("/send-email", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(formData),
    //   });
    //   if (response.ok) {
    //     console.log("Email sent successfully!");
    //     // Optionally, reset form fields after successful submission
    //     setFormData({
    //       yourName: "",
    //       email: "",
    //       comment: "",
    //     });
    //   } else {
    //     console.error("Failed to send email.");
    //   }
    // } catch (error) {
    //   console.error("Error sending email:", error);
    // }
  };

  return (
    <section className="md:w-[60%] w-[95%] m-auto mb-10">
      <h2 className="text-2xl font-bold my-2">Write us something</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="First Name"
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
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            placeholder="Write your message..."
            className="   p-2 border border-gray-300 w-full col-span-2 focus:outline-none"
          ></textarea>
        </div>
        <div className="w-[30%] my-2">
          <Button title="Send" />
        </div>
      </form>
    </section>
  );
};

export default MailForm;
