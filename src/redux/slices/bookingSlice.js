// bookingSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookingDetails: null,
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookingDetails: (state, action) => {
      state.bookingDetails = action.payload;
    },
  },
});

export const { setBookingDetails } = bookingSlice.actions;

export const selectBookingDetails = (state) => state.user.room.bookingDetails;

export default bookingSlice.reducer;
