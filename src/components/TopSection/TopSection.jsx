import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuthData from "../../hooks/useAuthData";

const TopSection = () => {
  const { user, logout } = useAuthData();
  const [showLogout, setShowLogout] = useState(false);
  const profileRef = useRef(null);

  // Toggle logout menu
  const handleToggle = () => setShowLogout((prev) => !prev);

  // Close menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowLogout(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get first letter of user name
  const profileInitial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <div className="flex mt-4 justify-between items-center relative px-4">
      <h4 className="text-xl font-bold text-white select-none">LOGO</h4>

      {user?.userId ? (
        <div className="relative" ref={profileRef}>
          {/* Profile Circle */}
          <div
            onClick={handleToggle}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 
                       flex items-center justify-center text-white font-bold text-sm 
                       border-2 border-purple-300/50 cursor-pointer shadow-md 
                       transition-transform duration-200 hover:scale-105"
          >
            {profileInitial}
          </div>

          {/* Logout Button */}
          {showLogout && (
            <div className="absolute right-0 mt-2 w-28 bg-white rounded-lg shadow-lg overflow-hidden z-50">
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
  );
};

export default TopSection;
