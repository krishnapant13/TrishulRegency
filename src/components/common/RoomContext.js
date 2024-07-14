// RoomContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { server } from "../../server";
import { useSelector } from "react-redux";

const RoomContext = createContext();

const RoomProvider = ({ children }) => {
  const [roomData, setRoomData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const bookingDetails = useSelector((state) => state?.user?.bookingDetails);

  useEffect(() => {
    const currentDate = new Date();
    setCheckInDate(currentDate);

    const nextDay = new Date(currentDate);
    nextDay.setDate(nextDay.getDate() + 1);
    setCheckOutDate(nextDay);
  }, [bookingDetails]);

  const fetchRoomsData = async () => {
    try {
      const response = await axios.get(`${server}/room/check-availability`);
      setRoomData(response.data);
    } catch (error) {
      console.error("Error fetching rooms data:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateBookedDates = (roomId, newBooking) => {
    setRoomData((prevRoomData) => {
      if (!Array.isArray(prevRoomData)) return prevRoomData;
      return prevRoomData.map((room) => {
        if (room._id === roomId) {
          return {
            ...room,
            bookedDates: [...room.bookedDates, newBooking],
          };
        }
        return room;
      });
    });
  };

  useEffect(() => {
    if (checkInDate && checkOutDate) {
      fetchRoomsData(checkInDate.toISOString(), checkOutDate.toISOString());
    }
  }, [checkInDate, checkOutDate]);

  return (
    <RoomContext.Provider
      value={{
        roomData,
        loading,
        checkInDate,
        setCheckInDate,
        checkOutDate,
        setCheckOutDate,
        fetchRoomsData,
        updateBookedDates,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export { RoomContext, RoomProvider };
