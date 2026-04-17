import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuthData from "../../hooks/useAuthData";
import logo from "../../assets/logo/vista.png";

const TopSection = () => {
  const { user, logout } = useAuthData();
  const [showLogout, setShowLogout] = useState(false);
  const profileRef = useRef(null);

  const handleToggle = () => setShowLogout((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowLogout(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const profileInitial = user?.email ? user.email.charAt(0).toUpperCase() : "U";

  return (
    <div className="flex items-center justify-between w-full h-[75px] bg-gradient-to-r from-[#0f0c21]/60 via-[#1b1640]/20 to-[#0f0c21]/10 backdrop-blur-md rounded-2xl">
      {/* LEFT */}
      <div className="relative -left-12 cursor-pointer ">
        <img src={logo} alt="logo" className="w-full h-full" />
      </div>

      {/* RIGHT SIDE - USER */}
   <div className="flex items-center">
  {user?.userId ? (
    <div className="relative" ref={profileRef}>
      
      <div
        onClick={handleToggle}
        className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 
                   flex items-center justify-center text-white font-bold text-sm 
                   border-2 border-purple-300/50 cursor-pointer shadow-md 
                   transition-transform duration-200 hover:scale-105"
      >
        {profileInitial}
      </div>

      {showLogout && (
        <div className="absolute right-0 mt-2 w-28 bg-white rounded-lg shadow-lg !z-[9999]">
          <button
            onClick={logout}
            className="w-full py-2 px-4 text-sm text-red-600 font-semibold hover:bg-red-50 transition"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  ) : (
    <Link
      className="font-semibold px-4 py-2 text-white bg-indigo-500 rounded-md shadow-md hover:bg-indigo-600 transition"
      to={"/login"}
    >
      Login
    </Link>
  )}
</div>
    </div>
  );
};

export default TopSection;
