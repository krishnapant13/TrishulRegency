import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { addGuestDetails } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
      // Optionally fetch user data with the token
    }
  }, []);
  const dispatch = useDispatch();

  const login = async (formData) => {
    try {
      const response = await axios.post(
        `${server}/guest/login-guest`,
        formData
      );
      setToken(response.data.token);
      dispatch(addGuestDetails(response.data.user));
      localStorage.setItem("token", response.data.token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
    } catch (error) {
      if (
        error.response &&
        error.response.data.message === "Guest doesn't exist"
      ) {
        toast.error("Guest doesn't exist. Please sign up.");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  const signup = async (formData) => {
    try {
      const response = await axios.post(
        `${server}/guest/create-guest`,
        formData
      );
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      dispatch(addGuestDetails(response.data.user));
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
