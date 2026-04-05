import React from "react";
import useAuthData from "../../../hooks/useAuthData";

const BalanceCard = () => {
  const { user } = useAuthData();
  console.log(user);

  return (
    <div className="flex items-center gap-3">
      {/* Circle Icon */}
      <div
        className="w-10 h-10 rounded-full 
                      bg-gradient-to-br from-purple-600 to-indigo-600 
                      flex items-center justify-center 
                      text-white font-bold text-sm 
                      border-2 border-purple-300/50 flex-shrink-0"
      >
        U
      </div>

      {/* Balance Text */}
      <span className="text-white font-semibold text-sm">
        Balance:{" "}
        <span className="text-green-400 font-extrabold">
          {user?.available_balance ? (
            <strong>{user?.available_balance}$</strong>
          ) : (
            <strong>{0}</strong>
          )}
        </span>
      </span>
    </div>
  );
};

export default BalanceCard;
