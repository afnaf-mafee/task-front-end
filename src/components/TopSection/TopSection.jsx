import React from "react";
import useAuthData from "../../hooks/useAuthData";
import { Link } from "react-router-dom";

const TopSection = () => {
  const { user } = useAuthData();
  return (
    <div className=" flex mt-4 justify-between">
      <h4 className="text-xl font-bold text-white ">LOGO</h4>
      {/* profile */}
      {/* Circle Icon */}
      {user?.userId ? (
        <div
          className="w-10 h-10 rounded-full 
                      bg-gradient-to-br from-purple-600 to-indigo-600 
                      flex items-center justify-center 
                      text-white font-bold text-sm 
                      border-2 border-purple-300/50 flex-shrink-0"
        >
          M
        </div>
      ) : (
        <Link
          className="font-semibold px-4 py-2 text-white bg-indigo-500 rounded-md "
          to={"/login"}
        >
          Login
        </Link>
      )}
    </div>
  );
};

export default TopSection;
