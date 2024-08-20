import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./ui/navbar";

const Dashbord = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Dashbord;
