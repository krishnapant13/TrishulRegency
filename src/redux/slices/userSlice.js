import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookingDetails: null,
  guestDetails: null,
  bookedRoom: null,
  status: "idle",
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserRoomBookingDetails: (state, action) => {
      state.bookingDetails = action.payload;
    },
    updateCheckInDate: (state, action) => {
      state.bookingDetails.checkInDate = action.payload;
    },
    updateCheckOutDate: (state, action) => {
      state.bookingDetails.checkOutDate = action.payload;
    },
    addGuestDetails: (state, action) => {
      state.guestDetails = action.payload;
    },
    updateBookedRoom: (state, action) => {
      state.bookedRoom = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  updateUserRoomBookingDetails,
  updateCheckInDate,
  updateCheckOutDate,
  addGuestDetails,
  updateBookedRoom,
  setStatus,
  setError,
} = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
