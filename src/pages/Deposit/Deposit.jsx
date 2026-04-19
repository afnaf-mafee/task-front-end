import React, { useEffect, useState } from "react";
import GlassCard from "../../components/GlassCard/GlassCard";
import {
  useAddPaymentMutation,
  useGetMethodsQuery,
} from "../../redux/services/payment/paymentApiService";
import useAuthData from "../../hooks/useAuthData";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { ImSpinner2 } from "react-icons/im";

import bkashIcon from "../../assets/icon/bkash.svg";
import nagadIcon from "../../assets/icon/nagad.png";

const Deposit = () => {
  const [addPayment, { isLoading }] = useAddPaymentMutation();
  const { user } = useAuthData();
  const { data: paymentMethod } = useGetMethodsQuery();
  

  // ✅ STORE RANDOM AGENT SAFELY
  const [paymentAgent, setPaymentAgent] = useState(null);

  useEffect(() => {
    // already selected → don't change again
    if (paymentAgent) return;

    const data = paymentMethod?.data;
    if (!data || data.length === 0) return;

    const randomIndex = Math.floor(Math.random() * data.length);
    setPaymentAgent(data[randomIndex]);

  }, [paymentMethod?.data, paymentAgent]);
 

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!user?.userId) {
      toast.error("User not authenticated");
      return;
    }

    const paymentData = {
      transactionId: data.transactionId,
      amount: Number(data.amount),
      method: paymentAgent?.name ,
      status: "Pending",
      userId: user.userId,
    };

    try {
      await addPayment(paymentData).unwrap();
      toast.success("✅ Deposit Submitted Successfully");
      reset();
    } catch (error) {
      console.error(error);
      toast.error("❌ Deposit Failed");
    }
  };

  // 🔥 ICON SELECTOR
  const getAgentIcon = (name) => {
    if (!name) return null;

    const lower = name.toLowerCase();

    if (lower.includes("bkash")) return bkashIcon;
    if (lower.includes("nagad")) return nagadIcon;

    return null;
  };

  const icon = getAgentIcon(paymentAgent?.name);

  return (
    <>
      {/* HEADER CARD */}
      <div className="px-4 relative z-10 mt-6">
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-xl p-4 border-l-[6px] border-purple-600">

          {icon && (
            <div className="flex justify-center perspective-[1000px]">
              <div className="relative group">
                <div className="absolute inset-0 blur-2xl opacity-60 
                  bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
                  rounded-full animate-pulse" />

                <img
                  src={icon}
                  alt="agent icon"
                  className="relative w-40 h-20 object-contain 
                  transform-gpu 
                  group-hover:rotate-y-12 group-hover:-rotate-x-6
                  group-hover:scale-110 
                  transition-all duration-500 ease-out
                  drop-shadow-[0_25px_40px_rgba(0,0,0,0.8)]
                  animate-float"
                />
              </div>
            </div>
          )}

          <div className="text-center">
            <h3 className="font-bold text-2xl text-white mb-2 drop-shadow-lg">
              {paymentAgent?.name}
            </h3>

            <p className="text-white text-xl mb-1 font-bold">
              Number:{" "}
              <span className="font-medium">
                {paymentAgent?.number}
              </span>
            </p>

            <p className="text-white text-lg font-semibold">
              Type:{" "}
              <span className="font-medium">
                {paymentAgent?.type}
              </span>
            </p>
          </div>

        </div>
      </div>

      {/* FORM */}
      <div className="p-4">
        <form
          className="bg-white/5 px-6 space-y-4 py-6 backdrop-blur-md rounded-3xl shadow-sm"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <input
              {...register("transactionId", {
                required: "Transaction ID required",
              })}
              placeholder="Enter Transaction ID"
              className="inputGlass"
            />
            {errors.transactionId && (
              <p className="error">{errors.transactionId.message}</p>
            )}
          </div>

          <div>
            <input
              type="number"
              {...register("amount", {
                required: "Amount required",
              })}
              placeholder="Enter Amount"
              className="inputGlass"
            />
            {errors.amount && (
              <p className="error">{errors.amount.message}</p>
            )}
          </div>

          <button
            disabled={isLoading}
            className="w-full py-4 cursor-pointer text-white rounded-2xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-105 transition-all flex justify-center items-center gap-2 shadow-lg"
          >
            {isLoading && <ImSpinner2 className="animate-spin" size={20} />}
            {isLoading ? "Processing..." : "Submit Deposit"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Deposit;