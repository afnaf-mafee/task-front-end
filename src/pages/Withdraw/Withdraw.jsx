import React from "react";
import useAuthData from "../../hooks/useAuthData";
import { useGetUserBalanceQuery } from "../../redux/services/auth/authApiService";

// Move Skeleton outside
const Skeleton = ({ className }) => (
  <span
    className={`animate-pulse bg-gray-600/50 rounded-md inline-block ${className}`}
  />
);

const Withdraw = () => {
  const { user } = useAuthData();
  const {
    data: balanceData,
    isLoading,
    isFetching,
  } = useGetUserBalanceQuery(user?.userId, { skip: !user?.userId });

  const balance = balanceData?.available_balance ?? 0;
  const loading = isLoading || isFetching;

  return (
    <div className="w-full max-w-md mt-5 bg-gradient-to-br from-[#1e1b4b] via-[#0f172a] to-[#1a1035] shadow-2xl rounded-[40px] ">
      <div className="px-4 relative z-10 ">
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-xl p-6 border-l-[6px] border-purple-600">
          {/* Header */}
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <span className="text-gray-200 text-sm font-medium">
                Account Balance
              </span>
            </div>
            <span className="bg-purple-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
              LEVEL ONE
            </span>
          </div>

          {/* Balance */}
          <div className="mb-5 flex items-baseline gap-2">
            {loading ? (
              <Skeleton className="w-32 h-10" />
            ) : (
              <span className="text-5xl font-black text-white tracking-tighter">
                {balance} $
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;