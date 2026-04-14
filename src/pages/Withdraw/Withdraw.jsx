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

  const balance = balanceData?.available_balance ?? 0;
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
      const payload = {
        userId: user?.userId,
        wallet: formData.wallet,
        walletNumber: formData.walletNumber,
        accountType: formData.accountType,
        amount: Number(formData.amount),
      };

      const res = await createPayoutRequest(payload).unwrap();

      // ✅ Success toast
      toast.success(res?.message || "Payout request created successfully!");
      reset();
    } catch (error) {
      console.log(error);

      // ❌ Error toast
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
            <span className="text-gray-200 text-sm font-medium">
              Account Balance
            </span>

            <div className="px-3 py-1 rounded-full bg-gradient-to-r via-pink-500 to-purple-600 text-white text-[10px] font-extrabold animate-bounce">
              ⭐ LEVEL 1
            </div>
          </div>

          {/* BALANCE */}
          <div className="mb-4 flex items-baseline gap-2">
            {loading ? (
              <Skeleton className="w-32 h-10" />
            ) : (
              <span className="text-4xl font-black text-purple-500">
                {balance} $
              </span>
            )}
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
                    value: balance,
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
            </div>

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
