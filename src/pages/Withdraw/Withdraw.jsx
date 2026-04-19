import React from "react";
import useAuthData from "../../hooks/useAuthData";
import { useGetUserBalanceQuery } from "../../redux/services/auth/authApiService";
import { useForm } from "react-hook-form";
import { useCreatePayoutRequestMutation } from "../../redux/services/withdraw/withdrawApiService";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "react-hot-toast";
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

  const totalBalance = balanceData?.available_balance ?? 0;
  const withdrawableBalance = balanceData?.earning_balance ?? 0;

  const bonusBalance = balanceData?.bonus_balance ?? 0;

  const loading = isLoading || isFetching;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [createPayoutRequest, { isLoading: payOutLoading }] =
    useCreatePayoutRequestMutation();

  const onSubmit = async (formData) => {
    try {
      const originalAmount = Number(formData.amount);

      // ✅ 4% deduction
      const deductedAmount = originalAmount * 0.04;
      const finalAmount = Math.floor(originalAmount - deductedAmount);

      const payload = {
        userId: user?.userId,
        wallet: formData.wallet,
        walletNumber: formData.walletNumber,
        amount: Number(finalAmount.toFixed(2)), // optional rounding
      };

      const res = await createPayoutRequest(payload).unwrap();

      toast.success(res?.message || "Payout request created successfully!");
      reset();
    } catch (error) {
      console.log(error);

      toast.error(
        error?.data?.message || "Something went wrong. Please try again!",
      );
    }
  };

  return (
    <div className="w-full max-w-md mt-5 bg-gradient-to-br from-[#1e1b4b] via-[#0f172a] to-[#1a1035] shadow-2xl rounded-[40px]">
      <div className="px-4 relative z-10">
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-xl p-6 border-l-[6px] border-purple-600">
          {/* HEADER */}
          <div className="flex justify-between items-center mb-2">
            <div className="px-3 py-1 rounded-full bg-gradient-to-r via-pink-500 to-purple-600 text-white text-[10px] font-extrabold animate-bounce">
              ⭐ LEVEL 1
            </div>
          </div>
          {/* BALANCE CARD */}
          <div
            className="bg-white/ backdrop-blur-2xl border border-white/10
rounded-2xl p-4 shadow-[0_0_40px_rgba(168,85,247,0.25)]"
          >
            {/* TOTAL BALANCE */}
            <div className="pb-2 border-b border-white/10">
              <p className="text-white text-sm tracking-wide">Total Balance</p>

              {loading ? (
                <Skeleton className="w-40 h-10 mt-2" />
              ) : (
                <h2
                  className="text-3xl font-extrabold
      bg-gradient-to-r from-purple-400 via-fuchsia-500 to-pink-500
      bg-clip-text text-transparent drop-shadow-lg"
                >
                  ${totalBalance}
                </h2>
              )}
            </div>

            {/* BALANCE GRID */}
            <div className="grid grid-cols-2 gap-2 mt-2">
              {/* Withdrawable */}
              <div
                className="bg-white/5 rounded-xl p-4 border border-white/10 
  hover:border-purple-500/40 transition-all duration-300"
              >
                <p className="text-xs text-white font-semibold mb-1">
                  Withdrawable
                </p>

                {loading ? (
                  <Skeleton className="w-24 h-6" />
                ) : (
                  <p className="text-xl font-bold text-pink-500">
                    ${withdrawableBalance}
                  </p>
                )}

              
              </div>

              {/* Bonus */}
              <div
                className="bg-white/5 rounded-xl p-4 border border-white/10 
    hover:border-pink-500/40 transition-all duration-300"
              >
                <p className="text-xs text-white mb-1">Bonus </p>

                {loading ? (
                  <Skeleton className="w-24 h-6" />
                ) : (
                  <p className="text-xl font-bold text-purple-500">
                    ${bonusBalance}
                  </p>
                )}
              </div>
            </div>
              {/* 🔥 Highlight Note */}
                <p className="mt-2 text-[11px] font-medium text-center text-yellow-400  bg-yellow-400/10 px-2 py-1 rounded-md ">
                  ⚠️  • 4% withdrawal fee applies
                </p>
          </div>
          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Amount */}
            <div>
              <label className="text-white text-sm font-semibold mb-1 block">
                Amount ($)
              </label>

              <input
                type="number"
                step="0.01"
                {...register("amount", {
                  required: "Amount is required",
                  min: {
                    value: 1,
                    message: "Minimum amount is 1$",
                  },
                  max: {
                    value: withdrawableBalance,
                    message: "Insufficient balance",
                  },
                })}
                placeholder="Enter amount"
                className="inputGlass w-full h-[45px]"
              />

              {errors.amount && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.amount.message}
                </p>
              )}
            </div>

            {/* Wallet Type */}
            <div>
              <label className="text-white text-sm font-semibold mb-1 block">
                Wallet Type
              </label>

              <select
                {...register("wallet", {
                  required: "Wallet type required",
                })}
                className="inputGlass w-full h-[45px]"
              >
                <option value="">Select Wallet</option>
                <option value="bkash">bKash</option>
                <option value="nagad">Nagad</option>
              </select>

              {errors.wallet && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.wallet.message}
                </p>
              )}
            </div>

            {/* Number */}
            <div>
              <label className="text-white text-sm font-semibold mb-1 block">
                Wallet Number
              </label>

              <input
                {...register("walletNumber", {
                  required: "Number is required",
                })}
                placeholder="Enter number"
                className="inputGlass w-full h-[45px]"
              />

              {errors.walletNumber && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.walletNumber.message}
                </p>
              )}
            </div>

            {/* Account Type */}
            {/* <div>
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
                <option value="personal" className="bg-[#0f172a] text-white">
                  Personal
                </option>
                <option value="agent" className="bg-[#0f172a] text-white">
                  Agent
                </option>
              </select>

              {errors.accountType && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.accountType.message}
                </p>
              )}
            </div> */}

            {/* Submit */}
            <button
              disabled={payOutLoading}
              className="w-full py-4  text-white cursor-pointer rounded-2xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-105 transition-all flex justify-center items-center gap-2 shadow-lg"
            >
              {payOutLoading && (
                <ImSpinner2 className="animate-spin" size={20} />
              )}
              {payOutLoading ? "Processing..." : "Withdraw"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
