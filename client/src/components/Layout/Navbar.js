import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      const { data } = await axios.post("/api/v1/auth/logout");
      if (data.success) {
        alert(data.message);
        setAuth({
          ...auth,
          user: null,
          token: "",
        });
        localStorage.removeItem("auth");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong while logging out");
    }
  };
  return (
    <div className="w-full h-20 bg-blue-900 text-gray-300">
      <nav className="max-w-7xl h-full mx-auto flex justify-between items-center">
        <div className="text-3xl">Logo</div>
        <div className="text-lg flex gap-6 items-center">
          <div className="flex gap-6 items-center">
            <NavLink to="/" className="hover:underline cursor-pointer">
              Home
            </NavLink>
            {auth.user ? (
              <div className="flex gap-6">
                <NavLink to="/about" className="hover:underline cursor-pointer">
                  About
                </NavLink>
                <NavLink
                  to="/contact"
                  className="hover:underline cursor-pointer"
                >
                  Contact
                </NavLink>
                <NavLink
                  onClick={handleLogOut}
                  className="hover:underline cursor-pointer"
                >
                  LogOut
                </NavLink>
              </div>
            ) : (
              <div className="flex gap-6 items-center">
                <NavLink to="/login" className="hover:underline cursor-pointer">
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className="bg-white text-black rounded-md text-lg border-none outline-none px-6 py-2"
                >
                  SignUp
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
