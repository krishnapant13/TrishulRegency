import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookingDetails: null,
  userDetails: null,
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
    updateGuestDetails: (state, action) => {
      state.bookingDetails.guests = action.payload;
    },
    updateCheckInDate: (state, action) => {
      state.bookingDetails.checkInDate = action.payload;
    },
    updateCheckOutDate: (state, action) => {
      state.bookingDetails.checkOutDate = action.payload;
    },
    addGuestDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    updateBookedRooms: (state, action) => {
      state.userDetails.bookedRooms = [
        ...state.userDetails.bookedRooms,
        action.payload,
      ];
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
  updateGuestDetails,
  updateBookedRooms,
  setStatus,
  setError,
} = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
