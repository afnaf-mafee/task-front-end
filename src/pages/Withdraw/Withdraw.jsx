import React from "react";
import useAuthData from "../../hooks/useAuthData";
import { useGetUserBalanceQuery } from "../../redux/services/auth/authApiService";
import { useForm } from "react-hook-form";

// Skeleton
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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Withdraw Data:", data);
    reset();
  };

  return (
    <div className="w-full max-w-md mt-5 bg-gradient-to-br from-[#1e1b4b] via-[#0f172a] to-[#1a1035] shadow-2xl rounded-[40px]">
      <div className="px-4 relative z-10">
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-xl p-6 border-l-[6px] border-purple-600">
          {/* HEADER */}
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-200 text-sm font-medium">
              Account Balance
            </span>

            <div className="px-3 py-1 rounded-full bg-gradient-to-r via-pink-500 to-purple-600 text-white text-[10px] font-extrabold animate-bounce">
              ⭐ LEVEL 1
            </div>
          </div>

          {/* BALANCE */}
          <div className="mb-5 flex items-baseline gap-2">
            {loading ? (
              <Skeleton className="w-32 h-10" />
            ) : (
              <span className="text-5xl font-black text-white">
                {balance} $
              </span>
            )}
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Wallet Type */}
            <div>
              <label className="text-white text-sm font-semibold mb-1 block">
                Wallet Type
              </label>

              <select
                {...register("walletType", {
                  required: "Wallet type required",
                })}
                className="inputGlass w-full h-[45px]"
              >
                <option value="">Select Wallet</option>
                <option value="bkash">bKash</option>
                <option value="nagad">Nagad</option>
              </select>

              {errors.walletType && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.walletType.message}
                </p>
              )}
            </div>

            {/* Number */}
            <div>
              <label className="text-white text-sm font-semibold mb-1 block">
                Wallet Number
              </label>

              <input
                {...register("number", {
                  required: "Number is required",
                })}
                placeholder="Enter number"
                className="inputGlass w-full h-[45px]"
              />

              {errors.number && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.number.message}
                </p>
              )}
            </div>

            {/* Account Type */}
            <div>
              <label className="text-white text-sm font-semibold mb-1 block">
                Account Type
              </label>

              <select
                {...register("accountType", {
                  required: "Account type required",
                })}
                className="inputGlass w-full h-[45px] bg-transparent text-white"
              >
                <option value="" className="bg-[#0f172a] text-gray-300">
                  Select Type
                </option>

                <option value="agent" className="bg-[#0f172a] text-white">
                  Agent
                </option>

                <option value="personal" className="bg-[#0f172a] text-white">
                  Personal
                </option>
              </select>

              {errors.accountType && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.accountType.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-105 transition-all shadow-lg"
            >
              Withdraw
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
