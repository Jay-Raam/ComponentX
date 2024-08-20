import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./components/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
