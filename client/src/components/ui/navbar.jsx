import React, { useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { RiCloseLargeLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import "../styles/styles.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav>
      <div className="flex justify-between items-center w-full p-5 fixed top-0 bg-white z-50">
        <h1 className="md:ml-10 font-bebas text-4xl">
          <Link to="/">
            <h1 className="font-logo text-[50px]">
              Component<span className="font-logotwo text-[50px]">X</span>
            </h1>
          </Link>
        </h1>
        <div
          className="menu cursor-pointer text-2xl md:mr-10"
          onClick={handleOpenMenu}
        >
          <HiOutlineMenuAlt3 />
        </div>
      </div>
      <ul
        className={`menu-container ${isOpen ? "open flex flex-col gap-3" : ""}`}
      >
        <li>
          <span
            onClick={handleOpenMenu}
            className="cursor-pointer text-2xl text-white absolute top-20 right-10"
          >
            <RiCloseLargeLine />
          </span>
        </li>
        <li>
          <Link
            to="/dashboard/company"
            onClick={handleOpenMenu}
            className="text-5xl"
          >
            Company
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard/chart"
            onClick={handleOpenMenu}
            className="text-5xl"
          >
            Chart
          </Link>
        </li>
        <li>
          <Link to="/dashboard" onClick={handleOpenMenu} className="text-5xl">
            History Data
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard/profile"
            onClick={handleOpenMenu}
            className="text-5xl"
          >
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
