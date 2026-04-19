import React from "react";
import useAuthData from "../../../hooks/useAuthData";
import { useGetUserBalanceQuery } from "../../../redux/services/auth/authApiService";
import { Wallet, Loader2, ArrowUpRight } from "lucide-react";
import { IoWalletOutline } from "react-icons/io5";

const BalanceCard = () => {
  const { user } = useAuthData();
  const {
    data: balanceData,
    isLoading,
    isFetching,
  } = useGetUserBalanceQuery(user?.userId, {
    skip: !user?.userId,
  });

  const balance = balanceData?.available_balance ?? 0;

  return (
    <div
      className=" font-urbanist
      relative flex items-center justify-between
    -z-50
      overflow-hidden
      group
      "
    >
      {/* Glow Effect */}
      <div
        className="
    
        absolute inset-0
       
        opacity-0 group-hover:opacity-100
        transition duration-500 blur-2xl
      "
      />

      {/* LEFT SECTION */}
      <div className="flex items-center gap-3 relative z-10">
        {/* Wallet Icon */}
        <div
          className="
          w-12 h-12 rounded-full
          bg-gradient-to-br from-purple-600 to-indigo-600
          flex items-center justify-center
          text-white shadow-lg
          "
        >
          {isFetching ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <IoWalletOutline size={25} />
          )}
        </div>

        {/* Balance Info */}
        <div className="flex flex-col leading-tight">
          <span className="text-white/90 text-base font-medium">
            Available Balance
          </span>

          {isLoading ? (
            <div className="h-6 w-16 rounded bg-white/10 animate-pulse mt-1" />
          ) : (
            <span className="text-green-400 font-bold text-xl tracking-wide ">
              ${balance.toFixed(2)}
            </span>
          )}
        </div>
      </div>

      {/* <button className=" relative z-10 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-105 hover:shadow-[0_0_20px_rgba(139,92,246,0.7)] transition-all duration-300 active:scale-95 ">
        {" "}
        Withdraw <ArrowUpRight size={16} />{" "}
      </button> */}
    </div>
  );
};

export default BalanceCard;
