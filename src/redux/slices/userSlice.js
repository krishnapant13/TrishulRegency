import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "Authentication",
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    LoadUserRequest: (state) => {
      state.loading = true;
    },
    LoadUserSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    LoadUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
  },
});

export const { LoadUserRequest, LoadUserSuccess, LoadUserFail } =
  userSlice.actions;

export default userSlice.reducer;
