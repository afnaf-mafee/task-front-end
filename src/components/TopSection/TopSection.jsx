import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthData from "../../hooks/useAuthData";
import logo from "../../assets/logo/vista.png";
import { TbLogout } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/auth/authSlice";

const TopSection = () => {
  const { user } = useAuthData();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleToggle = () => {
    dispatch(logout()); //
    navigate("/login"); //
  };

  return (
    <div className="flex items-center justify-between w-full h-[75px] bg-gradient-to-r from-[#0f0c21]/60 via-[#1b1640]/20 to-[#0f0c21]/10 backdrop-blur-md rounded-2xl overflow-visible">
      {/* LEFT */}
      <div className="relative -left-12 cursor-pointer ">
        <img src={logo} alt="logo" className="w-full h-full" />
      </div>

      {/* RIGHT SIDE - USER */}
      <div className="flex items-center z-50">
        {user?.userId ? (
          <div className="relative">
            <div
              onClick={handleToggle}
              className="w-10 h-10 rounded-md bg-gradient-to-br from-purple-600 to-indigo-600 
                   flex items-center justify-center text-white font-bold text-sm 
                   border-2 border-purple-300/50 cursor-pointer shadow-md 
                   transition-transform duration-200 hover:scale-105 "
            >
              <TbLogout size={20} />
            </div>
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
