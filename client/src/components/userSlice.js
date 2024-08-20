import { createSlice } from "@reduxjs/toolkit";

// Define the initial state of the user slice
const initialState = {
  email: null, // Initially, no user email is stored
};

// Create the user slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Action to set the user's email
    setUser: (state, action) => {
      state.email = action.payload;
    },
    // Action to clear the user's email
    clearUser: (state) => {
      state.email = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
