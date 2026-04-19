import React from "react";
import { CrownOutlined } from "@ant-design/icons";
import { useGetTopEarnersQuery } from "../../redux/services/topEarner/topEarnerApiService";

const TopEarner = () => {
  const { data: allData, isLoading } = useGetTopEarnersQuery(13);
  const rankUser = allData?.data || [];
 
  return (
    <div className="bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white p-4 font-urbanist">
      {/* Header */}
      <h1 className="text-xl text-center font-bold tracking-wide gap-2 mb-8">
        🔥 Ranking List
      </h1>

      {/* Podium */}
      <div className="grid grid-cols-3 gap-3 mb-6 items-end">
        {/* 2nd */}

        <div className="relative bg-white/5 backdrop-blur-xl rounded-xl p-3 text-center border border-white/10 hover:scale-105 transition-all duration-300">
          {/* Purple glow */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400 via-fuchsia-500 to-indigo-500 opacity-15 blur-md"></div>

          {/* Avatar */}
          <div className="relative w-12 h-12 mx-auto rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-indigo-500 flex items-center justify-center font-bold text-white shadow-md border border-white/20 uppercase">
            {rankUser[0]?.email?.slice(0, 1) || "U"}
          </div>

          {/* Username */}
          <p className="text-xs mt-2">
            {rankUser[1]?.email
              ? rankUser[1].email.slice(0, 4) + "**"
              : rankUser[1]?.phone
                ? rankUser[1].phone.slice(0, 4) + "**"
                : ""}
          </p>

          <p className="text-lg font-bold text-yellow-400">
            ৳{rankUser[1]?.available_balance}
          </p>

          {/* Rank badge */}
          <div className="mt-2 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-indigo-500 text-white rounded-lg py-1 text-xs font-semibold shadow-md">
            2nd
          </div>
        </div>
        {/* 1st */}
        <div className="relative bg-white/5 backdrop-blur-xl rounded-xl p-4 text-center scale-110 shadow-lg shadow-purple-600/40">
          {/* Floating Level Badge */}
          <div
            className="absolute -top-2  bg-gradient-to-r  via-pink-500 to-purple-600  
    text-white  font-extrabold tracking-wide 
    shadow-[0_0_12px_rgba(236,72,153,0.8)] 
    animate-bounce border border-white/30 backdrop-blur-md text-white  text-[13px] px-2 py-[2px] rounded-full shadow-md backdrop-blur-md border border-white/20 flex items-center gap-1"
          >
            ⭐ First
          </div>

          {/* Avatar */}
          <div className="relative w-14 h-14 mx-auto">
            {/* Main Circle */}
            <div className="w-full h-full rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-xl font-bold shadow-md uppercase">
              {rankUser[0]?.email?.slice(0, 1) || "U"}
            </div>
          </div>

          {/* User Info */}
          <p className="text-xs mt-2">
            {rankUser[0]?.email
              ? rankUser[0].email.slice(0, 4) + "**"
              : rankUser[0]?.phone
                ? rankUser[0].phone.slice(0, 4) + "**"
                : ""}
          </p>

          <p className="text-lg font-bold text-yellow-400">
            ৳{rankUser[0]?.available_balance}
          </p>

          {/* Rank Badge */}
          <div className="mt-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg py-1 my-2 text-xs"></div>
        </div>

        {/* 3rd */}
        <div className="bg-white/5 backdrop-blur-xl rounded-xl p-3 text-center">
          <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center font-bold uppercase">
            {rankUser[2]?.email?.slice(0, 1) || "U"}
          </div>

          <p className="text-xs mt-2">
            {rankUser[2]?.email
              ? rankUser[2].email.slice(0, 4) + "**"
              : rankUser[2]?.phone
                ? rankUser[2].phone.slice(0, 4) + "**"
                : ""}
          </p>

          <p className="text-lg font-bold text-yellow-400">
            ৳{rankUser[2]?.available_balance}
          </p>

          <div className="mt-2 bg-gradient-to-r from-amber-700 via-orange-600 to-yellow-600 text-white rounded-lg py-1 text-xs">
            3rd
          </div>
        </div>
      </div>

      {/* Other Rankings */}
      <h2 className="mb-3 text-sm opacity-80">Other Rankings</h2>

      <div className="space-y-3">
        {rankUser.slice(3).map((item, index) => (
          <div
            key={item._id || index}
            className="flex items-center justify-between bg-white/[4%] cursor-pointer backdrop-blur-lg p-3 rounded-xl hover:bg-white/20 transition"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r   to-purple-600  ring-2 ring-purple-300    text-sm font-bold">
                {index + 4}
              </span>

              <div>
                <p className="text-sm">
                  {item.email
                    ? item.email.slice(0, 4) + "******"
                    : item.phone
                      ? item.phone.slice(0, 4) + "******"
                      : "User"}
                </p>
                <strong className="text-[16px] text-yellow-400 font-bold">
                  🔥 {item?.level}
                </strong>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 px-3 py-1 rounded-full text-sm font-semibold shadow-md">
              ৳ {item.available_balance}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopEarner;
