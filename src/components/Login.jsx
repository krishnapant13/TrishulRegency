import React, { useContext, useEffect, useRef, useState } from "react";
import Button from "./Button";
import SignUp from "./SignUp";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./common/AuthContext";
import { toast } from "react-toastify";
import Loader from "./Loader";
import CryptoJS, { enc } from "crypto-js";

const Login = ({ setShowModal }) => {
  const [signUpClick, setSignUpClick] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const encryptedEmail = CryptoJS.AES.encrypt(
        formData.email,
        process.env.REACT_APP_ENCRYPTION_KEY
      ).toString();
      const encryptedPassword = CryptoJS.AES.encrypt(
        formData.password,
        process.env.REACT_APP_ENCRYPTION_KEY
      ).toString();
      await login({ email: encryptedEmail, password: encryptedPassword }).then(
        () => {
          setLoading(false);
          setShowModal(false);
        }
      );
    } catch (error) {
      setLoading(false)
      console.error(error);
      toast.error("Something Went Wrong");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      {loading ? (
        <Loader />
      ) : (
        <div
          className={`bg-white p-4 rounded-lg w-[90%] md:w-[50%] flex flex-col justify-between overflow-scroll ${
            signUpClick ? "h-[90vh] md:h-auto" : "h-fit md:h-auto"
          }`}
          ref={modalRef}
        >
          {signUpClick ? (
            <SignUp
              setSignUpClick={setSignUpClick}
              setShowModal={setShowModal}
            />
          ) : (
            <div>
              <h2 className="text-lg font-bold mb-2">Login</h2>

              <form onSubmit={handleLogin}>
                <div className="mb-2">
                  <label className="block text-sm">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 w-full focus:outline-none"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 w-full focus:outline-none"
                  />
                </div>
                <Button title="Login" />
              </form>
              <div className="text-sm text-center mt-4">
                <Link to="/forgot-password" className="block text-blue-500">
                  Forgot Password?
                </Link>
                <Link
                  onClick={() => setSignUpClick(true)}
                  className="block text-blue-500 cursor-pointer"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Login;
