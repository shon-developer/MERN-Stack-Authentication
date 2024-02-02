import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full h-20 bg-blue-900 text-gray-300">
      <nav className="max-w-7xl h-full mx-auto flex justify-between items-center">
        <div className="text-3xl">Logo</div>
        <div className="text-lg flex gap-6 items-center">
          <ul className="flex gap-6">
            <NavLink to="/" className="hover:underline cursor-pointer">
              Home
            </NavLink>
            <NavLink to="/about" className="hover:underline cursor-pointer">
              About
            </NavLink>
            <NavLink to="/contact" className="hover:underline cursor-pointer">
              Contact
            </NavLink>
            <NavLink to="/login" className="hover:underline cursor-pointer">
              Login
            </NavLink>
          </ul>
          <NavLink
            to="/signup"
            className="bg-white text-black rounded-md text-lg border-none outline-none px-6 py-2"
          >
            SignUp
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
