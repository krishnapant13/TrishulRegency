import React, { useContext, useState } from "react";
import Button from "./Button";
import SignUp from "./SignUp";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./common/AuthContext";
import { toast } from "react-toastify";
import Loader from "./Loader";

const Login = ({ setShowModal }) => {
  const [signUpClick, setSignUpClick] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
      await login(formData).then(() => {
        setLoading(false);
        setShowModal(false);
      });
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-white p-4 rounded-lg w-[50%] flex flex-col justify-between">
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
